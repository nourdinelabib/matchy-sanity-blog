import { routing } from '@/i18n/routing'
import { stegaClean } from 'next-sanity'

export default function resolveUrl(
	page?: Sanity.PageBase,
	{
		params,
	}: {
		params?: string
	} = {},
	locale?: string,
) {
	const segment = '/'
	const slug = page?.metadata?.slug?.current
	const path = slug === 'index' ? null : slug
	const currentLocale = locale ?? page?.language ?? routing.defaultLocale
	const localePrefix = currentLocale + segment

	return [
		process.env.NEXT_PUBLIC_BASE_URL,
		segment,
		localePrefix,
		path,
		stegaClean(params),
	]
		.filter(Boolean)
		.join('')
}
