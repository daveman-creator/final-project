'use client';

import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// import { Student } from '../../../database/students';
// import { StudentsResponseBody } from '../../api/student/route';
// import {
//   StudentResponseBodyDelete,
//   StudentResponseBodyPut,
// } from '../../api/students/[studentId]/route';
// import Grades from './Grades';
// import styles from './page.module.scss';

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

  // const students = await getStudents();

  return (
    <main className=" bg-indigo-100 ">
      <div>
        <h1 className="text-center">Students</h1>
        <div className="flex justify-start items-center py-4">
          {!showInput && (
            <button
              onClick={() => setShowInput(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Students
            </button>
          )}
          {showInput && (
            <form className="flex items-center gap-4">
              <label>
                First Name:
                <input
                  value={firstName}
                  placeholder="First Name"
                  onChange={(event) => setFirstName(event.currentTarget.value)}
                  className="border border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <br />
              <label>
                Last Name:
                <input
                  value={lastName}
                  placeholder="Last Name"
                  onChange={(event) => setLastName(event.currentTarget.value)}
                  className="border border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  // setStudents([...students, data.student]);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
        <div className="flex flex-col space-y-2 border border-blue-500 p-8">
          {props.students?.map((student) => (
            <div
              key={`student-${student.id}`}
              className="flex items-center space-x-40 justify-between bg-white p-4 rounded-md shadow-md"
            >
              <div className="flex space-x-40">
                {idOnEditMode !== student.id ? (
                  student.firstName
                ) : (
                  <input
                    value={editFirstName}
                    onChange={(event) =>
                      setEditFirstName(event.currentTarget.value)
                    }
                    className="border border-gray-300 p-2 rounded-md"
                  />
                )}

                {idOnEditMode !== student.id ? (
                  student.lastName
                ) : (
                  <input
                    value={editLastName}
                    onChange={(event) =>
                      setEditLastName(event.currentTarget.value)
                    }
                    className="border border-gray-300 p-2 rounded-md "
                  />
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
                    // console.log(data);
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
                      // setEditGradeId(student.gradeId);
                      setEditFirstName(student.firstName);
                      setEditLastName(student.lastName);
                    }}
                    className="text-blue-500 hover:text-blue-600 transition-colors duration-150"
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
                            // gradeId: props.editGradeId,.gradeId,
                            gradeId: props.gradeId,
                            firstName: editFirstName,
                            lastName: editLastName,
                          }),
                        },
                      );

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
                    className="text-blue-500 hover:text-blue-600 transition-colors duration-150"
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
