import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import StudentLoginForm from './StudentLoginForm';

type Props = { searchParams: { returnTo?: string | string[] } };

export default async function StudentLoginPage(props: Props) {
  // check if I have a valid session
  const sessionTokenCookie = cookies().get('sessionToken');
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));
  // if I do, redirect to the profile page
  // if (session) {
  //   // redirect('/login');
  //   redirect('/profile/[username]');
  // }

  // if I don't, show the login form

  return <StudentLoginForm returnTo={props.searchParams.returnTo} />;
}
