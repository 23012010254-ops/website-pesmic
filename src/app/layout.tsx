import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "PESMIC - Pestisida Alami Ampuh & Terjangkau",
  description: "PESMIC (Pestisida Minyak Cengkeh) memberikan perlindungan alami, ampuh dan terjangkau untuk tanaman Anda. Jaga kesehatan tanaman tanpa bahan kimia berbahaya.",
  keywords: ["pestisida nabati", "pestisida organik", "pupuk organik cair", "pertanian berkelanjutan", "pembasmi hama alami", "PESMIC"],
  openGraph: {
    title: "PESMIC - Pestisida Alami Ampuh & Terjangkau",
    description: "Perlindungan alami dan ampuh untuk tanaman Anda. Jaga kesehatan tanaman tanpa bahan kimia berbahaya dengan PESMIC.",
    url: "https://pesmic.vercel.app",
    siteName: "PESMIC",
    locale: "id_ID",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={poppins.className}>
        {children}
        <Script src="/script.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
