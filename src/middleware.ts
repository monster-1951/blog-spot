import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/register", "/login", "/", "/dashboard/:path*"],
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;
  // Redirect to dashboard if the user is already authenticated and trying to access sign-in, sign-up, or home page

  // if (
  //   token &&
  //   (url.pathname.startsWith("/register") ||
  //     url.pathname.startsWith("/login") )
  // ) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  // if (
  //   !token &&
  //   (url.pathname.startsWith("/") || url.pathname === "/")
  // ) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
  return NextResponse.next();
}
