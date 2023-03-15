import { cache } from 'react';
import Students from '../app/profile/[username]/Students';
// import { string } from 'zod';
import { sql } from './connect';

export type Student = {
  id: number;
  firstName: string;
  lastName: string;
  gradeId: number;
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

// export const getSByUsernameWithPasswordHash = cache(
//   async (username: string) => {
//     const [user] = await sql<User[]>`
//     SELECT
//       *
//     FROM
//       users
//     WHERE
//       username = ${username}
//   `;
//     return user;
//   },
// );
// sql<Student[]>`

// export const getUserBySessionToken = cache(async (token: string) => {
//   const [user] = await sql<{ id: number; username: string }[]>`
//     SELECT
//       users.id,
//       users.username
//     FROM
//       users
//     INNER JOIN
//       sessions ON (
//         sessions.token = ${token} AND
//         sessions.user_id = users.id AND
//         sessions.expiry_timestamp > now()
//       )
//   `;
//   return user;
// });

export const getStudentByGradeCode = cache(
  async (gradeCode: string, studentFirstName: string) => {
    const [student] = await sql<
      { id: number; firstName: string; lastName: string; gradeCode: string }[]
    >`
    SELECT
    students.first_name,
    students.last_name,
    grades.grade_code

    FROM
      students
    INNER JOIN
      grades ON (
        grades.grade_code = ${gradeCode} AND
        grades.id = students.grade_id

      ) WHERE students.first_name = ${studentFirstName}
  `;
    return student;
  },
);
// students.grade_id = grades.id
export const getStudentByFirstNameAndLastNameWithGradeCode = cache(
  async (firstName: string, lastName: string, gradeCode: string) => {
    const [student] = await sql<
      { id: number; firstName: string; lastName: string; gradeCode: string }[]
    >`
      SELECT
        id,
        first_name,
        last_name,
        grade_code
      FROM
        students
      WHERE
        first_name = ${firstName}
        AND last_name = ${lastName}
        AND grade_id = ${gradeCode}
    `;
    return student;
  },
);

export const getStudentsByGradeId = cache(async (gradeId: number) => {
  const students = await sql<Student[]>`
    SELECT
      *
    FROM
      students
      WHERE
      grade_id = ${gradeId}
  `;
  return students;
});

// export const getStudents = cache(async () => {
//   const [student] = await sql<Student[]>`
//     SELECT
//       *
//     FROM
//       students
//   `;
//   return student;
// });

// export const getStudentsByStudentId = cache(async (studentId: number) => {
//   const [student] = await sql<
//     { id: number; firstName: string; lastName: string; gradeId: number }[]
//   >`
//     SELECT
//       id,
//       first_name,
//       last_name,
//       grade_id
//     FROM
//       students
//     WHERE
//       id = ${studentId}
//   `;
//   return student;
// });

export const updateStudentById = cache(
  async (id: number, firstName: string, lastName: string, gradeId: number) => {
    const [student] = await sql<Student[]>`
      UPDATE
        students
      SET
        first_name = ${firstName},
        last_name = ${lastName},
        grade_id = ${gradeId}
      WHERE
        id = ${id}
      RETURNING *
    `;
    return student;
  },
);

export const deleteStudentById = cache(async (id: number) => {
  const [student] = await sql<Student[]>`
    DELETE FROM
      students
    WHERE
      id = ${id}
    RETURNING *
  `;
  return student;
});

export const getStudentById = cache(async (id: number) => {
  const [student] = await sql<Student[]>`
    SELECT
      *
    FROM
      students
    WHERE
      id = ${id}
  `;
  return student;
});

export const getStudents = cache(async () => {
  const students = await sql<Student[]>`
    SELECT * FROM students
  `;

  return students;
});

export const createStudent = cache(
  async (firstName: string, lastName: string, gradeId: number) => {
    const [student] = await sql<
      { id: number; firstName: string; lastName: string; gradeId: number }[]
    >`
      INSERT INTO students
        (first_name, last_name, grade_id)
      VALUES
        (${firstName}, ${lastName}, ${gradeId})
      RETURNING
         *

    `;
    if (student) {
      return student;
    } else {
      throw new Error('Unable to create student');
    }
    // return student;
  },
);

// SELECT
// students.first_name,
// students.last_name,
// grades.grade_code

// FROM
//   students
// INNER JOIN
//   grades ON (
//     grades.grade_code = 'Thanks5' AND
//     grades.id = students.grade_id ) AND
//     Students.first_name = 'Frank';
