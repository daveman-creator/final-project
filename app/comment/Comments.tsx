'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Comment = {
  id: number;
  content: string;
  // userId: number;
  // studentId: number;
  // postId: number;
};
// | undefined;

type Props = {
  comments?: Comment[];

  postId?: number;
};

export default function Comments(props: Props) {
  const [content, setContent] = useState('');

  const [showInput, setShowInput] = useState(false);
  const [error, setError] = useState<string>();
  const [comments, setComments] = useState<Comment[]>([]);

  const router = useRouter();
  console.log('error', error);
  console.log('props', props.comments);
  useEffect(() => {
    setComments(props.comments || []);
  }, [props.comments]);
  return (
    <main>
      {!showInput && (
        <button
          onClick={() => setShowInput(true)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded p-4 m-4"
        >
          Tab to add a comment
        </button>
      )}
      {showInput && (
        <form
          className="p-4"
          onSubmit={async (event) => {
            event.preventDefault();

            const response = await fetch('/api/comment', {
              method: 'POST',
              body: JSON.stringify({
                postId: props.postId,
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
          <label className="font-bold text-lg mb-2">
            Comment Content:
            <textarea
              className="block w-full mt-2 rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 py-40"
              value={content}
              name="content"
              onChange={(event) => setContent(event.currentTarget.value)}
            >
              Content
            </textarea>
          </label>

          <button className="mt-2 py-2 px-4 mr-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded">
            Add a Comment
          </button>
          <button
            onClick={() => setShowInput(false)}
            className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            X
          </button>
        </form>
      )}

      <div className="p-4">
        {comments.map((comment) => (
          <div key={`comment-${comment.id}`} className="mb-4">
            {/* <h1>{post.title}</h1> */}
            <p className="text-lg">{comment.content}</p>

            <div className="mt-2 flex">
              <button
                className="mr-2 px-3 py-1 rounded-lg bg-red-500 text-white"
                onClick={async () => {
                  const response = await fetch(`/api/comments/${comment.id}`, {
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

              {/* <button
                className="px-3 py-1 rounded-lg bg-green-500 text-white"
                onClick={async () => {
                  const response = await fetch(`/api/comments/${comment.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
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
                Save
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
