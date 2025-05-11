import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // For testing purposes, we'll allow all access
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth'],
};