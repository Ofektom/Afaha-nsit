import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // A package-lock.json further up the tree would otherwise be picked as the root.
  turbopack: { root: __dirname },
  output: 'export',
  trailingSlash: true,
  // Cloudinary images get responsive sizes; local files in public/ are served as-is.
  images: { loader: 'custom', loaderFile: './src/lib/image-loader.ts' },
  reactStrictMode: true,
};

export default nextConfig;
