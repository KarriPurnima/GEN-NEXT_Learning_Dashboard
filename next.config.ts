import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for catching bugs early
  reactStrictMode: true,

  // Image optimization — allow Supabase storage domain if needed later
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },

  // Experimental: enable partial prerendering for future optimization
  experimental: {
    // ppr: true, // Uncomment when stable in Next.js 15
  },
};

export default nextConfig;