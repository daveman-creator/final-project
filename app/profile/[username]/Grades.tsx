'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GradesResponseBody } from '../../api/grade/route';

export default function Grades(props: { userId: number }) {
  // const router = useRouter;
  const [gradeName, setGradeName] = useState('');
  const [gradeCode, setGradeCode] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

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
            router.refresh();
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
          {/* router.refresh(); */}
          <br />
        </form>
      )}

      {/* <button>Students Page</button> */}
    </>
  );
}
