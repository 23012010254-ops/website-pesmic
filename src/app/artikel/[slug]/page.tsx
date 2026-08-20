import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';

export const revalidate = 60;

export async function generateStaticParams() {
  const artikels = await client.fetch('*[_type == "artikel"]{ "slug": slug.current }');
  return artikels.map((a: any) => ({
    slug: a.slug,
  }));
}

async function getArtikel(slug: string) {
  return await client.fetch('*[_type == "artikel" && slug.current == $slug][0]', { slug });
}

export default async function ArtikelPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const artikel = await getArtikel(resolvedParams.slug);

  if (!artikel) {
    return (
      <main className="section-padding" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-center">
          <h2>Artikel tidak ditemukan</h2>
          <Link href="/" className="btn btn-primary" style={{ marginTop: '20px' }}>Kembali ke Beranda</Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: '#FAF6EE', minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Header Minimal */}
      <header style={{ backgroundColor: 'var(--color-primary-dark)', padding: '20px 0', textAlign: 'center' }}>
        <Link href="/">
          <img src="/Logo + Nama.png" alt="PESMIC Logo" style={{ height: '50px', objectFit: 'contain' }} />
        </Link>
      </header>

      <article className="container" style={{ maxWidth: '800px', marginTop: '60px' }}>
        <Link href="/#edukasi" style={{ color: 'var(--color-primary)', textDecoration: 'none', display: 'inline-block', marginBottom: '20px', fontWeight: '600' }}>
          <i className="fa-solid fa-arrow-left"></i> Kembali
        </Link>
        
        <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary-dark)', marginBottom: '15px' }}>{artikel.judul}</h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--color-text-muted)', marginBottom: '30px', fontSize: '0.9rem' }}>
          <span><i className="fa-regular fa-calendar"></i> {new Date(artikel.tanggal).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</span>
          <span><i className="fa-solid fa-tag"></i> Edukasi Pertanian</span>
        </div>

        {artikel.gambar && (
          <div style={{ width: '100%', height: '400px', borderRadius: '12px', overflow: 'hidden', marginBottom: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <img src={urlFor(artikel.gambar).url()} alt={artikel.judul} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}

        <div className="artikel-content" style={{ lineHeight: '1.8', color: 'var(--color-text-dark)', fontSize: '1.1rem' }}>
          <PortableText value={artikel.konten} />
        </div>
      </article>
      
      {/* Footer Minimal */}
      <footer style={{ marginTop: '80px', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '40px', textAlign: 'center' }}>
        <p style={{ color: '#666' }}>&copy; {new Date().getFullYear()} PESMIC - CV Agri Pangan Sejahtera.</p>
      </footer>
    </main>
  );
}
