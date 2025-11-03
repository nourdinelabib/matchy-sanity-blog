import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
	// A list of all locales that are supported
	locales: ['ar', 'en'],

	// Used when no locale matches
	defaultLocale: 'ar',
})

export const supportedLanguagesTitles = {
	ar: 'العربية',
	en: 'English',
}
