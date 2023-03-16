// import './globals.scss';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { getUserBySessionToken } from '../../database/users';
import Comments from './Comments';

// type Props = { params: { username: string } };
export const dynamic = 'force-dynamic';

export default async function PostPage(props: Props) {
  // const user = await getUserByUsername(params.username);
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  // const user = !sessionToken?.value
  //   ? undefined
  //   : await getUserBySessionToken(sessionToken.value);
  // // console.log(user);
  // const posts = user && (await getPostsByUserId(user.id));

  // const student = !sessionToken?.value
  //   ? undefined
  //   : await getStudentBySessionToken(sessionToken.value);
  // console.log(student);

  // if (!user) {
  //   notFound();
  // }

  return (
    <main>
      <Comments/>
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
