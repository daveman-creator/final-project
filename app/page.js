import './globals.css';
import Image from 'next/image';

// import {
//   faHouseUser,
//   faPersonWalkingArrowRight,
//   faRightFromBracket,
// } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-content min-h-screen mb-12 bg-fixed bg-center bg-cover bg-indigo-100 custom-img">
      <div className="font-bold text-4xl md:text-6xl mt-10  ">Sky</div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '50px',
          alignItems: 'center',
          justifyItems: 'center',
        }}
      >
        {/* text-lg */}
        <div className="p-8  text-center block font-bold text-4xl">
          <hi className="py-4">
            Sky is an app designed to improve communication and collaboration
            between teachers, students, and parents. It provides a platform for
            teachers to share important information with their students, such as
            assignments, deadlines, and course materials. It also allows
            teachers to communicate with parents and keep them informed of their
            child's progress. Overall, Sky is a valuable tool by providing a
            centralized platform for sharing information and staying connected,
            it helps to support academic success and promote engagement in
            education.
          </hi>
          <p className="italic font-normal">
            Check out our App by Registering. Click on the button "get started"
            above
          </p>
        </div>
        <div>
          <Image
            src="/image/Sky.jpg"
            width="700"
            height="600"
            alt="Sky"
            className="text-2xl

             "
          />
          {/* text-black hover:text-blue-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer */}
        </div>
      </div>
    </main>
  );
}
// text-4xl items-center justify-contentfont-bold text-6xl mt-10
