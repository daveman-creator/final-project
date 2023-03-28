'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './page.module.scss';

type Post = {
  id: number;
  title: string;
  content: string;
  userId: number;
};
// | undefined;

type Props = {
  username: any;
  posts?: Post[];
  userId?: number;
  // comments?: Comment[];
};
// { userId: number }
export default function Posts(props: Props) {
  // const router = useRouter;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [error, setError] = useState<string>();
  // const [comments, setComments] = useState<Comment[]>([]);
  // const [postId, setPostId] = useState<number>(0);
  // const [hideInput, setHideInput] = useState(false);
  // const [idOnEditMode, setIdOnEditMode] = useState<number>();
  // const [editTitle, setEditTitle] = useState<string>('');
  // const [editContent, setEditContent] = useState<string>('');
  // const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();
  console.log('error', error);

  return (
    <main>
      <div className=" p-4">
        {!showInput && (
          <button
            onClick={() => setShowInput(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create
          </button>
        )}
        {showInput && (
          <form
            className={styles.form}
            onSubmit={async (event) => {
              event.preventDefault();

              const response = await fetch('/api/post', {
                method: 'POST',
                body: JSON.stringify({
                  userId: props.userId,
                  title,
                  content,
                }),
              });

              const data = await response.json();
              if (data.error) {
                setError(data.error);
                return;
              }

              router.refresh();
            }}
          >
            <div className="flex flex-col">
              <label className="font-bold text-lg mb-2 ">
                Post Title:
                <input
                  className="border border-gray-400 rounded px-3 py-2 mb-3"
                  value={title}
                  placeholder="title"
                  onChange={(event) => setTitle(event.currentTarget.value)}
                />
              </label>
            </div>
            <div className="flex flex-col">
              {/* <button>Create</button> */}
              <label className="font-bold text-lg mb-2">
                Post Content:
                {/* className="border border-gray-400 rounded px-60 mb-3" */}
                <textarea
                  className="block w-full mt-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 py-40 "
                  value={content}
                  name="content"
                  onChange={(event) => setContent(event.currentTarget.value)}
                >
                  Content
                </textarea>
              </label>
            </div>
            <div className="flex justify-end">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                Create
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowInput(false)}
              >
                X
              </button>
            </div>

            <br />
          </form>
        )}
      </div>

      <div className="space-y-4">
        {props.posts?.map((post) => {
          console.log('Running Javascript here is possible');

          return (
            <div key={`post-${post.id}`} className="border border-gray-300 p-4">
              <h1 className="text-5xl font-bold text-center">{post.title}</h1>
              <p className="text-gray-600 text-2xl">{post.content}</p>
              {/* <Comments comments={props.comments} postId={post.id} /> */}
              <div className="flex justify-between items-center">
                <Link
                  href={`/profile/${props.username}/post/${post.id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  {' '}
                  Click To Comment on Post
                </Link>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  onClick={async () => {
                    const response = await fetch(`/api/posts/${post.id}`, {
                      method: 'DELETE',
                    });

                    const data = await response.json();
                    if (data.error) {
                      setError(data.error);
                      return;
                    }

                    router.refresh();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
