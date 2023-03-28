import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createStudent } from '../../../database/students';

const studentSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  gradeId: z.number(),
  // csrfToken: z.string(),
});

export type StudentsResponseBody =
  | { errors: { message: string }[] }
  | { students: { student: string } };

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
  );

  return NextResponse.json({ students: newStudent });
};
