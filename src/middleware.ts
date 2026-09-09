import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuth } from './lib/auth';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;

  // Protect /portal routes
  if (req.nextUrl.pathname.startsWith('/portal')) {
    // If it's the login page, allow access
    if (req.nextUrl.pathname === '/portal/login') {
      if (token) {
        try {
          await verifyAuth(token);
          // If valid token, redirect away from login to dashboard
          return NextResponse.redirect(new URL('/portal/dashboard', req.url));
        } catch (err) {
          // Invalid token, allow them to view login
          return NextResponse.next();
        }
      }
      return NextResponse.next();
    }

    // Protect all other /portal/* routes
    if (!token) {
      return NextResponse.redirect(new URL('/portal/login', req.url));
    }

    try {
      const verifiedToken = await verifyAuth(token);
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set('x-admin-id', verifiedToken.userId);
      requestHeaders.set('x-admin-role', verifiedToken.role);
      requestHeaders.set('x-admin-name', verifiedToken.name);
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (err) {
      // Token invalid or expired
      const response = NextResponse.redirect(new URL('/portal/login', req.url));
      response.cookies.delete('admin_token');
      return response;
    }
  }

  // Protect /api/admin routes (except login)
  if (req.nextUrl.pathname.startsWith('/api/admin') && req.nextUrl.pathname !== '/api/admin/auth/login') {
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    try {
      const verifiedToken = await verifyAuth(token);
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set('x-admin-id', verifiedToken.userId);
      requestHeaders.set('x-admin-role', verifiedToken.role);
      requestHeaders.set('x-admin-name', verifiedToken.name);
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (err) {
      return NextResponse.json({ error: 'Unauthorized or token expired' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/portal/:path*', '/api/admin/:path*'],
};
