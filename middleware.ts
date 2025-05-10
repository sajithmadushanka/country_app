import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === '/auth/signin' || 
                      path.startsWith('/api/auth') || 
                      path.startsWith('/_next') || 
                      path === '/favicon.ico';

  // Redirect authenticated users away from auth pages
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirect unauthenticated users to signin page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};