import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createComment,
  getCommentById,
  getCommentsByPostId,
} from '../../../database/comments';

const commentSchema = z.object({
  // userId: z.number(),
  // studentId: z.number(),
  postId: z.number(),
  content: z.string(),
  // csrfToken: z.string(),
});

export type CommentsResponseBody =
  | { errors: { message: string }[] }
  | { comments: { content: string } };

export const POST = async (request: NextRequest) => {
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
    result.data.content,
    // result.data.studentId,
    result.data.postId,

    // result.data.userId,
  );

  return NextResponse.json({ comments: newComment });
};

// export const GET = async (request: NextRequest) => {
//   const { postId } = request.query;

//   const comments = await getCommentsByPostId(Number(postId));

//   return NextResponse.json({ comments });
// };

// export async function GET(
//   request: NextRequest,
//   { params }: { params: Record<string, string | string[]> },
// ): Promise<NextResponse<CommentResponseBodyGet>> {
//   const commentId = Number(params.commentId);
//   console.log(params);

//   if (!commentId) {
//     return NextResponse.json(
//       {
//         error: 'Comment id is not valid',
//       },
//       { status: 400 },
//     );
//   }

//   const singleComment = await getCommentById(commentId);

//   if (!singleComment) {
//     return NextResponse.json(
//       {
//         error: 'Comment not found',
//       },
//       { status: 404 },
//     );
//   }

//   return NextResponse.json({ comment: singleCooment });
// }
