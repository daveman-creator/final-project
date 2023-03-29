// import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="bg-indigo-100  min-h-screen flex flex-col  items-center ">
      <div className="text-8xl font-bold mb-10 mt-20">Sky App</div>
      <div className="container mx-auto flex flex-row justify-center items-start mb-10 space-y-10 md:space-y-0 md:space-x-10 mb-10 mt-10">
        <div className=" w-full md:w-1/2 p-6 border-4 border-gray-400 rounded-lg mb-6 md:mb-0">
          <div className="mb-10">
            <h1 className="text-5xl font-bold mb-2 text-center">Teacher</h1>

            <p className="text-lg mb-6  text-center">
              Create a class and a class code. Add students and Post to your
              class . Click the button below to login
            </p>
            <Link href="/login" className="flex justify-center">
              <button className="text-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                Teacher
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-6 border-4 border-gray-400 rounded-lg mb-6 md:mb-0">
          <div className="mb-10">
            <h1 className="text-5xl font-bold mb-2 text-center">Student</h1>
            <p className="text-lg mb-6 text-center">
              Keep up to date with your class. Get notified when your teacher
              post. Click the button below to login
            </p>

            <Link href="/studentLogin" className="flex justify-center">
              <button className="text-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer ">
                Student
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-6 border-4 border-gray-400 rounded-lg mb-6 md:mb-0">
          <div className="mb-10">
            <h1 className="text-5xl font-bold mb-2 text-center">Parent</h1>
            <p className="text-lg mb-6 text-center">
              Keep up to date with your child. Get notified when your child
              post. Click the button below to login
            </p>
            {/* <hr className="my-10 w-1/2 border-t border-gray-300" /> */}
            <Link href="/login" className="flex justify-center">
              <button className="text-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                Parent
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
// {/* <main className=" flex flex-col items-center justify-content min-h-screen mb-12 bg-fixed bg-center bg-cover bg-indigo-100  scroll-behavior: smooth">
//       <div className=" font-bold text-4xl md:text-5xl mt-10  mb-10 z-10">
//         Sky App
//       </div>
//       <Image
//         src="/image/Schoolpage.jpg"
//         width="600"
//         height="600"
//         alt="Schoolpage"
//       />
//       <hr className="my-10 w-1/2 border-t border-gray-300" />
//       <Link
//         href="/login"
//         className="w-full md:w-1/2 lg:w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 text-center my-2"
//       >
//         <button className="text-center">Teacher</button>
//       </Link>
//       {/* <hr className="my-10 w-1/2 border-t border-gray-300" /> */}
//       <Link
//         href="/studentLogin"
//         className="w-full md:w-1/2 lg:w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 text-center my-2"
//       >
//         <button className="text-center">Student</button>
//       </Link>
//       {/* <hr className="my-10 w-1/2 border-t border-gray-300" /> */}
//       <button className="w-full md:w-1/2 lg:w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 text-center my-2">
//         Parent
//       </button>
//     </main> */}
