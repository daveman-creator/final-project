'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Grades(props: { userId: number; imageUrl: string }) {
  // const router = useRouter;
  const [gradeName, setGradeName] = useState('');
  const [gradeCode, setGradeCode] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [error, setError] = useState<{ message: string }[]>([]);
  const [imageSrc, setImageSrc] = useState<string>();
  const [uploadData, setUploadData] = useState<string>();
  const [imageUrl, setImageUrl] = useState<string>();
  const router = useRouter();
  console.log('error', error);
  console.log('imageUrl', imageUrl);

  function handleOnChange(changeEvent: any) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent: ProgressEvent<FileReader>) {
      setImageSrc(onLoadEvent.target!.result as string);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      (element) =>
        element instanceof HTMLInputElement && element.name === 'file',
    ) as HTMLInputElement;
    //  ({ name }) => name
    const formData = new FormData();

    for (const file of fileInput.files || []) {
      formData.append('file', file);
    }

    formData.append('upload_preset', 'my-uploads');

    const data = await fetch(
      'https://api.cloudinary.com/v1_1/dnxlwc15r/image/upload',
      {
        method: 'POST',
        body: formData,
      },
    ).then((response) => response.json());

    setImageSrc(data.secure_url);
    setImageUrl(data.secure_url);
  }

  return (
    <main className="bg-indigo-100 py-8 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40 2xl:px-64">
      <div className="max-w-lg mx-auto">
        {!showInput && (
          <button
            onClick={() => setShowInput(true)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 my-4"
          >
            {' '}
            Click To Create
          </button>
        )}

        {showInput && (
          <form
            className="  flex md:flex-row flex-col items-center gap-4"
            onSubmit={async (event) => {
              event.preventDefault();

              const response = await fetch('/api/grade', {
                method: 'POST',
                body: JSON.stringify({
                  userId: props.userId,
                  imageUrl: imageSrc,
                  gradeName,
                  gradeCode,
                }),
              });

              const data = await response.json();
              if (data.error) {
                setError(data.error);
                return;
              }

              router.refresh();
            }}
          >
            <label className="font-bold text-lg mb-2">
              <span>Create Grade:</span>

              <input
                value={gradeName}
                placeholder="Grade"
                onChange={(event) => setGradeName(event.currentTarget.value)}
                className="border border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </label>

            <label className="font-bold text-lg mb-2">
              <span> Grade Code:</span>

              <input
                value={gradeCode}
                placeholder="Grade Code"
                onChange={(event) => setGradeCode(event.currentTarget.value)}
                className="border border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </label>

            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 my-4 mt-8">
              Create
            </button>

            <button
              onClick={() => setShowInput(false)}
              className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400 mt-4"
            >
              X
            </button>

            <br />
          </form>
        )}
      </div>

      <div className="flex justify-center items-center mt-8">
        <form
          method="POST"
          onChange={handleOnChange}
          onSubmit={handleOnSubmit}
          className="px-4"
        >
          <p className="my-0">
            <input type="file" name="file" />
          </p>
          <img
            className="my-8 rounded-lg shadow-md"
            src={imageSrc || props.imageUrl}
            width="600"
            height="400"
            alt=""
          />
          {!!imageSrc && !uploadData && (
            <p>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 my-0">
                Upload Files
              </button>
            </p>
          )}
          {!!uploadData && (
            <code>
              <pre>{JSON.stringify(uploadData, null, 2)}</pre>
            </code>
          )}
        </form>
      </div>
    </main>
  );
}
