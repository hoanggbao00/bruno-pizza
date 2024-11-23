import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: 'cloud.appwrite.io',
			},
		],
	},
};

export default nextConfig;
