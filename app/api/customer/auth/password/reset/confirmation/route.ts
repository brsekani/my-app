import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.SHELFIE_BACKEND_URL;

export async function POST(request: NextRequest) {
  try {
    if (!API_URL) {
      return NextResponse.json(
        {
          code: 500,
          message: "LARAVEL_API_URL is not configured",
        },
        { status: 500 },
      );
    }

    const body = await request.json();

    const response = await fetch(
      `${API_URL}/customer/v1/auth/password/reset/confirmation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Password reset confirmation error:", error);

    return NextResponse.json(
      {
        code: 500,
        message: "Unable to reset password",
      },
      { status: 500 },
    );
  }
}
