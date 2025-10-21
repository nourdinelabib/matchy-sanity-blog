import { notFound } from 'next/navigation'
import Modules from '@/ui/modules'
import processMetadata from '@/lib/processMetadata'
import { client } from '@/sanity/lib/client'
import { fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import { BLOG_DIR } from '@/lib/env'
import {
	IMAGE_QUERY,
	MODULES_QUERY,
	TRANSLATIONS_QUERY,
} from '@/sanity/lib/queries'
import errors from '@/lib/errors'
import { getLangServer } from '@/lib/getLangServer'

export default async function Page({ params }: Props) {
	const post = await getPost(await params)
	if (!post) notFound()
	return <Modules modules={post.modules} post={post} />
}

export async function generateMetadata({ params }: Props) {
	const post = await getPost(await params)
	if (!post) notFound()
	const locale = await getLangServer()
	return processMetadata(post, locale)
}

export async function generateStaticParams() {
	const posts = await client.fetch<Array<{ slug: string }>>(
		groq`*[_type == 'blog.post' && defined(metadata.slug.current)]{
			"slug": metadata.slug.current
		}`,
	)

	return posts.map(({ slug }) => ({
		slug: [slug],
	}))
}

async function getPost({ slug }: Params) {
	const locale = await getLangServer()
	const blogTemplateExists = await fetchSanityLive<boolean>({
		query: groq`count(*[_type == 'global-module' && path == '${BLOG_DIR}/']) > 0`,
	})

	if (!blogTemplateExists) throw new Error(errors.missingBlogTemplate)

	// With BLOG_DIR = '', slug array contains just the blog post slug
	const blogSlug = slug.join('/')

	return await fetchSanityLive<Sanity.BlogPost & { modules: Sanity.Module[] }>({
		query: groq`*[
			_type == 'blog.post'
			&& metadata.slug.current == $slug
			${locale ? `&& language == '${locale}'` : ''}
		][0]{
			...,
			body[]{
				...,
				_type == 'image' => {
					${IMAGE_QUERY},
					asset->
				}
			},
			'readTime': length(string::split(pt::text(body), ' ')) / 200,
			'headings': body[style in ['h2', 'h3']]{
				style,
				'text': pt::text(@)
			},
			categories[]->,
			authors[]->,
			metadata {
				...,
				'ogimage': image.asset->url + '?w=1200'
			},
			'modules': (
				// global modules (before)
				*[_type == 'global-module' && path == '*'].before[]{ ${MODULES_QUERY} }
				// path modules (before)
				+ *[_type == 'global-module' && path == '${BLOG_DIR}/'].before[]{ ${MODULES_QUERY} }
				// path modules (after)
				+ *[_type == 'global-module' && path == '${BLOG_DIR}/'].after[]{ ${MODULES_QUERY} }
				// global modules (after)
				+ *[_type == 'global-module' && path == '*'].after[]{ ${MODULES_QUERY} }
			),
			${TRANSLATIONS_QUERY},
		}`,
		params: { slug: blogSlug },
	})
}

type Params = { slug: string[] }

type Props = {
	params: Promise<Params>
}
