import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  deleteStudentById,
  getStudentById,
  Student,
  updateStudentById,
} from '../../../../database/students';

const studentSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  gradeId: z.number(),
});

export type StudentResponseBodyGet =
  | {
      error: string;
    }
  | {
      student: Student;
    };

export type StudentResponseBodyPut =
  | {
      error: string;
    }
  | {
      student: Student;
    };

export type StudentResponseBodyDelete =
  | {
      error: string;
    }
  | {
      student: Student;
    };

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<StudentResponseBodyGet>> {
  const studentId = Number(params.studentId);
  console.log(params);

  if (!studentId) {
    return NextResponse.json(
      {
        error: 'Student id is not valid',
      },
      { status: 400 },
    );
  }

  const singleStudent = await getStudentById(studentId);

  if (!singleStudent) {
    return NextResponse.json(
      {
        error: 'Student not found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ student: singleStudent });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<StudentResponseBodyPut>> {
  const studentId = Number(params.studentId);

  if (!studentId) {
    return NextResponse.json(
      {
        error: 'Student id is not valid',
      },
      { status: 400 },
    );
  }

  const body = await request.json();

  const result = studentSchema.safeParse(body);

  if (!result.success) {
    // Inside of result.error.issues you are going to have more granular information about what is failing allowing you to create more specific error massages
    // console.log(result.error.issues);

    return NextResponse.json(
      {
        error:
          'Request body is missing one of the needed properties firstName, lastName and gradeId',
      },
      { status: 400 },
    );
  }

  const newStudent = await updateStudentById(
    studentId,
    result.data.firstName,
    result.data.lastName,
    result.data.gradeId,
  );

  if (!newStudent) {
    return NextResponse.json(
      {
        error: 'Student not found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ student: newStudent });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<StudentResponseBodyDelete>> {
  const studentId = Number(params.studentId);

  if (!studentId) {
    return NextResponse.json(
      {
        error: 'Student id is not valid',
      },
      { status: 400 },
    );
  }

  const singleStudent = await deleteStudentById(studentId);

  if (!singleStudent) {
    return NextResponse.json(
      {
        error: 'Student not found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ student: singleStudent });
}
