This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

{students.map((student) => (
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

            {/* {idOnEditMode !== student.id ? (
              student.gradeCode
            ) : (
              <input value={student.gradeCode} />
            )} */}
            {''}

            <button
              onClick={async () => {
                const response = await fetch(`/api/students/${student.id}`, {
                  method: 'DELETE',
                });
                const data = await response.json();
                if (data.error) {
                  setError(data.error);
                  return;
                }
                // console.log(data);
                // router.refresh();
                setStudents(
                  students.filter(
                    (studentOnState) => studentOnState.id !== data.student.id,
                  ),
                );
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
                  const response = await fetch(`/api/students/${student.id}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      firstName: editFirstName,
                      lastName: editLastName,
                      // gradeCode: generateGradeCode,
                    }),
                  });
                  const data = await response.json();
                  if (data.error) {
                    setError(data.error);
                    return;
                  }
                  setIdOnEditMode(undefined);
                  // console.log(data);

                  // router.refresh();
                  setStudents(
                    students.map((studentOnState) => {
                      return studentOnState.id !== data.student.id
                        ? studentOnState
                        : data.student;
                    }),
                  );
                }}
              >
                save
              </button>
            )}
