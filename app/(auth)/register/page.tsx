import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import RegisterForm from './RegisterForm';

type Props = { searchParams: { returnTo?: string | string[] } };

export default async function RegisterPage(props: Props) {
  // check if I have a valid session
  const sessionTokenCookie = cookies().get('sessionToken');
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));
  console.log('session', session);
  // if I do, redirect to the profile page
  // if (session) {
  //   // redirect('/login');
  //   redirect('/profile/[username]');
  // }

  return <RegisterForm returnTo={props.searchParams.returnTo} />;
}
