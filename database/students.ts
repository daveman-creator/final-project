import { cache } from 'react';
// import { string } from 'zod';
import { sql } from './connect';

export type Student = {
  id: number;
  firstName: string;
  lastName: string;
  // gradeId: number;
};

// getStudentsByTeacherId

// export const getStudentsByTeacherId = cache(async (username: string) => {
//   const [user] = await sql<{ id: number; username: string; email: string }[]>`
//     SELECT
//       id,
//       username,
//       email
//     FROM
//       users
//     WHERE
//       username = ${username}
//   `;
//   return user;
// });

// export const getStudentsByUserId = cache(async (userId: number) => {
//   const [student] = await sql<
//     { id: number; firstName: string; lastName: string; gradeId: number }[]
//   >`
//     SELECT
//       id,
//       first_name,
//       last_name,
//       grade_id
//     FROM
//       users
//     WHERE
//       user_id = ${userId}
//   `;
//   return student;
// });

// et students with user id

// export const getStudentsByGradeId = cache(async (gradeId: number) => {
//   const [student] = await sql<
//     { id: number; firstName: string; lastName: string; gradeId: number }[]
//   >`
//     SELECT
//       id,
//       first_name,
//       last_name,
//       grade_id
//     FROM
//       users
//     WHERE
//       grade_id = ${gradeId}
//   `;
//   return student;
// });
export const getStudents = cache(async () => {
  const students = await sql<Student[]>`
    SELECT
     *
    FROM
      students
  `;
  return students;
});

export const getStudentsByStudentId = cache(async (studentId: number) => {
  const [student] = await sql<
    { id: number; firstName: string; lastName: string }[]
  >`
    SELECT
      id,
      first_name,
      last_name
    FROM
      students
    WHERE
      id = ${studentId}
  `;
  return student;
});

export const createStudent = cache(
  async (firstName: string, lastName: string) => {
    const [student] = await sql<
      { id: number; firstName: string; lastName: string }[]
    >`
      INSERT INTO students
        (first_name, last_name)
      VALUES
        (${firstName}, ${lastName} )
      RETURNING
         *

    `;
    return student;
  },
);
// ${gradeId}, grade_id, gradeId: number; gradeId: number
