'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBody } from '../../api/(auth)/register/route';

export default function RegisterForm(props: { returnTo?: string | string[] }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  return (
    <main className=" flex flex-col items-center justify-content min-h-screen mb-12 bg-fixed bg-center bg-cover bg-indigo-100">
      <div className="font-bold text-4xl md:text-5xl mt-10 mb-10">Teacher</div>
      <form
        className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-10 border "
        onSubmit={async (event) => {
          event.preventDefault();

          const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
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
          height="350"
          alt="Classroom"
        />
        <br />
        <hr />
        <label>
          username:
          <input
            className="ml-4 border rounded-md p-2 w-64 my-1"
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </label>
        <hr />
        <label>
          email add:
          <input
            className="ml-4 border rounded-md p-2 w-64 my-1 "
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
        </label>
        <hr />
        <label>
          password:
          <input
            className="ml-4 border rounded-md p-2 w-64 my-1"
            value={password}
            type="password"
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>
        <hr />

        <br />
        <button className="w-1/2 md:w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 my-4">
          Register
        </button>
        <Link className="my-4" href="/landingpage">
          Back
        </Link>
      </form>
    </main>
  );
}
