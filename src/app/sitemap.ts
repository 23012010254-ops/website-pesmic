import { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pesmic.vercel.app'; 
  
  let artikelUrls: MetadataRoute.Sitemap = [];
  
  try {
    const artikels = await client.fetch('*[_type == "artikel"]{ "slug": slug.current, tanggal }');
    artikelUrls = artikels.map((artikel: any) => ({
      url: `${baseUrl}/artikel/${artikel.slug}`,
      lastModified: new Date(artikel.tanggal || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Failed to fetch artikels for sitemap:", error);
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...artikelUrls,
  ];
}
