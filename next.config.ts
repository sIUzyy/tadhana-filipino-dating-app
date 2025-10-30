import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/images/**",
      },
    ],

    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;
