import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createComment } from '../../../database/comments';

const commentSchema = z.object({
  userId: z.number(),
  studentId: z.number(),
  postId: z.number(),
  content: z.string(),
  // csrfToken: z.string(),
});

export type CommentsResponseBody =
  | { errors: { message: string }[] }
  | { comments: { content: string } };

export const COMMENT = async (request: NextRequest) => {
  // 1. validate the data
  const body = await request.json();

  const result = commentSchema.safeParse(body);

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
  if (!result.data.content) {
    return NextResponse.json(
      { errors: [{ message: ' content is empty' }] },
      { status: 400 },
    );
  }
  const newComment = await createComment(
    result.data.userId,
    result.data.studentId,
    result.data.postId,
    result.data.content,
  );

  return NextResponse.json({ comments: newComment });
};
