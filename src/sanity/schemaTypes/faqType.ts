import { defineField, defineType } from 'sanity'

export const faqType = defineType({
  name: 'faq',
  title: 'Tanya Jawab (FAQ)',
  type: 'document',
  fields: [
    defineField({
      name: 'pertanyaan',
      title: 'Pertanyaan',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'jawaban',
      title: 'Jawaban',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'urutan',
      title: 'Urutan Tampil',
      type: 'number',
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: 'pertanyaan',
      subtitle: 'jawaban',
    },
  }
})
