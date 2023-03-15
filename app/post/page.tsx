// import './globals.scss';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { getPostByPostId, getPostsByUserId } from '../../database/posts';
import { getUserBySessionToken, getUserByUsername } from '../../database/users';
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
  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  const posts = user && (await getPostsByUserId(user.id));
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
      {/* <p> Post content: {posts?.content}</p> */}
      {/* <p>{post.title}</p> */}
    </main>
  );
}
