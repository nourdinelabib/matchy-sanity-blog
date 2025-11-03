import { NextRequest, type MiddlewareConfig } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const handleI18nRouting = createMiddleware(routing)

export default function middleware(request: NextRequest) {
	console.log('middleware', request.nextUrl.pathname)
	return handleI18nRouting(request)
}
export const config: MiddlewareConfig = {
	matcher: '/((?!api|admin|trpc|_next|_vercel|.*\\..*).*)',
}
