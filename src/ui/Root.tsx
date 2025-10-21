'use client'

import type { ComponentProps } from 'react'
import { langDir } from '@/lib/utils'

export default function Root({
	lang = 'ar',
	...props
}: ComponentProps<'html'> & { lang?: string }) {
	return <html lang={lang} dir={langDir(lang)} {...props} />
}
