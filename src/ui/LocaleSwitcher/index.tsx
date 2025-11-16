'use client'

import { type ComponentProps, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { VscGlobe } from 'react-icons/vsc'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from '@/i18n/navigation'
import { BASE_URL } from '@/lib/env'

export default function LocaleSwitcher({
	className,
	...props
}: ComponentProps<'button'>) {
	const t = useTranslations('ui.localeSwitcher')
	const locale = useLocale()
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const [isLoading, setIsLoading] = useState(false)

	const handleLanguageChange = async () => {
		const nextLocale = locale === 'en' ? 'ar' : 'en'

		// Check if we have a slug (not just root `/` and not empty)
		const hasSlug = pathname && pathname !== '/'

		if (hasSlug) {
			setIsLoading(true)

			// Extract the slug from the pathname (remove leading slash if present)
			const slug = pathname.startsWith('/') ? pathname.slice(1) : pathname

			try {
				// Fetch the translated slug
				const response = await fetch(
					`${BASE_URL}/api/translate-slug?slug=${encodeURIComponent(slug)}&currentLocale=${locale}&targetLocale=${nextLocale}`,
				)
				const data = await response.json()

				if (data.slug) {
					// Navigate to the translated page/post
					const targetPath = data.slug.startsWith('/')
						? data.slug
						: `/${data.slug}`
					const searchParamsString = searchParams.toString()
					const url = searchParamsString
						? `${targetPath}?${searchParamsString}`
						: targetPath
					router.push(url, { locale: nextLocale })
				} else {
					// No translation found, use default next-intl behavior
					const searchParamsString = searchParams.toString()
					const url = searchParamsString
						? `${pathname}?${searchParamsString}`
						: pathname
					router.replace(url, { locale: nextLocale })
				}
			} catch (error) {
				console.error('Failed to fetch translated slug:', error)
				// Fallback to default next-intl behavior
				const searchParamsString = searchParams.toString()
				const url = searchParamsString
					? `${pathname}?${searchParamsString}`
					: pathname
				router.replace(url, { locale: nextLocale })
			} finally {
				setIsLoading(false)
			}
		} else {
			// For home page, just switch locale (next-intl handles it)
			const searchParamsString = searchParams.toString()
			const url = searchParamsString
				? `${pathname}?${searchParamsString}`
				: pathname
			router.replace(url, { locale: nextLocale })
		}
	}

	return (
		<button
			onClick={handleLanguageChange}
			disabled={isLoading}
			className={cn(
				'flex h-[41.6px] items-center gap-2 rounded-lg px-4 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 disabled:opacity-50 rtl:space-x-reverse',
				className,
			)}
			title={t('switchTo')}
			{...props}
		>
			<VscGlobe className={cn('h-4 w-4', isLoading && 'animate-spin')} />
			<span>{t('language')}</span>
		</button>
	)
}
