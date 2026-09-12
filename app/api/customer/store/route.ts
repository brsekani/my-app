import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/backend-api";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const backendResponse = await backendFetch("/customer/v1/store", {
      method: "POST",
      authenticated: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await backendResponse.json();

    return NextResponse.json(result, {
      status: backendResponse.status,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Unable to create store.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET() {
  const response = await backendFetch("/customer/v1/store", {
    method: "GET",
    authenticated: true,
  });

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}
