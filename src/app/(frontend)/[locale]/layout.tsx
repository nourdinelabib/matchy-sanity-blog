// import { GoogleTagManager } from '@next/third-parties/google'
import Root from '@/ui/Root'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import SkipToContent from '@/ui/SkipToContent'
import Announcement from '@/ui/Announcement'
import Header from '@/ui/header'
import Footer from '@/ui/footer'
import WhatsAppButton from '@/ui/WhatsAppButton'
import VisualEditingControls from '@/ui/VisualEditingControls'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import '@/styles/app.css'
import { setRequestLocale } from 'next-intl/server'

type Props = {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }))
}

export default async function RootLayout({ children, params }: Props) {
	const { locale } = await params
	if (!hasLocale(routing.locales, locale)) {
		notFound()
	}

	setRequestLocale(locale)

	return (
		<Root lang={locale}>
			{/* <GoogleTagManager gtmId="" /> */}
			<body className="bg-canvas text-ink antialiased">
				<NextIntlClientProvider>
					<NuqsAdapter>
						<SkipToContent />
						<Announcement />
						<Header />
						<main id="main-content" role="main" tabIndex={-1}>
							{children}
						</main>
						<Footer />
						<WhatsAppButton />

						<VisualEditingControls />
					</NuqsAdapter>
				</NextIntlClientProvider>
				<Analytics />
				<SpeedInsights />
			</body>
		</Root>
	)
}
