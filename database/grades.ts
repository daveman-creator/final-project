import { cache } from 'react';
import { sql } from './connect';

type Grade = {
  id: number;
  userId: number;
  imageUrl: string;
  gradeName: string;
  gradeCode: string;
};

export const getImagesByGradeId = cache(async (gradeId: number) => {
  const [images] = await sql<
    { id: number; gradeId: number; imageUrl: string }[]
  >`
    SELECT
      id,
      image_url
    FROM
      grades
    WHERE
      grade_id = ${gradeId}
  `;
  return images;
});

export const getGrades = cache(async () => {
  const grades = await sql<Grade[]>`
    SELECT
    *
    FROM
      grades
  `;
  return grades;
});

export const getGradesByUserId = cache(async (userId: number) => {
  const [grade] = await sql<
    {
      id: number;
      userId: number;
      gradeName: string;
      gradeCode: string;
      imageUrl: string;
    }[]
  >`
    SELECT
      id,
      user_id,
      image_url,
      grade_name,
      grade_code
    FROM
      grades
    WHERE
      user_id = ${userId}
  `;
  return grade;
});

export const getGradeById = cache(async (gradeId: number) => {
  const [grade] = await sql<Grade[]>`
    SELECT
      id,
      user_id,
      grade_name,
      grade_code
    FROM
      grades
    WHERE
      id = ${gradeId}
  `;
  return grade;
});

export const createGrade = cache(
  async (
    userId: number,
    imageUrl: string,
    gradeName: string,
    gradeCode: string,
  ) => {
    const [grade] = await sql<
      {
        id: number;
        userId: number;
        imageUrl: string;
        gradeName: string;
        gradeCode: string;
      }[]
    >`
      INSERT INTO grades
        (user_id, image_url,grade_name, grade_code)
      VALUES
        (${userId}, ${imageUrl}, ${gradeName}, ${gradeCode})
      RETURNING
          *

    `;
    return grade;
  },
);
