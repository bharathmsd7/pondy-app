import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isOnboardingCompleted = request.cookies.get('isOnboardingCompleted')?.value === 'true';
//   const loggedIn = request.cookies.get('loggedIn')?.value === 'true';
  const { pathname } = request.nextUrl;

  // Allow direct access to onboarding and auth routes
  if (pathname.startsWith('/onboarding') || pathname.startsWith('/auth')) {
    return NextResponse.next();
  }

  // Check onboarding status for root path
  if (pathname === '/') {
    if (!isOnboardingCompleted) {
      return NextResponse.redirect(new URL('/onboarding', request.url));
    }
    // if (!loggedIn) {
    //   return NextResponse.redirect(new URL('/auth/login', request.url));
    // }
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Protected routes check
//   if (!loggedIn && !pathname.startsWith('/auth')) {
//     return NextResponse.redirect(new URL('/auth/login', request.url));
//   }

  return NextResponse.next();
}

// Specify the paths where the middleware should run
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};