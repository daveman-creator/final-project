import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: '/logout',
};

export function middleware(request) {
  // creating a new headers object
  const requestHeaders = new Headers(request.headers);

  const sessionToken = request.cookies.get('sessionToken')?.value;

  if (sessionToken) {
    requestHeaders.set('x-sessionToken-to-delete', sessionToken);
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // delete the cookie

  response.cookies.set({
    name: 'sessionToken',
    maxAge: -1,
  });

  return response;
}
