import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/backend-api";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const backendResponse = await backendFetch(
      "/customer/v1/account/security/email/verification",
      {
        method: "POST",
        authenticated: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    const result = await backendResponse.json();

    const response = NextResponse.json(result, {
      status: backendResponse.status,
    });

    // Verification succeeded
    if (backendResponse.ok) {
      response.cookies.set({
        name: "shelfie_email_verified",
        value: "true",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Unable to verify email." },
      { status: 500 },
    );
  }
}
