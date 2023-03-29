// import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGradesByUserId } from '../../../../database/grades';
import { getStudentsByGradeId } from '../../../../database/students';
import { getUserByUsername } from '../../../../database/users';
// import Grades from '../Grades';
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

  return (
    <main className="bg-indigo-100 flex flex-col items-center justify-content min-h-screen ">
      <h1 className="text-3xl text-gray-800 my-8 font-bold mt-20">
        Welcome {user.username}
      </h1>
      <p> Grade Name: {grade?.gradeName}</p>

      <Students gradeId={grade?.id} students={students} />

      <Link
        href={`/profile/${user.username}/post`}
        className="absolute top-30 right-0 m-4"
      >
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
          {' '}
          Post Page
        </button>
      </Link>
      <Link
        href={`/profile/${user.username}`}
        className="absolute top-30 left-0 m-4"
      >
        Back
      </Link>
    </main>
  );
}
