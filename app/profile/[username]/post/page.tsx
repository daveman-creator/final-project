// import './globals.scss';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import {
  getPostByPostId,
  getPostsByUserId,
  getTeacherNameByStudentName,
} from '../../../../database/posts';
import { getStudentBySessionToken } from '../../../../database/students';
import {
  getUserBySessionToken,
  getUserByUsername,
} from '../../../../database/users';
import Comments from '../../../comment/Comments';
import styles from './page.module.scss';
import Posts from './Posts';

// type Props = { params: { username: string } };
export const dynamic = 'force-dynamic';

export default async function PostPage(props: Props) {
  // const user = await getUserByUsername(params.username);
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  // const student = 'ggg';
  // console.log('sessionToken', sessionToken);

  const student = !sessionToken?.value
    ? undefined
    : await getStudentBySessionToken(sessionToken.value);
  console.log('student', student);

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);
  console.log('user', user);

  const teacher = await getTeacherNameByStudentName(
    student?.firstName,
    student?.lastName,
  );
  console.log('teacher', teacher);
  let posts;

  if (user) {
    posts = await getPostsByUserId(user.id);
    console.log('posts', posts);
  }
  if (teacher) {
    posts = await getPostsByUserId(teacher.userId);
    console.log('posts', posts);
  }

  // posts = user && (await getPostsByUserId(user.id));
  // console.log('posts', posts);

  // const student = !sessionToken?.value
  //   ? undefined
  //   : await getStudentBySessionToken(sessionToken.value);
  // console.log(student);

  // const post = posts && (await getPostByPostId(posts.id));
  // console.log(post.id);
  // const post = await getPostsByUserId(user.id);
  // console.log(user);

  // if (!user) {
  //   notFound();
  // }

  return (
    <main>
      <Posts userId={user?.id} posts={posts} />
      <Comments />
      {/* <p> Post content: {posts?.content}</p> */}
      {/* <p>{post.title}</p> */}
    </main>
  );
}
