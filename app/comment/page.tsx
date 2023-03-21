// import './globals.scss';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { getCommentsByPostId } from '../../database/comments';
import { getPostsByUserId } from '../../database/posts';
import { getStudentBySessionToken } from '../../database/students';
import { getUserBySessionToken } from '../../database/users';
import Comments from './Comments';

// type Props = { params: { username: string } };
export const dynamic = 'force-dynamic';
// props: Props
export default async function CommentPage(props: Props) {
  // const user = await getUserByUsername(params.username);

  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);
  console.log(user);
  const posts = user && (await getPostsByUserId(user.id));
  console.log('posts from comment ', posts);
  const comments = posts && (await getCommentsByPostId(posts.id));
  const student = !sessionToken?.value
    ? undefined
    : await getStudentBySessionToken(sessionToken.value);
  console.log(student);
  // const comments = await getCommentsByPostId(1);
  // if (!user) {
  //   notFound();
  // }

  return (
    <main>
      <Comments />
      <p>{props.userId}</p>
      <p>{props.studentId}</p>
      <p>{props.postId}</p>
      <p>{props.content}</p>
      <p>{props.comments}</p>
      <Comments postId={posts?.id} comments={comments} />
      {/* <Comments comments={comments} /> */}

      {/* <Comments userId={user?.id} comments={comments} /> */}
      {/* <p> Post content: {posts?.content}</p> */}
      {/* <p>{post.title}</p> */}
    </main>
  );
}

// export default function Comments() {
//   return (
//     <div>
//       <h1>Comments</h1>
//     </div>
//   );
// }
