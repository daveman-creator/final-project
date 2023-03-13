'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PostsResponseBody } from '../api/post/route';

type Post = {
  id: number;
  title: string;
  content: string;
  userId: number;
};
// | undefined;

type Props = {
  posts?: Post[];
  userId?: number;
};
// { userId: number }
export default function Posts(props: Props) {
  // const router = useRouter;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [error, setError] = useState<string>();
  // const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();
  // console.log(props);

  return (
    <>
      {!showInput && <button onClick={() => setShowInput(true)}>Create</button>}
      {showInput && (
        <form
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
            Post Title:
            <input
              value={title}
              placeholder="title"
              onChange={(event) => setTitle(event.currentTarget.value)}
            />
          </label>
          {/* <button>Create</button> */}
          <label>
            Post Content:
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
        {props.posts?.map((post) => (
          <div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.content}</p>

            <button
              onClick={async () => {
                const response = await fetch(`/api/post/${post.id}`, {
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
                const response = await fetch(`/api/post/${post.id}`, {
                  method: 'PATCH',
                  body: JSON.stringify({
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
              Edit
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

// const handleDeletePost = async (postId: number) => {
//     const response = await fetch(`/api/post/${postId}`, {
//       method: 'DELETE',
//     });

//     const data = await response.json();
//     if (data.error) {
//       setError(data.error);
//       return;
//     }

//     router.refresh();
//   };

//   const handleEditPost = async (postId: number, updatedPost: Post) => {
//     const response = await fetch(`/api/post/${postId}`, {
//       method: 'PATCH',
//       body: JSON.stringify(updatedPost),
//     });

//     const data = await response.json();

//     if (data.error) {
//       setError(data.error);
//       return;
//     }

//     router.refresh();
//   };

// <button onClick={() => handleDeletePost(post.id)}>Delete</button>
// <button
//   onClick={() =>
//     handleEditPost(post.id, {
//       ...post,
//       title: 'New Title',
//       content: 'New Content',
//     })
//   }
// >
//   Edit
// </button>
