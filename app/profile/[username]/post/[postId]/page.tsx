import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCommentsByPostId } from '../../../../../database/comments';
import { getPostById } from '../../../../../database/posts';
import Comments from '../../../../comment/Comments';

export const dynamic = 'force-dynamic';

export async function SinglePostPage(props: Props) {
  const singlePost = await getPostById(parseInt(props.params.postId));
  if (!singlePost) {
    notFound();
  }
}

type Props = {
  params: {
    postId: string;
  };
};

export default async function PostPage(props: Props) {
  const singlePost = await getPostById(parseInt(props.params.postId));
  const comments = await getCommentsByPostId(singlePost.id);
  console.log('comments in post', comments);

  if (!singlePost) {
    notFound();
  }
  // text-lg
  return (
    <div className="border border-gray-400 rounded-lg p-4 m-4">
      <div className="bg-indigo-100 min-h-screen">
        <h1 className="text-5xl font-bold mb-2 text-center p-6">Posts</h1>
        <p className="text-4xl font-bold mb-2 p-3 m-4">{singlePost.title}</p>
        <p className=" text-2xl mb-4 p-3 m-4">{singlePost.content}</p>

        <Comments comments={comments} postId={singlePost.id} />
        <div className="p-2 m-1">
          <Link
            href={`/profile/${props.username}/post`}
            className="text-blue-500 hover:text-blue-700"
          >
            {' '}
            Back To Post
          </Link>
        </div>
      </div>
    </div>
  );
}
