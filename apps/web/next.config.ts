/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@unstage/ui"],
  },
  transpilePackages: [
    "@unstage/ui",
    "@unstage/db",
    "@unstage/trpc",
    "@unstage/email",
    "@unstage/auth",
  ],
  images: {
    remotePatterns: [],
  },
};

module.exports = nextConfig;
