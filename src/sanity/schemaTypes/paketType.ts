import { defineField, defineType } from 'sanity'

export const paketType = defineType({
  name: 'paket',
  title: 'Paket Bundling',
  type: 'document',
  fields: [
    defineField({
      name: 'nama',
      title: 'Nama Paket',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge (cth: Hemat, Terlaris)',
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
      title: 'Tulisan Hemat (cth: Hemat Rp 20.000)',
      type: 'string',
    }),
    defineField({
      name: 'gambar',
      title: 'Gambar Paket',
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
      subtitle: 'hargaDiskon',
      media: 'gambar',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: `Rp ${selection.subtitle?.toLocaleString('id-ID')}`,
        media: selection.media
      }
    }
  }
})
