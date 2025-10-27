import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "raw.githubusercontent.com",
      "images.unsplash.com",
      "randomuser.me",
      "tailwindcss.com",
      "placehold.co",
    ],
  },
};

export default nextConfig;
