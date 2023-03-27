import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getTeacherNameByStudentName } from '../../../../database/posts';
import { createStudentSession } from '../../../../database/sessions';
import {
  getStudentByFirstNameAndLastNameWithGradeCode,
  getStudentByGradeCode,
} from '../../../../database/students';
import { createSerializedRegisterSessionTokenCookie } from '../../../../utils/cookies';

const studentSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  gradeCode: z.string(),
});

export type StudentsResponseBody =
  | { errors: { message: string }[] }
  | { student: { firstName: string; lastName: string } };

export const POST = async (request: NextRequest) => {
  // 1. validate the data
  const body = await request.json();

  const result = studentSchema.safeParse(body);
  console.log('result', result);

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
  // confirm that the gradecode is valid and it belongs to the student that is making the request

  //  this is the main code
  const studentByGradeCode = await getStudentByGradeCode(
    result.data.gradeCode,
    result.data.firstName,
    result.data.lastName,
  );
  //  result.data.firstName,
  //   result.data.lastName,

  if (!studentByGradeCode) {
    return NextResponse.json(
      { errors: [{ message: 'student is not valid' }] },
      { status: 401 },
    );
  }
  console.log('studentByGradeCode', studentByGradeCode);

  // 4. create a session
  // - create the token
  const token = crypto.randomBytes(80).toString('base64');
  // - create a session token
  const session = await createStudentSession(token, studentByGradeCode.id);

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
  const teacher = await getTeacherNameByStudentName(
    studentByGradeCode.firstName,
    studentByGradeCode.lastName,
  );

  return NextResponse.json(
    {
      student: {
        firstName: studentByGradeCode.firstName,
        lastName: studentByGradeCode.lastName,
        teacher: teacher,
      },
    },
    {
      status: 200,
      headers: { 'Set-Cookie': serializedCookie },
    },
  );
};
