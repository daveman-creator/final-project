import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGradesByUserId } from '../../../database/grades';
import { getStudents, getStudentsByGradeId } from '../../../database/students';
import { getUserByUsername } from '../../../database/users';
import Grades from './Grades';
import styles from './page.module.scss';
import Students from './Students';

type Props = { params: { username: string } };

export default async function UserProfile({ params }: Props) {
  const user = await getUserByUsername(params.username);
  const grade = user && (await getGradesByUserId(user.id));
  const students = grade && (await getStudentsByGradeId(grade.id));

  if (!user) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <h1>Welcome {user.username}</h1>
      <p>id: {user.id} </p>
      <p>email: {user.email}</p>
      <p> Grade Name: {grade?.gradeName}</p>
      <p> Grade Code: {grade?.gradeCode}</p>
      {/* <p>{imageSrc && !uploadData}</p> */}
      <Image
        className={styles.Image}
        src="/image/Photo.png"
        width="80"
        height="80"
        alt="Classroom"
      />
      <br />
      <h1>Grades</h1>
      <Grades userId={user.id} />
      <br />
      {/* <Image
        src="/image/Teamwork.jpg"
        width="430"
        height="300"
        alt="Class Group Picture"
      /> */}
      <br />
      <Link href={`/profile/${user.username}/student`}>
        <button>Students Page</button>
      </Link>
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
