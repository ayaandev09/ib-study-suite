import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  experimental: {
    agentUpgrade: "security",
  } as any,
};

export default nextConfig;
