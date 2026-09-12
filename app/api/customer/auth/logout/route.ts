import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/backend-api";

export async function DELETE() {
  const backendResponse = await backendFetch("/customer/v1/auth/sessions", {
    method: "DELETE",
    authenticated: true,
  });

  const result = await backendResponse.json();

  const response = NextResponse.json(result, {
    status: backendResponse.status,
  });

  // Remove the HTTP-only cookie
  response.cookies.delete("shelfie_access_token");
  response.cookies.delete("shelfie_email_verified");

  return response;
}
