import { fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import { Suspense } from 'react'
import Filter from './Filter'
import css from './FilterList.module.css'
import { cn } from '@/lib/utils'
import { getLocale, getTranslations } from 'next-intl/server'

export default async function FilterList() {
	const t = await getTranslations('ui')
	const lang = await getLocale()
	const categories = await fetchSanityLive<Sanity.BlogCategory[]>({
		query: groq`*[
			_type == 'blog.category' &&
			(!defined(language) || language == '${lang}') &&
			count(*[_type == 'blog.post' && references(^._id)]) > 0
		]|order(title)`,
	})

	if (!categories) return null

	return (
		<fieldset>
			<legend className="sr-only">{t('filterByCategory')}</legend>

			<div
				className={cn(
					css.list,
					'filtering group flex flex-wrap gap-1! max-sm:justify-center',
				)}
			>
				<Suspense>
					<Filter label={t('all')} />

					{categories?.map((category, key) => (
						<Filter
							label={category.title}
							value={category.slug?.current}
							key={key}
						/>
					))}
				</Suspense>
			</div>
		</fieldset>
	)
}
