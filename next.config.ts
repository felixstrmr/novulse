import type { NextConfig } from "next";

import "@/lib/env";

const nextConfig: NextConfig = {
  devIndicators: false,
  reactCompiler: true,
  cacheComponents: true,
};

export default nextConfig;
