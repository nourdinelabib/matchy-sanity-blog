import { createClient, groq } from 'next-sanity'
import { projectId, dataset, apiVersion, basePath } from '@/sanity/lib/env'
import { BLOG_DIR } from '@/lib/env'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: true,
})

export default withNextIntl({
	basePath: basePath,
	assetPrefix: basePath,
	distDir: 'out/blog',
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io',
			},
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
			},
		],
	},

	async redirects() {
		return await client.fetch(groq`*[_type == 'redirect']{
			source,
			'destination': select(
				destination.type == 'internal' =>
					select(
						destination.internal->._type == 'blog.post' => '/${BLOG_DIR}/',
						'/'
					) + destination.internal->.metadata.slug.current,
				destination.external
			),
			permanent
		}`)
	},

	// Removed language-based rewrites since we're using cookie-based language detection
	async rewrites() {
		return []
	},

	env: {
		SC_DISABLE_SPEEDY: 'false',
	},
})
