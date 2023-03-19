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
    const [user] = await sql<{ id: number }[]>`
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

//   posts.id = ${id}
// posts.id = 12;
// students.grade_id = 1
// AND posts.user_id = 5
// -- SELECT
//    posts.id,
//    posts.title,
//    posts.content,
//    posts.user_id

//    FROM
//   posts
//    INNER JOIN
//    users ON users.id = posts.user_id
//    INNER JOIN
//    grades ON grades.id = grades.user_id
//    INNER JOIN
//    students ON students.grade_id = grades.id
//   WHERE
//   posts.id = 12`;
// -- // -- posts.grade_id = ${gradeId}
// -- // -- posts`;
// This function will insert a new row into the posts table with the given title, content, and userId. The userId parameter represents the ID of the user who created the post. The function then returns the newly created post with its id, title, and content.

// Note that the createPost function does not create a new user. It assumes that the user who created the post already exists in the users table and takes the userId parameter as input. You can use the createUser function (which you provided earlier) to create a new user if necessary.
