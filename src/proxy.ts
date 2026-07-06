import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";
import { cookies } from "next/headers";
const protectedRoutes = ['/dashboard', '/workspaces', '/board'];
const publicRoutes = ['/login', '/register', '/']
export default async function proxy(request: NextRequest) {
    //Check if current route is protected or public
    const path = request.nextUrl.pathname
    const isProtected = protectedRoutes.some(route => path.startsWith(route));
    const isPublic = publicRoutes.includes(path)
    //Decrypt the session from the cookie
    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie);
    //Redirect to login if user not authenticated.
    if (isProtected && !session?.userId) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
    //Redirect to /dashboard if user is authenticated.
    if (isPublic && session?.userId
        && !request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    return response;
}
// Routes Proxy should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}