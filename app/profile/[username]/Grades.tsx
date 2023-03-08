'use client';

// import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GradesResponseBody } from '../../api/grade/route';

export default function Grades(props: { userId: number }) {
  // const router = useRouter;
  const [gradeName, setGradeName] = useState('');
  const [gradeCode, setGradeCode] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  // const [idOnEditMode, setIdOnEditMode] = useState<number>();
  // const [firstName, setFirstName] = useState<string>('');
  // const [lastName, setLastName] = useState<string>('');
  // const [editFirstName, setEditFirstName] = useState<string>('');
  // const [editLastName, setEditLastName] = useState<string>('');
  // const [error, setError] = useState<string>();

  // userId: number;
  // gradeName: string;
  // gradeCode: string;

  return (
    <>
      {!showInput && <button onClick={() => setShowInput(true)}>Create</button>}
      {showInput && (
        <form
          onSubmit={async (event) => {
            event.preventDefault();

            const response = await fetch('/api/grade', {
              method: 'POST',
              body: JSON.stringify({
                userId: props.userId,
                gradeName,
                gradeCode,
              }),
              // email,
            });

            const data: GradesResponseBody = await response.json();

            if ('errors' in data) {
              setErrors(data.errors);
              return;
            }
            // console.log('data', data);

            // if (
            //   props.returnTo &&
            //   !Array.isArray(props.returnTo) &&
            //   // This is checking that the return to is a valid path in your application and not going to a different domain
            //   /^\/[a-zA-Z0-9-?=/]*$/.test(props.returnTo)
            // ) {
            //   router.push(props.returnTo);
            //   return;
            // }

            // console.log(data.user);
            // router.push(`/profile/${data.grades.grade}`);
          }}
        >
          <label>
            Create Grade:
            <input
              value={gradeName}
              placeholder="Grade"
              onChange={(event) => setGradeName(event.currentTarget.value)}
            />
          </label>
          {/* <button>Create</button> */}

          <label>
            Generate Grade Code:
            <input
              value={gradeCode}
              placeholder="Grade Code"
              onChange={(event) => setGradeCode(event.currentTarget.value)}
            />
          </label>
          <button>Create</button>
          <br />
        </form>
      )}
      ;
    </>
  );
}
