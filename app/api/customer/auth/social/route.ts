import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/backend-api";

interface SocialLoginResponse {
  code: number;
  message: string;
  data: {
    user: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      email_verified_at: string | null;
      role: string | string[];
      [key: string]: unknown;
    };
    token?: string;
    roles: string[];
    permissions: string[];
    challenge_token?: string;
    requires_two_factor?: boolean;
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (
      body.provider !== "GOOGLE" ||
      typeof body.access_token !== "string" ||
      !body.access_token
    ) {
      return NextResponse.json(
        {
          code: 422,
          message: "A valid Google authentication token is required.",
        },
        { status: 422 },
      );
    }

    const backendResponse = await backendFetch("/customer/v1/auth/social", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = (await backendResponse.json()) as SocialLoginResponse;

    if (!backendResponse.ok) {
      return NextResponse.json(result, {
        status: backendResponse.status,
      });
    }

    // Handle two-factor authentication if your backend requires it.
    if (result.data.challenge_token || result.data.requires_two_factor) {
      return NextResponse.json(result, {
        status: backendResponse.status,
      });
    }

    const token = result.data.token;

    if (!token) {
      return NextResponse.json(
        {
          code: 502,
          message: "The authentication server did not return a token.",
        },
        { status: 502 },
      );
    }

    // Keep the Sanctum token out of the browser's JavaScript.
    const { token: _token, ...safeData } = result.data;

    const response = NextResponse.json(
      {
        code: result.code,
        message: result.message,
        data: safeData,
      },
      { status: backendResponse.status },
    );

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    };

    response.cookies.set({
      name: "shelfie_access_token",
      value: token,
      ...cookieOptions,
    });

    response.cookies.set({
      name: "shelfie_email_verified",
      value: result.data.user.email_verified_at ? "true" : "false",
      ...cookieOptions,
    });

    return response;
  } catch (error) {
    console.error("Social authentication error:", error);

    return NextResponse.json(
      {
        code: 500,
        message: "Unable to authenticate with social provider.",
      },
      { status: 500 },
    );
  }
}
