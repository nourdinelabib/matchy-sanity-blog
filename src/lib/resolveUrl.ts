import { stegaClean } from 'next-sanity'

export default function resolveUrl(
	page?: Sanity.PageBase,
	{
		params,
	}: {
		params?: string
	} = {},
) {
	const segment = '/'
	const slug = page?.metadata?.slug?.current
	const path = slug === 'index' ? null : slug

	return [process.env.NEXT_PUBLIC_BASE_URL, segment, path, stegaClean(params)]
		.filter(Boolean)
		.join('')
}
