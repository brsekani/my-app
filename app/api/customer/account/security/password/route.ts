import { NextResponse } from "next/server";

import { backendFetch } from "@/lib/backend-api";

export async function PATCH() {
  try {
    const response = await backendFetch(
      "/customer/v1/account/security/password",
      {
        method: "PATCH",
        authenticated: true,
      },
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Initiate password change error:", error);

    return NextResponse.json(
      {
        code: 500,
        message: "Unable to initiate password change.",
      },
      {
        status: 500,
      },
    );
  }
}
