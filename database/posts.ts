import { cache } from 'react';
import { sql } from './connect';

export const createPost = cache(
  async (title: string, content: string, userId: number) => {
    const [post] = await sql<{ id: number; title: string; content: string }[]>`
      INSERT INTO posts
        (title, content, user_id)
      VALUES
        (${title}, ${content}, ${userId})
      RETURNING
        id,
        title,
        content
    `;
    return post;
  },
);

export const getPostById = cache(async (id: number) => {
  const [post] = await sql<{ id: number; title: string; content: string }[]>`
    SELECT
      id,
      title,
      content
    FROM
      posts
    WHERE
      posts.id = ${id}
  `;
  return post;
});

export const getPostsByUserId = cache(async (userId: number) => {
  const post = await sql<{ id: number; title: string; content: string }[]>`
    SELECT
      id,
      title,
      content

    FROM
      posts
    WHERE
      user_id = ${userId}

  `;
  return post;
});
//  posts.user_id = ${userId}

export const deletePostById = cache(async (id: number) => {
  const [post] = await sql<{ id: number; title: string; content: string }[]>`
    DELETE FROM
    posts
    WHERE
      posts.id = ${id}
      RETURNING
        id,
        title,
        content
  `;
  return post;
});

// This function will insert a new row into the posts table with the given title, content, and userId. The userId parameter represents the ID of the user who created the post. The function then returns the newly created post with its id, title, and content.

// Note that the createPost function does not create a new user. It assumes that the user who created the post already exists in the users table and takes the userId parameter as input. You can use the createUser function (which you provided earlier) to create a new user if necessary.
