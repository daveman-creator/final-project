import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className=" flex flex-col items-center justify-content min-h-screen mb-12 bg-fixed bg-center bg-cover bg-indigo-100  scroll-behavior: smooth">
      <div className=" font-bold text-4xl md:text-5xl mt-10  mb-10 z-10">
        Sky App
      </div>
      <Image
        src="/image/Schoolpage.jpg"
        width="600"
        height="600"
        alt="Schoolpage"
      />
      <hr className="my-10 w-1/2 border-t border-gray-300" />
      <Link
        href="/login"
        className="w-full md:w-1/2 lg:w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 text-center my-2"
      >
        <button className="text-center">Teacher</button>
      </Link>
      {/* <hr className="my-10 w-1/2 border-t border-gray-300" /> */}
      <Link
        href="/studentLogin"
        className="w-full md:w-1/2 lg:w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 text-center my-2"
      >
        <button className="text-center">Student</button>
      </Link>
      {/* <hr className="my-10 w-1/2 border-t border-gray-300" /> */}
      <button className="w-full md:w-1/2 lg:w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 text-center my-2">
        Parent
      </button>
    </main>
  );
}
