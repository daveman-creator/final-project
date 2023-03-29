'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

// 'https://res.cloudinary.com/dnxlwc15r/image/upload/v1679928402/my-uploads/nny36cuyvqumzeh4ahsm.jpg',
export default function Grades(props: { userId: number }) {
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
  // useEffect(() => {
  //   // Save the image URL to localStorage whenever it changes
  //   if (imageSrc) {
  //     localStorage.setItem('image_url', imageSrc);
  //   }
  // }, [imageSrc]);

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
      'http://api.cloudinary.com/v1_1/dnxlwc15r/image/upload',
      {
        method: 'POST',
        body: formData,
      },
    ).then((response) => response.json());

    setImageSrc(data.secure_url);
    setImageUrl(data.secure_url);

    // // Save the image URL to localStorage
    // localStorage.setItem('image_url', data.secure_url);

    // setUploadData(JSON.stringify(data, null, 2));

    // Save the image URL to your server
    // const response = await fetch('/api/save-image', {
    //   method: 'POST',
    //   body: JSON.stringify({ imageUrl: data.secure_url }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // }).then((response) => response.json());

    // setImageUrl(response.imageUrl);
  }

  return (
    <main className="bg-indigo-100 ">
      <div>
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
            className="flex items-center gap-4"
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

            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 my-4">
              Create
            </button>

            <br />
          </form>
        )}
      </div>

      <div className="flex justify-center items-center">
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
            className="my-8 margin-top: -20px"
            src={imageSrc}
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
