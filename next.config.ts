import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  cacheComponents: true,
  reactCompiler: true,
  allowedDevOrigins: ["localhost.com", "*.localhost.com"],
};

export default nextConfig;
