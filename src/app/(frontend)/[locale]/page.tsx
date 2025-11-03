import { notFound } from 'next/navigation'
import Modules from '@/ui/modules'
import processMetadata from '@/lib/processMetadata'
import { groq } from 'next-sanity'
import { fetchSanityLive } from '@/sanity/lib/fetch'
import {
	MODULES_QUERY,
	GLOBAL_MODULE_PATH_QUERY,
	TRANSLATIONS_QUERY,
} from '@/sanity/lib/queries'
import errors from '@/lib/errors'
import { routing } from '@/i18n/routing'
import { setRequestLocale } from 'next-intl/server'

export default async function Page({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	setRequestLocale(locale)

	const page = await getPage({ locale })
	if (!page) notFound()
	return <Modules modules={page.modules} page={page} />
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const page = await getPage({ locale })
	if (!page) notFound()
	return processMetadata(page, locale)
}

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }))
}

async function getPage({ locale }: { locale: string }) {
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
