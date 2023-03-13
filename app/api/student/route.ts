import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createStudent,
  getStudentsByGradeId,
  Student,
} from '../../../database/students';

// import { createStudent, Student } from '../../../database/users';

// import { getUserBySessionToken } from '../../../database/users';
// import { validateTokenAgainstSecret } from '../../../util/csrf';

const studentSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  gradeId: z.number(),
  // studentId: z.number(),
  // csrfToken: z.string(),
});

export type StudentsResponseBody =
  | { errors: { message: string }[] }
  | { students: { student: string } };

// export type StudentResponseBodyDelete =
//   | {
//       error: string;
//     }
//   | {
//       student: Student;
//     };

export const POST = async (request: NextRequest) => {
  // 1. validate the data
  const body = await request.json();
  // console.log('body', body);
  const result = studentSchema.safeParse(body);

  if (!result.success) {
    // Inside of result.error.issues you are going to have more granular information about what is failing allowing you to create more specific error massages
    // console.log(result.error.issues);

    return NextResponse.json(
      {
        errors: result.error.issues,
      },
      { status: 400 },
    );
  }
  // check if the string is empty
  if (!result.data.firstName || !result.data.lastName) {
    return NextResponse.json(
      { errors: [{ message: 'firstName or lastName   is empty' }] },
      { status: 400 },
    );
  }

  const newStudent = await createStudent(
    result.data.firstName,
    result.data.lastName,
    result.data.gradeId,
    // result.data.gradeId,gradeId || !result.data.gradeId
  );
  // console.log('newGrade', newGrade);

  return NextResponse.json({ students: newStudent });
};

// export const DELETE = async (request: NextRequest) => {
//   // const body = await request.json();
//   const studentId = await request.json();

//   const result = studentSchema.safeParse(studentId);

//   if (!result.success) {
//     // Inside of result.error.issues you are going to have more granular information about what is failing allowing you to create more specific error massages

//     return NextResponse.json(
//       {
//         errors: result.error.issues,
//       },
//       { status: 400 },
//     );
//   }

//   const singleStudent = await deleteStudentById(studentId);
//   if (!singleStudent) {
//     return NextResponse.json(
//       {
//         error: 'Student not found',
//       },
//       { status: 404 },
//     );
//   }

//   return NextResponse.json({ student: singleStudent });
// };

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: Record<string, string | string[]> },
// ) {
//   // : Promise<NextResponse<StudentResponseBodyDelete>>
//   const studentId = Number(params.studentId);

//   if (!studentId) {
//     return NextResponse.json(
//       {
//         error: 'Student id is not valid',
//       },
//       { status: 400 },
//     );
//   }

//   const singleStudent = await deleteStudentById(studentId);

//   if (!singleStudent) {
//     return NextResponse.json(
//       {
//         error: 'Student not found',
//       },
//       { status: 404 },
//     );
//   }

//   return NextResponse.json({ student: singleStudent });
// }

// export type StudentsResponseBodyGet =
//   | {
//       error: string;
//     }
//   | {
//       students: Student[];
//     };

// export type StudentsResponseBodyPost =
//   | {
//       error: string;
//     }
//   | {
//       student: Student;
//     };

// export async function GET(
//   request: NextRequest,
// ): Promise<NextResponse<StudentsResponseBodyGet>> {
//   // this should be a public api method (unprotected)
//   const { searchParams } = new URL(request.url);

//   return NextResponse.json({ students: students });
// }

// export async function POST(
//   request: NextRequest,
// ): Promise<NextResponse<StudentsResponseBodyPost>> {
//   // this is a protected Route Handler
//   // 1. get the session token from the cookie
//   const cookieStore = cookies();
//   const token = cookieStore.get('sessionToken');

//   // 2. validate that session
//   // 3. get the user profile matching the session
//   const user = token && (await getUserBySessionToken(token.value));

//   if (!user) {
//     return NextResponse.json({ error: 'session token is not valid' });
//   }

//   const body = await request.json();

//   const result = studentSchema.safeParse(body);

//   if (!result.success) {
//     // Inside of result.error.issues you are going to have more granular information about what is failing allowing you to create more specific error massages
//     // console.log(result.error.issues);

//     return NextResponse.json(
//       {
//         error:
//           'Request body is missing one of the needed properties firstName, type and accessory ',
//       },
//       { status: 400 },
//     );
//   }

//   // validate csrf token to make sure the request happens from my server
//   if (!validateTokenAgainstSecret(user.csrfSecret, result.data.csrfToken)) {
//     return NextResponse.json(
//       {
//         error: 'CSRF token is not valid',
//       },
//       { status: 400 },
//     );
//   }

//   const newStudent = await createStudent(
//     result.data.firstName,
//     result.data.lastName,
//     result.data.gradeId,
//   );

//   if (!newStudent) {
//     return NextResponse.json(
//       {
//         error: 'Animal not created!',
//       },
//       { status: 500 },
//     );
//   }

//   return NextResponse.json({ student: newStudent });
// }
