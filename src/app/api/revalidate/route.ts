// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'

const secret = process.env.SANITY_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
	try {
		// 1. Read the raw body
		const body = await request.text()

		// 2. Get the signature from headers
		const signature = request.headers.get(SIGNATURE_HEADER_NAME)

		// 3. Verify the signature
		if (!signature || !(await isValidSignature(body, signature, secret))) {
			return NextResponse.json(
				{ success: false, message: 'Invalid signature' },
				{ status: 401 },
			)
		}

		// 4. Parse the verified body
		const jsonBody = JSON.parse(body)

		if (!jsonBody?._type) {
			return NextResponse.json(
				{ success: false, message: 'Bad Request' },
				{ status: 400 },
			)
		}

		// 5. Revalidate based on content type
		revalidatePath('/blog')
		revalidatePath('/')

		if (jsonBody.slug?.current) {
			revalidatePath(`/blog/${jsonBody.slug.current}`)
			revalidatePath(`/${jsonBody.slug.current}`)
		}

		return NextResponse.json({
			success: true,
			revalidated: true,
			now: Date.now(),
		})
	} catch (err) {
		console.error('Revalidation error:', err)
		return NextResponse.json(
			{ success: false, message: 'Internal Server Error' },
			{ status: 500 },
		)
	}
}
