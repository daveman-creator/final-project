'use client';

import { FormatColorReset } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { comment } from 'postcss';
import { useState } from 'react';
import { PostsResponseBody } from '../../../api/post/route';
import Comments from '../../../comment/Comments';
import styles from './page.module.scss';

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
  comments?: Comment[];
};
// { userId: number }
export default function Posts(props: Props) {
  // const router = useRouter;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [error, setError] = useState<string>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [postId, setPostId] = useState<number>(0);
  // const [hideInput, setHideInput] = useState(false);
  // const [idOnEditMode, setIdOnEditMode] = useState<number>();
  // const [editTitle, setEditTitle] = useState<string>('');
  // const [editContent, setEditContent] = useState<string>('');
  // const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();
  // console.log(props);
  // const { post } = props;
  console.log('postId', postId);
  console.log('comments', comments);
  return (
    <main className={styles.main}>
      {/* <h1 className={styles.h1}>Posts</h1> */}
      {!showInput && (
        <button className={styles.button} onClick={() => setShowInput(true)}>
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
          <label className={styles.label}>
            Post Title:
            <input
              className={styles.input}
              value={title}
              placeholder="title"
              onChange={(event) => setTitle(event.currentTarget.value)}
            />
          </label>
          <br />
          {/* <button>Create</button> */}
          <label className={styles.label}>
            Post Content:
            <textarea
              className={styles.textarea}
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

          <button className={styles.button}>Create</button>
          <button
            className={styles.button2}
            onClick={() => setShowInput(false)}
          >
            X
          </button>

          <br />
        </form>
      )}
      {/* {Array.isArray(props.posts) &&
          props.posts.map((post) */}

      <div>
        {props.posts?.map((post) => {
          console.log('Running Javascript here is possible');

          return (
            <div key={post.id}>
              <h1>{post.title}</h1>
              <p>{post.content}</p>
              <Comments comments={props.comments} postId={post.id} />
              <Link href={`/profile/${props.username}/post/${post.id}`}>
                {' '}
                Post
              </Link>
              <button
                className={styles.button}
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
          );
        })}

        {/* {props.posts?.map((post) => (
          <div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.content}</p> */}

        {/* <Comments /> */}
        {/* <Comments comments={props.comments} postId={post.id} /> */}
        {/* <Comments  /> */}

        {/* <p>{comment.content}</p> */}

        {/* {idOnEditMode !== post.id ? (
              post.title
            ) : (
              <input
                value={editTitle}
                onChange={(event) => setEditTitle(event.currentTarget.value)}
              />
            )}
            {''}

            {idOnEditMode !== post.id ? (
              post.content
            ) : (
              <input
                value={editContent}
                onChange={(event) => setEditContent(event.currentTarget.value)}
              />
            )}
            {''} */}

        {/* <button
              className={styles.button}
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
            </button> */}
        {/* <button
              onClick={() => {
                setIdOnEditMode(post.id);

                setEditTitle(post.title);
                setEditContent(post.content);
              }}
            >
              edit
            </button>

            <button */}
        {/* onClick={async () => {
                const response = await fetch(`/api/posts/${post.id}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    // gradeId: props.editGradeId,.gradeId,
                    userId: props.userId,
                    title: editTitle,
                    content: editContent,
                  }),
                });

                const data = await response.json();
                if (data.error) {
                  setError(data.error);
                  return;
                }
                setIdOnEditMode(undefined);
                // console.log(data);

                router.refresh();
              }}
            >
              save
            </button> */}

        {/* <button
              onClick={async () => {
                const response = await fetch(`/api/posts/${post.id}`, {
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
            </button> */}
      </div>
      {/* ))} */}
      {/* </div> */}
    </main>
  );
}
