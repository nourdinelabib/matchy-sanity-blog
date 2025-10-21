import { defineField, defineType, SlugValidationContext } from 'sanity'
import { CharacterCount } from '@/sanity/ui/CharacterCount'
import PreviewOG from '@/sanity/ui/PreviewOG'

export default defineType({
	name: 'metadata',
	title: 'Metadata',
	description: 'For search engines',
	type: 'object',
	fields: [
		defineField({
			name: 'slug',
			type: 'slug',
			description: 'URL path or permalink',
			options: {
				source: (doc: any) => doc.title || doc.metadata.title,
				isUnique: isUniqueOtherThanLanguage
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'title',
			type: 'string',
			validation: (Rule) => Rule.max(60).warning(),
			components: {
				input: (props) => (
					<CharacterCount max={60} {...(props as any)}>
						<PreviewOG title={props.elementProps.value} />
					</CharacterCount>
				),
			},
		}),
		defineField({
			name: 'description',
			type: 'text',
			validation: (Rule) => Rule.max(160).warning(),
			components: {
				input: (props) => (
					<CharacterCount as="textarea" max={160} {...(props as any)} />
				),
			},
		}),
		defineField({
			name: 'image',
			description: 'Used for social sharing previews',
			type: 'image',
			options: {
				hotspot: true,
				metadata: ['lqip'],
			},
		}),
		defineField({
			name: 'noIndex',
			description: 'Prevent search engines from indexing this page',
			type: 'boolean',
			initialValue: false,
		}),
	],
})

export async function isUniqueOtherThanLanguage(slug: string, context: SlugValidationContext) {
  const {document, getClient} = context
  if (!document?.language) {
    return true
  }
  const client = getClient({apiVersion: '2025-02-19'})
  const id = document._id.replace(/^drafts\./, '')
  const params = {
    id,
    language: document.language,
    slug,
  }
  const query = `!defined(*[
    !(sanity::versionOf($id)) &&
    slug.current == $slug &&
    language == $language
  ][0]._id)`
  const result = await client.fetch(query, params)
  return result
}