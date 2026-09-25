import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --------------------------------------------------
  // Temporary design mode
  // --------------------------------------------------

  const DESIGN_MODE = false;

  if (
    DESIGN_MODE &&
    (pathname.startsWith("/dashboard") ||
      pathname.startsWith("/products") ||
      pathname.startsWith("/settings"))
  ) {
    return NextResponse.next();
  }

  // --------------------------------------------------
  // Cookies
  // --------------------------------------------------

  const token = request.cookies.get("shelfie_access_token")?.value;

  const emailVerified =
    request.cookies.get("shelfie_email_verified")?.value === "true";

  const isAuthenticated = Boolean(token);

  // --------------------------------------------------
  // Routes
  // --------------------------------------------------

  const isVerificationRoute = pathname.startsWith(
    "/create-account/verify-email",
  );

  const isSetupShopRoute = pathname.startsWith("/setup-shop");

  const isHomeRoute = pathname === "/";

  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/products") ||
    pathname.startsWith("/settings");

  const isAuthRoute =
    pathname === "/login" ||
    pathname.startsWith("/forgot-password") ||
    (pathname.startsWith("/create-account") && !isVerificationRoute);

  // --------------------------------------------------
  // Not authenticated
  // --------------------------------------------------

  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!isAuthenticated && isVerificationRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // --------------------------------------------------
  // Authenticated but email not verified
  // --------------------------------------------------

  if (isAuthenticated && !emailVerified && isProtectedRoute) {
    return NextResponse.redirect(
      new URL("/create-account/verify-email", request.url),
    );
  }

  // --------------------------------------------------
  // Home
  // --------------------------------------------------

  if (isAuthenticated && isHomeRoute) {
    return NextResponse.redirect(
      new URL(
        emailVerified ? "/dashboard" : "/create-account/verify-email",
        request.url,
      ),
    );
  }

  // --------------------------------------------------
  // IMPORTANT:
  // Don't check the store while on auth pages.
  //
  // Otherwise an expired token can make:
  //
  // /login → /dashboard → 401 → /login → ...
  // --------------------------------------------------

  if (
    isAuthenticated &&
    emailVerified &&
    !isAuthRoute &&
    !isVerificationRoute
  ) {
    const storeResponse = await fetch(
      new URL("/api/customer/store", request.url),
      {
        headers: {
          cookie: request.headers.get("cookie") ?? "",
        },
        cache: "no-store",
      },
    );

    // --------------------------------------------------
    // Token is invalid / expired
    // --------------------------------------------------

    if (storeResponse.status === 401) {
      const response = NextResponse.redirect(new URL("/login", request.url));

      response.cookies.delete("shelfie_access_token");
      response.cookies.delete("shelfie_email_verified");

      return response;
    }

    // --------------------------------------------------
    // Store does not exist
    // --------------------------------------------------

    const hasStore = storeResponse.status !== 404;

    if (!hasStore && !isSetupShopRoute) {
      return NextResponse.redirect(new URL("/setup-shop", request.url));
    }

    if (hasStore && isSetupShopRoute) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // --------------------------------------------------
  // Authenticated users shouldn't see auth pages
  // --------------------------------------------------

  if (
    isAuthenticated &&
    emailVerified &&
    (isAuthRoute || isVerificationRoute)
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/products/:path*",
    "/settings/:path*",
    "/setup-shop/:path*",
    "/login",
    "/create-account/:path*",
    "/forgot-password/:path*",
  ],
};
