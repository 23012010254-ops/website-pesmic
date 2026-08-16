/**
 * SCRIPT.JS - INTERAKTIVITAS & MODE EDITOR WEBSITE PESMIC
 * CV AGRI PANGAN SEJAHTERA - 2026
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. SISTEM TEMPLATE CMS (MODE EDITOR VISUAL / ON-SITE EDITOR)
       ========================================================================== */
    
    // Objek penyimpan data crop gambar (zoom, x, y)
    let currentCrops = {};
    // Daftar elemen kartu dan bagian (section) yang dihapus pengguna
    let deletedCards = [];
    let deletedSections = [];

    // Inisialisasi ID Edit Dinamis pada Konten Teks, Gambar, Kartu, dan Section
    const setupEditableElements = () => {
        // Daftar penyeleksi elemen teks yang dapat diedit
        const textSelectors = [
            '.hero-title', '.hero-subtitle', 
            '.section-title', '.section-subtitle', 
            '.why-card h3', '.why-card p', 
            '.about-text', '.about-point h4', '.about-point p', 
            '.ingredient-info h3', '.ingredient-info p', 
            '.product-title', '.product-desc', '.product-price', 
            '.timeline-content h3', '.timeline-content p', 
            '.usage-step h3', '.usage-step p', 
            '.comparison-placeholder p', 
            '.testi-text', '.author-info h4', '.author-info p', 
            '.article-title', '.article-excerpt', 
            '.faq-question span', '.faq-answer p', 
            '.cta-headline', '.cta-subheadline',
            '.contact-info h2', '.contact-desc-text',
            '.detail-item h4', '.detail-item p', '.detail-item a',
            '.footer-tagline', '.footer-bottom p'
        ];

        // Daftar penyeleksi elemen gambar yang dapat diedit
        const imgSelectors = [
            '.hero-product-img', 
            '.about-img-main', 
            '.product-img', 
            '.testi-screenshot-img'
        ];

        // Daftar penyeleksi elemen kartu yang bisa dihapus
        const deletableCardSelectors = [
            '.why-card', '.ingredient-card', '.product-card', 
            '.timeline-item', '.usage-step', '.testimonial-card', 
            '.article-card', '.faq-item'
        ];

        // Daftar penyeleksi section yang bisa dihapus
        const deletableSectionSelectors = [
            '#kenapa-pesmic', '#tentang', '#bahan-alami', '#produk', '#bundling',
            '#cara-kerja', '#cara-penggunaan', '#before-after', 
            '#testimoni', '#edukasi', '#faq', '#kontak'
        ];

        // Berikan data-edit-id secara berurutan pada teks
        document.querySelectorAll(textSelectors.join(', ')).forEach((el, index) => {
            el.setAttribute('data-edit-id', `text-edit-${index}`);
        });

        // Berikan data-edit-img-id secara berurutan pada gambar
        document.querySelectorAll(imgSelectors.join(', ')).forEach((img, index) => {
            img.setAttribute('data-edit-img-id', `img-edit-${index}`);
        });

        // Berikan data-deletable-id secara berurutan pada kartu
        document.querySelectorAll(deletableCardSelectors.join(', ')).forEach((card, index) => {
            card.setAttribute('data-deletable-id', `card-${index}`);
        });

        // Berikan data-deletable-section-id pada section berdasarkan ID aslinya
        document.querySelectorAll(deletableSectionSelectors.join(', ')).forEach(section => {
            const sectionId = section.getAttribute('id');
            if (sectionId) {
                section.setAttribute('data-deletable-section-id', sectionId);
            }
        });
    };

    // Memuat data hasil edit yang disimpan di LocalStorage
    const loadEditedContent = () => {
        const savedText = localStorage.getItem('pesmic_edited_text');
        const savedImages = localStorage.getItem('pesmic_edited_images');
        const savedCrops = localStorage.getItem('pesmic_edited_crops');
        const savedDeletedCards = localStorage.getItem('pesmic_deleted_cards');
        const savedDeletedSections = localStorage.getItem('pesmic_deleted_sections');
        
        if (savedText) {
            const textData = JSON.parse(savedText);
            Object.keys(textData).forEach(id => {
                const el = document.querySelector(`[data-edit-id="${id}"]`);
                if (el) el.innerHTML = textData[id];
            });
        }
        
        if (savedImages) {
            const imgData = JSON.parse(savedImages);
            Object.keys(imgData).forEach(id => {
                const el = document.querySelector(`[data-edit-img-id="${id}"]`);
                if (el) {
                    el.src = imgData[id];
                    const container = el.closest('.testi-screenshot-container');
                    if (container) {
                        container.setAttribute('data-img', imgData[id]);
                    }
                }
            });
        }

        if (savedCrops) {
            currentCrops = JSON.parse(savedCrops);
            Object.keys(currentCrops).forEach(id => {
                const el = document.querySelector(`[data-edit-img-id="${id}"]`);
                if (el) {
                    const data = currentCrops[id];
                    el.style.transform = `scale(${data.zoom})`;
                    el.style.objectPosition = `${data.x}% ${data.y}%`;
                    el.style.objectFit = 'cover';
                    if (el.parentElement) {
                        el.parentElement.style.overflow = 'hidden';
                    }
                }
            });
        }

        if (savedDeletedCards) {
            deletedCards = JSON.parse(savedDeletedCards);
            deletedCards.forEach(id => {
                const el = document.querySelector(`[data-deletable-id="${id}"]`);
                if (el) el.style.display = 'none';
            });
        }

        if (savedDeletedSections) {
            deletedSections = JSON.parse(savedDeletedSections);
            deletedSections.forEach(id => {
                const el = document.querySelector(`[data-deletable-section-id="${id}"]`);
                if (el) el.style.display = 'none';
            });
        }
    };

    // Simpan seluruh perubahan ke LocalStorage
    const saveEditedContent = () => {
        const textData = {};
        const imgData = {};
        
        document.querySelectorAll('[data-edit-id]').forEach(el => {
            textData[el.getAttribute('data-edit-id')] = el.innerHTML;
        });
        
        document.querySelectorAll('[data-edit-img-id]').forEach(el => {
            imgData[el.getAttribute('data-edit-img-id')] = el.getAttribute('src');
        });
        
        localStorage.setItem('pesmic_edited_text', JSON.stringify(textData));
        localStorage.setItem('pesmic_edited_images', JSON.stringify(imgData));
        localStorage.setItem('pesmic_edited_crops', JSON.stringify(currentCrops));
        localStorage.setItem('pesmic_deleted_cards', JSON.stringify(deletedCards));
        localStorage.setItem('pesmic_deleted_sections', JSON.stringify(deletedSections));
        
        alert('Perubahan berhasil disimpan! Data tersimpan dengan aman di browser Anda. Silakan muat ulang halaman untuk memastikannya.');
    };

    // Hapus seluruh edit dan kembalikan ke default halaman
    const resetEditedContent = () => {
        if (confirm('Apakah Anda yakin ingin membatalkan semua perubahan dan mengembalikan tampilan ke awal bawaan file?')) {
            localStorage.removeItem('pesmic_edited_text');
            localStorage.removeItem('pesmic_edited_images');
            localStorage.removeItem('pesmic_edited_crops');
            localStorage.removeItem('pesmic_deleted_cards');
            localStorage.removeItem('pesmic_deleted_sections');
            window.location.reload();
        }
    };

    // Pasang panel editor secara dinamis ke halaman
    const injectAdminPanel = () => {
        const adminPanelHTML = `
            <div id="admin-panel">
                <button id="admin-toggle-btn" aria-label="Buka Panel Editor Web">
                    <i class="fa-solid fa-pen-to-square"></i>
                    <span>Edit Web</span>
                </button>
                <div id="admin-bar">
                    <div class="admin-bar-info">
                        <i class="fa-solid fa-circle-info"></i>
                        <span><strong>Mode Editor Aktif:</strong> Klik teks untuk edit. Gunakan tombol <strong style="color:var(--color-accent-gold);"><i class="fa-solid fa-camera"></i> Ganti</strong> / <strong style="color:var(--color-accent-gold);"><i class="fa-solid fa-crop-simple"></i> Atur</strong> pada foto. Klik tombol merah <strong style="color:#ffffff; background:#d32f2f; padding: 2px 6px; border-radius: 4px;"><i class="fa-solid fa-trash-can"></i></strong> untuk menghapus elemen.</span>
                    </div>
                    <div class="admin-bar-actions">
                        <button id="admin-save-btn" class="btn-admin btn-admin-save"><i class="fa-solid fa-floppy-disk"></i> Simpan Perubahan</button>
                        <button id="admin-reset-btn" class="btn-admin btn-admin-reset"><i class="fa-solid fa-rotate-left"></i> Reset ke Awal</button>
                    </div>
                </div>
            </div>

            <!-- Crop Controller Modal -->
            <div id="crop-modal" class="article-modal" style="z-index: 10005; display: none;">
                <div class="article-modal-content" style="max-width: 400px; padding: 30px; background-color: var(--color-primary-light); border: var(--border-gold);">
                    <span class="crop-modal-close">&times;</span>
                    <h3 style="color: var(--color-accent-gold); margin-bottom: 25px; font-size: 1.3rem;"><i class="fa-solid fa-crop-simple"></i> Atur Crop & Posisi Foto</h3>
                    
                    <div class="form-group" style="margin-bottom: 20px;">
                        <label style="color: var(--color-accent-gold); font-size: 0.88rem; font-weight: 600; margin-bottom: 8px; display: block;">Perbesar / Zoom: <span id="val-zoom" style="color:var(--color-text-charcoal);">1.0</span>x</label>
                        <input type="range" id="slider-zoom" min="1" max="3" step="0.1" value="1" style="width: 100%; accent-color: var(--color-accent-gold);">
                    </div>
                    
                    <div class="form-group" style="margin-bottom: 20px;">
                        <label style="color: var(--color-accent-gold); font-size: 0.88rem; font-weight: 600; margin-bottom: 8px; display: block;">Geser Vertikal (Y): <span id="val-y" style="color:var(--color-text-charcoal);">50</span>%</label>
                        <input type="range" id="slider-y" min="0" max="100" step="1" value="50" style="width: 100%; accent-color: var(--color-accent-gold);">
                    </div>
                    
                    <div class="form-group" style="margin-bottom: 30px;">
                        <label style="color: var(--color-accent-gold); font-size: 0.88rem; font-weight: 600; margin-bottom: 8px; display: block;">Geser Horizontal (X): <span id="val-x" style="color:var(--color-text-charcoal);">50</span>%</label>
                        <input type="range" id="slider-x" min="0" max="100" step="1" value="50" style="width: 100%; accent-color: var(--color-accent-gold);">
                    </div>
                    
                    <button id="crop-ok-btn" class="btn btn-primary btn-block" style="padding: 10px 20px;"><i class="fa-solid fa-check"></i> Selesai & Terapkan</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', adminPanelHTML);
    };

    // Controller untuk Crop / Zoom Modal
    const openCropModal = (img) => {
        const modal = document.getElementById('crop-modal');
        const sliderZoom = document.getElementById('slider-zoom');
        const sliderX = document.getElementById('slider-x');
        const sliderY = document.getElementById('slider-y');
        
        const valZoom = document.getElementById('val-zoom');
        const valX = document.getElementById('val-x');
        const valY = document.getElementById('val-y');
        
        const imgId = img.getAttribute('data-edit-img-id');
        
        // Dapatkan data crop yang ada atau default
        const cropData = currentCrops[imgId] || { zoom: 1, x: 50, y: 50 };
        
        // Set nilai slider awal
        sliderZoom.value = cropData.zoom;
        sliderX.value = cropData.x;
        sliderY.value = cropData.y;
        
        valZoom.textContent = parseFloat(cropData.zoom).toFixed(1);
        valX.textContent = cropData.x;
        valY.textContent = cropData.y;
        
        // Tampilkan modal
        modal.style.display = 'flex';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Handler input real-time
        const updateImageStyles = () => {
            const zoom = parseFloat(sliderZoom.value);
            const x = parseInt(sliderX.value);
            const y = parseInt(sliderY.value);
            
            valZoom.textContent = zoom.toFixed(1);
            valX.textContent = x;
            valY.textContent = y;
            
            // Terapkan gaya real-time ke gambar
            img.style.transform = `scale(${zoom})`;
            img.style.objectPosition = `${x}% ${y}%`;
            img.style.objectFit = 'cover';
            if (img.parentElement) {
                img.parentElement.style.overflow = 'hidden';
            }
            
            // Simpan ke variabel global sementara
            currentCrops[imgId] = { zoom, x, y };
        };
        
        // Bind input event listener
        sliderZoom.oninput = updateImageStyles;
        sliderX.oninput = updateImageStyles;
        sliderY.oninput = updateImageStyles;
        
        // Handler tutup modal
        const closeBtn = modal.querySelector('.crop-modal-close');
        const okBtn = document.getElementById('crop-ok-btn');
        
        const closeModal = () => {
            modal.style.display = 'none';
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Unbind listeners
            sliderZoom.oninput = null;
            sliderX.oninput = null;
            sliderY.oninput = null;
        };
        
        closeBtn.onclick = closeModal;
        okBtn.onclick = closeModal;
        
        modal.onclick = (e) => {
            if (e.target === modal) {
                closeModal();
            }
        };
    };

    // Aktifkan / Nonaktifkan mode editor visual
    const setupAdminEvents = () => {
        let isEditMode = false;
        const adminToggleBtn = document.getElementById('admin-toggle-btn');
        const adminBar = document.getElementById('admin-bar');
        
        if (adminToggleBtn && adminBar) {
            adminToggleBtn.addEventListener('click', () => {
                isEditMode = !isEditMode;
                if (isEditMode) {
                    document.body.classList.add('admin-mode-active');
                    adminToggleBtn.classList.add('active');
                    adminToggleBtn.innerHTML = '<i class="fa-solid fa-xmark"></i> Keluar Edit';
                    adminBar.classList.add('active');
                    
                    // 1. Aktifkan edit teks
                    document.querySelectorAll('[data-edit-id]').forEach(el => {
                        el.setAttribute('contenteditable', 'true');
                    });
                    
                    // 2. Pasang tombol edit gambar
                    document.querySelectorAll('[data-edit-img-id]').forEach(img => {
                        const parent = img.parentElement;
                        // Hindari duplikasi tombol
                        if (parent && !parent.querySelector('.edit-img-badge')) {
                            // Tombol Ganti Sumber
                            const changeBadge = document.createElement('button');
                            changeBadge.className = 'edit-img-badge';
                            changeBadge.innerHTML = '<i class="fa-solid fa-camera"></i> Ganti';
                            changeBadge.addEventListener('click', (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const currentSrc = img.getAttribute('src');
                                const newSrc = prompt('Masukkan nama file gambar baru Anda (misal: foto produk 2.jpeg) atau tautan URL gambar:', currentSrc);
                                if (newSrc && newSrc.trim() !== '') {
                                    img.src = newSrc.trim();
                                    const testiContainer = img.closest('.testi-screenshot-container');
                                    if (testiContainer) {
                                        testiContainer.setAttribute('data-img', newSrc.trim());
                                    }
                                }
                            });

                            // Tombol Atur Crop/Geser
                            const adjustBadge = document.createElement('button');
                            adjustBadge.className = 'adjust-img-badge';
                            adjustBadge.innerHTML = '<i class="fa-solid fa-crop-simple"></i> Atur';
                            adjustBadge.addEventListener('click', (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                openCropModal(img);
                            });
                            
                            parent.style.position = 'relative';
                            parent.appendChild(changeBadge);
                            parent.appendChild(adjustBadge);
                        }
                    });

                    // 3. Pasang tombol Hapus Kartu (Elementor-Style)
                    document.querySelectorAll('[data-deletable-id]').forEach(el => {
                        // Hanya berikan tombol hapus jika kartu sedang terlihat
                        if (el.style.display !== 'none' && !el.querySelector('.delete-card-badge')) {
                            const deleteBadge = document.createElement('button');
                            deleteBadge.className = 'delete-card-badge';
                            deleteBadge.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
                            deleteBadge.setAttribute('title', 'Hapus Elemen');
                            
                            deleteBadge.addEventListener('click', (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (confirm('Apakah Anda yakin ingin menghapus elemen kartu ini dari tampilan halaman?')) {
                                    const cardId = el.getAttribute('data-deletable-id');
                                    el.style.opacity = '0';
                                    el.style.transition = 'opacity 0.3s ease';
                                    setTimeout(() => {
                                        el.style.display = 'none';
                                        if (!deletedCards.includes(cardId)) {
                                            deletedCards.push(cardId);
                                        }
                                    }, 300);
                                }
                            });
                            
                            el.style.position = 'relative';
                            el.appendChild(deleteBadge);
                        }
                    });

                    // 4. Pasang tombol Hapus Section (Elementor-Style)
                    document.querySelectorAll('[data-deletable-section-id]').forEach(section => {
                        if (section.style.display !== 'none' && !section.querySelector('.section-edit-bar')) {
                            const editBar = document.createElement('div');
                            editBar.className = 'section-edit-bar';
                            
                            const deleteSecBtn = document.createElement('button');
                            deleteSecBtn.className = 'btn-section-delete';
                            deleteSecBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i> Hapus Section';
                            
                            deleteSecBtn.addEventListener('click', (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (confirm('Apakah Anda yakin ingin menghapus seluruh bagian (section) ini dari tampilan website?')) {
                                    const sectionId = section.getAttribute('data-deletable-section-id');
                                    section.style.opacity = '0';
                                    section.style.transition = 'opacity 0.3s ease';
                                    setTimeout(() => {
                                        section.style.display = 'none';
                                        if (!deletedSections.includes(sectionId)) {
                                            deletedSections.push(sectionId);
                                        }
                                    }, 300);
                                }
                            });
                            
                            editBar.appendChild(deleteSecBtn);
                            section.appendChild(editBar);
                        }
                    });

                } else {
                    document.body.classList.remove('admin-mode-active');
                    adminToggleBtn.classList.remove('active');
                    adminToggleBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Edit Web';
                    adminBar.classList.remove('active');
                    
                    // Nonaktifkan edit teks
                    document.querySelectorAll('[data-edit-id]').forEach(el => {
                        el.removeAttribute('contenteditable');
                    });
                    
                    // Hapus tombol-tombol editor dari layar
                    document.querySelectorAll('.edit-img-badge, .adjust-img-badge, .delete-card-badge, .section-edit-bar').forEach(badge => badge.remove());
                }
            });
            
            document.getElementById('admin-save-btn').addEventListener('click', saveEditedContent);
            document.getElementById('admin-reset-btn').addEventListener('click', resetEditedContent);
        }
    };

    // Jalankan inisialisasi CMS di awal
    setupEditableElements();
    loadEditedContent();
    injectAdminPanel();
    setupAdminEvents();


    /* ==========================================================================
       2. LOADING SCREEN
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

});
