// app/api/customer/store/products/route.ts

import { NextRequest, NextResponse } from "next/server";
import { backendFetch } from "@/lib/backend-api";
import { cookies } from "next/headers";
import { request } from "http";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.search;

  const backendResponse = await backendFetch(`/customer/v1/products${query}`, {
    method: "GET",
    authenticated: true,
  });

  const result = await backendResponse.json();

  return NextResponse.json(result, {
    status: backendResponse.status,
  });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const backendResponse = await backendFetch("/customer/v1/products", {
      method: "POST",
      authenticated: true,
      body: formData,
    });

    console.log("Response:", backendFetch);

    const result = await backendResponse.json();

    return NextResponse.json(result, {
      status: backendResponse.status,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Unable to create product.",
      },
      {
        status: 500,
      },
    );
  }
}
