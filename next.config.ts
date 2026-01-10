import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/news',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/news',
        basePath: false,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
