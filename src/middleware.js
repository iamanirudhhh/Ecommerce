import { NextResponse } from 'next/server' 

export function middleware(request) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/verifyemail' || path === '/signup' || path === '/login' || path === '/forgotPassword' || 
    path === '/change-password' || path === '/access-denied' || path === '/'

  const token = request.cookies.get('next-auth.session-token')?.value || ''

  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
    
}

export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/add-product',
    '/products',
    '/account/:path*',
    '/verifyemail',
    '/login',
    '/signup',
    '/forgotPassword',
    '/change-password',
    '/access-denied'  
    ]
}