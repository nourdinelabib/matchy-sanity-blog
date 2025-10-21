'use client'

import getLang from '@/lib/getLang'
import type { ComponentProps } from 'react'
import { langDir } from '@/lib/utils'

export default function Root(props: ComponentProps<'html'>) {
	const lang = getLang()

	return <html lang={lang} dir={langDir(lang)} {...props} />
}
