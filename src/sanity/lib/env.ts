export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export const apiVersion =
	process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-12-01'

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/blog'
export const adminBasePath = `${basePath}/admin`
