import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import LoginForm from './LoginForm';

type Props = { searchParams: { returnTo?: string | string[] } };

export default async function LoginPage(props: Props) {
  // check if I have a valid session
  const sessionTokenCookie = cookies().get('sessionToken');
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));
  // if I do, redirect to the profile page
  // if (!session) {
  //   redirect('/RegisterForm');
  // }
  //   // redirect('/profile/[username]');
  // }

  // if I don't, show the login form

  return <LoginForm returnTo={props.searchParams.returnTo} />;
}
