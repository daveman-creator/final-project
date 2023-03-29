import './globals.css';
import {
  faPersonWalkingArrowRight,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Create School App',
  description: 'Generated by create school app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // #DFE0DF''
  return (
    <html lang="en">
      <body
        style={{ backgroundColor: '#dbb3b3' }}
        className="overflow-x-hidden overflow-y-auto h-screen"
      >
        <div className=" flex justify-between  items-center p-4 text-black">
          <Link href="/">
            <Image
              src="/image/Sky.jpg"
              width="100"
              height="50"
              alt="logo"
              className="text-2xl text-black hover:text-green-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer "
            />
          </Link>

          <ul className="flex space-x-20">
            {/* <li className="p-4  ">
              <Link href="/">
                <FontAwesomeIcon
                  icon={faHouseUser}
                  className="text-2xl text-black hover:text-blue-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer "
                />{' '}
                Home
              </Link>
            </li> */}
            <li className="p-2  ">
              <Link href="/landingpage">
                <FontAwesomeIcon
                  icon={faPersonWalkingArrowRight}
                  className="text-2xl text-black hover:text-green-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer "
                />
                get started
              </Link>
            </li>
            <li className="p-2  ">
              <Link href="/logout">
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className="text-2xl text-black hover:text-green-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer "
                />
                logout
              </Link>
            </li>
          </ul>
        </div>
        {children}
        {/* </main> */}
      </body>
    </html>
  );
}
