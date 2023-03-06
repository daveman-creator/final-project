import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getUserByUsername } from '../../../database/users';
import TeacherInput from './TeacherInput';

type Props = { params: { username: string } };

export default async function UserProfile({ params }: Props) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  return (
    <>
      <h1>{user.username}</h1>
      <p>id: {user.id} </p>
      <p>email: {user.email}</p>
      <Image src="/image/Photo.png" width="80" height="80" alt="Classroom" />
      <br />
      <TeacherInput students={students} />

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
