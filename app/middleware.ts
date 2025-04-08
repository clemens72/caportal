// app/middleware.ts
import { auth } from '@/app/auth';
import { NextResponse } from 'next/server';

// Specify public routes that don't require authentication
const publicPaths = ['/', '/api/auth/signin', '/api/auth/callback/google']; // Add any other public routes

export default async function middleware(request: Request) {
  const url = new URL(request.url); // Create a URL object
  const isAuth = await auth();

  const isPublicRoute = publicPaths.includes(url.pathname); // Use url.pathname

  if (isPublicRoute) {
    if (isAuth) return NextResponse.redirect(new URL('/dashboard', request.url)); // Redirect logged-in users from public routes to dashboard
    return NextResponse.next();
  }

  if (!isAuth) {
    return NextResponse.redirect(new URL(`/api/auth/signin?callbackUrl=${url.pathname}`, request.url)); // Use url.pathname
  }

  return NextResponse.next();
}

// Configuration to run middleware on all routes except the ones starting with _next, static, or favicon.ico
export const config = {
  matcher: [
    '/((?!_next).*)',
    '/((?!static|favicon\\.ico).*)',
  ],
};