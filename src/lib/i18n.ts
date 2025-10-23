import type { Language } from '@sanity/document-internationalization'

export const supportedLanguages = [
	{ id: 'ar', title: 'العربية' },
	{ id: 'en', title: 'English' },
] as const as Language[]

export const languages = supportedLanguages.map((lang) => lang?.id)

export const DEFAULT_LANG = languages[0] ?? 'ar'

export type Lang = (typeof languages)[number]

export const langCookieName = `matchy-blog-${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}-lang`
