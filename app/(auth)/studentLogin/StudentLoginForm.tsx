'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { StudentsResponseBody } from '../../api/(auth)/studentLogin/route';
import styles from './page.module.scss';

// props: { returnTo?: string | string[] }

export default function StudentLoginForm(props: {
  returnTo?: string | string[];
}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gradeCode, setGradeCode] = useState('');
  // const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  return (
    <form
      className={styles.form}
      onSubmit={async (event) => {
        event.preventDefault();

        const response = await fetch('/api/studentLogin', {
          method: 'POST',
          body: JSON.stringify({ firstName, lastName, gradeCode }),
          // email,
        });

        const data: StudentsResponseBody = await response.json();

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

        router.push(`/post/${data.user.userId}`);
        // router.refresh();
        // router.replace(`/profile/${data.user.username}`);
        // router.refresh();
      }}
    >
      {errors.map((error) => (
        <div key={`error-${error.message}`}>Error: {error.message}</div>
      ))}
      <Image
        src="/image/Teacher.webp"
        width="400"
        height="400"
        alt="Classroom"
      />
      <br />
      <hr className={styles.hr} />
      <label>
        FirstName:
        <input
          value={firstName}
          onChange={(event) => setFirstName(event.currentTarget.value)}
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
        LastName:
        <input
          value={lastName}
          onChange={(event) => setLastName(event.currentTarget.value)}
        />
      </label>
      <hr className={styles.hr} />
      <label>
        GradeCode:
        <input
          value={gradeCode}
          onChange={(event) => setGradeCode(event.currentTarget.value)}
        />
      </label>
      <hr className={styles.hr} />
      <div>
        {/* class="pass-link" */}
        <Link href="/">Forgot password?</Link>
      </div>
      <button className={styles.button}>Login</button>
    </form>
  );
}
