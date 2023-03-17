import { cache } from 'react';
import { sql } from './connect';

export const createComment = cache(
  async (
    content: string,
    // userId: number,
    // studentId: number,
    postId: number,
  ) => {
    const [comment] = await sql<{ id: number; content: string }[]>`
      INSERT INTO comments
        (content,  post_id)

      VALUES
         (${content}, ${postId})

    RETURNING
        id,
        content
    `;
    return comment;
  },
);
// -- ${userId}, ${studentId}

export const getCommentsByPostId = cache(async (postId: number) => {
  const comment = await sql<{ id: number; content: string }[]>`
    SELECT
      id,
      content
    FROM
      comments
    WHERE
      post_id = ${postId}
  `;
  return comment;
});

export const getCommentById = cache(async (id: number) => {
  const [comment] = await sql<{ id: number; content: string }[]>`
    SELECT
      id,
      content
    FROM
      comments
    WHERE
      comments.id = ${id}
  `;
  return comment;
});
