'use client';
import { useState } from 'react';

export default function TeacherInput() {
  const [createGrade, setCreateGrade] = useState('');
  const [generateGradeCode, setGenerateGradeCode] = useState('');
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
      <button>Add Students</button>
    </>
  );
}
