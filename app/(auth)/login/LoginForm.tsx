'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBody } from '../../api/(auth)/register/route';
import styles from './page.module.scss';

export default function LoginForm(props: { returnTo?: string | string[] }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  return (
    <main className={styles.main}>
      <div className={styles.div}>Teacher</div>
      <form
        // className={styles.form}
        onSubmit={async (event) => {
          event.preventDefault();

          const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            // email,
          });

          const data: RegisterResponseBody = await response.json();

          if ('errors' in data) {
            setErrors(data.errors);
            return;
          }

          if (
            props.returnTo &&
            !Array.isArray(props.returnTo) &&
            // This is checking that the return to is a valid path in your application and not going to a different domain
            /^\/[a-zA-Z0-9-?=/]*$/.test(props.returnTo)
          ) {
            router.push(props.returnTo);
            return;
          }

          router.push(`/profile/${data.user.username}`);
          // router.refresh();
          // router.replace(`/profile/${data.user.username}`);
          // router.refresh();
        }}
      >
        {/* <h1 className={styles.h1}>Teacher</h1> */}
        {errors.map((error) => (
          <div key={`error-${error.message}`}>Error: {error.message}</div>
        ))}
        <Image
          className={styles.image}
          src="/image/Teacher.webp"
          width="400"
          height="400"
          alt="Classroom"
        />
        <br />
        <hr className={styles.hr} />
        <label>
          username:
          <input
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </label>
        <hr className={styles.hr} />
        {/* <label>
        email:
        <input
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
      </label> */}
        <label>
          password:
          <input
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>
        <hr className={styles.hr} />
        <div>
          {/* class="pass-link" */}
          <Link href="/">Forgot password?</Link>
        </div>
        <button className={styles.button}>Login</button>

        <div>
          Don't have an account?
          <Link href="/register">Register now</Link>
        </div>
      </form>
    </main>
  );
}
