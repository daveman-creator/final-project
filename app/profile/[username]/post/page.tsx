// import './globals.scss';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { getCommentsByPostId } from '../../../../database/comments';
import { getGradesByUserId } from '../../../../database/grades';
import {
  getPostById,
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
type Props = { params: { username: string } };
export default async function PostPage({ params }: Props) {
  // const user = await getUserByUsername(params.username);
  // const grade = user && (await getGradesByUserId(user.id));
  console.log('params', params);
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

  const grade = user && (await getGradesByUserId(user.id));

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
    posts = await getPostsByUserId(teacher.id);
    console.log('posts', posts);
  }
  console.log('post', posts);
  // console.log('postId', postId);
  const comments = await getCommentsByPostId(posts.id);
  // posts = user && (await getPostsByUserId(user.id));
  // console.log('posts', posts);
  console.log('comments in post', comments);
  // const post = await getPostById(posts?.id);

  // console.log('post again', post);
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
    <main className={styles.main}>
      <h1 className={styles.h1}>Posts</h1>
      <p className={styles.p}> {grade?.gradeName}</p>
      <Posts
        userId={user?.id}
        posts={posts}
        comments={comments}
        username={params.username}
      />

      {/* <Comments postId={posts?.id} comments={comments} /> */}

      {/* <Comments userId={user?.id} comments={comments} /> */}
      {/* <Comments postId={posts.id} /> */}
      {/* <Comments /> */}
      {/* <p> Post content: {posts?.content}</p> */}
      {/* <p>{post.title}</p> */}
      {/* <Link className={styles.Link} href={`/profile/${user.username}/student`}>
        Back
      </Link> */}
    </main>
  );
}
