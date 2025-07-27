import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(
        'https://fcjgtcsskcvpxvnaginh.supabase.co/storage/v1/object/public/mibauu/**'
      ),
    ],
  },
};

export default nextConfig;
