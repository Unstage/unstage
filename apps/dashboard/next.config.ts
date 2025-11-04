/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
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
  async rewrites() {
    return [
      {
        source: "/relay-sVCx/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/relay-sVCx/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        source: "/relay-sVCx/decide",
        destination: "https://us.i.posthog.com/decide",
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

module.exports = nextConfig;
