import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createPost } from '../../../database/posts';

const postSchema = z.object({
  userId: z.number(),
  title: z.string(),
  content: z.string(),
  // csrfToken: z.string(),
});

export type PostsResponseBody =
  | { errors: { message: string }[] }
  | { posts: { post: string } };

export const POST = async (request: NextRequest) => {
  // 1. validate the data
  const body = await request.json();

  const result = postSchema.safeParse(body);

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

  if (!result.data.title || !result.data.content) {
    return NextResponse.json(
      { errors: [{ message: 'title or content is empty' }] },
      { status: 400 },
    );
  }
  const newPost = await createPost(
    result.data.title,
    result.data.content,
    result.data.userId,
  );

  return NextResponse.json({ posts: newPost });
};
