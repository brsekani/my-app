import { NextResponse } from "next/server";

import { backendFetch } from "@/lib/backend-api";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const slug = searchParams.get("slug");
    const domain = searchParams.get("domain");

    const params = new URLSearchParams();

    if (slug) {
      params.set("slug", slug);
    }

    if (domain) {
      params.set("domain", domain);
    }

    const response = await backendFetch(`/v1/store?${params.toString()}`, {
      method: "GET",
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Get public store error:", error);

    return NextResponse.json(
      {
        code: 500,
        message: "Unable to get store.",
      },
      {
        status: 500,
      },
    );
  }
}
