import { useTranslations } from 'next-intl'

export default function ReadTime({
	value,
	...props
}: { value: number } & React.ComponentProps<'span'>) {
	const minutes = Math.ceil(value)
	const t = useTranslations('ui')

	return <span {...props}>{t('readTime', { minutes })}</span>
}
