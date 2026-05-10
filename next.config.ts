import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  experimental:{
    instrumentationHook:true
  }
};

export default nextConfig;
