import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createGrade } from '../../../database/grades';

// import { createStudent, Student } from '../../../database/users';

// import { getUserBySessionToken } from '../../../database/users';
// import { validateTokenAgainstSecret } from '../../../util/csrf';

const gradeSchema = z.object({
  userId: z.number(),
  gradeName: z.string(),
  gradeCode: z.string(),
  // csrfToken: z.string(),
});

export type GradesResponseBody =
  | { errors: { message: string }[] }
  | { grades: { grade: string } };

export const POST = async (request: NextRequest) => {
  // 1. validate the data
  const body = await request.json();

  const result = gradeSchema.safeParse(body);

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
  // !result.data.userId ||
  if (!result.data.gradeName || !result.data.gradeCode) {
    return NextResponse.json(
      { errors: [{ message: 'gradeName or gradeCode is empty' }] },
      { status: 400 },
    );
  }
  const newGrade = await createGrade(
    result.data.userId,
    result.data.gradeName,
    result.data.gradeCode,
  );

  return NextResponse.json({ grades: newGrade });
};
