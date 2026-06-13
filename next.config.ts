// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,   // ignore ESLint errors on build
  },
  typescript: {
    ignoreBuildErrors: true,    // ignore TypeScript errors on build
  },
};

export default nextConfig;