import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getUserBySessionToken } from '../../../database/users';

export async function Get() {
  // 1. get the user
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');
  // 2. validate the user
  // 3. get the user profile matching the session
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({ error: 'user not found' });
  }
  // 4. return the user profile
  return NextResponse.json(user);
}
