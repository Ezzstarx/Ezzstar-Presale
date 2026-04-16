import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/staking',
        destination: '/',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/#about',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/#about',
        permanent: true,
      },
      {
        source: '/community',
        destination: '/',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/',
        permanent: true,
      },
      {
        source: '/ecosystem',
        destination: '/#tokenomics',
        permanent: true,
      },
      {
        source: '/team',
        destination: '/#team',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: blob: https:; font-src 'self' data: https:; connect-src 'self' https: ws: wss:;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
