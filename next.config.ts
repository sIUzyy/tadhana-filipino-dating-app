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

    domains: ["randomuser.me"],
  },
};

export default nextConfig;
