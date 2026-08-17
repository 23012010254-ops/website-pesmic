import { defineField, defineType } from 'sanity'

export const pencapaianType = defineType({
  name: 'pencapaian',
  title: 'Pencapaian & Legalitas',
  type: 'document',
  fields: [
    defineField({
      name: 'judul',
      title: 'Judul Pencapaian (misal: Lolos Pendanaan P2MW)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'deskripsi',
      title: 'Deskripsi Singkat / Artikel',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gambar',
      title: 'Foto / Sertifikat',
      type: 'image',
      options: {
        hotspot: true,
      },
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
      title: 'judul',
      subtitle: 'deskripsi',
      media: 'gambar',
    },
  }
})
