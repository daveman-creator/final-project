'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Student = {
  id: number;
  firstName: string;
  lastName: string;
  gradeId: number;
};
// | undefined;
type Props = {
  students?: Student[];
  gradeId?: number;
};

export default function Students(props: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string>();
  const [showInput, setShowInput] = useState(false);
  const [idOnEditMode, setIdOnEditMode] = useState<number>();
  const [editFirstName, setEditFirstName] = useState<string>('');
  const [editLastName, setEditLastName] = useState<string>('');
  // const [editGradeId, setEditGradeId] = useState<number>();
  // const [errors, setErrors] = useState<{ message: string }[]>([]);
  // const [gradeId, setGradeId] = useState<number>(0);
  const router = useRouter();
  console.log('error', error);

  return (
    <>
      <h1>Students</h1>
      {!showInput && (
        <button onClick={() => setShowInput(true)}>Add Students</button>
      )}
      {showInput && (
        <>
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

          <button
            onClick={async () => {
              const response = await fetch('/api/student', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  gradeId: props.gradeId,
                  firstName: firstName,
                  lastName: lastName,
                }),
              });

              // const data: StudentsResponseBody = await response.json();

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
              // setStudents([...students, data.student]);
            }}
          >
            Add Students
          </button>
        </>
      )}

      <div>
        {/* props.students &&
          props.students.map((student) */}

        {props.students?.map((student) => (
          <div key={`student-${student.id}`}>
            {idOnEditMode !== student.id ? (
              student.firstName
            ) : (
              <input
                value={editFirstName}
                onChange={(event) =>
                  setEditFirstName(event.currentTarget.value)
                }
              />
            )}

            {idOnEditMode !== student.id ? (
              student.lastName
            ) : (
              <input
                value={editLastName}
                onChange={(event) => setEditLastName(event.currentTarget.value)}
              />
            )}

            <button
              onClick={async () => {
                const response = await fetch(`/api/students/${student.id}`, {
                  method: 'DELETE',
                });

                // const data: StudentResponseBodyDelete = await response.json();

                // if ('errors' in data) {
                //   setErrors(data.errors);
                //   return;
                // }
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
            {idOnEditMode !== student.id ? (
              <button
                onClick={() => {
                  setIdOnEditMode(student.id);
                  // setEditGradeId(student.gradeId);
                  setEditFirstName(student.firstName);
                  setEditLastName(student.lastName);
                }}
              >
                edit
              </button>
            ) : (
              <button
                onClick={async () => {
                  const response = await fetch(`/api/students/${student.id}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      // gradeId: props.editGradeId,.gradeId,
                      gradeId: props.gradeId,
                      firstName: editFirstName,
                      lastName: editLastName,
                    }),
                  });

                  // const data: StudentResponseBodyPut = await response.json();

                  // if ('errors' in data) {
                  //   setErrors(data.errors);
                  //   return;
                  // }
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
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
