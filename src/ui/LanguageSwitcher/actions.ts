'use server'

import { cookies } from 'next/headers'
import { langCookieName } from '@/lib/i18n'

export async function setLangCookie(lang?: string) {
	if (!lang) return
	;(await cookies()).set(langCookieName, lang)
}

export async function getLangCookie() {
	const cookieStore = await cookies()
	return cookieStore.get(langCookieName)?.value
}
