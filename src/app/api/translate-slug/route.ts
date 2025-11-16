import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { BLOG_DIR } from '@/lib/env'

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams
	const slug = decodeURIComponent(searchParams.get('slug') || '')
	const currentLocale = searchParams.get('currentLocale')
	const targetLocale = searchParams.get('targetLocale')

	if (!slug || !currentLocale || !targetLocale) {
		return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
	}

	// Query to get the translated slug
	const result = await client.fetch<{ slug: string } | null>(
		groq`*[
			_type == 'blog.post' 
			&& metadata.slug.current == $slug 
			&& language == $currentLocale
		][0]{
			'slug': (*[_type == 'translation.metadata' && references(^._id)]
				.translations[].value->{
					'slug': metadata.slug.current,
					language
				})[language == $targetLocale][0].slug
		}`,
		{ slug, currentLocale, targetLocale },
	)

	if (result?.slug) {
		return NextResponse.json({ slug: result.slug })
	}

	return NextResponse.json({ slug: null })
}
