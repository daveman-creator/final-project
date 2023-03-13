'use client';

import { useEffect, useState } from 'react';

type Comment = {
  id: number;
  postId: number;
  content: string;
};

export default function Comments(props: { posts?: { id: number }[] }) {
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState<string>();
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    async function fetchComments(postId: number) {
      const response = await fetch(`/api/post/${postId}/comments`);
      const data = await response.json();
      if (!data.error) {
        setComments(data);
      }
    }

    props.posts?.forEach((post) => fetchComments(post.id));
  }, [props.posts]);

  return (
    <div>
      {props.posts?.map((post) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.content}</p>

          {/* Render the comments */}
          <ul>
            {comments
              .filter((comment) => comment.postId === post.id)
              .map((comment) => (
                <li key={comment.id}>{comment.content}</li>
              ))}
          </ul>

          {/* Add a new comment */}
          <form
            onSubmit={async (event) => {
              event.preventDefault();

              const response = await fetch(`/api/post/${post.id}/comments`, {
                method: 'POST',
                body: JSON.stringify({
                  content: newComment,
                }),
              });

              const data = await response.json();

              if (data.error) {
                setError(data.error);
                return;
              }

              setComments([...comments, data]);
              setNewComment('');
            }}
          >
            <label>
              Add a comment:
              <input
                value={newComment}
                onChange={(event) => setNewComment(event.currentTarget.value)}
              />
            </label>
            <button type="submit">Submit</button>
          </form>

          <button onClick={/* delete the post */}>Delete</button>
          <button onClick={/* edit the post */}>Edit</button>
        </div>
      ))}
    </div>
  );
}
