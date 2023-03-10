import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession } from '../../../../database/sessions';
import { getStudentByFirstNameAndLastNameWithGradeCode } from '../../../../database/students';
// import {
//   getUserByUsername,
//   getUserByUsernameWithPasswordHash,
// } from '../../../../database/users';
import { createSerializedRegisterSessionTokenCookie } from '../../../../utils/cookies';

const studentSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  gradeCode: z.string(),
});

export type StudentsResponseBody =
  | { errors: { message: string }[] }
  | { student: { student: string } };

export const POST = async (request: NextRequest) => {
  // 1. validate the data
  const body = await request.json();

  const result = studentSchema.safeParse(body);

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
  if (
    !result.data.firstName ||
    !result.data.lastName ||
    !result.data.gradeCode
  ) {
    // || !result.data.email
    return NextResponse.json(
      { errors: [{ message: 'firstName, LastName or gradeCode is empty' }] },
      { status: 400 },
    );
  }

  // 2. check if the user already exist

  // 2.a compare the username with the database
  // getStudentByFirstNameAndLastNameWithGradeCode

  const studentByFirstNameAndLastNameWithGradeCode =
    await getStudentByFirstNameAndLastNameWithGradeCode(
      result.data.firstName,
      result.data.lastName,
      result.data.gradeCode,
    );

  if (!studentByFirstNameAndLastNameWithGradeCode) {
    return NextResponse.json(
      { errors: [{ message: 'student not found' }] },
      { status: 401 },
    );
  }
  console.log(
    'studentByFirstNameAndLastNameWithGradeCode',
    studentByFirstNameAndLastNameWithGradeCode,
  );

  // const userByUsernameWithPasswordHash =
  //   await getUserByUsernameWithPasswordHash(result.data.username);

  // if (!userByUsernameWithPasswordHash) {
  //   return NextResponse.json(
  //     { errors: [{ message: 'user not found' }] },
  //     { status: 401 },
  //   );
  // }
  // console.log('userByUsernameWithPasswordHash', userByUsernameWithPasswordHash);
  // // 3. validate the password
  // const isPasswordValid = await bcrypt.compare(
  //   result.data.password,
  //   userByUsernameWithPasswordHash.passwordHash,
  // );

  // if (!isPasswordValid) {
  //   return NextResponse.json(
  //     { errors: [{ message: ' password is not valid' }] },
  //     { status: 401 },
  //   );
  // }

  // 4. create a session
  // - create the token
  const token = crypto.randomBytes(80).toString('base64');
  // - create a session token
  const session = await createSession(
    token,
    studentByFirstNameAndLastNameWithGradeCode.id,
  );

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
  // - add the new header

  return NextResponse.json(
    {
      student: {
        studentLogin:
          studentByFirstNameAndLastNameWithGradeCode.firstName.lastName
            .gradeCode,
      },
    },
    {
      status: 200,
      headers: { 'Set-Cookie': serializedCookie },
    },
  );
};
