/**
 * SCRIPT.JS - INTERAKTIVITAS & MODE EDITOR WEBSITE PESMIC
 * CV AGRI PANGAN SEJAHTERA - 2026
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. LOADING SCREEN
       ========================================================================== */
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
            }, 600);
        });
        
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }, 3000);
    }

    /* ==========================================================================
       3. STICKY NAVBAR & SCROLL-TO-TOP BUTTON
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // Sticky Navbar
        if (scrollPos > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll to Top Button
        if (scrollPos > 300) {
            scrollToTopBtn.classList.add('active');
        } else {
            scrollToTopBtn.classList.remove('active');
        }
    });

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ==========================================================================
       4. HAMBURGER MENU (MOBILE NAVIGATION)
       ========================================================================== */
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    /* ==========================================================================
       5. SCROLLSPY (ACTIVE NAV LINK ON SCROLL)
       ========================================================================== */
    const sections = document.querySelectorAll('header, section');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // offset tinggi navbar

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       6. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add('revealed');
        });
    }

    /* ==========================================================================
       7. PRODUCT FILTERING (TAB SYSTEM)
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.classList.remove('hidden');
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.classList.add('hidden');
                    }
                }, 200);
            });
        });
    });

    /* ==========================================================================
       8. FAQ ACCORDION
       ========================================================================== */
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = question.nextElementSibling;
            const isActive = faqItem.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            if (isActive) {
                faqItem.classList.remove('active');
                answer.style.maxHeight = null;
            } else {
                faqItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    /* ==========================================================================
       9. REAL-TIME ARTICLE SEARCH (EDUKASI)
       ========================================================================== */
    const searchInput = document.getElementById('blog-search-input');
    const articleCards = document.querySelectorAll('.article-card');
    const noResultsMsg = document.getElementById('no-results');

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            let matchesFound = 0;

            articleCards.forEach(card => {
                const title = card.getAttribute('data-title') || '';
                
                if (title.includes(searchTerm)) {
                    card.classList.remove('hidden');
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                    matchesFound++;
                } else {
                    card.classList.add('hidden');
                }
            });

            if (matchesFound === 0 && searchTerm !== '') {
                noResultsMsg.style.display = 'block';
            } else {
                noResultsMsg.style.display = 'none';
            }
        });
    }

    /* ==========================================================================
       10. LIGHTBOX MODAL FOR TESTIMONIALS IMAGES
       ========================================================================== */
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const galleryItems = document.querySelectorAll('.testi-screenshot-container');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightboxModal && galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                // Jangan picu modal jika sedang berada di dalam Mode Editor Aktif
                if (document.body.classList.contains('admin-mode-active')) return;

                const imgPath = item.getAttribute('data-img');
                const authorName = item.getAttribute('data-name');

                lightboxModal.style.display = 'block';
                lightboxImg.src = imgPath;
                lightboxCaption.textContent = `Dokumentasi Testimoni Real - ${authorName}`;
                document.body.style.overflow = 'hidden'; // Kunci scroll layar utama
            });
        });

        const closeLightbox = () => {
            lightboxModal.style.display = 'none';
            lightboxImg.src = '';
            document.body.style.overflow = 'auto';
        };

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal || e.target === lightboxClose) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxModal.style.display === 'block') {
                closeLightbox();
            }
        });
    }

    /* ==========================================================================
       11. WHATSAPP MESSAGE GENERATOR (INTEGRATION)
       ========================================================================== */
    const adminWhatsApp = '6281227672810';

    const buyButtons = document.querySelectorAll('.btn-buy');
    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-product');
            const productPrice = button.getAttribute('data-price');
            
            const message = `Halo PESMIC! %0ASaya tertarik untuk membeli produk berikut:%0A%0A` +
                            `- *Produk:* ${productName}%0A` +
                            `- *Harga:* ${productPrice}%0A%0A` +
                            `Mohon informasi lebih lanjut mengenai cara pembayaran dan estimasi ongkos kirim. Terima kasih!`;
            
            const waUrl = `https://wa.me/${adminWhatsApp}?text=${message}`;
            window.open(waUrl, '_blank');
        });
    });

    const contactForm = document.getElementById('contact-wa-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('form-name').value.trim();
            const phone = document.getElementById('form-phone').value.trim();
            const email = document.getElementById('form-email').value.trim() || 'Tidak disertakan';
            const messageText = document.getElementById('form-message').value.trim();
            
            const formattedMessage = `Halo Admin PESMIC!%0A%0ASaya ingin berkonsultasi mengenai tanaman/produk. Berikut data saya:%0A%0A` +
                                     `- *Nama Lengkap:* ${name}%0A` +
                                     `- *No. WhatsApp:* ${phone}%0A` +
                                     `- *Alamat Email:* ${email}%0A%0A` +
                                     `*Pesan/Pertanyaan:*%0A${messageText}%0A%0A` +
                                     `Terima kasih.`;
            
            const waUrl = `https://wa.me/${adminWhatsApp}?text=${formattedMessage}`;
            window.open(waUrl, '_blank');
            
            contactForm.reset();
        });
    }

    /* ==========================================================================
       12. ARTICLE MODAL (BLOG READ MORE CONTENT)
       ========================================================================== */
    const articleModal = document.getElementById('article-modal');
    const articleModalBody = document.getElementById('article-modal-body');
    const articleModalClose = document.querySelector('.article-modal-close');
    const readMoreBtns = document.querySelectorAll('.btn-read-more');

    const articlesData = {
        '1': {
            category: 'Pestisida Nabati',
            title: 'Apa Itu Pestisida Nabati?',
            content: `
                <p><strong>Pestisida Nabati</strong> adalah pestisida yang bahan aktifnya berasal dari tumbuh-tumbuhan atau bagian tanaman seperti daun, buah, biji, akar, maupun kulit batang. Berbeda dengan pestisida kimia sintetis, pestisida nabati bekerja secara alami dan memiliki biodegradabilitas tinggi sehingga cepat terurai di alam.</p>
                <p>Senyawa bioaktif yang terkandung di dalam tumbuh-tumbuhan (seperti alkaloid, terpenoid, fenolik, dan flavonoid) bertindak sebagai pengendali hama dengan mekanisme:</p>
                <ul>
                    <li><strong>Repellent:</strong> Mengusir atau menjauhkan serangga dari tanaman.</li>
                    <li><strong>Anti-feedant:</strong> Menghambat nafsu makan serangga sehingga serangga kelaparan dan perkembangannya terhenti.</li>
                    <li><strong>Oviposition Deterrent:</strong> Mencegah serangga bertelur pada bagian daun tanaman.</li>
                    <li><strong>Racun Kontak/Lambung:</strong> Mengganggu metabolisme tubuh hama saat bersentuhan atau termakan.</li>
                </ul>
                <p>Dengan menggunakan pestisida nabati seperti PESMIC, kita membantu menekan residu racun pada hasil panen pertanian sekaligus menjaga keselamatan serangga predator alami yang bermanfaat bagi ekosistem kebun.</p>
            `
        },
        '2': {
            category: 'Keberlanjutan',
            title: 'Mengapa Pertanian Berkelanjutan Itu Penting?',
            content: `
                <p><strong>Pertanian Berkelanjutan (Sustainable Agriculture)</strong> adalah sebuah metode bertani yang berorientasi pada pemenuhan kebutuhan pangan saat ini tanpa harus mengorbankan kualitas hidup generasi masa depan.</p>
                <p>Dalam praktiknya, pertanian berkelanjutan mencakup tiga aspek utama:</p>
                <ul>
                    <li><strong>Ekologi/Lingkungan:</strong> Melestarikan kualitas tanah, air, keanekaragaman hayati, serta mengurangi penggunaan zat kimia beracun.</li>
                    <li><strong>Ekonomi:</strong> Menghasilkan keuntungan yang adil bagi petani dan memastikan keberlangsungan rantai pasok pangan regional.</li>
                    <li><strong>Sosial:</strong> Mendukung kesehatan masyarakat sekitar dari ancaman paparan residu racun kimia berbahaya.</li>
                </ul>
                <p>Mengapa sangat penting? Karena ketergantungan berlebih terhadap pupuk dan pestisida sintetis terbukti telah mengeraskan tekstur tanah, membunuh mikroorganisme penyubur tanah alami, serta mencemari aliran air sungai di sekitar area lahan. Memilih alternatif alami seperti PESMIC adalah langkah nyata kecil kita dalam mendukung pertanian Indonesia yang lestari.</p>
            `
        },
        '3': {
            category: 'Identifikasi Hama',
            title: 'Mengenal Hama Tanaman Hortikultura',
            content: `
                <p>Hama adalah organisme pengganggu tanaman yang merusak jaringan fisik tumbuhan dan menghambat proses fotosintesis maupun pertumbuhan buah. Beberapa hama populer yang sering menyerang tanaman hortikultura (sayur, buah, hias) antara lain:</p>
                <ul>
                    <li><strong>Kutu Putih (Mealybug):</strong> Serangga kecil berbulu putih seperti kapas yang menghisap cairan sel tanaman, menyebabkan daun keriput dan layu.</li>
                    <li><strong>Ulat Grayak:</strong> Larva serangga yang sangat rakus memakan dedaunan hingga menyisakan tulang daun saja dalam hitungan hari.</li>
                    <li><strong>Tungau Merah (Spider Mites):</strong> Hama mikroskopis yang membuat jaring halus di bawah daun, menghisap klorofil hingga daun berbintik kuning dan gak subur.</li>
                    <li><strong>Kutu Daun (Aphids):</strong> Menyerang pucuk daun muda dan mengeluarkan cairan manis (embun jelaga) yang mengundang jamur jelaga hitam.</li>
                </ul>
                <p>Kunci keberhasilan dalam pengendalian hama adalah pengawasan dini (monitoring). Menyemprotkan pestisida nabati PESMIC secara berkala sebelum populasi hama meledak jauh lebih efektif daripada mengobati tanaman yang sudah rusak parah.</p>
            `
        },
        '4': {
            category: 'Daun Pepaya',
            title: 'Daun Pepaya dan Potensinya Sebagai Pestisida',
            content: `
                <p><strong>Daun Pepaya (Carica papaya)</strong> telah lama dikenal di kalangan akademisi pertanian sebagai salah satu bahan botani paling potensial untuk diramu menjadi pestisida nabati.</p>
                <p>Hal ini disebabkan oleh tingginya kandungan senyawa fitokimia di dalam jaringan daunnya, di antaranya:</p>
                <ul>
                    <li><strong>Papain:</strong> Enzim protease aktif yang dapat merusak dinding protein luar dari tubuh ulat atau serangga lunak saat terjadi kontak fisik.</li>
                    <li><strong>Alkaloid Karpaid:</strong> Senyawa pahit alami yang berfungsi sebagai penolak nafsu makan (anti-feedant) ekstrem bagi hama pemakan daun.</li>
                    <li><strong>Glukosinolat:</strong> Zat penolak serangga alami yang mengeluarkan aroma khas penolak hama bertelur.</li>
                </ul>
                <p>Inovasi PESMIC memformulasikan potensi ekstrak daun pepaya ini agar mudah larut, tahan lebih lama disimpan, dan praktis diaplikasikan langsung ke tanaman Anda tanpa repot menyaring secara manual di rumah.</p>
            `
        }
    };

    if (articleModal && readMoreBtns.length > 0 && articleModalBody) {
        readMoreBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const articleId = btn.getAttribute('data-article');
                const articleData = articlesData[articleId];

                if (articleData) {
                    articleModalBody.innerHTML = `
                        <span class="modal-meta">${articleData.category}</span>
                        <h2>${articleData.title}</h2>
                        <div class="modal-text">${articleData.content}</div>
                    `;
                    articleModal.classList.add('active');
                    articleModal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        const closeArticleModal = () => {
            articleModal.classList.remove('active');
            setTimeout(() => {
                articleModal.style.display = 'none';
            }, 300);
            document.body.style.overflow = 'auto';
        };

        if (articleModalClose) {
            articleModalClose.addEventListener('click', closeArticleModal);
        }

        articleModal.addEventListener('click', (e) => {
            if (e.target === articleModal) {
                closeArticleModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && articleModal.classList.contains('active')) {
                closeArticleModal();
            }
        });
    }

    /* ==========================================================================
       13. FLOATING ACTION BUTTON (FAB) MENU
       ========================================================================== */
    const fabToggleBtn = document.getElementById('fab-toggle');
    const floatingSocials = document.getElementById('floating-socials');

    if (fabToggleBtn && floatingSocials) {
        fabToggleBtn.addEventListener('click', () => {
            floatingSocials.classList.toggle('active');
        });

        // Close when clicked outside
        document.addEventListener('click', (e) => {
            if (!floatingSocials.contains(e.target)) {
                floatingSocials.classList.remove('active');
            }
        });
    }

});
