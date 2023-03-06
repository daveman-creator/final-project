// import styles from './page.module.css';
// const inter = Inter({ subsets: ['latin'] });
import './globals.scss';
// import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div>School App</div>
      <Image
        src="/image/Schoolpage.jpg"
        width="400"
        height="400"
        alt="Schoolpage"
      />
      <hr />
      <Link href="/login">
        <button>Teacher</button>
      </Link>
      <hr />

      <button>Student</button>

      <hr />
      <button>Parent</button>

      <hr />
    </main>
  );
}
