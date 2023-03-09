import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getGradesByUserId } from '../../../database/grades';
import { getStudentsByGradeId } from '../../../database/students';
import { getUserByUsername } from '../../../database/users';
import Grades from './Grades';
import Students from './Students';

type Props = { params: { username: string } };

export default async function UserProfile({ params }: Props) {
  const user = await getUserByUsername(params.username);
  const grade = user && (await getGradesByUserId(user.id));
  const students = grade && (await getStudentsByGradeId(grade.id));
  // console.log('grade', grade);

  // const students = await getStudents();
  console.log('students', students);
  if (!user) {
    notFound();
  }
  // if (!grade) {
  //   notFound();
  // }
  if (!students) {
    notFound();
  }

  // console.log('grade', grade);
  // const student = grade && (await getStudentsByGradeId(grade.id));
  // const grade = await get;
  // const grades = user await getGradesByUserId(user.id);

  return (
    <>
      <h1>{user.username}</h1>
      <p>id: {user.id} </p>
      <p>email: {user.email}</p>
      <p> Grade Name: {grade?.gradeName}</p>
      <p> Grade Code: {grade?.gradeCode}</p>
      <Image src="/image/Photo.png" width="80" height="80" alt="Classroom" />
      <br />
      <h1>Grades</h1>
      <Grades userId={user.id} />

      <Students gradeId={grade?.id} students={students} />
    </>
  );
}
