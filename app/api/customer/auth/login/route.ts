import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/backend-api";

interface LoginUser {
  id: string;
  first_name: string;
  last_name: string;
  other_name: string | null;
  email: string;
  phone_no: string | null;
  profile_image: string | null;
  gender: string | null;
  status: string;
  full_name: string;
  role: string[];
  email_verified_at: string | null;
  two_factor_confirmed_at: string | null;
  created_at: string;
}

interface LoginSuccessResponse {
  code: number;
  message: string;
  data: {
    user: LoginUser;
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

    const backendResponse = await backendFetch("/customer/v1/auth/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = (await backendResponse.json()) as LoginSuccessResponse;

    if (!backendResponse.ok) {
      return NextResponse.json(result, {
        status: backendResponse.status,
      });
    }

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
          message: "The backend did not return an authentication token.",
        },
        {
          status: 502,
        },
      );
    }

    /**
     * Automatically send a fresh verification email
     * every time an unverified user logs in.
     */
    console.log(result);
    if (!result.data.user.email_verified_at) {
      alert("STRAT");
      try {
        await backendFetch("/customer/v1/account/security/email/verification", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        alert("ddd");
      } catch (err) {
        console.error("Unable to resend verification email:", err);
        // Don't fail login because of this.
      }
    }

    const { token: _token, ...safeData } = result.data;

    const response = NextResponse.json(
      {
        code: result.code,
        message: result.message,
        data: safeData,
      },
      {
        status: backendResponse.status,
      },
    );

    response.cookies.set({
      name: "shelfie_access_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    response.cookies.set({
      name: "shelfie_email_verified",
      value: result.data.user.email_verified_at ? "true" : "false",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Login proxy error:", error);

    return NextResponse.json(
      {
        code: 503,
        message: "The authentication server is currently unavailable.",
      },
      {
        status: 503,
      },
    );
  }
}
