// import './globals.css';

import { cookies } from 'next/headers';
import Link from 'next/link';
import { NextResponse } from 'next/server';
import { getUserBySessionToken } from '../database/users';

export const metadata = {
  title: 'Create School App',
  description: 'Generated by create school app',
};
// async
export default function RootLayout({ children }) {
  // const cookieStore = cookies();
  // const token = cookieStore.get('sessionToken');
  // // 2. validate the user
  // // 3. get the user profile matching the session
  // const user = token && (await getUserBySessionToken(token.value));

  return (
    <html lang="en">
      <body>
        {/* <Link href="/register">register</Link>
        <Link href="/login">login</Link> */}
        {/* (we want to disable prefetching for the logout link) */}
        {/* <Link href="/logout" prefetch={false}>logout</Link> */}
        {/* {user && user.username} */}
        {children}
      </body>
    </html>
  );
}
