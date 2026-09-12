import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/backend-api";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_: Request, { params }: Params) {
  const { id } = await params;

  const backendResponse = await backendFetch(`/customer/v1/products/${id}`, {
    method: "GET",
    authenticated: true,
  });

  const result = await backendResponse.json();

  return NextResponse.json(result, {
    status: backendResponse.status,
  });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const formData = await request.formData();

    const backendResponse = await backendFetch(`/customer/v1/products/${id}`, {
      method: "PUT",
      authenticated: true,
      body: formData,
    });

    const result = await backendResponse.json();

    return NextResponse.json(result, {
      status: backendResponse.status,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Unable to update product." },
      { status: 500 },
    );
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    const { id } = await params;

    const backendResponse = await backendFetch(`/customer/v1/products/${id}`, {
      method: "DELETE",
      authenticated: true,
    });

    const result = await backendResponse.json();

    return NextResponse.json(result, {
      status: backendResponse.status,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Unable to delete product.",
      },
      {
        status: 500,
      },
    );
  }
}
