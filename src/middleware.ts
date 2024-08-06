import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const hasCookie = cookieStore.has("id");
  const url = request.nextUrl;

  if (
    hasCookie &&
    (url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/verify") ||
      url.pathname === "/")
  )
    return NextResponse.redirect(new URL("/SelectProfile", request.url));
  const isAdmin = cookieStore.has("admin");

  if (hasCookie && url.pathname.startsWith("/createMovie") && !isAdmin) {
    return NextResponse.redirect(new URL("/SelectProfile", request.url));
  }

  if (
    !hasCookie &&
    (url.pathname.startsWith("/browse") ||
      url.pathname.startsWith("/watch") ||
      url.pathname.startsWith("/info") ||
      url.pathname.startsWith("/createMovie") ||
      url.pathname.startsWith("/createProfile") ||
      url.pathname.startsWith("/SelectProfile") ||
      url.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: [
    "/sign-up",
    "/sign-in",
    "/browse",
    "/info",
    "/watch",
    "/",
    "/verify/:path*",
    "/createMovie",
    "/createMovie/deleteMovie",
    "/createMovie/updateMovie",
    "/createProfile",
    "/SelectProfile",
  ],
};
