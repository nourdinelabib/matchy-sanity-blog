import { basePath } from '../lib/env'

export function icon() {
	return (
		<img
			style={{ width: '100%', aspectRatio: 1 }}
			src={basePath + '/favicon.ico'}
			alt="Matchy Blog"
		/>
	)
}
