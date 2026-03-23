import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const role = request.cookies.get('user_role')?.value;
  const path = request.nextUrl.pathname;

  // 1. Logic cho trang Login
  if (path.startsWith('/login')) {
    if (token) {
      return NextResponse.redirect(new URL('/admin/telesales', request.url));
    }
    return NextResponse.next();
  }

  // 2. Bảo vệ các trang Admin và Dashboard
  if (path.startsWith('/admin') || path.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Role check (ví dụ)
    if (path.startsWith('/admin/system-config') && role !== 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/admin/telesales', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/login'
  ],
};
