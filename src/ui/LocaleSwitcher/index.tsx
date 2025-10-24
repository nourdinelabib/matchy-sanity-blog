'use client'

import { useEffect, useState, type ComponentProps } from 'react'
import { DEFAULT_LANG, supportedLanguages, langCookieName } from '@/lib/i18n'
import { VscGlobe, VscLoading } from 'react-icons/vsc'
import { cn } from '@/lib/utils'

// Client-side cookie helpers
function getCookie(name: string): string | null {
	const value = `; ${document.cookie}`
	const parts = value.split(`; ${name}=`)
	if (parts.length === 2) return parts.pop()?.split(';').shift() || null
	return null
}

function setCookie(name: string, value: string, days = 365) {
	const date = new Date()
	date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
	document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`
}

export default function LocaleSwitcher({
	className,
	...props
}: ComponentProps<'button'>) {
	const [loading, setLoading] = useState(false)
	const [currentLang, setCurrentLang] = useState<string>(DEFAULT_LANG)

	useEffect(() => {
		// Get current language from cookie
		const lang = getCookie(langCookieName)
		setCurrentLang(lang || DEFAULT_LANG)
	}, [])

	const handleLanguageChange = async () => {
		setLoading(true)
		// Toggle between Arabic and English
		const nextLang = currentLang === 'ar' ? 'en' : 'ar'
		setCookie(langCookieName, nextLang)
		// Force a full page reload to apply the new language
		window.location.reload()
	}

	const nextLang = currentLang === 'ar' ? 'en' : 'ar'
	const nextLangTitle =
		supportedLanguages.find((l) => l.id === nextLang)?.title || nextLang

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
