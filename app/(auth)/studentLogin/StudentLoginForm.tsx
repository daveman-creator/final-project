'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { StudentsResponseBody } from '../../api/(auth)/studentLogin/route';

// props: { returnTo?: string | string[] }

export default function StudentLoginForm(props: {
  username: string | undefined;
  returnTo?: string | string[];
}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gradeCode, setGradeCode] = useState('');
  // const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();
  console.log('studentform', props.username);

  return (
    <main className="bg-indigo-100">
      <div className="font-bold text-4xl md:text-5xl mt-10 mb-10 text-center">
        Student
      </div>
      <form
        className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-10 border "
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
          // router.push(`/profile/${data.user.username}/post`);
          // console.log('student login Url', `/profile/${props.username}/post`);
          router.push(`/profile/${props.username}/post`);

          // router.push(`/profile/${firstName}_${lastName}_${gradeCode}/post`);

          // router.push(`/post/${data.user.username}`);

          // router.refresh();
          // router.replace(`/profile/${data.user.username}/post`);
          // router.refresh();
        }}
      >
        {/* <h1>Student</h1> */}
        {errors.map((error) => (
          <div key={`error-${error.message}`}>Error: {error.message}</div>
        ))}
        <Image
          src="/image/Teacher.webp"
          width="400"
          height="350"
          alt="Classroom"
        />
        <br />
        <hr />
        <label>
          FirstName:
          <input
            className="ml-4 border rounded-md p-2 w-64 my-1"
            value={firstName}
            onChange={(event) => setFirstName(event.currentTarget.value)}
          />
        </label>
        <hr />

        <label>
          LastName:
          <input
            className="ml-4 border rounded-md p-2 w-64 my-1"
            value={lastName}
            onChange={(event) => setLastName(event.currentTarget.value)}
          />
        </label>
        <hr />
        <label>
          GradeCode:
          <input
            className="ml-4 border rounded-md p-2 w-64 my-1"
            value={gradeCode}
            onChange={(event) => setGradeCode(event.currentTarget.value)}
          />
        </label>
        <hr />

        <button className="w-1/2 md:w-1/3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 my-4">
          Login
        </button>
        <div>
          <Link className="my-4" href="/landingpage">
            Back
          </Link>
        </div>
      </form>
    </main>
  );
}
