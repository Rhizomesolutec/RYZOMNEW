import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel image optimization returns 402 on this project — serve public
  // assets directly so /Images/services/* and logos stay visible in production.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
