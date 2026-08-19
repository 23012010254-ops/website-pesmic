import { defineField, defineType } from 'sanity'

export const produkType = defineType({
  name: 'produk',
  title: 'Produk Satuan',
  type: 'document',
  fields: [
    defineField({
      name: 'nama',
      title: 'Nama Produk (cth: Pestisida Alami)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge (cth: Pestisida, Pupuk POC)',
      type: 'string',
    }),
    defineField({
      name: 'ukuran',
      title: 'Ukuran (cth: Ukuran: 500 ml)',
      type: 'string',
    }),
    defineField({
      name: 'deskripsi',
      title: 'Deskripsi Singkat',
      type: 'text',
    }),
    defineField({
      name: 'hargaNormal',
      title: 'Harga Normal (Dicoret)',
      type: 'number',
    }),
    defineField({
      name: 'hargaDiskon',
      title: 'Harga Diskon (Aktual)',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hemat',
      title: 'Tulisan Hemat (cth: Hemat Rp 11.000)',
      type: 'string',
    }),
    defineField({
      name: 'gambar',
      title: 'Gambar Produk',
      type: 'image',
      options: {
        hotspot: true,
      },
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
      subtitle: 'ukuran',
      media: 'gambar',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.subtitle,
        media: selection.media
      }
    }
  }
})
