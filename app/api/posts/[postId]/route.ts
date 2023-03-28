import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  deletePostById,
  getPostById,
  Post,
  updatePostById,
} from '../../../../database/posts';

const postSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export type PostResponseBodyGet =
  | {
      error: string;
    }
  | {
      post: Post;
    };

export type PostResponseBodyPut =
  | {
      error: string;
    }
  | {
      post: Post;
    };

export type PostResponseBodyDelete =
  | {
      error: string;
    }
  | {
      post: Post;
    };

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<PostResponseBodyGet>> {
  const postId = Number(params.postId);
  console.log(params);

  if (!postId) {
    return NextResponse.json(
      {
        error: 'Post id is not valid',
      },
      { status: 400 },
    );
  }

  const singlePost = await getPostById(postId);

  if (!singlePost) {
    return NextResponse.json(
      {
        error: 'Post not found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ post: singlePost });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<PostResponseBodyPut>> {
  const postId = Number(params.postId);

  if (!postId) {
    return NextResponse.json(
      {
        error: 'Post id is not valid',
      },
      { status: 400 },
    );
  }

  const body = await request.json();

  const result = postSchema.safeParse(body);

  if (!result.success) {
    // Inside of result.error.issues you are going to have more granular information about what is failing allowing you to create more specific error massages

    return NextResponse.json(
      {
        error:
          'Request body is missing one of the needed properties title and content',
      },
      { status: 400 },
    );
  }

  const newPost = await updatePostById(
    postId,
    result.data.title,
    result.data.content,
  );

  if (!newPost) {
    return NextResponse.json(
      {
        error: 'Post not found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ post: newPost });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<PostResponseBodyDelete>> {
  const postId = Number(params.postId);

  if (!postId) {
    return NextResponse.json(
      {
        error: 'Post id is not valid',
      },
      { status: 400 },
    );
  }

  const singlePost = await deletePostById(postId);

  if (!singlePost) {
    return NextResponse.json(
      {
        error: 'Post not found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ post: singlePost });
}
