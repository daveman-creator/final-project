'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  students: Student[];
};

export default function TeacherInput(props: Props) {
  const router = useRouter;
  const [createGrade, setCreateGrade] = useState('');
  const [generateGradeCode, setGenerateGradeCode] = useState('');
  const [idOnEditMode, setIdOnEditMode] = useState<number>();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [editFirstName, setEditFirstName] = useState<string>('');
  const [editLastName, setEditLastName] = useState<string>('');
  const [error, setError] = useState<string>();

  return (
    <>
      <label>
        Create Grade:
        <input
          value={createGrade}
          placeholder="Grade"
          onChange={(event) => setCreateGrade(event.currentTarget.value)}
        />
      </label>
      <button>Create</button>

      <label>
        Generate Grade Code:
        <input
          value={generateGradeCode}
          placeholder="Grade Code"
          onChange={(event) => setGenerateGradeCode(event.currentTarget.value)}
        />
      </label>
      <button>Generate</button>
      <br />
      <br />
      <h1>Students</h1>
      <label>
        First Name:
        <input
          value={firstName}
          placeholder="First Name"
          onChange={(event) => setFirstName(event.currentTarget.value)}
        />
      </label>
      <label>
        Last Name:
        <input
          value={lastName}
          placeholder="Last Name"
          onChange={(event) => setLastName(event.currentTarget.value)}
        />
      </label>
      {/* <label>
        Grade Code:
        <input value="Grade Code" placeholder="Grade Code" />
      </label> */}
      <button
        onClick={async () => {
          const response = await fetch('/api/students', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              // gradeCode: generateGradeCode,
            }),
          });
          const data = await response.json();
          if (data.error) {
            setError(data.error);
            return;
          }
          // console.log(data);
          router.refresh();
        }}
      >
        Add Students
      </button>
      {typeof error === 'string' && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        {props.students.map((student) => (
          <div key={`student-${student.id}`}>
            {idOnEditMode !== student.id ? (
              student.firstName
            ) : (
              <input value={editFirstName} />
            )}
            {''}

            {idOnEditMode !== student.id ? (
              student.lastName
            ) : (
              <input value={editLastName} />
            )}
            {''}

            {/* {idOnEditMode !== student.id ? (
              student.gradeCode
            ) : (
              <input value={student.gradeCode} />
            )} */}
            {''}

            <button
              onClick={async () => {
                const response = await fetch('/api/students', {
                  method: 'DELETE',
                });
                const data = await response.json();
                if (data.error) {
                  setError(data.error);
                  return;
                }
                // console.log(data);
                router.refresh();
              }}
            >
              X
            </button>
            <button
              onClick={() => {
                setIdOnEditMode(student.id);
                setEditFirstName(student.firstName);
                setEditLastName(student.lastName);
              }}
            >
              edit
            </button>
            <button onClick={() => setIdOnEditMode(undefined)}>save</button>
          </div>
        ))}
      </div>
      <button>show more</button>
    </>
  );
}

{
  /* <input
              value={student.lastName}
              disabled={idOnEditMode !== student.id}
            /> */
}
