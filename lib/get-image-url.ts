// lib/get-image-url.ts

const backendUrl = process.env.NEXT_PUBLIC_SHELFIE_BACKEND_URL!;

export function getImageUrl(path?: string | null) {
  if (!path) return "/global-bag.png";

  if (path.startsWith("http")) {
    return path;
  }

  return `${backendUrl}/${path.replace(/^\/+/, "")}`;
}
