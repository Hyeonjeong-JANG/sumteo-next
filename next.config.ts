import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // 로컬 이미지 최적화 비활성화
  },
  /* config options here */
};

export default nextConfig;
