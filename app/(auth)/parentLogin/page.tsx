import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';
import {
  getPostsByUserId,
  getTeacherNameByStudentName,
} from '../../../database/posts';
import { getStudentBySessionToken } from '../../../database/students';
import { getUserBySessionToken } from '../../../database/users';
import ParentLoginForm from './ParentLoginForm';

console.log('running');

type Props = {
  searchParams: { returnTo?: string | string[]; username: string };
};

export default async function ParentLoginPage(props: Props) {
  // check if I have a valid session
  // const sessionTokenCookie = cookies().get('sessionToken');
  // const session =
  //   sessionTokenCookie &&
  //   (await getValidSessionByToken(sessionTokenCookie.value));

  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const student = !sessionToken?.value
    ? undefined
    : await getStudentBySessionToken(sessionToken.value);
  console.log('student login', student);

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);
  console.log('user', user);

  // if (!student) {
  //   redirect('/studentLogin');
  // }
  const teacher = await getTeacherNameByStudentName(
    student?.firstName || '',
    student?.lastName || '',
  );
  console.log('teacher backend', teacher?.username);

  let posts;

  if (user) {
    posts = await getPostsByUserId(user.id);
    console.log('posts', posts);
  }
  if (student && teacher) {
    posts = await getPostsByUserId(teacher.userId);
    console.log('posts', posts);
  }
  // if (student && teacher) {
  //   posts = await getPostsByUserId(teacher.userId);
  //   // console.log('posts from post for student', posts);
  // } else {
  //   posts = await getPostsByUserId(teacher?.userId);
  //   // console.log('posts for teachers', posts);
  // }
  console.log('post', posts);

  // if I do, redirect to the profile page
  // if (session) {
  //   redirect('/studentLogin');
  //   // redirect('/profile/[username]');
  // }

  console.log('teacher here', user);
  return (
    <div className=" flex flex-col items-center justify-content min-h-screen mb-12 bg-fixed bg-center bg-cover bg-indigo-100">
      <ParentLoginForm
        returnTo={props.searchParams.returnTo}
        username={teacher?.username}
      />
    </div>
  );
}
