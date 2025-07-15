/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		optimizePackageImports: ["@techdet/ui"],
	},
	transpilePackages: [
		"@techdet/ui",
		"@techdet/db",
		"@techdet/trpc",
		"@techdet/email",
		"@techdet/auth",
	],
	images: {
		domains: [],
	},
};

module.exports = nextConfig;
