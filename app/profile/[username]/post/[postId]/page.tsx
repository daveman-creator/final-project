import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCommentsByPostId } from '../../../../../database/comments';
import { getPostById } from '../../../../../database/posts';
import Comments from './Comments';

export const dynamic = 'force-dynamic';

export async function SinglePostPage(props: Props) {
  const singlePost = await getPostById(parseInt(props.params.postId));
  if (!singlePost) {
    notFound();
  }
}

type Props = {
  username: any;
  content: string;
  comments: string;
  params: {
    postId: string;
  };
};

export default async function PostPage(props: Props) {
  const singlePost = await getPostById(parseInt(props.params.postId));

  if (!singlePost) {
    notFound();
  }
  const comments = await getCommentsByPostId(singlePost.id);
  console.log('comments in post', comments);

  // text-lg
  return (
    <div>
      <div className="bg-indigo-100 min-h-screen p-4">
        <h1 className="text-5xl font-bold mb-2 text-center p-6">Posts</h1>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 border border-gray-300">
          <p className="text-4xl font-bold mb-2 p-3 m-4">{singlePost.title}</p>
          <p className=" text-2xl mb-4 p-3 m-4">{singlePost.content}</p>

          <Comments comments={comments} postId={singlePost.id} />
        </div>
        <div className="p-2 m-1">
          <Link
            href={`/profile/${props.username}/post`}
            className="text-black-500 text-2xl hover:text-green-700 absolute top-40 left-0  p-4"
          >
            {' '}
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
