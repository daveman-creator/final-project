'use client';

import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  const router = useRouter();
  console.log('error', error);

  return (
    <main className=" bg-indigo-100 ">
      <div>
        <h1 className="text-center">Students</h1>
        <div className="flex justify-start items-center py-4">
          {!showInput && (
            <button
              onClick={() => setShowInput(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Tap Here
            </button>
          )}
          {showInput && (
            <form className="flex md:flex-row flex-col  items-center gap-4">
              <label>
                First Name:
                <input
                  value={firstName}
                  placeholder="First Name"
                  onChange={(event) => setFirstName(event.currentTarget.value)}
                  className="border border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </label>

              <br />
              <label>
                Last Name:
                <input
                  value={lastName}
                  placeholder="Last Name"
                  onChange={(event) => setLastName(event.currentTarget.value)}
                  className="border border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
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

                  const data = await response.json();
                  if (data.error) {
                    setError(data.error);
                    return;
                  }

                  router.refresh();
                }}
                className="px-4 py-2 bg-gree-500 text-black rounded-md hover:bg-green-600"
              >
                <FontAwesomeIcon icon={faFaceSmile} /> Add Students
              </button>
              <button
                onClick={() => setShowInput(false)}
                className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                X
              </button>
            </form>
          )}
        </div>
        <div className="flex flex-col space-y-2 border border-green-500 p-8">
          {props.students?.map((student) => (
            <div
              key={`student-${student.id}`}
              className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-40 justify-between bg-white p-4 rounded-md shadow-md"
            >
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-40">
                {idOnEditMode !== student.id ? (
                  student.firstName
                ) : (
                  <div className="flex flex-col space-y-1">
                    <input
                      value={editFirstName}
                      onChange={(event) =>
                        setEditFirstName(event.currentTarget.value)
                      }
                      className="border border-gray-300 p-2 rounded-md"
                    />
                  </div>
                )}

                {idOnEditMode !== student.id ? (
                  student.lastName
                ) : (
                  <div className="flex flex-col space-y-1">
                    <input
                      value={editLastName}
                      onChange={(event) =>
                        setEditLastName(event.currentTarget.value)
                      }
                      className="border border-gray-300 p-2 rounded-md "
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={async () => {
                    const response = await fetch(
                      `/api/students/${student.id}`,
                      {
                        method: 'DELETE',
                      },
                    );

                    const data = await response.json();
                    if (data.error) {
                      setError(data.error);
                      return;
                    }

                    router.refresh();
                  }}
                  className="text-red-500 hover:text-red-600 transition-colors duration-150"
                >
                  <img src="/image/Trash.png" width={20} height={20} alt="" />
                </button>
                {idOnEditMode !== student.id ? (
                  <button
                    onClick={() => {
                      setIdOnEditMode(student.id);

                      setEditFirstName(student.firstName);
                      setEditLastName(student.lastName);
                    }}
                    className="text-green-500 hover:text-green-600 transition-colors duration-150"
                  >
                    edit
                  </button>
                ) : (
                  <button
                    onClick={async () => {
                      const response = await fetch(
                        `/api/students/${student.id}`,
                        {
                          method: 'PUT',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            gradeId: props.gradeId,
                            firstName: editFirstName,
                            lastName: editLastName,
                          }),
                        },
                      );

                      const data = await response.json();
                      if (data.error) {
                        setError(data.error);
                        return;
                      }
                      setIdOnEditMode(undefined);

                      router.refresh();
                    }}
                    className="text-green-500 hover:text-green-600 transition-colors duration-150"
                  >
                    save
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
