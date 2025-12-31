// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

// Define the webhook payload type
type WebhookPayload = {
	_type: string
	_id?: string
	slug?: {
		current: string
	}
}

export async function POST(request: NextRequest) {
	try {
		// 1. Verify the secret token
		const secret = request.nextUrl.searchParams.get('secret')

		if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
			return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
		}

		// 2. Parse the webhook payload - access the body property
		const { body } = await parseBody<WebhookPayload>(request)

		if (!body?._type) {
			return NextResponse.json({ message: 'Bad Request' }, { status: 400 })
		}

		// Replace 'post' with your Sanity document type
		revalidatePath('/blog')
		revalidatePath('/')

		// Optional: revalidate specific post
		if (body.slug?.current) {
			revalidatePath(`/blog/${body.slug.current}`)
			revalidatePath(`/${body.slug.current}`)
		}

		return NextResponse.json({
			revalidated: true,
			now: Date.now(),
		})
	} catch (err) {
		console.error('Revalidation error:', err)
		return NextResponse.json(
			{ message: 'Internal Server Error' },
			{ status: 500 },
		)
	}
}
