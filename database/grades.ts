import { cache } from 'react';
import { sql } from './connect';

type Grade = {
  id: number;
  userId: number;
  imageUrl: string;
  gradeName: string;
  gradeCode: string;
};

// export const getImageById = cache(async (Id: number) => {
//   const image = await sql<{ id: number; imageUrl: string }[]>`
//     SELECT
//       id,
//       image_url
//     FROM
//       images
//     WHERE
//       id = ${Id}
//   `;
//   return image;
// });

export const getGradesByUserId = cache(async (userId: number) => {
  const [grade] = await sql<
    { id: number; userId: number; gradeName: string; gradeCode: string }[]
  >`
    SELECT
      id,
      user_id,
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
  const [grade] = await sql<
    { id: number; userId: number; gradeName: string; gradeCode: string }[]
  >`
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
