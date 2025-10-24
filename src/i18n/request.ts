import { getLangServer } from '@/lib/getLangServer'
import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async () => {
	const locale = await getLangServer()

	return {
		locale,
		messages: (await import(`../../messages/${locale}.json`)).default,
	}
})
