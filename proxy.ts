import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("shelfie_access_token")?.value;
  const emailVerified =
    request.cookies.get("shelfie_email_verified")?.value === "true";

  const { pathname } = request.nextUrl;

  const isAuthenticated = Boolean(token);

  const isVerificationRoute = pathname.startsWith(
    "/create-account/verify-email",
  );
  const isSetupShopRoute = pathname.startsWith("/setup-shop");
  const isHomeRoute = pathname === "/";

  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/products") ||
    pathname.startsWith("/settings");

  // Auth pages (excluding verify-email)
  const isAuthRoute =
    pathname === "/login" ||
    pathname.startsWith("/forgot-password") ||
    (pathname.startsWith("/create-account") && !isVerificationRoute);

  // -------------------------
  // Not logged in
  // -------------------------

  // Can't access protected pages
  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Can't access verify page without logging in
  if (!isAuthenticated && isVerificationRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // -------------------------
  // Logged in but email NOT verified
  // -------------------------

  if (isAuthenticated && !emailVerified && isProtectedRoute) {
    return NextResponse.redirect(
      new URL("/create-account/verify-email", request.url),
    );
  }

  if (isAuthenticated && isHomeRoute) {
    return NextResponse.redirect(
      new URL(
        emailVerified ? "/dashboard" : "/create-account/verify-email",
        request.url,
      ),
    );
  }

  // -------------------------
  // Logged in and verified
  // Check if store exists
  // -------------------------

  if (isAuthenticated && emailVerified) {
    const storeResponse = await fetch(
      new URL("/api/customer/store", request.url),
      {
        headers: {
          cookie: request.headers.get("cookie") ?? "",
        },
      },
    );

    const hasStore = storeResponse.status !== 404;

    if (!hasStore && !isSetupShopRoute) {
      return NextResponse.redirect(new URL("/setup-shop", request.url));
    }

    if (hasStore && isSetupShopRoute) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

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
