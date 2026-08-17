import { defineField, defineType } from 'sanity'

export const testimoniType = defineType({
  name: 'testimoni',
  title: 'Testimoni Pelanggan',
  type: 'document',
  fields: [
    defineField({
      name: 'nama',
      title: 'Nama Pelanggan',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'keterangan',
      title: 'Keterangan (misal: "Petani Padi, Jawa Tengah")',
      type: 'string',
    }),
    defineField({
      name: 'gambar',
      title: 'Foto / Screenshot Testimoni',
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
      title: 'nama',
      subtitle: 'keterangan',
      media: 'gambar',
    },
  }
})
