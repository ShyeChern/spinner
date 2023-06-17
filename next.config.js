/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	async headers() {
		return [
			{
				source: '/(.*)', // apply to all routes
				headers: securityHeaders,
			},
		];
	},
};

const securityHeaders = [
	{
		key: 'X-DNS-Prefetch-Control',
		value: 'on',
	},
	{
		key: 'Strict-Transport-Security',
		value: 'max-age=63072000; includeSubDomains; preload',
	},
	{
		key: 'X-XSS-Protection',
		value: '1; mode=block',
	},
	{
		key: 'X-Frame-Options',
		value: 'SAMEORIGIN',
	},
	{
		key: 'X-Content-Type-Options',
		value: 'nosniff',
	},
];

module.exports = nextConfig;
