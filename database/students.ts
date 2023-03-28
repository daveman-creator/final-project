import { cache } from 'react';
import { sql } from './connect';

export type Student = {
  id: number;
  firstName: string;
  lastName: string;
  gradeId: number;
};

export const getStudentBySessionToken = cache(async (token: string) => {
  const [student] = await sql<
    { id: number; firstName: string; lastName: string }[]
  >`
    SELECT
      students.id,
      students.first_name,
      students.last_name

    FROM
      students
    INNER JOIN
      sessions ON (
        sessions.token = ${token} AND
        sessions.student_id = students.id AND
        sessions.expiry_timestamp > now()
      )
  `;
  return student;
});

export const getStudentByGradeCode = cache(
  async (
    gradeCode: string,
    studentFirstName: string,
    studentLastName: string,
  ) => {
    const [student] = await sql<
      { id: number; firstName: string; lastName: string; gradeCode: string }[]
    >`
    SELECT
    students.id,
    students.first_name,
    students.last_name,
    grades.grade_code,
    students.grade_id



    FROM
      students
    INNER JOIN
      grades ON (
        grades.grade_code = ${gradeCode} AND
        grades.id = students.grade_id

      ) WHERE students.first_name = ${studentFirstName} AND students.last_name = ${studentLastName}
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
  },
);
