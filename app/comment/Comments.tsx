'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Comment = {
  id: number;
  content: string;
  userId: number;
  studentId: number;
  postId: number;
};
// | undefined;

type Props = {
  comments?: Comment[];
  // userId?: number;
  // studentId?: number;
  postId?: number;
};
// { userId: number }
export default function Comments(props: Props) {
  // const router = useRouter;
  // const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // const [comments, setComments] = useState<Comment[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [error, setError] = useState<string>();
  const [comments, setComments] = useState<Comment[]>([]);
  // const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();
  // console.log(props);
  console.log('props', props.comments);
  useEffect(() => {
    setComments(props.comments || []);
  }, [props.comments]);
  return (
    <main>
      {!showInput && (
        <button
          onClick={() => setShowInput(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded p-4 m-4"
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
                // userId: props.userId,
                // studentId: props.studentId,
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
              className="block w-full mt-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 py-40"
              value={content}
              name="content"
              onChange={(event) => setContent(event.currentTarget.value)}
            >
              Content
            </textarea>
          </label>

          <button className="mt-2 py-2 px-4 mr-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded">
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
          <div key={comment.id} className="mb-4">
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

              <button
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
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

// import { useEffect, useState } from 'react';

// type Comment = {
//   id: number;
//   postId: number;
//   content: string;
// };

// export default function Comments(props: { posts?: { id: number }[] }) {
//   const [newComment, setNewComment] = useState('');
//   const [error, setError] = useState<string>();
//   const [comments, setComments] = useState<Comment[]>([]);

//   useEffect(() => {
//     async function fetchComments(postId: number) {
//       const response = await fetch(`/api/post/${postId}/comments`);
//       const data = await response.json();
//       if (!data.error) {
//         setComments(data);
//       }
//     }

//     props.posts?.forEach((post) => fetchComments(post.id));
//   }, [props.posts]);

//   return (
//     <div>
//       {props.posts?.map((post) => (
//         <div key={post.id}>
//           <h1>{post.title}</h1>
//           <p>{post.content}</p>

//           {/* Render the comments */}
//           <ul>
//             {comments
//               .filter((comment) => comment.postId === post.id)
//               .map((comment) => (
//                 <li key={comment.id}>{comment.content}</li>
//               ))}
//           </ul>

//           {/* Add a new comment */}
//           <form
//             onSubmit={async (event) => {
//               event.preventDefault();

//               const response = await fetch(`/api/post/${post.id}/comments`, {
//                 method: 'POST',
//                 body: JSON.stringify({
//                   content: newComment,
//                 }),
//               });

//               const data = await response.json();

//               if (data.error) {
//                 setError(data.error);
//                 return;
//               }

//               setComments([...comments, data]);
//               setNewComment('');
//             }}
//           >
//             <label>
//               Add a comment:
//               <input
//                 value={newComment}
//                 onChange={(event) => setNewComment(event.currentTarget.value)}
//               />
//             </label>
//             <button type="submit">Submit</button>
//           </form>

//           <button onClick={/* delete the post */}>Delete</button>
//           <button onClick={/* edit the post */}>Edit</button>
//         </div>
//       ))}
//     </div>
//   );
// }
