import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  getUserByUsername,
  getUserByUsernameWithPasswordHash,
} from '../../../../database/users';

const userSchema = z.object({
  username: z.string(),
  // email: z.string(),
  password: z.string(),
});

export type RegisterResponseBody =
  | { errors: { message: string }[] }
  | { user: { username: string } };

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
  if (!result.data.username || !result.data.password) {
    // || !result.data.email
    return NextResponse.json(
      { errors: [{ message: 'username or password is empty' }] },
      { status: 400 },
    );
  }

  // 2. check if the user already exist
  // 2.a compare the username with the database
  const userByUsernameWithPasswordHash =
    await getUserByUsernameWithPasswordHash(result.data.username);

  if (!userByUsernameWithPasswordHash) {
    return NextResponse.json(
      { errors: [{ message: 'user not found' }] },
      { status: 401 },
    );
  }
  console.log('userByUsernameWithPasswordHash', userByUsernameWithPasswordHash);
  // 3. validate the password
  const isPasswordValid = await bcrypt.compare(
    result.data.password,
    userByUsernameWithPasswordHash.passwordHash,
  );

  if (!isPasswordValid) {
    return NextResponse.json(
      { errors: [{ message: ' password is not valid' }] },
      { status: 401 },
    );
  }

  return NextResponse.json({
    user: { username: userByUsernameWithPasswordHash.username },
  });

  // const user = await getUserByUsername(result.data.username);

  // if (user) {
  //   return NextResponse.json(
  //     { errors: [{ message: 'username is already taken' }] },
  //     { status: 400 },
  //   );
  // }
};
