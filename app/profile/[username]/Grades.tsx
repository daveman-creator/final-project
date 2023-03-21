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
  const [error, setError] = useState<{ message: string }[]>([]);
  const [imageSrc, setImageSrc] = useState<string>();
  const [uploadData, setUploadData] = useState<string>();
  const [imageUrl, setImageUrl] = useState<string>();
  const router = useRouter();

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleOnSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === 'file',
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
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
    // setUploadData(data);

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
                imageUrl: imageSrc,
                gradeName,
                gradeCode,
              }),
              // email,
            });

            // const data: GradesResponseBody = await response.json();

            // if ('errors' in data) {
            //   setErrors(data.errors);
            //   return;
            // }
            // router.refresh();

            const data = await response.json();
            if (data.error) {
              setError(data.error);
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
      <form method="POST" onChange={handleOnChange} onSubmit={handleOnSubmit}>
        <p>
          <input type="file" name="file" />
        </p>
        <img src={imageSrc} width="430" height="300" alt="" />
        {imageSrc && !uploadData && (
          <p>
            <button>Upload Files</button>
          </p>
        )}
        {uploadData && (
          <code>
            <pre>{JSON.stringify(uploadData, null, 2)}</pre>
          </code>
        )}
      </form>
    </>
  );
}
