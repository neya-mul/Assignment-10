import { NextResponse } from 'next/server'
import { auth } from './lib/auth'

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const isPrefetch =
    request.headers.get('x-middleware-prefetch') === '1' ||
    request.headers.get('purpose') === 'prefetch';

  const session = await auth.api.getSession({
    headers: request.headers
  });

  if (!session) {
    if (isPrefetch) {
      return new NextResponse(null, { status: 401 });
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/details/:path*', '/forumDetails/:path*'],
}