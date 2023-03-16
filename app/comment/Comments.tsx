'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
  userId?: number;
  studentId?: number;
  postId?: number;
};
// { userId: number }
export default function Posts(props: Props) {
  // const router = useRouter;
  // const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [error, setError] = useState<string>();
  // const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();
  // console.log(props);

  return (
    <main>
      {!showInput && <button onClick={() => setShowInput(true)}>Create</button>}
      {showInput && (
        <form
          onSubmit={async (event) => {
            event.preventDefault();

            const response = await fetch('/api/comment', {
              method: 'POST',
              body: JSON.stringify({
                userId: props.userId,
                studentId: props.studentId,
                postId: props.postId,
                content,
              }),
            });

            // const data: PostsResponseBody = await response.json();

            // if ('errors' in data) {
            //   setErrors(data.errors);
            //   return;
            // }

            const data = await response.json();
            if (data.error) {
              setError(data.error);
              return;
            }

            router.refresh();
          }}
        >
          <label>
            Comment Content:
            <textarea
              value={content}
              name="content"
              onChange={(event) => setContent(event.currentTarget.value)}
            >
              Content
            </textarea>
            {/* <input
              value={postContent}
              placeholder="Post Content"
              onChange={(event) => setPostContent(event.currentTarget.value)} */}
          </label>
          <button>Create</button>
          <br />
        </form>
      )}

      <div>
        {props.comments?.map((comment) => (
          <div key={comment.id}>
            {/* <h1>{post.title}</h1> */}
            <p>{comment.content}</p>

            <button
              onClick={async () => {
                const response = await fetch(`/api/comment/${comment.id}`, {
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
              onClick={async () => {
                const response = await fetch(`/api/comment/${comment.id}`, {
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
