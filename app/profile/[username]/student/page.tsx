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
import styles from './page.module.scss';
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
    <main className={styles.main}>
      <h1 className={styles.h1}>Welcome {user.username}</h1>
      <p className={styles.h1}> Grade Name: {grade?.gradeName}</p>

      <Students gradeId={grade?.id} students={students} />

      <Link href={`/profile/${user.username}/post`}>
        <button className={styles.button}> Post Page</button>
      </Link>
      <Link className={styles.Link} href={`/profile/${user.username}`}>
        Back
      </Link>
    </main>
  );
}
