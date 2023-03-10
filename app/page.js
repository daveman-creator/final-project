import './globals.scss';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.div}>School App</div>
      <Image
        src="/image/Schoolpage.jpg"
        width="400"
        height="400"
        alt="Schoolpage"
      />
      <hr className={styles.hr} />
      <Link className={styles.Link} href="/login">
        <button className={styles.button}>Teacher</button>
      </Link>

      <hr className={styles.hr} />
      <Link className={styles.Link} href="/studentLogin">
        <button className={styles.button}> Student</button>
      </Link>

      <hr className={styles.hr} />

      <button className={styles.button}>Parent</button>

      <hr className={styles.hr} />
    </main>
  );
}
