import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow large image files (up to 10MB)
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
};

export default nextConfig;
