// import './globals.scss';
import { cookies } from 'next/headers';
import { getGradesByUserId } from '../../../../database/grades';
import {
  getPostsByUserId,
  getTeacherNameByStudentName,
} from '../../../../database/posts';
import { getStudentBySessionToken } from '../../../../database/students';
import { getUserBySessionToken } from '../../../../database/users';
import Posts from './Posts';

export const dynamic = 'force-dynamic';

type Props = { params: { username: string } };

export default async function PostPage({ params }: Props) {
  // console.log('params', params);
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session

  const student = !sessionToken?.value
    ? undefined
    : await getStudentBySessionToken(sessionToken.value);
  // console.log('student', student);

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);
  // console.log('user', user);

  const grade = user && (await getGradesByUserId(user.id));

  const teacher = await getTeacherNameByStudentName(
    student?.firstName,
    student?.lastName,
  );
  // console.log('teacher from post', teacher);

  let posts = null;
  console.log('student from post', student);
  console.log('teacher from post', teacher?.userId);
  // if (student && teacher) {
  //   posts = await getPostsByUserId(teacher.userId);
  //   // console.log('posts from post for student', posts);
  // } else if (teacher) {
  //   posts = await getPostsByUserId(teacher.userId);
  //   // console.log('posts for teachers', posts);
  // } else {
  //   return null;
  // }
  // if (student && teacher) {
  //   posts = await getPostsByUserId(teacher.userId);
  //   // console.log('posts from post for student', posts);
  // } else {
  //   posts = await getPostsByUserId(teacher?.userId);
  //   // console.log('posts for teachers', posts);
  // }

  if (user) {
    posts = await getPostsByUserId(user.id);
    console.log('posts', posts);
  }
  if (student && teacher) {
    posts = await getPostsByUserId(teacher.userId);
    console.log('posts', posts);
  }
  console.log('post', posts);
  console.log('posts for current user ', posts);

  return (
    <main className="bg-indigo-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-center ">Posts</h1>
      <p className="text-lg mb-4 text-center">Grade Name: {grade?.gradeName}</p>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <Posts userId={user?.id} posts={posts} username={params.username} />
      </div>
    </main>
  );
}
