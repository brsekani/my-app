import { NextResponse } from "next/server";

import { backendFetch } from "@/lib/backend-api";

interface BackendRegistrationData {
  user?: unknown;

  /*
   * The backend may return one of these token names.
   * Keep only the one your backend actually uses after confirming it.
   */
  token?: string;
  access_token?: string;

  requires_email_verification?: boolean;
  email_verification_required?: boolean;

  [key: string]: unknown;
}

interface BackendRegistrationResponse {
  code?: number;
  message?: string;
  data?: BackendRegistrationData;

  [key: string]: unknown;
}

function getToken(
  data: BackendRegistrationData | undefined,
): string | undefined {
  return data?.token ?? data?.access_token;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Request Body:", body);

    const backendResponse = await backendFetch("/customer/v1/auth/register", {
      method: "POST",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(body),
    });

    const result =
      (await backendResponse.json()) as BackendRegistrationResponse;

    if (!backendResponse.ok) {
      return NextResponse.json(result, {
        status: backendResponse.status,
      });
    }

    console.log("Backend Status:", backendResponse.status);

    console.log("Backend Result:", result);

    const token = getToken(result.data);

    /*
     * Never return the Laravel token to browser JavaScript.
     */
    const safeData = result.data
      ? {
          ...result.data,
          token: undefined,
          access_token: undefined,
        }
      : undefined;

    const response = NextResponse.json(
      {
        ...result,
        data: safeData,
      },
      {
        status: backendResponse.status,
      },
    );

    /*
     * Some systems log the user in immediately after registration.
     * If Laravel returned a token, store it securely.
     *
     * If registration requires email verification and no token was
     * returned, no cookie will be created.
     */
    if (token) {
      response.cookies.set({
        name: "shelfie_access_token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",

        // Seven days — adjust to match backend policy.
        maxAge: 60 * 60 * 24 * 7,
      });
    }
    console.log(`response: ${response}`);
    return response;
  } catch (error) {
    console.error("Registration proxy error:", error);

    return NextResponse.json(
      {
        code: 500,
        message: "Unable to process the registration request.",
      },
      {
        status: 500,
      },
    );
  }
}
