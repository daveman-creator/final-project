import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGradesByUserId } from '../../../../database/grades';
import {
  getStudents,
  getStudentsByGradeId,
} from '../../../../database/students';
import { getUserByUsername } from '../../../../database/users';
import Grades from '../Grades';
// import styles from './page.module.scss';
// import Grades from './Grades';
import Students from './Students';

type Props = { params: { username: string } };

export default async function StudentsPage({ params }: Props) {
  const user = await getUserByUsername(params.username);
  const grade = user && (await getGradesByUserId(user.id));
  const students = grade && (await getStudentsByGradeId(grade.id));

  if (!user) {
    notFound();
  }
  // className="flex flex-col items-center justify-center bg-indigo-100  h-screen md:max-w-screen-md lg:max-w-screen-lg"
  return (
    <main className="bg-indigo-100 flex flex-col items-center justify-content min-h-screen ">
      <h1 className="text-3xl text-gray-800 my-8 font-bold">
        Welcome {user.username}
      </h1>
      <p> Grade Name: {grade?.gradeName}</p>

      <Students gradeId={grade?.id} students={students} />

      <Link href={`/profile/${user.username}/post`}>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          {' '}
          Post Page
        </button>
      </Link>
      <Link href={`/profile/${user.username}`}>Back</Link>
    </main>
  );
}
