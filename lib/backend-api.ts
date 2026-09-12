import { cookies } from "next/headers";

const backendUrl = process.env.SHELFIE_BACKEND_URL;

if (!backendUrl) {
  throw new Error("SHELFIE_BACKEND_URL is missing from .env.local");
}

interface BackendFetchOptions extends RequestInit {
  authenticated?: boolean;
}

export async function backendFetch(
  path: string,
  options: BackendFetchOptions = {},
): Promise<Response> {
  const {
    authenticated = false,
    headers: suppliedHeaders,
    body,
    ...requestOptions
  } = options;

  const headers = new Headers(suppliedHeaders);

  headers.set("Accept", "application/json");

  // Only set JSON content type when NOT uploading files
  if (!(body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (authenticated) {
    const cookieStore = await cookies();

    const token = cookieStore.get("shelfie_access_token")?.value;
    console.log(`token: ${token}`);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const normalizedBaseUrl = backendUrl.endsWith("/")
    ? backendUrl.slice(0, -1)
    : backendUrl;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  const url = `${normalizedBaseUrl}${normalizedPath}`;

  console.log("Base URL:", normalizedBaseUrl);
  console.log("Path:", normalizedPath);
  console.log("Final URL:", url);

  return fetch(url, {
    ...requestOptions,
    body,
    headers,
    cache: "no-store",
  });
}
