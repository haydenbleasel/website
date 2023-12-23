import { NextResponse } from 'next/server';
import type { NextMiddleware, NextRequest } from 'next/server';

export const middleware: NextMiddleware = (request: NextRequest) => {
  if (request.headers.get('host')?.includes('presumi.com')) {
    const url = new URL('/apps/presumi', process.env.NEXT_PUBLIC_SITE_URL);
    return NextResponse.redirect(url);
  }

  if (request.headers.get('host')?.includes('tryneutral.com')) {
    const url = new URL('/apps/neutral', process.env.NEXT_PUBLIC_SITE_URL);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
};
