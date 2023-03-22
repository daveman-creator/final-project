import './globals.css';
// import {
//   faHouseUser,
//   faPersonWalkingArrowRight,
//   faRightFromBracket,
// } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.scss';

export default function Home() {
  return (
    <main className="flex items-center justify-content h-screen mb-12 bg-fixed bg-center bg-cover custom-img">
      <div className="font-bold text-4xl items-center justify-content    ">
        Sky App
      </div>
    </main>
  );
}
