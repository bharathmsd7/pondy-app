import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const loggedIn = request.cookies.get('loggedIn')?.value === 'true';

  // Allow navigation to /auth if not logged in
  if (!loggedIn && (request.nextUrl.pathname.startsWith('/auth'))) {
    return NextResponse.next(); // Allow access to /auth
  }

  if (loggedIn) {
    // If the user is logged in, redirect to /home
    return NextResponse.redirect(new URL('/home', request.url));
  } else {
    // If the user is not logged in, redirect to /auth
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

// Specify the paths where the middleware should run
export const config = {
  matcher: ['/'], // Apply middleware to the root path
}; 