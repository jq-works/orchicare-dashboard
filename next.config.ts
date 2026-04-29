import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true, // Gunakan true agar SEO menganggap /dashboard sebagai halaman utama permanen
      },
    ]
  },
};

export default nextConfig;
