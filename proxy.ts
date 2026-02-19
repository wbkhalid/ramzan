import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/login"];
const ADMIN_ROUTES = ["/update-location", "/new-location"]; // pages only Admin can access

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;

  /* --------------------------------------------------
   * 1. Ignore API, Next internals, and static assets
   * -------------------------------------------------- */
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/icons") ||
    pathname.startsWith("/fonts") ||
    pathname === "/favicon.ico" ||
    pathname.match(/\.(png|jpg|jpeg|svg|webp|gif|ico|css|js)$/)
  ) {
    return NextResponse.next();
  }

  /* --------------------------------------------------
   * 2. Not logged in → protect private routes
   * -------------------------------------------------- */
  // If user is NOT logged in and trying to access protected route
  if (!token && !PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  /* --------------------------------------------------
   * 3. Logged in → block login/register
   * -------------------------------------------------- */
  // If user IS logged in and trying to access login page
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  /* --------------------------------------------------
   * 4. Role-based restriction
   * -------------------------------------------------- */
  if (role === "User" && ADMIN_ROUTES.includes(pathname)) {
    // Optionally, redirect to home or a 403 page
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

/* --------------------------------------------------
 * 4. Matcher (VERY IMPORTANT)
 * -------------------------------------------------- */
export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
