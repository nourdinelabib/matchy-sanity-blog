'use client'

import { useEffect } from 'react'
import { cn, slug } from '@/lib/utils'
import { stegaClean } from 'next-sanity'
import { useTranslations } from 'next-intl'
import css from './TableOfContents.module.css'

export default function TableOfContents({
	headings,
}: {
	headings?: {
		text: string
		style: string
	}[]
}) {
	const t = useTranslations('ui')

	useEffect(() => {
		if (typeof document === 'undefined') return

		const headerHeight =
			document.querySelector('body > header')?.clientHeight || 0

		headings?.forEach(({ text }) => {
			const id = slug(text)
			const target = document.getElementById(id)

			if (!target) return

			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						const tocItem = document.querySelector(`[data-toc-item="${id}"]`)

						if (entry.isIntersecting) {
							tocItem?.classList.add(css.inView)
						} else {
							tocItem?.classList.remove(css.inView)
						}
					})
				},
				{
					threshold: 1,
					rootMargin: `-${headerHeight}px 0px 0px 0px`,
				},
			)

			observer.observe(target)

			return () => observer.disconnect()
		})
	}, [headings])

	return (
		<details
			className={cn(css.root, 'group accordion max-lg:bg-ink/3 max-lg:p-3')}
			open
		>
			<summary className="font-bold lg:group-open:after:invisible">
				{t('tableOfContents')}
			</summary>

			<ol className="anim-fade-to-b mt-2 leading-tight">
				{headings?.map(({ text, style }, key) => {
					const id = slug(text)
					return (
						<li
							className="border-ink/10 border-s transition-all"
							data-toc-item={id}
							key={key}
						>
							<a
								className={cn(
									'block py-1 hover:underline',
									stegaClean(style) == 'h2' && 'ps-4',
									stegaClean(style) == 'h3' && 'ps-6',
									stegaClean(style) == 'h4' && 'ps-8',
									stegaClean(style) == 'h5' && 'ps-10',
									stegaClean(style) == 'h6' && 'ps-12',
								)}
								href={`#${id}`}
							>
								{text}
							</a>
						</li>
					)
				})}
			</ol>
		</details>
	)
}
