import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getGradesByUserId } from '../../../database/grades';
import { getStudents } from '../../../database/students';
// import { getStudentsByGradeId } from '../../../database/students';
import { getUserByUsername } from '../../../database/users';
import Grades from './Grades';
import Students from './Students';

type Props = { params: { username: string } };

export default async function UserProfile({ params }: Props) {
  const user = await getUserByUsername(params.username);
  const grade = user && (await getGradesByUserId(user.id));
  const students = await getStudents();
  // console.log('grade', grade);
  // const student = grade && (await getStudentsByGradeId(grade.id));
  // const grade = await get;
  // const grades = user await getGradesByUserId(user.id);

  if (!user) {
    notFound();
  }

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

      {/* <Students.props /> */}

      {/* <Students gradeId={grade?.id} /> */}

      <Students students={students} />
      {/* <Students userId={user.id} /> */}
      {/*  */}

      {/* <label>
        Create Class:
        <input value="class" placeholder="" />
      </label>
      <label>
        Generate Class Code:
        <input value="code" placeholder="" />
      </label>
      <br />
      <br />
      <button>Add Students</button> */}
    </>
  );
}
