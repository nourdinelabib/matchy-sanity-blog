'use client'

import { useTranslations } from 'next-intl'
import PostPreview from '../PostPreview'
import { useBlogFilters } from '../store'

export default function List({
	posts,
	...props
}: {
	posts: Sanity.BlogPost[]
} & React.ComponentProps<'ul'>) {
	const filtered = filterPosts(posts)
	const t = useTranslations('ui')
	if (!filtered.length) {
		return <div>{t('noPostsFound')}</div>
	}

	return (
		<ul {...props}>
			{filtered?.map((post) => (
				<li className="anim-fade" key={post._id}>
					<PostPreview post={post} />
				</li>
			))}
		</ul>
	)
}

export function filterPosts(posts: Sanity.BlogPost[]) {
	const { category, author } = useBlogFilters()

	return posts.filter((post) => {
		if (category !== 'All' && author)
			return (
				post.authors?.some(({ slug }) => slug?.current === author) &&
				post.categories?.some(({ slug }) => slug?.current === category)
			)

		if (category !== 'All')
			return post.categories?.some(({ slug }) => slug?.current === category)

		if (author)
			return post.authors?.some(({ slug }) => slug?.current === author)

		return true
	})
}
