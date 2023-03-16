import { cache } from 'react';
import { sql } from './connect';

export const createComment = cache(
  async (
    content: string,
    userId: number,
    studentId: number,
    postId: number,
  ) => {
    const [comment] = await sql<{ id: number; content: string }[]>`
      INSERT INTO comments
        (content, user_id, student_id, post_id)
      VALUES
         ${content}, ${userId}, ${studentId}, ${postId}
      RETURNING
        id,
        content
    `;
    return comment;
  },
);
