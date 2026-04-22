import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [],
  },
  experimental: {
    // allow .jfif served from /public
  },
};

export default nextConfig;
