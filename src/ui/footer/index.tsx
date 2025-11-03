'use client'

import { useTranslations, useLocale } from 'next-intl'
import LinkedIn from '@/ui/icons/LinkedIn'
import Youtube from '@/ui/icons/Youtube'
import { Mada } from '@/ui/icons/Mada'
import { Master } from '@/ui/icons/Master'
import { Visa } from '@/ui/icons/Visa'
import { SaudiBusiness } from '@/ui/icons/SaudiBusiness'
import { Link } from '@/i18n/navigation'

export default function Footer() {
	const t = useTranslations('layout.main')
	const locale = useLocale()
	const mainWebsiteUrl =
		process.env.NEXT_PUBLIC_MAIN_WEBSITE_URL || 'https://m4tchy.com'

	// Build base URL with locale
	const baseUrl = `${mainWebsiteUrl}/${locale}`

	// Navigation links to main website with locale
	const navigationLinks = [
		{
			href: `${baseUrl}/#our-clients`,
			translationKey: 'nav.our-clients',
			id: 'our-clients',
		},
		{
			href: `${baseUrl}/#features`,
			translationKey: 'nav.features',
			id: 'features',
		},
		{
			href: `${baseUrl}/#how-it-works`,
			translationKey: 'nav.how-it-works',
			id: 'how-it-works',
		},
		{
			href: `${baseUrl}/#testimonials`,
			translationKey: 'nav.testimonials',
			id: 'testimonials',
		},
		{
			href: `${baseUrl}/pricing`,
			translationKey: 'nav.pricing',
			id: 'pricing',
		},
	]

	return (
		<footer className="bg-white shadow-[0_-1px_2px_0px_rgba(0,0,0,0.05)]">
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					{/* Quick Links */}
					<div className="flex flex-col items-center md:items-start">
						<h3 className="mb-4 text-lg font-semibold">
							{t('footer.quick-links.title')}
						</h3>
						<ul className="space-y-2 text-center md:ltr:text-left md:rtl:text-right">
							{navigationLinks.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-gray-600 hover:text-gray-900"
									>
										{t(link.translationKey)}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Contact Section */}
					<div className="flex flex-col items-center md:items-start">
						<h3 className="mb-4 text-lg font-semibold">
							{t('footer.contact.title')}
						</h3>
						<ul className="space-y-2 text-center md:ltr:text-left md:rtl:text-right">
							<li className="text-gray-600">
								<Link
									href="mailto:sales@m4tchy.com"
									className="hover:underline"
								>
									sales@m4tchy.com
								</Link>
							</li>
							<li className="text-gray-600">{t('footer.address.address')}</li>
						</ul>

						{/* Social Media Icons */}
						<div className="mt-4 flex items-center space-x-2 rtl:space-x-reverse">
							<Link
								href="https://www.linkedin.com/company/jazieel/"
								referrerPolicy="no-referrer"
								target="_blank"
								className="text-gray-600 hover:text-gray-900"
							>
								<LinkedIn className="w-6 [&>path]:fill-gray-800" />
							</Link>
							<Link
								href="https://www.youtube.com/@M4tchy"
								referrerPolicy="no-referrer"
								target="_blank"
								className="text-gray-600 hover:text-gray-900"
							>
								<Youtube className="w-6 [&>path]:fill-gray-800" />
							</Link>
						</div>
					</div>

					{/* Saudi Business & Payment Methods */}
					<div>
						<Link
							href="https://eauthenticate.saudibusiness.gov.sa/certificate-details/0000148215"
							target="_blank"
							rel="noopener noreferrer"
							className="flex flex-col-reverse items-center justify-center gap-2 md:flex-row md:justify-start"
						>
							<SaudiBusiness className="rounded-md border border-gray-200 p-1 shadow-md" />
							<p className="font-bold">{t('footer.saudiBusiness')}</p>
						</Link>

						<div className="flex flex-col items-center md:items-start">
							<h3 className="mt-8 text-lg font-semibold">
								{t('footer.paymentMethods')}
							</h3>
							<div className="mt-2 flex items-center gap-1">
								<Mada />
								<Master />
								<Visa />
							</div>
						</div>
					</div>
				</div>

				{/* Copyright & Links */}
				<div className="mt-8 border-t border-gray-200 pt-8">
					<div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
						<p className="text-gray-600">
							{t('footer.copyright', { year: '2025' })}
						</p>
						<div className="flex gap-4">
							<Link
								href={`${baseUrl}/legal/privacy-policy`}
								className="text-gray-600 hover:text-gray-900"
							>
								{t('footer.resources.privacy-policy')}
							</Link>
							<Link
								href={`${baseUrl}/legal/terms-of-service`}
								className="text-gray-600 hover:text-gray-900"
							>
								{t('footer.resources.terms-of-service')}
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
