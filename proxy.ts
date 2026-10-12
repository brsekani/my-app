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
  // Authentication cookies
  // --------------------------------------------------

  const token = request.cookies.get("shelfie_access_token")?.value;

  const emailVerified =
    request.cookies.get("shelfie_email_verified")?.value === "true";

  const isAuthenticated = Boolean(token);

  // --------------------------------------------------
  // Route definitions
  // --------------------------------------------------

  const isHomeRoute = pathname === "/";

  const isLoginRoute = pathname === "/login";

  const isVerificationRoute = pathname.startsWith(
    "/create-account/verify-email",
  );

  const isSetupShopRoute = pathname.startsWith("/setup-shop");

  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/products") ||
    pathname.startsWith("/settings");

  const isAuthRoute =
    isLoginRoute ||
    pathname.startsWith("/forgot-password") ||
    (pathname.startsWith("/create-account") && !isVerificationRoute);

  // --------------------------------------------------
  // Unauthenticated users
  // --------------------------------------------------

  if (!isAuthenticated) {
    if (isProtectedRoute || isVerificationRoute) {
      const loginUrl = new URL("/login", request.url);

      // Preserve the destination after login.
      loginUrl.searchParams.set("redirect", pathname + request.nextUrl.search);

      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // --------------------------------------------------
  // Email verification
  // --------------------------------------------------

  if (!emailVerified) {
    // Unverified users should be allowed to verify their email
    // and access authentication-related pages.
    if (isVerificationRoute || isAuthRoute) {
      return NextResponse.next();
    }

    // Require verification before accessing the store,
    // dashboard, or other authenticated application pages.
    return NextResponse.redirect(
      new URL("/create-account/verify-email", request.url),
    );
  }

  // --------------------------------------------------
  // Authenticated and verified users
  // --------------------------------------------------

  // Don't check store status on login, signup, password recovery,
  // or email verification pages.
  if (isAuthRoute || isVerificationRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // --------------------------------------------------
  // Check the authenticated user's store
  // --------------------------------------------------

  const storeResponse = await fetch(
    new URL("/api/customer/store", request.url),
    {
      method: "GET",
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
      cache: "no-store",
    },
  );

  // --------------------------------------------------
  // Invalid or expired authentication
  // --------------------------------------------------

  if (storeResponse.status === 401) {
    const response = NextResponse.redirect(new URL("/login", request.url));

    response.cookies.delete("shelfie_access_token");
    response.cookies.delete("shelfie_email_verified");

    return response;
  }

  // --------------------------------------------------
  // Customer has no store
  // --------------------------------------------------

  if (storeResponse.status === 404) {
    if (isSetupShopRoute) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/setup-shop", request.url));
  }

  // --------------------------------------------------
  // Unexpected store API failure
  // --------------------------------------------------

  if (!storeResponse.ok) {
    console.error("Unable to verify customer store:", storeResponse.status);

    // Fail closed for routes requiring a valid store.
    // Don't incorrectly redirect users to setup when the API
    // is unavailable or returns an unexpected error.
    if (isProtectedRoute || isSetupShopRoute || isHomeRoute) {
      return new NextResponse(
        "Unable to verify your store right now. Please try again.",
        {
          status: 503,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-store",
          },
        },
      );
    }

    return NextResponse.next();
  }

  // --------------------------------------------------
  // Customer already has a store
  // --------------------------------------------------

  if (isSetupShopRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // --------------------------------------------------
  // Homepage routing
  // --------------------------------------------------

  if (isHomeRoute) {
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
