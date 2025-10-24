import { defineField, defineType } from 'sanity'
import { VscTag } from 'react-icons/vsc'
import { isUniqueOtherThanLanguage } from '../objects/metadata'

export default defineType({
	name: 'blog.category',
	title: 'Blog category',
	type: 'document',
	icon: VscTag,
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'slug',
			type: 'slug',
			options: {
				source: 'title',
				isUnique: isUniqueOtherThanLanguage,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'language',
			type: 'string',
			readOnly: true,
			hidden: true,
		}),
	],
	preview: {
		select: {
			title: 'title',
			language: 'language',
		},
		prepare: ({ title, language }) => ({
			title,
			subtitle: language ? `[${language}]` : undefined,
		}),
	},
})
