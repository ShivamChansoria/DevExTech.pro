import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  swcMinify: true,
  // Ensure Next.js knows where to find the app directory
  distDir: ".next",
};

export default nextConfig;
