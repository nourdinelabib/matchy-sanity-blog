import { notFound } from 'next/navigation'
import Modules from '@/ui/modules'
import processMetadata from '@/lib/processMetadata'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { fetchSanityLive } from '@/sanity/lib/fetch'
import {
	MODULES_QUERY,
	GLOBAL_MODULE_PATH_QUERY,
	TRANSLATIONS_QUERY,
} from '@/sanity/lib/queries'
import errors from '@/lib/errors'
import { getLangServer } from '@/lib/getLangServer'

export default async function Page() {
	const page = await getPage()
	if (!page) notFound()
	return <Modules modules={page.modules} page={page} />
}

export async function generateMetadata() {
	const page = await getPage()
	if (!page) notFound()
	const locale = await getLangServer()
	return processMetadata(page, locale)
}

export async function generateStaticParams() {
	const slugs = await client.fetch<{ slug: string }[]>(
		groq`*[
			_type == 'page'
			&& defined(metadata.slug.current)
			&& !(metadata.slug.current in ['index'])
		]{
			'slug': metadata.slug.current
		}`,
	)

	return slugs.map(({ slug }) => ({ slug: slug.split('/') }))
}

async function getPage() {
	const locale = await getLangServer()
	const slug = 'blog'

	const page = await fetchSanityLive<Sanity.Page>({
		query: groq`*[
			_type == 'page'
			&& metadata.slug.current == $slug
			${locale ? `&& language == '${locale}'` : ''}
		][0]{
			...,
			'modules': (
				// global modules (before)
				*[_type == 'global-module' && path == '*'].before[]{ ${MODULES_QUERY} }
				// path modules (before)
				+ *[_type == 'global-module' && path != '*' && ${GLOBAL_MODULE_PATH_QUERY}].before[]{ ${MODULES_QUERY} }
				// page modules
				+ modules[]{ ${MODULES_QUERY} }
				// path modules (after)
				+ *[_type == 'global-module' && path != '*' && ${GLOBAL_MODULE_PATH_QUERY}].after[]{ ${MODULES_QUERY} }
				// global modules (after)
				+ *[_type == 'global-module' && path == '*'].after[]{ ${MODULES_QUERY} }
			),
			metadata {
				...,
				'ogimage': image.asset->url + '?w=1200'
			},
			${TRANSLATIONS_QUERY},
		}`,
		params: { slug },
	})

	if (slug === 'blog' && !page) throw new Error(errors.missingHomepage)

	return page
}
