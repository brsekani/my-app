import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.113"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "0838-102-90-126-188.ngrok-free.app",
      },
    ],
  },
};

export default nextConfig;
