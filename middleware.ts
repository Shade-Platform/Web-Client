import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: ['/((?!_next|static|favicon.ico|api).*)'], // apply to all routes except Next internals and API routes
}

export async function middleware(req: NextRequest) {
  const res = await fetch('http://localhost:8080/trust/score', {
    headers: {
      'User-Agent': req.headers.get('user-agent') || '',
      'X-Forwarded-For': req.headers.get('x-forwarded-for') || '',
    },
  })

  if (res.status === 403) {
    // Block access — redirect to error page
    return NextResponse.redirect(new URL('/access-denied', req.url))
  }

  return NextResponse.next()
}
