import { defineField, defineType } from 'sanity'

export const artikelType = defineType({
  name: 'artikel',
  title: 'Artikel & Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'judul',
      title: 'Judul Artikel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'judul',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gambar',
      title: 'Gambar Utama (Cover)',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ringkasan',
      title: 'Ringkasan Singkat (Muncul di Halaman Utama)',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'konten',
      title: 'Isi Artikel',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' }
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tanggal',
      title: 'Tanggal Terbit',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'judul',
      subtitle: 'ringkasan',
      media: 'gambar',
    },
  }
})
