'use client'

import { useEffect, useState, type ComponentProps } from 'react'
import { redirect, usePathname } from 'next/navigation'
import { DEFAULT_LANG, supportedLanguages } from '@/lib/i18n'
import { setLangCookie } from '@/ui/LanguageSwitcher/actions'
import { VscGlobe, VscLoading } from 'react-icons/vsc'
import { cn } from '@/lib/utils'

export default function LocaleSwitcher({
	className,
	...props
}: ComponentProps<'button'>) {
	const [loading, setLoading] = useState(false)
	const pathname = usePathname()

	useEffect(() => setLoading(false), [pathname])

	const handleLanguageChange = () => {
		setLoading(true)
		// Toggle between Arabic and English
		const currentLang = getCurrentLang()
		const nextLang = currentLang === 'ar' ? 'en' : 'ar'
		setLangCookie(nextLang)
		redirect(pathname)
	}

	const getCurrentLang = () => {
		// Extract language from pathname or default to Arabic
		const langMatch = pathname.match(/^\/(?:blog\/)?(ar|en)/)
		return langMatch ? langMatch[1] : DEFAULT_LANG
	}

	const currentLang = getCurrentLang()
	const nextLang = currentLang === 'ar' ? 'en' : 'ar'
	const nextLangTitle = supportedLanguages.find(l => l.id === nextLang)?.title || nextLang

	return (
		<button
			onClick={handleLanguageChange}
			className={cn(
				'flex h-[41.6px] items-center gap-2 rounded-lg px-4 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 rtl:space-x-reverse',
				className,
			)}
			title={`Switch to ${nextLangTitle}`}
			{...props}
		>
			{loading ? (
				<VscLoading className="h-4 w-4 animate-spin" />
			) : (
				<VscGlobe className="h-4 w-4" />
			)}
			<span>{nextLangTitle}</span>
		</button>
	)
}
