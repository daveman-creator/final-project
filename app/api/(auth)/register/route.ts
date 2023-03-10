import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession } from '../../../../database/sessions';
import {
  createUser,
  getUserByUsername,
  getUserByUsernameWithEmail,
} from '../../../../database/users';
import { createSerializedRegisterSessionTokenCookie } from '../../../../utils/cookies';

const userSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export type RegisterResponseBody =
  | { errors: { message: string }[] }
  | {
      user: {
        id: any;
        username: string;
      };
    };

export const POST = async (request: NextRequest) => {
  // 1. validate the data
  const body = await request.json();

  const result = userSchema.safeParse(body);

  if (!result.success) {
    // Inside of result.error.issues you are going to have more granular information about what is failing allowing you to create more specific error massages

    return NextResponse.json(
      {
        errors: result.error.issues,
      },
      { status: 400 },
    );
  }

  // check if the string is empty
  if (!result.data.username || !result.data.email || !result.data.password) {
    return NextResponse.json(
      { errors: [{ message: 'username, email or password is empty' }] },
      { status: 400 },
    );
  }

  // 2. check if the user already exist
  // 2.a compare the username with the database

  const user = await getUserByUsername(result.data.username);

  if (user) {
    return NextResponse.json(
      { errors: [{ message: 'username is already taken' }] },
      { status: 400 },
    );
  }

  const email = await getUserByUsernameWithEmail(result.data.email);

  if (email) {
    return NextResponse.json(
      { errors: [{ message: 'email is already taken' }] },
      { status: 400 },
    );
  }
  // 3. hash the password
  const passwordHash = await bcrypt.hash(result.data.password, 12);

  // 4. create the user
  const newUser = await createUser(
    result.data.username,
    result.data.email,
    passwordHash,
  );

  if (!newUser) {
    return NextResponse.json(
      { errors: [{ message: 'user creation failed' }] },
      { status: 500 },
    );
  }

  // 5. create a session
  // - create the token
  const token = crypto.randomBytes(80).toString('base64');
  // - create a session token
  const session = await createSession(token, newUser.id);

  // - store the session token in the database
  if (!session) {
    return NextResponse.json(
      { errors: [{ message: 'session creation failed' }] },
      { status: 500 },
    );
  }
  // - Attach the session token to the response
  // - serialize the cookie
  const serializedCookie = createSerializedRegisterSessionTokenCookie(
    session.token,
  );

  // 6. return the new username
  return NextResponse.json(
    { user: { username: newUser.username } },
    {
      status: 200,
      headers: { 'Set-Cookie': serializedCookie },
    },
  );
};
