'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

// import { getStudents } from '../../../database/students';

type Student = {
  id: number;
  firstName: string;
  lastName: string;
};

type Props = {
  students: Student[];
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

  // const students = await getStudents();

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
          {''}
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
          >
            Add Students
          </button>
        </>
      )}

      <div>
        {/* props.students */}

        {props.students.map((student) => (
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
            {''}

            {idOnEditMode !== student.id ? (
              student.lastName
            ) : (
              <input
                value={editLastName}
                onChange={(event) => setEditLastName(event.currentTarget.value)}
              />
            )}
            {''}

            <button
              onClick={async () => {
                const response = await fetch(`/api/student/${student.id}`, {
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
            {idOnEditMode !== student.id ? (
              <button
                onClick={() => {
                  setIdOnEditMode(student.id);
                  setEditFirstName(student.firstName);
                  setEditLastName(student.lastName);
                }}
              >
                edit
              </button>
            ) : (
              <button
                onClick={async () => {
                  const response = await fetch(`/api/student/${student.id}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      firstName: editFirstName,
                      lastName: editLastName,
                    }),
                  });
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

//  <div>
//       {students.map((student) => (
//         <div key={`student-${student.id}`}>
//           {idOnEditMode !== student.id ? (
//             <div>
//               {student.firstName} {student.lastName}
//               <button
//                 onClick={() => {
//                   setIdOnEditMode(student.id);
//                   setEditFirstName(student.firstName);
//                   setEditLastName(student.lastName);
//                 }}
//               >
//                 Edit
//               </button>

//               <button
//                 onClick={async () => {
//                   const response = await fetch('/api/student', {
//                     method: 'DELETE',
//                     headers: {
//                       'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                       id: student.id,
//       }),
//     });

//     const data = await response.json();
//     if (data.error) {
//       setError(data.error);
//       return;
//     }

//     router.refresh();
//     // setStudents(students.filter((s) => s.id !== student.id));
//   }}
// >
//   Delete
// </button>
// <button
//   onClick={async () => {
//     const response = await fetch('/api/student', {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         id: student.id,
//         firstName: editFirstName,
//         lastName: editLastName,
//       }),
//     });

//         const data = await response.json();
//         if (data.error) {
//           setError(data.error);
//           return;
//         }

//         router.refresh();
//         // setStudents(
//         //   students.map((s) => {
//         //     if (s.id === student.id) {
//         //       return data.student;
//         //     }
//         //     return s;
//         //   })
//         // );
//       }}
//     >
//       Save
//     </button>

//     </div>
// ) : (
//   <div>
//     <label>
//       First Name:
//       <input
//         value={editFirstName}
//         placeholder="First Name"
//         onChange={(event) =>
//           setEditFirstName(event.currentTarget.value)
//         }
//       />
//               </label>
//               {''}
//               <label>
//                 Last Name:
//                 <input
//                   value={editLastName}
//                   placeholder="Last Name"
//                   onChange={(event) =>
//                     setEditLastName(event.currentTarget.value)

//                   }
//                 />
//               </label>

//               <button
//                 onClick={() => {
//                   setIdOnEditMode(null);
//                 }}
//               >
//                 Cancel
//               </button>

//               </div>

//           )};

//         );
//       };

// </div>

// Another one from chatgbt
// 'use client';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// export default function Students() {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [error, setError] = useState();
//   const [showInput, setShowInput] = useState(false);
//   const [userInput, setUserInput] = useState(null); // new state variables
//   const router = useRouter();
//   return (
//     <>
//       <h1>Students</h1>
//       {!showInput && (
//         <button onClick={() => setShowInput(true)}>Add Students</button>
//       )}
//       {showInput && (
//         <>
//           <label>
//             First Name:
//             <input
//               value={firstName}
//               placeholder="First Name"
//               onChange={(event) => setFirstName(event.currentTarget.value)}
//             />
//           </label>
//           {''}
//           <label>
//             Last Name:
//             <input
//               value={lastName}
//               placeholder="Last Name"
//               onChange={(event) => setLastName(event.currentTarget.value)}
//             />
//           </label>
//           <button
//             onClick={async () => {
//               const response = await fetch('/api/student', {
//                 method: 'POST',
//                 headers: {
//                   'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                   firstName: firstName,
//                   lastName: lastName,
//                 }),
//               });
//               const data = await response.json();
//               if (data.error) {
//                 setError(data.error);
//                 return;
//               }
//               setUserInput({ firstName, lastName }); // update user input state
//               setShowInput(false); // hide input fields
//               // console.log(data);
//               router.refresh();
//               // setStudents([...students, data.student]);
//             }}
//           >
//             Add Students
//           </button>
//         </>
//       )}
//       {userInput && ( // display user input
//         <>
//           <p>First Name: {userInput.firstName}</p>
//           <p>Last Name: {userInput.lastName}</p>
//         </>
//       )}
//     </>
//   );
// }

// From chatgbt

// 'use client';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// export default function Students() {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [error, setError] = useState();
//   const [showInput, setShowInput] = useState(false); // new state variable
//   const router = useRouter();
//   return (
//     <>
//       <h1>Students</h1>
//       {!showInput && (
//         <button onClick={() => setShowInput(true)}>Add Students</button>
//       )}
//       {showInput && (
//         <>
//           <label>
//             First Name:
//             <input
//               value={firstName}
//               placeholder="First Name"
//               onChange={(event) => setFirstName(event.currentTarget.value)}
//             />
//           </label>
//           {''}
//           <label>
//             Last Name:
//             <input
//               value={lastName}
//               placeholder="Last Name"
//               onChange={(event) => setLastName(event.currentTarget.value)}
//             />
//           </label>
//           <button
//             onClick={async () => {
//               const response = await fetch('/api/student', {
//                 method: 'POST',
//                 headers: {
//                   'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                   firstName: firstName,
//                   lastName: lastName,
//                 }),
//               });
//               const data = await response.json();
//               if (data.error) {
//                 setError(data.error);
//                 return;
//               }
//               // console.log(data);
//               router.refresh();
//               // setStudents([...students, data.student]);
//             }}
//           >
//             Add Students
//           </button>
//         </>
//       )}
//     </>
//   );
// }

// This is my work

// 'use client';

// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// export default function Students() {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [error, setError] = useState();
//   // const [gradeId, setGradeId] = useState(Number);
//   const router = useRouter;

//   return (
//     <>
//       <h1>Students</h1>
//       <label>
//         First Name:
//         <input
//           value={firstName}
//           placeholder="First Name"
//           onChange={(event) => setFirstName(event.currentTarget.value)}
//         />
//       </label>
//       {''}
//       <label>
//         Last Name:
//         <input
//           value={lastName}
//           placeholder="Last Name"
//           onChange={(event) => setLastName(event.currentTarget.value)}
//         />
//       </label>

//       <button
//         onClick={async () => {
//           const response = await fetch('/api/student', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               firstName: firstName,
//               lastName: lastName,
//             }),
//           });

//           const data = await response.json();
//           if (data.error) {
//             setError(data.error);
//             return;
//           }
//           // console.log(data);
//           router.refresh();
//           // setStudents([...students, data.student]);
//         }}
//       >
//         Add Students
//       </button>
//     </>
//   );
// }

// 'use client';

// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
// import { createStudent } from '../../../../database/students';
// // import { Student } from '../../api/student/route';
// import { StudentsResponseBody } from '../../api/student/route';

// type Student = {
//   id: number;
//   firstName: string;
//   lastName: string;
//   gradeId: number;
// };
// // type Props = {
// //   students: Student[];
// // };
// // props: Props
// export default function Students() {
//   const router = useRouter;
//   // const [createGrade, setCreateGrade] = useState('');
//   // const [generateGradeCode, setGenerateGradeCode] = useState('');
//   const [idOnEditMode, setIdOnEditMode] = useState<number>();
//   const [firstName, setFirstName] = useState<string>('');
//   const [lastName, setLastName] = useState<string>('');
//   const [editFirstName, setEditFirstName] = useState<string>('');
//   const [editLastName, setEditLastName] = useState<string>('');
//   const [error, setError] = useState<string>();
//   // const [students, setStudents] = useState<Student[]>(props.students);

//   return (
//     <>
//       <h1>Students</h1>
//       <label>
//         First Name:
//         <input
//           value={firstName}
//           placeholder="First Name"
//           onChange={(event) => setFirstName(event.currentTarget.value)}
//         />
//       </label>
//       <label>
//         Last Name:
//         <input
//           value={lastName}
//           placeholder="Last Name"
//           onChange={(event) => setLastName(event.currentTarget.value)}
//         />
//       </label>
//       {/* <label>
//         Grade Code:
//         <input value="Grade Code" placeholder="Grade Code" />
//       </label> */}
//       <button
//         onClick={async () => {
//           const response = await fetch('/api/students', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               firstName: firstName,
//               lastName: lastName,
//               // gradeCode: generateGradeCode,
//             }),
//           });
//           // const data: StudentsResponseBody = await response.json();
//           // if ('errors' in data) {
//           //   setError(data.errors);
//           //   return;
//           // }
//           const data = await response.json();
//           if (data.error) {
//             setError(data.error);
//             return;
//           }
//           // console.log(data);
//           router.refresh();
//           // setStudents([...students, data.student]);
//         }}
//       >
//         Add Students
//       </button>
//       {typeof error === 'string' && (
//         <div style={{ color: 'red' }}>{error} </div>
//       )}
//       <div>
//         {/* props.students */}

//         {students.map((student) => (
//           <div key={`student-${student.id}`}>
//             {idOnEditMode !== student.id ? (
//               student.firstName
//             ) : (
//               <input
//                 value={editFirstName}
//                 onChange={(event) =>
//                   setEditFirstName(event.currentTarget.value)
//                 }
//               />
//             )}
//             {''}

//             {idOnEditMode !== student.id ? (
//               student.lastName
//             ) : (
//               <input
//                 value={editLastName}
//                 onChange={(event) => setEditLastName(event.currentTarget.value)}
//               />
//             )}
//             {''}

//             {/* {idOnEditMode !== student.id ? (
//               student.gradeCode
//             ) : (
//               <input value={student.gradeCode} />
//             )} */}
//             {''}

//             <button
//               onClick={async () => {
//                 const response = await fetch(`/api/students/${student.id}`, {
//                   method: 'DELETE',
//                 });
//                 const data = await response.json();
//                 if (data.error) {
//                   setError(data.error);
//                   return;
//                 }
//                 // console.log(data);
//                 router.refresh();
//                 // setStudents(
//                 //   students.filter(
//                 //     (studentOnState) => studentOnState.id !== data.student.id,
//                 //   ),
//                 // );
//               }}
//             >
//               X
//             </button>
//             {idOnEditMode !== student.id ? (
//               <button
//                 onClick={() => {
//                   setIdOnEditMode(student.id);
//                   setEditFirstName(student.firstName);
//                   setEditLastName(student.lastName);
//                 }}
//               >
//                 edit
//               </button>
//             ) : (
//               <button
//                 onClick={async () => {
//                   const response = await fetch(`/api/students/${student.id}`, {
//                     method: 'PUT',
//                     headers: {
//                       'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                       firstName: editFirstName,
//                       lastName: editLastName,
//                       // gradeCode: generateGradeCode,
//                     }),
//                   });
//                   const data = await response.json();
//                   if (data.error) {
//                     setError(data.error);
//                     return;
//                   }
//                   setIdOnEditMode(undefined);
//                   // console.log(data);

//                   router.refresh();
//                   // setStudents(
//                   //   students.map((studentOnState) => {
//                   //     return studentOnState.id !== data.student.id
//                   //       ? studentOnState
//                   //       : data.student;
//                   //   }),
//                   // );
//                 }}
//               >
//                 save
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//       {/* <button
//         onClick={async () => {
//           // how many students are shown
//           const studentCount = students.length;

//           const response = await fetch(
//             `/api/students?limit=3&offset=${studentCount}`,
//           );

//           const data = await response.json();

//           setStudents([...students, ...data.students]);
//         }}
//       >
//         show more
//       </button> */}
//     </>
//   );
// }

// This is actually where the unworking code starts

// 'use client';

// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// type Student = {
//   id: number;
//   firstName: string;
//   lastName: string;
//   gradeId: number;
// };
// type Props = {
//   students: Student[];
// };

// export default function TeacherInput(props: Props) {
//   const router = useRouter;
//   const [createGrade, setCreateGrade] = useState('');
//   const [generateGradeCode, setGenerateGradeCode] = useState('');
//   const [idOnEditMode, setIdOnEditMode] = useState<number>();
//   const [firstName, setFirstName] = useState<string>('');
//   const [lastName, setLastName] = useState<string>('');
//   const [editFirstName, setEditFirstName] = useState<string>('');
//   const [editLastName, setEditLastName] = useState<string>('');
//   const [error, setError] = useState<string>();
//   const [students, setStudents] = useState<Student[]>(props.students);

//   return (
//     <>
//       <form>
//       <label>
//         First Name:
//         <input
//           value={firstName}
//           placeholder="First Name"
//           onChange={(event) => setFirstName(event.currentTarget.value)}
//         />
//       </label>
//       <label>
//         Last Name:
//         <input
//           value={lastName}
//           placeholder="Last Name"
//           onChange={(event) => setLastName(event.currentTarget.value)}
//         />
//       </label>
//       {/* <label>
//         Grade Code:
//         <input value="Grade Code" placeholder="Grade Code" />
//       </label> */}
//       <button
//         onClick={async () => {
//           const response = await fetch('/api/students', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               firstName: firstName,
//               lastName: lastName,
//               // gradeCode: generateGradeCode,
//             }),
//           });
//           const data = await response.json();
//           if (data.error) {
//             setError(data.error);
//             return;
//           }
//           // console.log(data);
//           // router.refresh();
//           setStudents([...students, data.student]);
//         }}
//       >
//         Add Students
//       </button>
//       {typeof error === 'string' && (
//         <div style={{ color: 'red' }}>{error} </div>
//       )}
//       {/* <div> */}
//       {/* props.students */}

//       {/* </div> */}
//       {/* ))} */}
//        </div>
//       <button
//         onClick={async () => {
//           // how many students are shown
//           const studentCount = students.length;

//           const response = await fetch(
//             `/api/students?limit=3&offset=${studentCount}`,
//           );

//           const data = await response.json();

//           setStudents([...students, ...data.students]);
//         }}
//       >
//         show more
//       </button>
//      </form>
//      </>

//   ),
// }
