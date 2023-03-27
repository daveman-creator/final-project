import { cache } from 'react';
import { sql } from './connect';

export type Post = {
  id: number;
  title: string;
  content: string;
};

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
        content,
        created_at
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
  console.log('post from querry', post);
  return post;
});

export const getPostsByUserId = cache(async (userId: number) => {
  console.log('userId from querry', userId);
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
  console.log('post from querry', post);
  return post;
});
//  posts.user_id = ${userId}

export const updatePostById = cache(
  async (id: number, title: string, content: string) => {
    const [post] = await sql<{ id: number; title: string; content: string }[]>`
      UPDATE
        posts
      SET
        title = ${title},
        content = ${content}

      WHERE
        id = ${id}
      RETURNING *
    `;
    return post;
  },
);

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

export const getPostsByUserAndGrade = cache(
  async (currentUserId: number, targetUserId: number) => {
    const [post] = await sql<
      {
        id: number;
        title: string;
        content: string;
        userId: number;
        gradeId: number;
      }[]
    >`
  SELECT
  posts.id,
  posts.title,
  posts.content,
  posts.user_id,
  grades.id AS grade_id
FROM
  posts
  INNER JOIN users ON users.id = posts.user_id
 INNER JOIN grades ON grades.id = grades.user_id
  INNER JOIN students ON students.grade_id = grades.id
WHERE
// posts.id = 12;


  students.user_id = ${currentUserId}
  AND posts.user_id = ${targetUserId}
`;
    return post;
  },
);

export const getTeacherNameByStudentName = cache(
  async (studentFirstName: string, studentLastName: string) => {
    const [user] = await sql<{ userId: number; username: string }[]>`
  SELECT
  users.username,
   users.id As user_id
from
  users
INNER JOIN
  grades ON grades.user_id = users.id
INNER JOIN
  students ON students.grade_id = grades.id
WHERE
 students.first_name = ${studentFirstName} AND students.last_name = ${studentLastName};

  `;
    console.log('user from querry', user);
    return user;
  },
);
