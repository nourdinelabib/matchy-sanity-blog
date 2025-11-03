'use client'

import { type ComponentProps } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { VscGlobe } from 'react-icons/vsc'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from '@/i18n/navigation'

export default function LocaleSwitcher({
	className,
	...props
}: ComponentProps<'button'>) {
	const t = useTranslations('ui.localeSwitcher')
	const locale = useLocale()
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const handleLanguageChange = () => {
		const nextLocale = locale === 'en' ? 'ar' : 'en'
		const searchParamsString = searchParams.toString()
		const url = searchParamsString
			? `${pathname}?${searchParamsString}`
			: pathname

		router.replace(url, { locale: nextLocale })
	}

	return (
		<button
			onClick={handleLanguageChange}
			className={cn(
				'flex h-[41.6px] items-center gap-2 rounded-lg px-4 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 rtl:space-x-reverse',
				className,
			)}
			title={t('switchTo')}
			{...props}
		>
			<VscGlobe className="h-4 w-4" />
			<span>{t('language')}</span>
		</button>
	)
}
