import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: [
    '/((?!_next|static|favicon.ico|api|accessDenied).*)', // exclude access-denied too
  ],
}

export async function middleware(req: NextRequest) {
  
  try {
    const trustCheck = await fetch('http://localhost:8080/trust/score', {
      headers: {
        'User-Agent': req.headers.get('user-agent') || '',
        'X-Forwarded-For': '127.0.0.1',
      },
    });

    if (trustCheck.status === 403) {
      return NextResponse.redirect(new URL('/accessDenied', req.url));
    }

    return NextResponse.next();
  } catch (e) {
    return NextResponse.redirect(new URL('/accessDenied', req.url));
  }

  // return NextResponse.next();
}
