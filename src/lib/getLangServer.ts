import { cookies } from 'next/headers'
import { langCookieName, DEFAULT_LANG } from '@/lib/i18n'

export async function getLangServer() {
	const cookieStore = await cookies()
	return cookieStore.get(langCookieName)?.value || DEFAULT_LANG
}
