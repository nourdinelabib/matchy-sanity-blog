import { NextRequest, type MiddlewareConfig } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const handleI18nRouting = createMiddleware(routing)

export default function middleware(request: NextRequest) {
	return handleI18nRouting(request)
}
export const config: MiddlewareConfig = {
	matcher: [
		// Match all pathnames except for:
		// - api routes
		// - admin routes (Sanity Studio)
		// - _next (internal Next.js routes)
		// - _vercel (Vercel internals)
		// - Static files (files with extensions like .jpg, .css, etc.)
		'/',
		'/((?!api|admin|_next|_vercel|.*\\..*).*)',
	],
}
