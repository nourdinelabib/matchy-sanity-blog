import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion, adminBasePath } from '@/sanity/lib/env'
import { dev } from '@/lib/env'

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: !dev,
	stega: {
		studioUrl: adminBasePath,
	},
})
