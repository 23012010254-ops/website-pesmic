import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';

export const revalidate = 60;

async function getPakets() {
  try { return await client.fetch('*[_type == "paket"] | order(urutan asc)'); } catch(e) { return []; }
}
async function getTestimonis() {
  try { return await client.fetch('*[_type == "testimoni"] | order(urutan asc)'); } catch(e) { return []; }
}
async function getFaqs() {
  try { return await client.fetch('*[_type == "faq"] | order(urutan asc)'); } catch(e) { return []; }
}
async function getArtikels() {
  try { return await client.fetch('*[_type == "artikel"] | order(tanggal desc)[0...3]'); } catch(e) { return []; }
}
async function getPencapaians() {
  try { return await client.fetch('*[_type == "pencapaian"] | order(urutan asc)'); } catch(e) { return []; }
}
async function getProduks() {
  try { return await client.fetch('*[_type == "produk"] | order(urutan asc)'); } catch(e) { return []; }
}

export default async function Home() {
  const pakets = await getPakets();
  const produks = await getProduks();
  const testimonis = await getTestimonis();
  const pencapaians = await getPencapaians();
  const faqs = await getFaqs();
  const artikels = await getArtikels();

  return (
    <main>
      

    {/* Loading Screen */}
    <div id="loader">
        <div className="loader-content">
            <img src="logo_agripangan.png" alt="Agri Pangan Loading Logo" className="loader-logo animate-pulse" />
            <div className="brand-name">PESMIC</div>
            <div className="progress-bar"></div>
        </div>
    </div>

    {/* Header Navigation */}
    <nav className="navbar" id="navbar">
        <div className="container nav-container">
            <a href="#beranda" className="nav-logo">
                <img src="logo_pesmic.png" alt="Logo PESMIC" className="logo-img" />
            </a>
            
            <div className="nav-menu" id="nav-menu">
                <a href="#beranda" className="nav-link active">Beranda</a>
                <a href="#tentang" className="nav-link">Tentang</a>
                <a href="#produk" className="nav-link">Produk</a>
                <a href="#cara-kerja" className="nav-link">Cara Kerja</a>
                <a href="#cara-penggunaan" className="nav-link">Cara Penggunaan</a>
                <a href="#edukasi" className="nav-link">Edukasi</a>
                <a href="#faq" className="nav-link">FAQ</a>
                <a href="#produk" className="btn btn-primary btn-nav-cta">Beli Sekarang</a>
            </div>
            
            <button className="hamburger-menu" id="hamburger-btn" aria-label="Buka menu navigasi">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </nav>

    {/* Main Content */}
    <main>

        {/* Hero Section */}
        <header id="beranda" className="hero-section">
            <div className="container hero-container">
                <div className="hero-content scroll-reveal fade-up">
                    <h1 className="hero-title">Solusi Alami untuk<br />Tanaman Lebih Sehat</h1>
                    <hr className="hero-divider" />
                    <p className="hero-tagline">"Dari Alam untuk Alam, Solusi Alami untuk Tumbuhan."</p>
                    <p className="hero-subtitle">Pestisida dan pupuk alami berbasis <em>Carica papaya</em> yang ramah lingkungan, bebas residu kimia, dan aman untuk menjaga kesuburan tanah Anda.</p>
                    
                    {/* WhatsApp Number Badge */}
                    <div className="hero-wa-badge" style={{ background: 'rgba(255, 255, 255, 0.06)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(197, 160, 89, 0.25)', padding: '14px 24px', borderRadius: '12px', marginBottom: '32px', display: 'inline-flex', alignItems: 'center', gap: '14px' }}>
                        <i className="fa-solid fa-phone" style={{ fontSize: '1.2rem', color: '#A3BCA7' }}></i>
                        <div>
                            <p style={{ fontSize: '0.7rem', color: '#A3BCA7', margin: '0', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Hubungi Kami</p>
                            <p style={{ fontSize: '1.05rem', fontWeight: '700', color: '#FAF6EE', margin: '0' }}>+62 812-2767-2810</p>
                        </div>
                    </div>

                    <div className="hero-actions">
                        <a href="https://wa.me/6281227672810?text=Halo%20Pesmic%2C%20saya%20tertarik%20dengan%20produk%20Anda" target="_blank" className="btn btn-primary" style={{ backgroundColor: '#25D366', color: 'white', borderColor: '#25D366' }}><i className="fa-solid fa-comments"></i> Konsultasi via WhatsApp</a>
                        <a href="#produk" className="btn btn-outline"><i className="fa-solid fa-cart-shopping"></i> Lihat Produk</a>
                    </div>
                </div>
            </div>
            <div className="hero-wave">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,42.4V0Z" className="shape-fill"></path>
                </svg>
            </div>
        </header>

        {/* "Kenapa PESMIC?" Section */}
        <section id="kenapa-pesmic" className="why-section bg-beige section-padding">
            <div className="container">
                <div className="section-header text-center scroll-reveal">
                    <span className="section-tagline text-fresh">KEUNGGULAN PRODUK</span>
                    <h2 className="section-title">Kenapa Memilih PESMIC?</h2>
                    <p className="section-subtitle">Solusi terbaik perlindungan tanaman Anda dengan mengedepankan kualitas dan kelestarian ekosistem sekitar.</p>
                </div>
                
                <div className="why-grid">
                    {/* Card 1 */}
                    <div className="why-card scroll-reveal fade-up">
                        <div className="why-icon-container">
                            <i className="fa-solid fa-leaf text-fresh"></i>
                            <span className="why-num">01</span>
                        </div>
                        <h3>Berbasis Bahan Alami</h3>
                        <p>Menggunakan bahan-bahan alami yang memiliki potensi sebagai pengendali hama tanaman.</p>
                    </div>
                    
                    {/* Card 2 */}
                    <div className="why-card scroll-reveal fade-up" style={{ animationDelay: '0.1s' }}>
                        <div className="why-icon-container">
                            <i className="fa-solid fa-earth-asia text-fresh"></i>
                            <span className="why-num">02</span>
                        </div>
                        <h3>Lebih Ramah Lingkungan</h3>
                        <p>Dirancang sebagai alternatif pengendalian hama yang lebih memperhatikan kelestarian lingkungan.</p>
                    </div>
                    
                    {/* Card 3 */}
                    <div className="why-card scroll-reveal fade-up" style={{ animationDelay: '0.2s' }}>
                        <div className="why-icon-container">
                            <i className="fa-solid fa-spray-can-sparkles text-fresh"></i>
                            <span className="why-num">03</span>
                        </div>
                        <h3>Praktis Digunakan</h3>
                        <p>Produk berbentuk cair sehingga mudah diaplikasikan langsung pada berbagai jenis tanaman.</p>
                    </div>
                    
                    {/* Card 4 */}
                    <div className="why-card scroll-reveal fade-up" style={{ animationDelay: '0.3s' }}>
                        <div className="why-icon-container">
                            <i className="fa-solid fa-seedling text-fresh"></i>
                            <span className="why-num">04</span>
                        </div>
                        <h3>Mendukung Pertanian Berkelanjutan</h3>
                        <p>Mengajak masyarakat memanfaatkan sumber daya alami untuk mendukung praktik pertanian jangka panjang.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Tentang PESMIC Section */}
        <section id="tentang" className="about-section section-padding">
            <div className="container about-container">
                <div className="about-visual scroll-reveal fade-left">
                    <div className="about-image-stack">
                        <img src="pupuk%20pestisida%20no%20bg.png" alt="Produk Pesmic" className="about-img-main" style={{ backgroundColor: '#ffffff', objectFit: 'contain' }} />
                    </div>
                </div>
                <div className="about-content scroll-reveal fade-right">
                    <span className="section-tagline text-fresh">TENTANG KAMI</span>
                    <h2 className="section-title">Berawal dari Alam, untuk Tanaman yang Lebih Sehat.</h2>
                    <p className="about-text">
                        PESMIC merupakan inovasi pestisida nabati yang memanfaatkan bahan alami sebagai alternatif dalam pengendalian organisme pengganggu tanaman. Kami berkomitmen untuk menghadirkan solusi pertanian yang aman, efektif, dan terjangkau bagi semua kalangan.
                    </p>
                    <div className="about-points">
                        <div className="about-point">
                            <div className="point-icon"><i className="fa-solid fa-check"></i></div>
                            <div>
                                <h4>Pemanfaatan Bahan Alami</h4>
                                <p>Mengutamakan bahan-bahan botani terpilih yang ramah ekosistem.</p>
                            </div>
                        </div>
                        <div className="about-point">
                            <div className="point-icon"><i className="fa-solid fa-check"></i></div>
                            <div>
                                <h4>Inovasi Sederhana & Aplikatif</h4>
                                <p>Sangat mudah dipahami dan digunakan oleh pemula maupun petani berpengalaman.</p>
                            </div>
                        </div>
                        <div className="about-point">
                            <div className="point-icon"><i className="fa-solid fa-check"></i></div>
                            <div>
                                <h4>Pengurangan Ketergantungan Pestisida Sintetis</h4>
                                <p>Mengurangi residu kimia pada tanaman pangan dan hias.</p>
                            </div>
                        </div>
                    </div>
                    <a href="#bahan-alami" className="btn btn-link">Kenali PESMIC Lebih Dalam <i className="fa-solid fa-arrow-right"></i></a>
                </div>
            </div>
        </section>

        {/* Bahan Alami Section */}
        <section id="bahan-alami" className="ingredients-section bg-beige section-padding">
            <div className="container">
                <div className="section-header text-center scroll-reveal">
                    <span className="section-tagline text-fresh">FORMULASI NABATI</span>
                    <h2 className="section-title">Terinspirasi dari Kekayaan Alam</h2>
                    <p className="section-subtitle">Bahan-bahan organik berkualitas tinggi yang menjadi pilar keampuhan formula pestisida nabati PESMIC.</p>
                </div>
                
                <div className="ingredients-grid">
                    {/* Ingredient 1 */}
                    <div className="ingredient-card scroll-reveal fade-up">
                        <div className="ingredient-img-wrapper">
                            <div className="ingredient-placeholder-img text-center">
                                <i className="fa-solid fa-leaf text-fresh" style={{ fontSize: '3rem', marginBottom: '10px' }}></i>
                                <span>Ilustrasi Pepaya</span>
                            </div>
                        </div>
                        <div className="ingredient-info">
                            <h3>Daun Pepaya</h3>
                            <p>Mengandung senyawa alkaloid papain yang berperan aktif sebagai penolak (repellent) dan penghambat nafsu makan hama ulat maupun serangga pengganggu lainnya.</p>
                        </div>
                    </div>
                    
                    {/* Ingredient 2 */}
                    <div className="ingredient-card scroll-reveal fade-up" style={{ animationDelay: '0.1s' }}>
                        <div className="ingredient-img-wrapper">
                            <div className="ingredient-placeholder-img text-center">
                                <i className="fa-solid fa-mug-hot text-brown" style={{ fontSize: '3rem', marginBottom: '10px' }}></i>
                                <span>Ilustrasi Kopi</span>
                            </div>
                        </div>
                        <div className="ingredient-info">
                            <h3>Ampas / Kopi</h3>
                            <p>Kandungan kafein alami dan asam organik bertindak sebagai insektisida alami serta membantu menjauhkan siput, semut, dan ulat tanah dari media tanam.</p>
                        </div>
                    </div>
                    
                    {/* Ingredient 3 */}
                    <div className="ingredient-card scroll-reveal fade-up" style={{ animationDelay: '0.2s' }}>
                        <div className="ingredient-img-wrapper">
                            <div className="ingredient-placeholder-img text-center">
                                <i className="fa-solid fa-flask text-fresh" style={{ fontSize: '3rem', marginBottom: '10px' }}></i>
                                <span>Bahan Organik Penunjang</span>
                            </div>
                        </div>
                        <div className="ingredient-info">
                            <h3>Bahan Organik Pilihan</h3>
                            <p>Bahan alami penunjang yang diproses secara khusus untuk memperkuat daya rekat cairan pestisida pada daun serta menstabilkan masa simpan produk.</p>
                        </div>
                    </div>
                </div>
                
                <div className="ingredient-disclaimer text-center scroll-reveal">
                    <p><i className="fa-solid fa-circle-info"></i> Komposisi dan formulasi mengikuti pengembangan produk PESMIC. Informasi dirancang untuk tujuan edukasi dan tidak mengandung klaim absolut tanpa pengujian laboratorium resmi.</p>
                </div>
            </div>
        </section>

        {/* Produk Section */}
                <section id="produk" className="products-section section-padding">
            <div className="container">
                <div className="section-header text-center scroll-reveal">
                    <span className="section-tagline text-fresh">PRODUK SATUAN</span>
                    <h2 className="section-title">Varian Produk PESMIC</h2>
                    <p className="section-subtitle">Pilih produk satuan Pestisida Nabati atau Pupuk Organik Cair sesuai takaran yang Anda butuhkan.</p>
                </div>
                
                {/* Category Descriptions (2 Columns) */}
                <div className="category-desc-grid scroll-reveal">
                    <div style={{ backgroundColor: 'var(--color-primary-light)', padding: '30px', borderRadius: 'var(--border-radius-md)', border: 'var(--border-gold)', borderLeft: '4px solid var(--color-accent-gold)' }}>
                        <h3 style={{ color: 'var(--color-accent-gold)', marginBottom: '12px', fontSize: '1.25rem' }}><i className="fa-solid fa-shield-halved"></i> A. Pestisida Alami</h3>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>Pestisida nabati berbasis ekstrak <em>Carica papaya</em> yang efektif membantu mengendalikan hama ulat, kutu, dan serangga pengganggu lainnya tanpa meninggalkan residu kimia berbahaya. Aman untuk tanaman hias, sayur, dan buah Anda.</p>
                    </div>
                    <div style={{ backgroundColor: 'var(--color-primary-light)', padding: '30px', borderRadius: 'var(--border-radius-md)', border: 'var(--border-gold)', borderLeft: '4px solid var(--color-accent-gold-dark)' }}>
                        <h3 style={{ color: 'var(--color-accent-gold)', marginBottom: '12px', fontSize: '1.25rem' }}><i className="fa-solid fa-seedling"></i> B. Pupuk Alami</h3>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>Pupuk organik cair konsentrat yang memperkaya nutrisi tanah, merangsang mikroba penyubur tanah, dan meningkatkan pertumbuhan akar serta tunas tanaman secara alami dan aman.</p>
                    </div>
                </div>
                
                <div className="products-grid products-grid-2">
                    {produks.length > 0 ? produks.map((produk: any, index: number) => (
                        <div key={produk._id} className="product-card scroll-reveal fade-up" data-category="fokus-tunggal" style={{ animationDelay: `${index * 0.1}s` }}>
                            {produk.badge && <div className="product-badge">{produk.badge}</div>}
                            <div className="product-img-container">
                                {produk.gambar ? (
                                    <img src={urlFor(produk.gambar).url()} alt={produk.nama} className="product-img" />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', backgroundColor: '#e2e8f0' }}></div>
                                )}
                            </div>
                            <div className="product-body">
                                {produk.ukuran && <span className="product-vol"><i className="fa-solid fa-flask"></i> {produk.ukuran}</span>}
                                <h3 className="product-title">{produk.nama}</h3>
                                <p className="product-desc">{produk.deskripsi}</p>
                                <div className="product-price-row">
                                    {produk.hargaNormal && <span style={{ textDecoration: 'line-through', color: 'var(--color-text-muted)', fontSize: '0.9rem', display: 'block', margin: '4px 0' }}>Rp {produk.hargaNormal.toLocaleString('id-ID')}</span>}
                                    <span className="product-price">Rp {produk.hargaDiskon?.toLocaleString('id-ID') || 0}</span>
                                    {produk.hemat && <span className="hemat-tag">🔥 {produk.hemat}</span>}
                                </div>
                                <button className="btn btn-primary btn-block btn-buy" data-product={produk.nama} data-price={`Rp ${produk.hargaDiskon?.toLocaleString('id-ID') || 0}`}>
                                    <i className="fa-solid fa-cart-shopping"></i> Pesan Sekarang
                                </button>
                            </div>
                        </div>
                    )) : (
                        <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#666' }}>Produk sedang disiapkan.</p>
                    )}
                </div>
            </div>
        </section>

        {/* Bahan Alami Section */}
        <section id="bahan-alami" className="ingredients-section bg-beige section-padding">
            <div className="container">
                <div className="section-header text-center scroll-reveal">
                    <span className="section-tagline text-fresh">FORMULASI NABATI</span>
                    <h2 className="section-title">Terinspirasi dari Kekayaan Alam</h2>
                    <p className="section-subtitle">Bahan-bahan organik berkualitas tinggi yang menjadi pilar keampuhan formula pestisida nabati PESMIC.</p>
                </div>
                
                <div className="ingredients-grid">
                    {/* Ingredient 1 */}
                    <div className="ingredient-card scroll-reveal fade-up">
                        <div className="ingredient-img-wrapper">
                            <div className="ingredient-placeholder-img text-center">
                                <i className="fa-solid fa-leaf text-fresh" style={{ fontSize: '3rem', marginBottom: '10px' }}></i>
                                <span>Ilustrasi Pepaya</span>
                            </div>
                        </div>
                        <div className="ingredient-info">
                            <h3>Daun Pepaya</h3>
                            <p>Mengandung senyawa alkaloid papain yang berperan aktif sebagai penolak (repellent) dan penghambat nafsu makan hama ulat maupun serangga pengganggu lainnya.</p>
                        </div>
                    </div>
                    
                    {/* Ingredient 2 */}
                    <div className="ingredient-card scroll-reveal fade-up" style={{ animationDelay: '0.1s' }}>
                        <div className="ingredient-img-wrapper">
                            <div className="ingredient-placeholder-img text-center">
                                <i className="fa-solid fa-mug-hot text-brown" style={{ fontSize: '3rem', marginBottom: '10px' }}></i>
                                <span>Ilustrasi Kopi</span>
                            </div>
                        </div>
                        <div className="ingredient-info">
                            <h3>Ampas / Kopi</h3>
                            <p>Kandungan kafein alami dan asam organik bertindak sebagai insektisida alami serta membantu menjauhkan siput, semut, dan ulat tanah dari media tanam.</p>
                        </div>
                    </div>
                    
                    {/* Ingredient 3 */}
                    <div className="ingredient-card scroll-reveal fade-up" style={{ animationDelay: '0.2s' }}>
                        <div className="ingredient-img-wrapper">
                            <div className="ingredient-placeholder-img text-center">
                                <i className="fa-solid fa-flask text-fresh" style={{ fontSize: '3rem', marginBottom: '10px' }}></i>
                                <span>Bahan Organik Penunjang</span>
                            </div>
                        </div>
                        <div className="ingredient-info">
                            <h3>Bahan Organik Pilihan</h3>
                            <p>Bahan alami penunjang yang diproses secara khusus untuk memperkuat daya rekat cairan pestisida pada daun serta menstabilkan masa simpan produk.</p>
                        </div>
                    </div>
                </div>
                
                <div className="ingredient-disclaimer text-center scroll-reveal">
                    <p><i className="fa-solid fa-circle-info"></i> Komposisi dan formulasi mengikuti pengembangan produk PESMIC. Informasi dirancang untuk tujuan edukasi dan tidak mengandung klaim absolut tanpa pengujian laboratorium resmi.</p>
                </div>
            </div>
        </section>

        {/* Produk Section */}
        <section id="produk" className="products-section section-padding">
            <div className="container">
                <div className="section-header text-center scroll-reveal">
                    <span className="section-tagline text-fresh">PRODUK SATUAN</span>
                    <h2 className="section-title">Varian Produk PESMIC</h2>
                    <p className="section-subtitle">Pilih produk satuan Pestisida Nabati atau Pupuk Organik Cair sesuai takaran yang Anda butuhkan.</p>
                </div>
                
                {/* Category Descriptions (2 Columns) */}
                <div className="category-desc-grid scroll-reveal">
                    <div style={{ backgroundColor: 'var(--color-primary-light)', padding: '30px', borderRadius: 'var(--border-radius-md)', border: 'var(--border-gold)', borderLeft: '4px solid var(--color-accent-gold)' }}>
                        <h3 style={{ color: 'var(--color-accent-gold)', marginBottom: '12px', fontSize: '1.25rem' }}><i className="fa-solid fa-shield-halved"></i> A. Pestisida Alami</h3>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>Pestisida nabati berbasis ekstrak <em>Carica papaya</em> yang efektif membantu mengendalikan hama ulat, kutu, dan serangga pengganggu lainnya tanpa meninggalkan residu kimia berbahaya. Aman untuk tanaman hias, sayur, dan buah Anda.</p>
                    </div>
                    <div style={{ backgroundColor: 'var(--color-primary-light)', padding: '30px', borderRadius: 'var(--border-radius-md)', border: 'var(--border-gold)', borderLeft: '4px solid var(--color-accent-gold-dark)' }}>
                        <h3 style={{ color: 'var(--color-accent-gold)', marginBottom: '12px', fontSize: '1.25rem' }}><i className="fa-solid fa-seedling"></i> B. Pupuk Alami</h3>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>Pupuk organik cair konsentrat yang memperkaya nutrisi tanah, merangsang mikroba penyubur tanah, dan meningkatkan pertumbuhan akar serta tunas tanaman secara alami dan aman.</p>
                    </div>
                </div>
                
                <div className="products-grid products-grid-2">
                    {/* Produk 1: Pestisida 500ml */}
                    <div className="product-card scroll-reveal fade-up" data-category="fokus-tunggal">
                        <div className="product-badge">Pestisida</div>
                        <div className="product-img-container">
                            <img src="Paket%20Hemat%20Pesmic%20Pestisida%20no%20bg.png" alt="Pestisida Alami 500ml" className="product-img" />
                        </div>
                        <div className="product-body">
                            <span className="product-vol"><i className="fa-solid fa-flask"></i> Ukuran: 500 ml</span>
                            <h3 className="product-title">Pestisida Alami</h3>
                            <p className="product-desc">Pestisida nabati ukuran praktis untuk membantu mengendalikan hama tanaman hias, sayur, dan buah skala rumahan.</p>
                            <div className="product-price-row">
                                <span style={{ textDecoration: 'line-through', color: 'var(--color-text-muted)', fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>Rp 35.000</span>
                                <span className="product-price">Rp 24.000</span>
                                <span style={{ display: 'inline-block', backgroundColor: 'rgba(197, 160, 89, 0.12)', color: 'var(--color-accent-gold)', border: '1px solid rgba(197, 160, 89, 0.25)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '700', marginLeft: '8px' }}>Hemat Rp 11.000</span>
                            </div>
                            <button className="btn btn-primary btn-block btn-buy" data-product="Pestisida Alami 500ml" data-price="Rp 24.000">
                                <i className="fa-solid fa-cart-shopping"></i> Pesan Sekarang
                            </button>
                        </div>
                    </div>
                    
                    {/* Produk 2: Pestisida 1L */}
                    <div className="product-card scroll-reveal fade-up" data-category="fokus-tunggal" style={{ animationDelay: '0.1s' }}>
                        <div className="product-badge">Pestisida</div>
                        <div className="product-img-container">
                            <img src="pestisida%201%20liter.png" alt="Pestisida Alami 1L" className="product-img" />
                        </div>
                        <div className="product-body">
                            <span className="product-vol"><i className="fa-solid fa-flask"></i> Ukuran: 1 Liter</span>
                            <h3 className="product-title">Pestisida Alami</h3>
                            <p className="product-desc">Pilihan lebih ekonomis untuk penggunaan dengan kebutuhan volume lebih besar atau area halaman kebun yang luas.</p>
                            <div className="product-price-row">
                                <span style={{ textDecoration: 'line-through', color: 'var(--color-text-muted)', fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>Rp 60.000</span>
                                <span className="product-price">Rp 45.000</span>
                                <span style={{ display: 'inline-block', backgroundColor: 'rgba(197, 160, 89, 0.12)', color: 'var(--color-accent-gold)', border: '1px solid rgba(197, 160, 89, 0.25)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '700', marginLeft: '8px' }}>Hemat Rp 15.000</span>
                            </div>
                            <button className="btn btn-primary btn-block btn-buy" data-product="Pestisida Alami 1L" data-price="Rp 45.000">
                                <i className="fa-solid fa-cart-shopping"></i> Pesan Sekarang
                            </button>
                        </div>
                    </div>
                    
                    {/* Produk 3: Pupuk 500ml */}
                    <div className="product-card scroll-reveal fade-up" data-category="fokus-tunggal" style={{ animationDelay: '0.2s' }}>
                        <div className="product-badge">Pupuk POC</div>
                        <div className="product-img-container">
                            <img src="Paket%20Ekonomis%20Pupuk%20Organik.png" alt="Pupuk Alami 500ml" className="product-img" />
                        </div>
                        <div className="product-body">
                            <span className="product-vol"><i className="fa-solid fa-flask"></i> Ukuran: 500 ml</span>
                            <h3 className="product-title">Pupuk Alami</h3>
                            <p className="product-desc">Nutrisi konsentrat organik yang mempercepat pertumbuhan tunas baru dan memperkuat akar tanaman hias maupun sayur.</p>
                            <div className="product-price-row">
                                <span style={{ textDecoration: 'line-through', color: 'var(--color-text-muted)', fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>Rp 35.000</span>
                                <span className="product-price">Rp 24.000</span>
                                <span style={{ display: 'inline-block', backgroundColor: 'rgba(197, 160, 89, 0.12)', color: 'var(--color-accent-gold)', border: '1px solid rgba(197, 160, 89, 0.25)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '700', marginLeft: '8px' }}>Hemat Rp 11.000</span>
                            </div>
                            <button className="btn btn-primary btn-block btn-buy" data-product="Pupuk Alami 500ml" data-price="Rp 24.000">
                                <i className="fa-solid fa-cart-shopping"></i> Pesan Sekarang
                            </button>
                        </div>
                    </div>
                    
                    {/* Produk 4: Pupuk 1L */}
                    <div className="product-card scroll-reveal fade-up" data-category="fokus-tunggal" style={{ animationDelay: '0.3s' }}>
                        <div className="product-badge">Pupuk POC</div>
                        <div className="product-img-container">
                            <img src="Paket%20Hemat%20Pupuk.png" alt="Pupuk Alami 1L" className="product-img" />
                        </div>
                        <div className="product-body">
                            <span className="product-vol"><i className="fa-solid fa-flask"></i> Ukuran: 1 Liter</span>
                            <h3 className="product-title">Pupuk Alami</h3>
                            <p className="product-desc">Pupuk organik cair kapasitas 1 Liter. Mengembalikan unsur hara tanah yang hilang dan menjaga tanaman tetap subur alami.</p>
                            <div className="product-price-row">
                                <span style={{ textDecoration: 'line-through', color: 'var(--color-text-muted)', fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>Rp 60.000</span>
                                <span className="product-price">Rp 45.000</span>
                                <span style={{ display: 'inline-block', backgroundColor: 'rgba(197, 160, 89, 0.12)', color: 'var(--color-accent-gold)', border: '1px solid rgba(197, 160, 89, 0.25)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '700', marginLeft: '8px' }}>Hemat Rp 15.000</span>
                            </div>
                            <button className="btn btn-primary btn-block btn-buy" data-product="Pupuk Alami 1L" data-price="Rp 45.000">
                                <i className="fa-solid fa-cart-shopping"></i> Pesan Sekarang
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Paket Bundling Section */}
        <section id="bundling" className="bundling-section section-padding bg-beige">
            <div className="container">
                <div className="section-header text-center scroll-reveal">
                    <span className="section-tagline text-fresh">PAKET BUNDLING</span>
                    <h2 className="section-title">Paket Bundling PESMIC</h2>
                    <p className="section-subtitle">Dapatkan lebih banyak dengan harga lebih hemat! Pilih paket perlindungan & nutrisi terpadu sesuai kebutuhan Anda.</p>
                </div>
                
                <div className="products-grid">
                    {pakets.length > 0 ? pakets.map((paket: any, index: number) => (
                        <div key={paket._id} className="product-card scroll-reveal fade-up" data-category="paket-lengkap" style={{ animationDelay: `${index * 0.1}s` }}>
                            
                            <div className="product-img-container">
                                {paket.gambar && (
                                    <img src={urlFor(paket.gambar).url()} alt={paket.nama} className="product-img" />
                                )}
                            </div>
                            <div className="product-body">
                                {paket.badge && <div className="product-badge">{paket.badge}</div>}
                            <h3 className="product-title">{paket.nama}</h3>
                                <p className="product-desc">{paket.deskripsi}</p>
                                <div className="product-price-row">
                                    {paket.hargaNormal && (
                                        <span style={{ textDecoration: 'line-through', color: 'var(--color-text-muted)', fontSize: '0.9rem', display: 'block', marginBottom: '4px' }}>
                                            Rp {paket.hargaNormal.toLocaleString('id-ID')}
                                        </span>
                                    )}
                                    <span className="product-price">Rp {paket.hargaDiskon?.toLocaleString('id-ID')}</span>
                                    {paket.hemat && (
                                        <span className="hemat-tag">🔥 {paket.hemat}</span>
                                    )}
                                </div>
                                <button className="btn btn-primary btn-block btn-buy" data-product={paket.nama} data-price={`Rp ${paket.hargaDiskon?.toLocaleString('id-ID')}`}>
                                    <i className="fa-solid fa-cart-shopping"></i> Pesan Sekarang
                                </button>
                                <a href="https://s.shopee.co.id/5fo09l5fNp" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-block btn-shopee" style={{ marginTop: '10px', backgroundColor: '#EE4D2D', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    <i className="fa-solid fa-shop"></i> Beli di Shopee
                                </a>
                            </div>
                        </div>
                    )) : (
                        <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#666' }}>
                            Belum ada paket bundling yang ditambahkan. Silakan tambahkan melalui <a href="/admin" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>Panel Admin</a>.
                        </p>
                    )}
                </div>
                
                {/* Bottom Info (Why Choose Bundling) */}
                <div style={{ marginTop: '50px', backgroundColor: 'var(--color-primary-light)', padding: '30px', borderRadius: 'var(--border-radius-md)', border: 'var(--border-gold)' }} className="scroll-reveal">
                    <h3 style={{ color: 'var(--color-accent-gold)', marginBottom: '20px', fontSize: '1.3rem', textAlign: 'center' }}><i className="fa-solid fa-gift"></i> Kenapa Memilih Paket Bundling?</h3>
                    <div className="why-choose-bundling-grid">
                        <div style={{ backgroundColor: 'var(--color-primary-deep)', padding: '20px', borderRadius: 'var(--border-radius-sm)', border: 'var(--border-gold)' }}>
                            <p style={{ fontWeight: '700', color: 'var(--color-accent-gold)', marginBottom: '8px' }}><i className="fa-solid fa-scale-balanced"></i> Lebih Hemat</p>
                            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>Harga paket bundling jauh lebih murah dibandingkan dengan membeli produk POC dan Pestisida secara terpisah.</p>
                        </div>
                        <div style={{ backgroundColor: 'var(--color-primary-deep)', padding: '20px', borderRadius: 'var(--border-radius-sm)', border: 'var(--border-gold)' }}>
                            <p style={{ fontWeight: '700', color: 'var(--color-accent-gold)', marginBottom: '8px' }}><i className="fa-solid fa-cubes"></i> Praktis & Komplit</p>
                            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>Mendapatkan fungsi proteksi hama sekaligus nutrisi kesuburan tanaman dalam satu kali pembelian yang praktis.</p>
                        </div>
                        <div style={{ backgroundColor: 'var(--color-primary-deep)', padding: '20px', borderRadius: 'var(--border-radius-sm)', border: 'var(--border-gold)' }}>
                            <p style={{ fontWeight: '700', color: 'var(--color-accent-gold)', marginBottom: '8px' }}><i className="fa-solid fa-seedling"></i> Sinergi Hasil Optimal</p>
                            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>Formulasi alami POC dan Pestisida Nabati PESMIC bekerja secara bersinergi mendukung pertumbuhan maksimal tanaman Anda.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Cara Kerja Section */}
        <section id="cara-kerja" className="how-it-works-section bg-dark text-white section-padding">
            <div className="container">
                <div className="section-header text-center scroll-reveal">
                    <span className="section-tagline text-fresh">MEKANISME KERJA</span>
                    <h2 className="section-title text-white">Bagaimana PESMIC Bekerja?</h2>
                    <p className="section-subtitle text-light">Tahapan kerja terintegrasi senyawa nabati dalam membantu mengendalikan gangguan organisme pada tanaman Anda.</p>
                </div>
                
                <div className="timeline">
                    {/* Step 1 */}
                    <div className="timeline-item scroll-reveal fade-up">
                        <div className="timeline-circle">01</div>
                        <div className="timeline-content">
                            <h3>Aplikasi</h3>
                            <p>PESMIC diaplikasikan melalui penyemprotan pada bagian daun, batang, atau media tanah tanaman sesuai petunjuk penggunaan.</p>
                        </div>
                    </div>
                    
                    {/* Step 2 */}
                    <div className="timeline-item scroll-reveal fade-up" style={{ animationDelay: '0.1s' }}>
                        <div className="timeline-circle">02</div>
                        <div className="timeline-content">
                            <h3>Kontak dengan Hama</h3>
                            <p>Senyawa aktif alami seperti senyawa alkaloid dalam formulasi bersentuhan langsung atau termakan oleh organisme pengganggu tanaman.</p>
                        </div>
                    </div>
                    
                    {/* Step 3 */}
                    <div className="timeline-item scroll-reveal fade-up" style={{ animationDelay: '0.2s' }}>
                        <div className="timeline-circle">03</div>
                        <div className="timeline-content">
                            <h3>Gangguan Aktivitas Hama</h3>
                            <p>Senyawa alami membantu mengganggu sistem pernapasan, menghambat nafsu makan (anti-feedant), serta membatasi reproduksi hama.</p>
                        </div>
                    </div>
                    
                    {/* Step 4 */}
                    <div className="timeline-item scroll-reveal fade-up" style={{ animationDelay: '0.3s' }}>
                        <div className="timeline-circle">04</div>
                        <div className="timeline-content">
                            <h3>Tanaman Terlindungi</h3>
                            <p>Tanaman terbantu menghadapi gangguan hama secara berkala sebagai bagian dari siklus pengelolaan ekosistem kebun yang seimbang.</p>
                        </div>
                    </div>
                </div>
                
                <div className="how-it-works-note text-center scroll-reveal">
                    <p><i className="fa-solid fa-triangle-exclamation"></i> Kami menghindari klaim absolut seperti "membunuh seluruh hama dalam seketika". Hasil bergradasi dan sangat mendukung kelestarian musuh alami hama.</p>
                </div>
            </div>
        </section>

        {/* Cara Penggunaan Section */}
        <section id="cara-penggunaan" className="usage-section section-padding">
            <div className="container">
                <div className="section-header text-center scroll-reveal">
                    <span className="section-tagline text-fresh">PANDUAN APLIKASI</span>
                    <h2 className="section-title">Cara Menggunakan PESMIC</h2>
                    <p className="section-subtitle">Ikuti panduan praktis berikut untuk mendapatkan efisiensi penggunaan optimal dan menjaga keselamatan tanaman.</p>
                </div>
                
                <div className="usage-grid">
                    {/* Step 1 */}
                    <div className="usage-step scroll-reveal fade-up">
                        <div className="step-num-badge">1</div>
                        <div className="step-icon"><i className="fa-solid fa-bottle-droplet"></i></div>
                        <h3>Siapkan PESMIC</h3>
                        <p>Kocok botol PESMIC terlebih dahulu agar formula alami yang mengendap dapat tercampur rata.</p>
                    </div>
                    
                    {/* Step 2 */}
                    <div className="usage-step scroll-reveal fade-up" style={{ animationDelay: '0.1s' }}>
                        <div className="step-num-badge">2</div>
                        <div className="step-icon"><i className="fa-solid fa-glass-water"></i></div>
                        <h3>Larutkan Dosis</h3>
                        <p>Larutkan produk cairan PESMIC dengan air bersih sesuai dosis petunjuk penggunaan produk.</p>
                    </div>
                    
                    {/* Step 3 */}
                    <div className="usage-step scroll-reveal fade-up" style={{ animationDelay: '0.2s' }}>
                        <div className="step-num-badge">3</div>
                        <div className="step-icon"><i className="fa-solid fa-spray-can"></i></div>
                        <h3>Masukkan Sprayer</h3>
                        <p>Tuangkan larutan campuran tersebut ke dalam tangki alat penyemprot (sprayer).</p>
                    </div>
                    
                    {/* Step 4 */}
                    <div className="usage-step scroll-reveal fade-up" style={{ animationDelay: '0.3s' }}>
                        <div className="step-num-badge">4</div>
                        <div className="step-icon"><i className="fa-solid fa-shower"></i></div>
                        <h3>Semprot Merata</h3>
                        <p>Semprotkan secara merata pada area daun (terutama bagian bawah), batang, serta tanah di sekitar tanaman pagi atau sore hari.</p>
                    </div>
                    
                    {/* Step 5 */}
                    <div className="usage-step scroll-reveal fade-up" style={{ animationDelay: '0.4s' }}>
                        <div className="step-num-badge">5</div>
                        <div className="step-icon"><i className="fa-solid fa-eye"></i></div>
                        <h3>Amati Tanaman</h3>
                        <p>Lakukan pengamatan rutin pasca penyemprotan terhadap kondisi perkembangan tanaman dan aktivitas hama penyerang.</p>
                    </div>
                </div>
                
                <div className="alert-box warning-box scroll-reveal">
                    <div className="alert-icon"><i className="fa-solid fa-circle-exclamation"></i></div>
                    <div className="alert-content">
                        <strong>Perhatian:</strong> Gunakan sesuai petunjuk penggunaan. Hindari pengaplikasian berlebihan secara terus-menerus dan sangat disarankan untuk melakukan pengujian pada sebagian kecil daun tanaman terlebih dahulu (phytotoxicity test) sebelum penyemprotan ke seluruh tanaman.
                    </div>
                </div>
            </div>
        </section>

        {/* Perbandingan Section (Sebelum & Sesudah / Komparasi) */}
        <section id="before-after" className="comparison-section bg-beige section-padding">
            <div className="container">
                <div className="section-header text-center scroll-reveal">
                    <span className="section-tagline text-fresh">PERBANDINGAN PRODUK</span>
                    <h2 className="section-title">Kenapa Memilih PESMIC?</h2>
                    <p className="section-subtitle">Lihat keunggulan nyata formulasi alami PESMIC dibandingkan dengan produk pestisida kimia sintetis konvensional.</p>
                </div>
                
                <div className="max-w-5xl mx-auto scroll-reveal fade-up">
                    <div id="comparison-wrapper" style={{ overflowX: 'auto', borderRadius: 'var(--border-radius-md)', border: 'var(--border-gold)', boxShadow: 'var(--box-shadow)' }}>
                        <table id="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'var(--color-primary-light)', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid rgba(197, 160, 89, 0.4)' }}>
                                    <th style={{ padding: '20px', color: 'var(--color-accent-gold)', fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '1.1rem', backgroundColor: 'var(--color-primary-deep)' }}>Aspek Perbandingan</th>
                                    <th style={{ padding: '20px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '1.1rem', backgroundColor: 'var(--color-primary-deep)', borderLeft: '1px solid rgba(197, 160, 89, 0.15)' }}>Pestisida Kimia Sintetis</th>
                                    <th style={{ padding: '20px', color: 'var(--color-primary-dark)', fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '1.1rem', backgroundColor: 'var(--color-accent-gold)', borderLeft: '1px solid rgba(197, 160, 89, 0.15)' }}>PESMIC (Alami Carica)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid rgba(197, 160, 89, 0.15)', backgroundColor: 'rgba(197, 160, 89, 0.02)' }}>
                                    <td style={{ padding: '18px 20px', fontWeight: '600', color: 'var(--color-accent-gold)' }}>Bahan Aktif</td>
                                    <td style={{ padding: '18px 20px', borderLeft: '1px solid rgba(197, 160, 89, 0.15)', color: 'var(--color-text-muted)' }}>
                                        <i className="fa-solid fa-circle-xmark text-brown" style={{ marginRight: '8px' }}></i> Kimia Sintetis & Keras
                                    </td>
                                    <td style={{ padding: '18px 20px', borderLeft: '1px solid rgba(197, 160, 89, 0.15)', fontWeight: '600', color: 'var(--color-text-light)', backgroundColor: 'rgba(197, 160, 89, 0.05)' }}>
                                        <i className="fa-solid fa-circle-check text-fresh" style={{ marginRight: '8px' }}></i> 100% Ekstrak Daun Pepaya (Carica)
                                    </td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid rgba(197, 160, 89, 0.15)' }}>
                                    <td style={{ padding: '18px 20px', fontWeight: '600', color: 'var(--color-accent-gold)' }}>Residu Panen</td>
                                    <td style={{ padding: '18px 20px', borderLeft: '1px solid rgba(197, 160, 89, 0.15)', color: 'var(--color-text-muted)' }}>
                                        <i className="fa-solid fa-circle-xmark text-brown" style={{ marginRight: '8px' }}></i> Meninggalkan residu racun berbahaya
                                    </td>
                                    <td style={{ padding: '18px 20px', borderLeft: '1px solid rgba(197, 160, 89, 0.15)', fontWeight: '600', color: 'var(--color-text-light)', backgroundColor: 'rgba(197, 160, 89, 0.05)' }}>
                                        <i className="fa-solid fa-circle-check text-fresh" style={{ marginRight: '8px' }}></i> 0 Residu (Cepat terurai di alam)
                                    </td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid rgba(197, 160, 89, 0.15)', backgroundColor: 'rgba(197, 160, 89, 0.02)' }}>
                                    <td style={{ padding: '18px 20px', fontWeight: '600', color: 'var(--color-accent-gold)' }}>Dampak Tanah</td>
                                    <td style={{ padding: '18px 20px', borderLeft: '1px solid rgba(197, 160, 89, 0.15)', color: 'var(--color-text-muted)' }}>
                                        <i className="fa-solid fa-circle-xmark text-brown" style={{ marginRight: '8px' }}></i> Merusak kesuburan tanah & mikroba
                                    </td>
                                    <td style={{ padding: '18px 20px', borderLeft: '1px solid rgba(197, 160, 89, 0.15)', fontWeight: '600', color: 'var(--color-text-light)', backgroundColor: 'rgba(197, 160, 89, 0.05)' }}>
                                        <i className="fa-solid fa-circle-check text-fresh" style={{ marginRight: '8px' }}></i> Sangat aman bagi ekosistem tanah & air
                                    </td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid rgba(197, 160, 89, 0.15)' }}>
                                    <td style={{ padding: '18px 20px', fontWeight: '600', color: 'var(--color-accent-gold)' }}>Keamanan Pangan</td>
                                    <td style={{ padding: '18px 20px', borderLeft: '1px solid rgba(197, 160, 89, 0.15)', color: 'var(--color-text-muted)' }}>
                                        <i className="fa-solid fa-circle-xmark text-brown" style={{ marginRight: '8px' }}></i> Berpotensi bahaya bagi kesehatan konsumen
                                    </td>
                                    <td style={{ padding: '18px 20px', borderLeft: '1px solid rgba(197, 160, 89, 0.15)', fontWeight: '600', color: 'var(--color-text-light)', backgroundColor: 'rgba(197, 160, 89, 0.05)' }}>
                                        <i className="fa-solid fa-circle-check text-fresh" style={{ marginRight: '8px' }}></i> Aman dikonsumsi setelah dibilas air
                                    </td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid rgba(197, 160, 89, 0.15)', backgroundColor: 'rgba(197, 160, 89, 0.02)' }}>
                                    <td style={{ padding: '18px 20px', fontWeight: '600', color: 'var(--color-accent-gold)' }}>Keberlanjutan</td>
                                    <td style={{ padding: '18px 20px', borderLeft: '1px solid rgba(197, 160, 89, 0.15)', color: 'var(--color-text-muted)' }}>
                                        <i className="fa-solid fa-circle-xmark text-brown" style={{ marginRight: '8px' }}></i> Tidak berkelanjutan (hama cepat resisten)
                                    </td>
                                    <td style={{ padding: '18px 20px', borderLeft: '1px solid rgba(197, 160, 89, 0.15)', fontWeight: '600', color: 'var(--color-text-light)', backgroundColor: 'rgba(197, 160, 89, 0.05)' }}>
                                        <i className="fa-solid fa-circle-check text-fresh" style={{ marginRight: '8px' }}></i> Mendukung program pertanian berkelanjutan
                                    </td>
                                </tr>
                                <tr style={{ borderBottom: 'none' }}>
                                    <td style={{ padding: '18px 20px', fontWeight: '600', color: 'var(--color-accent-gold)' }}>Keterjangkauan Harga</td>
                                    <td style={{ padding: '18px 20px', borderLeft: '1px solid rgba(197, 160, 89, 0.15)', color: 'var(--color-text-muted)' }}>
                                        <i className="fa-solid fa-circle-xmark text-brown" style={{ marginRight: '8px' }}></i> Relatif mahal & cenderung terus naik
                                    </td>
                                    <td style={{ padding: '18px 20px', borderLeft: '1px solid rgba(197, 160, 89, 0.15)', fontWeight: '600', color: 'var(--color-text-light)', backgroundColor: 'rgba(197, 160, 89, 0.05)' }}>
                                        <i className="fa-solid fa-circle-check text-fresh" style={{ marginRight: '8px' }}></i> Sangat terjangkau bagi kelompok petani lokal
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Highlight Badges */}
                    <div style={{ marginTop: '35px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 22px', backgroundColor: 'rgba(197, 160, 89, 0.12)', color: 'var(--color-accent-gold)', borderRadius: '30px', fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '0.9rem', border: 'var(--border-gold)' }}>
                            <i className="fa-solid fa-leaf"></i> Ramah Lingkungan
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 22px', backgroundColor: 'rgba(197, 160, 89, 0.12)', color: 'var(--color-accent-gold)', borderRadius: '30px', fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '0.9rem', border: 'var(--border-gold)' }}>
                            <i className="fa-solid fa-seedling"></i> Tanpa Residu Toksik
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 22px', backgroundColor: 'rgba(197, 160, 89, 0.12)', color: 'var(--color-accent-gold)', borderRadius: '30px', fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '0.9rem', border: 'var(--border-gold)' }}>
                            <i className="fa-solid fa-rotate-left"></i> Pertanian Berkelanjutan
                        </span>
                    </div>
                </div>
            </div>
        </section>

        {/* Testimonial Section */}
        <section id="testimoni" className="testimonial-section section-padding">
            <div className="container">
                <div className="section-header text-center scroll-reveal">
                    <span className="section-tagline text-fresh">REVIEW PENGGUNA</span>
                    <h2 className="section-title">Apa Kata Pengguna?</h2>
                    <p className="section-subtitle">Pengalaman nyata dari para pehobi tanaman dan petani yang telah merasakan kepraktisan dan manfaat PESMIC.</p>
                </div>
                
                {/* Testimonial Grid with Text and Screenshots */}
                <div className="testimonial-grid scroll-reveal fade-up">
                    {testimonis.length > 0 ? testimonis.map((testi: any, index: number) => (
                        <div key={testi._id} className="testimonial-card">
                            <div className="testi-stars">
                                <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                            </div>
                            {testi.keterangan && <p className="testi-text">"{testi.keterangan}"</p>}
                            
                            <div className="testi-screenshot-container" data-img={testi.gambar ? urlFor(testi.gambar).url() : ''} data-name={testi.nama}>
                                {testi.gambar && (
                                    <img src={urlFor(testi.gambar).url()} alt={`Testimoni ${testi.nama}`} className="testi-screenshot-img" />
                                )}
                                <div className="testi-screenshot-overlay">
                                    <i className="fa-solid fa-magnifying-glass-plus"></i>
                                    <span>Perbesar Bukti Chat</span>
                                </div>
                            </div>
                            
                            <div className="testi-author">
                                <div className="author-info">
                                    <h4>{testi.nama}</h4>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#666' }}>Belum ada testimoni.</p>
                    )}
                </div>
            </div>
        </section>
        {/* "Pencapaian" Section */}
        <section id="pencapaian" className="why-section bg-beige section-padding" style={{ borderTop: '1px solid rgba(197, 160, 89, 0.2)' }}>
            <div className="container">
                <div className="section-header text-center scroll-reveal">
                    <span className="section-tagline text-fresh">PRESTASI KAMI</span>
                    <h2 className="section-title">Pencapaian & Legalitas</h2>
                    <p className="section-subtitle">Bukti nyata dari komitmen kami dalam menghadirkan produk berkualitas tinggi yang diakui.</p>
                </div>
                
                <div className="why-grid">
                    {pencapaians.length > 0 ? pencapaians.map((item: any, index: number) => (
                        <div key={item._id} className="why-card scroll-reveal fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                            {item.gambar && (
                                <img src={urlFor(item.gambar).url()} alt={item.judul} style={{ width: '100%', borderRadius: '12px', marginBottom: '20px', objectFit: 'cover', maxHeight: '250px' }} />
                            )}
                            <h3 className="why-card-title">{item.judul}</h3>
                            <p className="why-card-desc">{item.deskripsi}</p>
                        </div>
                    )) : (
                         <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#666' }}>Belum ada pencapaian.</p>
                    )}
                </div>
            </div>
        </section>


        {/* Edukasi Section (Blog Cards with Search) */}
        <section id="edukasi" className="education-section bg-beige section-padding">
            <div className="container">
                <div className="section-header text-center scroll-reveal">
                    <span className="section-tagline text-fresh">BELAJAR DARI ALAM</span>
                    <h2 className="section-title">Edukasi Pertanian Alami</h2>
                    <p className="section-subtitle">Mari pahami prinsip-prinsip dasar pestisida nabati dan pengelolaan kebun sehat secara berkelanjutan.</p>
                </div>
                
                {/* Search Bar */}
                <div className="search-container scroll-reveal">
                    <div className="search-wrapper">
                        <i className="fa-solid fa-magnifying-glass search-icon"></i>
                        <input type="text" id="blog-search-input" placeholder="Cari artikel edukasi..." aria-label="Cari artikel" />
                    </div>
                </div>
                
                {/* Articles Grid */}
                <div className="articles-grid" id="articles-grid">
                    {artikels.length > 0 ? artikels.map((artikel: any, index: number) => (
                        <article key={artikel._id} className="article-card scroll-reveal fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="article-img-wrapper" style={{ height: '200px', padding: 0 }}>
                                {artikel.gambar ? (
                                    <img src={urlFor(artikel.gambar).url()} alt={artikel.judul} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <div className="article-placeholder-img text-center" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <i className="fa-solid fa-leaf text-fresh" style={{ fontSize: '3rem' }}></i>
                                    </div>
                                )}
                            </div>
                            <div className="article-body">
                                <span className="product-vol" style={{ color: 'var(--color-primary)', fontSize: '0.8rem', display: 'block', marginBottom: '10px' }}><i className="fa-regular fa-calendar"></i> {new Date(artikel.tanggal).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</span>
                                <h3 className="article-title">{artikel.judul}</h3>
                                <p className="article-excerpt">{artikel.ringkasan}</p>
                                <Link href={`/artikel/${artikel.slug?.current}`} className="btn-read-more">Baca Selengkapnya <i className="fa-solid fa-arrow-right"></i></Link>
                            </div>
                        </article>
                    )) : (
                        <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#666' }}>Belum ada artikel edukasi.</p>
                    )}
                </div>
                {/* No Results Search Message */}
                <div id="no-results" className="text-center" style={{ display: 'none', padding: '40px 0' }}>
                    <i className="fa-solid fa-magnifying-glass text-muted" style={{ fontSize: '3rem', marginBottom: '15px' }}></i>
                    <p className="text-muted">Maaf, artikel edukasi yang Anda cari tidak ditemukan.</p>
                </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="faq-section section-padding">
            <div className="container">
                <div className="section-header text-center scroll-reveal">
                    <span className="section-tagline text-fresh">BANTUAN INFORMASI</span>
                    <h2 className="section-title">Pertanyaan yang Sering Ditanyakan</h2>
                    <p className="section-subtitle">Jawaban cepat atas pertanyaan paling mendasar mengenai pestisida alami PESMIC dan cara kerjanya.</p>
                </div>
                
                <div className="faq-accordion-wrapper scroll-reveal fade-up">
                    {faqs.length > 0 ? faqs.map((faq: any, index: number) => (
                        <div key={faq._id} className="faq-item">
                            <button className="faq-question">
                                <span>{faq.pertanyaan}</span>
                                <i className="fa-solid fa-chevron-down faq-arrow"></i>
                            </button>
                            <div className="faq-answer">
                                <p>{faq.jawaban}</p>
                            </div>
                        </div>
                    )) : (
                        <p style={{ textAlign: 'center', color: '#666' }}>Belum ada FAQ.</p>
                    )}
                </div>
            </div>
        </section>
        


        {/* Big CTA Section */}
        <section className="action-cta-section text-white text-center relative overflow-hidden">
            <div className="cta-overlay-bg"></div>
            <div className="container relative z-10 scroll-reveal">
                <span className="cta-tagline"><i className="fa-solid fa-leaf"></i> LINDUNGI ALAM & TANAMAN</span>
                <h2 className="cta-headline text-white">Mulai Rawat Tanaman dengan Pendekatan yang Lebih Alami.</h2>
                <p className="cta-subheadline text-light">Kenali PESMIC dan temukan alternatif pengendalian hama berbasis bahan alami untuk tanaman kesayangan Anda.</p>
                <div className="cta-actions">
                    <a href="#produk" className="btn btn-primary btn-cta-light"><i className="fa-solid fa-cart-shopping"></i> Pesan PESMIC Sekarang</a>
                    <a href="#kontak" className="btn btn-outline btn-cta-outline"><i className="fa-solid fa-comments"></i> Hubungi Kami</a>
                </div>
            </div>
        </section>

        {/* Contact Section */}
        <section id="kontak" className="contact-section section-padding">
            <div className="container contact-container">
                {/* Info Kolom */}
                <div className="contact-info scroll-reveal fade-left">
                    <span className="section-tagline text-fresh">LAYANAN KONSULTASI</span>
                    <h2 className="section-title">Hubungi PESMIC</h2>
                    <p className="contact-desc-text">Ada pertanyaan mengenai produk, konsultasi dosis pemakaian, atau pengiriman paket besar? Hubungi kami langsung melalui salah satu kontak di bawah ini.</p>
                    
                    <div className="contact-details">
                        <div className="detail-item">
                            <div className="detail-icon"><i className="fa-brands fa-whatsapp text-fresh"></i></div>
                            <div>
                                <h4>WhatsApp</h4>
                                <a href="https://wa.me/6281227672810" target="_blank" rel="noopener">+62 812-2767-2810</a>
                            </div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-icon"><i className="fa-brands fa-instagram text-fresh"></i></div>
                            <div>
                                <h4>Instagram</h4>
                                <a href="https://www.instagram.com/pesmic_store?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener">@pesmic_store</a>
                            </div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-icon"><i className="fa-solid fa-envelope text-fresh"></i></div>
                            <div>
                                <h4>Email</h4>
                                <a href="mailto:cvagripangansejahtera@gmail.com">cvagripangansejahtera@gmail.com</a>
                            </div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-icon"><i className="fa-solid fa-location-dot text-fresh"></i></div>
                            <div>
                                <h4>Lokasi</h4>
                                <p>Dsn Jenggolok RT 04 RW 07 Desa Gedangkukut<br />Cerme Gresik</p>
                            </div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-icon"><i className="fa-solid fa-clock text-fresh"></i></div>
                            <div>
                                <h4>Jam Operasional</h4>
                                <p style={{ lineHeight: '1.8' }}>Senin - Kamis: 08:00 - 20:00<br />Jumat: 13:00 - 22:00<br />Sabtu: 08:00 - 20:00<br />Minggu: Tutup</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Form Kolom */}
                <div className="contact-form-wrapper scroll-reveal fade-right">
                    <h3>Kirim Pesan Langsung</h3>
                    <p className="form-instruction">Tuliskan detail pertanyaan Anda di bawah ini, kami akan meneruskan pesan Anda ke admin WhatsApp kami secara otomatis.</p>
                    
                    <form id="contact-wa-form">
                        <div className="form-group">
                            <label htmlFor="form-name">Nama Lengkap</label>
                            <input type="text" id="form-name" placeholder="Masukkan nama lengkap Anda" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="form-phone">Nomor WhatsApp</label>
                            <input type="tel" id="form-phone" placeholder="Contoh: 081234567890" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="form-email">Alamat Email (Opsional)</label>
                            <input type="email" id="form-email" placeholder="Contoh: nama@domain.com" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="form-message">Pesan Anda</label>
                            <textarea id="form-message" rows={5} placeholder="Tuliskan keluhan tanaman atau paket produk yang ingin ditanyakan..." required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">
                            <i className="fa-solid fa-paper-plane"></i> Kirim Pesan
                        </button>
                    </form>
                </div>
            </div>
        </section>

    </main>

    {/* Footer */}
    <footer className="footer bg-dark text-white">
        <div className="container footer-container">
            <div className="footer-brand scroll-reveal">
                <a href="#beranda" className="footer-logo">
                    <img src="logo_pesmic.png" alt="Logo PESMIC" className="logo-img" />
                </a>
                <p className="footer-tagline">“dari alam untuk alam, solusi alami untuk tumbuhan”</p>
                <div className="developer-credit">
                    <img src="logo_agripangan.png" alt="CV Agri Pangan Sejahtera Logo" className="dev-logo-img" />
                    <span>Dikembangkan bersama CV Agri Pangan Sejahtera</span>
                </div>
            </div>
            
            <div className="footer-links scroll-reveal" style={{ animationDelay: '0.1s' }}>
                <h3>Menu Pintasan</h3>
                <nav className="footer-nav">
                    <a href="#beranda">Beranda</a>
                    <a href="#tentang">Tentang</a>
                    <a href="#produk">Produk</a>
                    <a href="#cara-kerja">Cara Kerja</a>
                    <a href="#cara-penggunaan">Cara Penggunaan</a>
                    <a href="#edukasi">Edukasi</a>
                    <a href="#faq">FAQ</a>
                    <a href="#kontak">Kontak</a>
                </nav>
            </div>
            
            <div className="footer-socials scroll-reveal" style={{ animationDelay: '0.2s' }}>
                <h3>Ikuti Kami</h3>
                <p>Ikuti perkembangan inovasi kami dan tips tani berkelanjutan melalui kanal sosial media.</p>
                <div className="social-icons">
                    <a href="https://www.instagram.com/pesmic_store?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                    <a href="https://wa.me/6281227672810" target="_blank" rel="noopener" aria-label="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a>
                    <a href="https://www.tiktok.com/@pesmic" target="_blank" aria-label="TikTok"><i className="fa-brands fa-tiktok"></i></a>
                    <a href="https://s.shopee.co.id/5fo09l5fNp" target="_blank" rel="noopener" aria-label="Shopee"><i className="fa-solid fa-shop"></i></a>
                </div>
            </div>
        </div>
        
        <div className="footer-bottom text-center">
            <div className="container">
                <p>&copy; 2026 PESMIC. All Rights Reserved. Hak Cipta Dilindungi.</p>
            </div>
        </div>
    </footer>

    {/* Floating Action Button Menu */}
    <div className="floating-socials" id="floating-socials">
        <div className="floating-socials-menu">
            <a href="https://www.instagram.com/pesmic_store?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="floating-btn btn-ig" target="_blank" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
                <span className="fab-tooltip">Instagram</span>
            </a>
            <a href="https://www.tiktok.com/@pesmic" className="floating-btn btn-tiktok" target="_blank" aria-label="TikTok">
                <i className="fa-brands fa-tiktok"></i>
                <span className="fab-tooltip">TikTok</span>
            </a>
            <a href="https://s.shopee.co.id/5fo09l5fNp" className="floating-btn btn-shopee" target="_blank" rel="noopener" aria-label="Shopee">
                <i className="fa-solid fa-shop"></i>
                <span className="fab-tooltip">Shopee</span>
            </a>
            <a href="https://wa.me/6281227672810?text=Halo%20PESMIC,%20saya%20tertarik%20dengan%20produk%20pestisida%20alami%20ini.%20Bisa%20berikan%20informasi%20lebih%20lanjut?" className="floating-btn btn-wa" target="_blank" aria-label="WhatsApp">
                <i className="fa-brands fa-whatsapp"></i>
                <span className="fab-tooltip">Chat Admin</span>
            </a>
        </div>
        <button className="floating-btn main-btn" id="fab-toggle" aria-label="Menu Kontak">
            <i className="fa-brands fa-whatsapp"></i>
            <i className="fa-solid fa-xmark"></i>
        </button>
    </div>

    {/* Scroll To Top Button */}
    <button id="scroll-to-top" className="scroll-to-top" aria-label="Kembali ke atas">
        <i className="fa-solid fa-arrow-up"></i>
    </button>

    {/* Testimonial Lightbox Modal */}
    <div id="lightbox-modal" className="lightbox-modal">
        <span className="lightbox-close">&times;</span>
        <img className="lightbox-content" id="lightbox-img" alt="Zoomed Testimonial" />
        <div id="lightbox-caption"></div>
    </div>

    {/* Article Content Modal */}
    <div id="article-modal" className="article-modal">
        <div className="article-modal-content">
            <span className="article-modal-close">&times;</span>
            <div id="article-modal-body"></div>
        </div>
    </div>

    {/* JavaScript Files */}
    

    </main>
  );
}
