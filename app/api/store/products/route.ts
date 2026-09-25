import { NextResponse } from "next/server";

import { backendFetch } from "@/lib/backend-api";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const params = new URLSearchParams();

    const slug = searchParams.get("slug");
    const domain = searchParams.get("domain");
    const page = searchParams.get("page");
    const perPage = searchParams.get("per_page");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sort_by");
    const sortOrder = searchParams.get("sort_order");

    if (slug) params.set("slug", slug);
    if (domain) params.set("domain", domain);
    if (page) params.set("page", page);
    if (perPage) params.set("per_page", perPage);
    if (search) params.set("search", search);
    if (sortBy) params.set("sort_by", sortBy);
    if (sortOrder) params.set("sort_order", sortOrder);

    const response = await backendFetch(
      `/v1/store/products?${params.toString()}`,
      {
        method: "GET",
      },
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Get public store products error:", error);

    return NextResponse.json(
      {
        code: 500,
        message: "Unable to get store products.",
      },
      {
        status: 500,
      },
    );
  }
}
