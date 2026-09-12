import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/backend-api";

export async function POST() {
  const backendResponse = await backendFetch(
    "/customer/v1/account/security/email/verification/resend",
    {
      method: "POST",
      authenticated: true,
    },
  );

  const result = await backendResponse.json();

  return NextResponse.json(result, {
    status: backendResponse.status,
  });
}
