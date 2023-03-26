import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGradesByUserId } from '../../../database/grades';
import { getStudents, getStudentsByGradeId } from '../../../database/students';
import { getUserByUsername } from '../../../database/users';
import Grades from './Grades';

// import styles from './page.module.scss';
// import Students from './Students';

type Props = { params: { username: string } };

export default async function UserProfile({ params }: Props) {
  const user = await getUserByUsername(params.username);
  const grade = user && (await getGradesByUserId(user.id));
  const students = grade && (await getStudentsByGradeId(grade.id));

  if (!user) {
    notFound();
  }

  return (
    <main
      className="bg-indigo-100 flex flex-col items-center justify-content min-h-screen"
      //   className="
      //   min-h-screen mb-12 bg-fixed bg-cover bg-center text-lg"
    >
      <h1 className="flex items-center justify-content font-bold text-4xl md:text-5xl mt-10 mb-10">
        Welcome {user.username}
      </h1>
      {/* <p>id: {user.id} </p> */}
      <p className="text-lg font-bold mt-">Email: {user.email}</p>
      <div className="flex flex-row border border-blue-500 p-5">
        <p className=" font-medium mr-4 text-2xl ">
          {' '}
          Grade Name: {grade?.gradeName}
        </p>
        <p className="text-2xl font-medium "> Grade Code: {grade?.gradeCode}</p>
      </div>
      {/* <h1>Grades</h1> */}
      <div className="flex flex-col flex items-center justify-content my-1">
        <Grades userId={user.id} />

        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 my-1 "
          href={`/profile/${user.username}/student`}
        >
          <button className="focus:outline-none mt-19 ">Students Page</button>
        </Link>
      </div>
    </main>
  );
}
// if (!grade) {
//   notFound();
// }
// if (!students) {
//   notFound();
// }

// console.log('grade', grade);
// const student = grade && (await getStudentsByGradeId(grade.id));
// const grade = await get;
// const grades = user await getGradesByUserId(user.id);
// className={styles.main}
// console.log('grade', grade);
// let students;
// if (grade) {
//   students = await getStudentsByGradeId(grade.id);
// }

// const students = await getStudents();
// console.log('students', students);
