import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.113"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.lumished.com",
      },
    ],
  },
};

export default nextConfig;
