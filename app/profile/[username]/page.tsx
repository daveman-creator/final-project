import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGradesByUserId } from '../../../database/grades';
import { getUserByUsername } from '../../../database/users';
import Grades from './Grades';

type Props = { params: { username: string } };

export default async function UserProfile({ params }: Props) {
  const user = await getUserByUsername(params.username);
  const grade = user && (await getGradesByUserId(user.id));
  // const students = grade && (await getStudentsByGradeId(grade.id));

  if (!user) {
    notFound();
  }
  // className=" font-bold text-4xl  mt-10 mb-10"
  return (
    <main className="bg-indigo-100 flex flex-col items-center justify-content min-h-screen">
      <h1 className="text-3xl text-gray-800 my-8 font-bold mt-20 md:text-5xl flex items-center justify-content">
        Welcome {user.username}
      </h1>

      <p className="text-lg font-bold mt-">Email: {user.email}</p>
      <div className="flex flex-row flex-wrap justify-content-center border border-green-500 p-5">
        <p className=" font-medium mr-4 text-2xl my-1 ">
          {' '}
          Grade Name: {grade?.gradeName}
        </p>
        <p className="text-2xl font-medium my-1">
          {' '}
          Grade Code: {grade?.gradeCode}
        </p>
      </div>

      <div className="flex flex-col flex items-center justify-content my-1 ">
        <Grades userId={user.id} />

        <Link
          href={`/profile/${user.username}/student`}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 my-1 absolute top-0 right-0 p-5 mt-40 mr-5 "
        >
          {' '}
          <button className="focus:outline-none mt-19 "> Tap Here </button>
        </Link>
      </div>
    </main>
  );
}
// margin: '20px auto 0', display: 'block' position: 'absolute', top: 0, right: 0  position: 'absolute', style={{ marginTop: '-500px' }}
