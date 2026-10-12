import { NextResponse } from "next/server";

import { backendFetch } from "@/lib/backend-api";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await backendFetch(
      "/customer/v1/account/security/password/confirmation",
      {
        method: "POST",
        authenticated: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Confirm password change error:", error);

    return NextResponse.json(
      {
        code: 500,
        message: "Unable to update password.",
      },
      {
        status: 500,
      },
    );
  }
}
