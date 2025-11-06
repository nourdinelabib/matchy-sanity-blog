import { fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import { routing } from '@/i18n/routing'
import { BLOG_DIR } from '@/lib/env'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const data = await fetchSanityLive<Record<string, MetadataRoute.Sitemap>>({
		query: groq`{
		'blog': *[_type == 'blog.post' && metadata.noIndex != true]|order(name){
			'url': (
				$baseUrl
				+ select(defined(language) => language + '/', '')
				+ ${BLOG_DIR ? `'${BLOG_DIR}/' + ` : ''}metadata.slug.current
			),
			'lastModified': _updatedAt,
			'priority': 0.4
		}
		}`,
		params: {
			baseUrl: process.env.NEXT_PUBLIC_BASE_URL + '/',
			defaultLang: routing.defaultLocale,
		},
	})

	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + '/'

	return [
		...Object.values(data).flat(),
		// Blog index pages for each locale
		...routing.locales.map((locale) => ({
			url: `${baseUrl}${locale}/`,
			lastModified: new Date(),
			priority: 1,
		})),
	]
}
