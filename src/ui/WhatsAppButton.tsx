'use client'

import { useLocale } from 'next-intl'
import WhatsApp from '@/ui/icons/WhatsApp'
import { cn } from '@/lib/utils'

export default function WhatsAppButton() {
	const locale = useLocale()
	const isRtl = locale === 'ar'
	const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER

	if (!whatsappNumber) return null

	return (
		<a
			href={`https://wa.me/${whatsappNumber}`}
			target="_blank"
			rel="noopener noreferrer"
			className={cn(
				'fixed bottom-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 shadow-lg transition-all hover:scale-110 hover:bg-green-600',
				isRtl ? 'left-6' : 'right-6',
			)}
			aria-label="Contact us on WhatsApp"
		>
			<div className="h-8 w-8">
				<WhatsApp />
			</div>
		</a>
	)
}
