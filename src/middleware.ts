import {
	NextResponse,
	type NextRequest,
	type MiddlewareConfig,
} from 'next/server'
import { DEFAULT_LANG, langCookieName } from './lib/i18n'

export default async function (request: NextRequest) {
	// If no language cookie is set, set it to the default language
	if (!request.cookies.has(langCookieName)) {
		const response = NextResponse.next()
		response.cookies.set(langCookieName, DEFAULT_LANG)
		return response
	}

	return NextResponse.next()
}

export const config: MiddlewareConfig = {
	matcher: ['/((?!favicon.ico|_next|api|admin).*)'],
}
