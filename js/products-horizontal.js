/**
 * PRODUCTS HORIZONTAL SCROLLER - ÇOK DİLLİ
 * Preline ürün slider'ı
 */

class ProductsHorizontalScroller {
    constructor() {
        this.scroller = document.getElementById('horizontalScroller');
        this.prevBtn = document.querySelector('.btn-scroll-prev');
        this.nextBtn = document.querySelector('.btn-scroll-next');
        this.progressBar = document.querySelector('.progress-bar');
        
        this.products = this.getProductsData();
        this.currentLang = 'tr'; // Default language
        this.isDragging = false;
        this.startX = 0;
        this.scrollLeft = 0;
        
        this.init();
    }
    
    init() {
        if (!this.scroller) {
            console.warn('Horizontal scroller container not found');
            return;
        }
        
        // Dil değişikliğini dinle
        this.listenToLanguageChanges();
        
        this.renderProducts();
        this.setupEventListeners();
        this.updateScrollButtons();
        this.updateProgress();
        
        console.log(`Products scroller initialized with ${this.products.length} products`);
    }
    
    listenToLanguageChanges() {
        // Language switcher'dan dil değişimini dinle
        document.addEventListener('languageChanged', (e) => {
            if (e.detail && e.detail.lang) {
                this.currentLang = e.detail.lang;
                this.updateProductTranslations();
            }
        });
        
        // LocalStorage'tan dil kontrolü
        try {
            const savedLang = localStorage.getItem('preline-language');
            if (savedLang) {
                this.currentLang = savedLang;
            }
        } catch (e) {
            console.warn('Could not load language from storage:', e);
        }
    }
    
    getProductsData() {
        // Ürün verilerini dil anahtarlarıyla birlikte tanımla
        return [
            {
                id: 1,
                name: {
                    tr: "Preline Bebek Bezi",
                    en: "Preline Baby Diapers",
                    ar: "حفاضات بريلين للأطفال",
                    ru: "Подгузники Preline для детей"
                },
                description: {
                    tr: "Japon teknolojisi ile üretilen konforlu premium seri",
                    en: "Comfortable premium series produced with Japanese technology",
                    ar: "سلسلة بريميوم مريحة منتجة بتقنية يابانية",
                    ru: "Комфортная премиальная серия, произведенная по японской технологии"
                },
                image: "image/products/product1.png",
                category: {
                    tr: "Bebek Bezi",
                    en: "Baby Diapers",
                    ar: "حفاضات أطفال",
                    ru: "Детские подгузники"
                },
                features: {
                    tr: ["Vitamin E", "Yüksek Emicilik", "Sızdırmaz Bariyer", "Esnek Anatomik Yapı"],
                    en: ["Vitamin E", "High Absorbency", "Leakproof Barrier", "Flexible Anatomical Structure"],
                    ar: ["فيتامين E", "امتصاص عالي", "حاجز ضد التسرب", "هيكل تشريحي مرن"],
                    ru: ["Витамин Е", "Высокая впитываемость", "Непротекающий барьер", "Гибкая анатомическая конструкция"]
                },
                link: "https://online.fliphtml5.com/akzrp/qmgh/#p=1",
                whatsappText: {
                    tr: "Preline Bebek Bezi hakkında bilgi almak istiyorum",
                    en: "I want to get information about Preline Baby Diapers",
                    ar: "أريد الحصول على معلومات عن حفاضات بريلين للأطفال",
                    ru: "Я хочу получить информацию о детских подгузниках Preline"
                }
            },
            {
                id: 2,
                name: {
                    tr: "Preline Bebek Külot Bezi",
                    en: "Preline Baby Pull-Up Diapers",
                    ar: "حفاضات بريلين القابلة للسحب للأطفال",
                    ru: "Трусики-подгузники Preline для детей"
                },
                description: {
                    tr: "Japon teknolojisi ile üretilen konforlu premium seri",
                    en: "Comfortable premium series produced with Japanese technology",
                    ar: "سلسلة بريميوم مريحة منتجة بتقنية يابانية",
                    ru: "Комфортная премиальная серия, произведенная по японской технологии"
                },
                image: "image/products/product5.png",
                category: {
                    tr: "Bebek Külot Bezi",
                    en: "Baby Pull-Up Diapers",
                    ar: "حفاضات قابلة للسحب للأطفال",
                    ru: "Детские трусики-подгузники"
                },
                features: {
                    tr: ["Elastik Bel Bölgesi", "Islaklık Göstergesi", "Kolay Giydirme", "Koku Kontrol"],
                    en: ["Elastic Waist Area", "Wetness Indicator", "Easy to Wear", "Odor Control"],
                    ar: ["منطقة الخصر المرنة", "مؤشر البلل", "سهل الارتداء", "تحكم في الرائحة"],
                    ru: ["Эластичная область талии", "Индикатор влажности", "Легко надевать", "Контроль запаха"]
                },
                link: "https://online.fliphtml5.com/akzrp/qmgh/#p=1",
                whatsappText: {
                    tr: "Preline Premium Serisi hakkında bilgi almak istiyorum",
                    en: "I want to get information about Preline Premium Series",
                    ar: "أريد الحصول على معلومات عن سلسلة بريلين بريميوم",
                    ru: "Я хочу получить информацию о премиальной серии Preline"
                }
            },
            {
                id: 3,
                name: {
                    tr: "Preline Adult Diapers",
                    en: "Preline Adult Diapers",
                    ar: "حفاضات بريلين للكبار",
                    ru: "Взрослые подгузники Preline"
                },
                description: {
                    tr: "Gün boyu güvenilir koruma ve konfor sunar",
                    en: "Provides reliable protection and comfort throughout the day",
                    ar: "يوفر حماية موثوقة وراحة طوال اليوم",
                    ru: "Обеспечивает надежную защиту и комфорт в течение всего дня"
                },
                image: "image/products/product3.png",
                category: {
                    tr: "Yetişkin Bezi",
                    en: "Adult Diapers",
                    ar: "حفاضات للكبار",
                    ru: "Взрослые подгузники"
                },
                features: {
                    tr: ["Nefes Alabilen Pamuk yüzey", "Islaklık Göstergesi", "Dermatolojik testli"],
                    en: ["Breathable Cotton Surface", "Wetness Indicator", "Dermatologically Tested"],
                    ar: ["سطح قطني قابل للتنفس", "مؤشر البلل", "مختبر من قبل أطباء الجلد"],
                    ru: ["Дышащая хлопковая поверхность", "Индикатор влажности", "Дерматологически протестировано"]
                },
                link: "https://online.fliphtml5.com/akzrp/qmgh/#p=1",
                whatsappText: {
                    tr: "Preline Active hakkında bilgi almak istiyorum",
                    en: "I want to get information about Preline Active",
                    ar: "أريد الحصول على معلومات عن بريلين أكتيف",
                    ru: "Я хочу получить информацию о Preline Active"
                }
            },
            {
                id: 4,
                name: {
                    tr: "Preline Wet Wipes",
                    en: "Preline Wet Wipes",
                    ar: "مناديل بريلين المبللة",
                    ru: "Влажные салфетки Preline"
                },
                description: {
                    tr: "Hijyen ve tazelik için ideal çözüm",
                    en: "Ideal solution for hygiene and freshness",
                    ar: "الحل المثالي للنظافة والانتعاش",
                    ru: "Идеальное решение для гигиены и свежести"
                },
                image: "image/products/product4.png",
                category: {
                    tr: "Islak Mendil",
                    en: "Wet Wipes",
                    ar: "مناديل مبللة",
                    ru: "Влажные салфетки"
                },
                features: {
                    tr: ["Yumuşak Doku", "Alkol ve Paraben içermez", "Hipoalerjenik"],
                    en: ["Soft Texture", "No Alcohol and Paraben", "Hypoallergenic"],
                    ar: ["نسيج ناعم", "خالي من الكحول والبارابين", "هيبوالرجينيك"],
                    ru: ["Мягкая текстура", "Не содержит спирта и парабенов", "Гипоаллергенно"]
                },
                link: "https://online.fliphtml5.com/akzrp/qmgh/#p=1",
                whatsappText: {
                    tr: "Preline Wet Wipes hakkında bilgi almak istiyorum",
                    en: "I want to get information about Preline Wet Wipes",
                    ar: "أريد الحصول على معلومات عن مناديل بريلين المبللة",
                    ru: "Я хочу получить информацию о влажных салфетках Preline"
                }
            },
            {
                id: 5,
                name: {
                    tr: "Preline Lady",
                    en: "Preline Lady",
                    ar: "بريلين ليدي",
                    ru: "Preline Lady"
                },
                description: {
                    tr: "Güvenilir koruma ve konfor sunar",
                    en: "Offers reliable protection and comfort",
                    ar: "يوفر حماية موثوقة وراحة",
                    ru: "Предлагает надежную защиту и комфорт"
                },
                image: "image/products/product2.png",
                category: {
                    tr: "Kadın Pedi",
                    en: "Feminine Pads",
                    ar: "فوط نسائية",
                    ru: "Женские прокладки"
                },
                features: {
                    tr: ["Yüksek Emicilik", "Nefes alabilir", "İnce ve Hafif", "Dermatolojik Testli"],
                    en: ["High Absorbency", "Breathable", "Thin and Light", "Dermatologically Tested"],
                    ar: ["امتصاص عالي", "قابل للتنفس", "رفيع وخفيف", "مختبر من قبل أطباء الجلد"],
                    ru: ["Высокая впитываемость", "Дышащий", "Тонкий и легкий", "Дерматологически протестировано"]
                },
                link: "https://online.fliphtml5.com/akzrp/qmgh/#p=1",
                whatsappText: {
                    tr: "Preline Lady hakkında bilgi almak istiyorum",
                    en: "I want to get information about Preline Lady",
                    ar: "أريد الحصول على معلومات عن بريلين ليدي",
                    ru: "Я хочу получить информацию о Preline Lady"
                }
            },
            {
                id: 6,
                name: {
                    tr: "Preline Surface Cleaning Towels",
                    en: "Preline Surface Cleaning Towels",
                    ar: "مناشف تنظيف الأسطح بريلين",
                    ru: "Салфетки для очистки поверхностей Preline"
                },
                description: {
                    tr: "Etkili ve pratik temizlik çözümü",
                    en: "Effective and practical cleaning solution",
                    ar: "حل تنظيف فعال وعملي",
                    ru: "Эффективное и практичное решение для очистки"
                },
                image: "image/products/product6.png",
                category: {
                    tr: "Yüzey Temizleme",
                    en: "Surface Cleaning",
                    ar: "تنظيف الأسطح",
                    ru: "Очистка поверхностей"
                },
                features: {
                    tr: ["Kalın ve Geniş Kumaş", "Doğa Dostu", "Çok Amaçlı Kullanım"],
                    en: ["Thick and Wide Fabric", "Eco-Friendly", "Multi-Purpose Use"],
                    ar: ["نسيج سميك وعريض", "صديق للبيئة", "استخدام متعدد الأغراض"],
                    ru: ["Толстая и широкая ткань", "Экологичный", "Многоцелевое использование"]
                },
                link: "https://online.fliphtml5.com/akzrp/qmgh/#p=1",
                whatsappText: {
                    tr: "Preline Night Serisi hakkında bilgi almak istiyorum",
                    en: "I want to get information about Preline Night Series",
                    ar: "أريد الحصول على معلومات عن سلسلة بريلين نايت",
                    ru: "Я хочу получить информацию о серии Preline Night"
                }
            }
        ];
    }
    
    getProductText(product, field, lang = null) {
        const currentLang = lang || this.currentLang;
        const fieldData = product[field];
        
        if (typeof fieldData === 'object' && fieldData !== null) {
            // Dil çevirisi varsa
            return fieldData[currentLang] || fieldData.tr || fieldData.en || fieldData[Object.keys(fieldData)[0]] || '';
        }
        
        // Dil çevirisi yoksa orijinal metin
        return fieldData || '';
    }
    
    renderProducts() {
        if (!this.scroller) return;
        
        if (this.products.length === 0) {
            this.showEmptyState();
            return;
        }
        
        this.scroller.innerHTML = '';
        
        this.products.forEach(product => {
            const productHTML = this.createProductHTML(product);
            this.scroller.insertAdjacentHTML('beforeend', productHTML);
        });
        
        // Lazy load images
        this.lazyLoadImages();
        
        // WhatsApp linklerini güncelle
        this.updateWhatsAppLinks();
    }
    
    createProductHTML(product) {
        // Mevcut dil için özellikleri al
        const currentFeatures = this.getProductText(product, 'features');
        
        const featuresHTML = currentFeatures && currentFeatures.length > 0 
            ? currentFeatures.map(feature => 
                `<li><i class="fas fa-check-circle text-success me-2"></i> ${feature}</li>`
            ).join('')
            : '';
        
        // WhatsApp mesajı
        const whatsappMessage = encodeURIComponent(
            this.getProductText(product, 'whatsappText')
        );
        
        return `
        <div class="scroll-item" data-product-id="${product.id}">
            <div class="card product-card h-100">
                <div class="product-image-wrapper">
                    <img src="image/placeholder.jpg" 
                         data-src="${product.image}" 
                         class="card-img-top" 
                         alt="${this.getProductText(product, 'name')}"
                         loading="lazy"
                         onerror="this.src='image/default-product.jpg'">
                </div>
                <div class="card-body d-flex flex-column">
                    <span class="badge bg-primary mb-2">
                        ${this.getProductText(product, 'category')}
                    </span>
                    <h5 class="card-title text-primary">
                        ${this.getProductText(product, 'name')}
                    </h5>
                    <p class="card-text flex-grow-1">
                        ${this.getProductText(product, 'description')}
                    </p>
                    
                    ${featuresHTML ? `
                    <div class="product-features mb-3">
                        <ul class="list-unstyled mb-0">
                            ${featuresHTML}
                        </ul>
                    </div>
                    ` : ''}
                    
                    <div class="product-actions mt-auto">
                        <a href="${product.link}" 
                           target="_blank" 
                           class="btn btn-details btn-sm"
                           data-i18n="products.details">
                            <i class="fas fa-info-circle me-1"></i>
                            <span class="btn-text">Detaylar</span>
                        </a>
                        <a href="#" 
                           data-whatsapp="${whatsappMessage}"
                           class="btn btn-whatsapp btn-sm whatsapp-link"
                           aria-label="WhatsApp ile sor">
                            <i class="fab fa-whatsapp"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    
    updateProductTranslations() {
        if (!this.scroller) return;
        
        // Tüm ürün kartlarını güncelle
        const productCards = this.scroller.querySelectorAll('.scroll-item');
        
        this.products.forEach((product, index) => {
            const card = productCards[index];
            if (!card) return;
            
            // Güncelleme yapılacak alanlar
            const elementsToUpdate = {
                '.badge': this.getProductText(product, 'category'),
                '.card-title': this.getProductText(product, 'name'),
                '.card-text': this.getProductText(product, 'description'),
                '.whatsapp-link': this.getProductText(product, 'whatsappText')
            };
            
            // Her bir elementi güncelle
            Object.entries(elementsToUpdate).forEach(([selector, text]) => {
                const element = card.querySelector(selector);
                if (element) {
                    if (selector === '.whatsapp-link') {
                        // WhatsApp linkini güncelle
                        const whatsappNumber = "905XXXXXXXXX"; // Gerçek numara ile değiştir
                        const whatsappMessage = encodeURIComponent(text);
                        element.href = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
                    } else if (selector === '.card-text') {
                        // Açıklama metnini güncelle
                        element.textContent = text;
                    } else {
                        // Diğer elementleri güncelle
                        element.textContent = text;
                    }
                }
            });
            
            // Özellikleri güncelle
            const featuresList = card.querySelector('.product-features ul');
            if (featuresList) {
                const currentFeatures = this.getProductText(product, 'features');
                if (currentFeatures && currentFeatures.length > 0) {
                    featuresList.innerHTML = currentFeatures.map(feature => 
                        `<li><i class="fas fa-check-circle text-success me-2"></i> ${feature}</li>`
                    ).join('');
                } else {
                    featuresList.innerHTML = '';
                }
            }
            
            // "Detaylar" butonunu dil switcher ile güncelle
            const detailsButton = card.querySelector('.btn-details .btn-text');
            if (detailsButton) {
                // Bu kısım language-switcher.js tarafından zaten güncellenecek
                // Çünkü data-i18n attribute'ü var
            }
        });
        
        // WhatsApp linklerini yeniden bağla
        this.updateWhatsAppLinks();
        
        console.log('Product translations updated to', this.currentLang);
    }
    
    updateWhatsAppLinks() {
        // WhatsApp numarasını gerçek numara ile değiştirin
        const whatsappNumber = "905XXXXXXXXX"; // BURAYI DEĞİŞTİRİN
        
        document.querySelectorAll('.whatsapp-link').forEach(link => {
            const message = link.getAttribute('data-whatsapp') || '';
            link.href = `https://wa.me/${whatsappNumber}?text=${message}`;
        });
    }
    
    lazyLoadImages() {
        // ... mevcut lazyLoadImages kodu aynı kalacak ...
        const images = this.scroller.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            images.forEach(img => {
                img.src = img.dataset.src;
                img.classList.add('loaded');
            });
        }
    }
    
    setupEventListeners() {
        // ... mevcut setupEventListeners kodu aynı kalacak ...
        // Scroll buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.scroll(-1));
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.scroll(1));
        }
        
        // Scroll events
        this.scroller.addEventListener('scroll', () => {
            this.updateScrollButtons();
            this.updateProgress();
        });
        
        // Drag events
        this.setupDragEvents();
        
        // Touch events for mobile
        this.setupTouchEvents();
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Resize event
        window.addEventListener('resize', () => {
            this.updateScrollButtons();
            this.updateProgress();
        });
    }
    
    scroll(direction) {
        const scrollAmount = this.scroller.clientWidth * 0.8;
        const targetScroll = this.scroller.scrollLeft + (scrollAmount * direction);
        
        this.scroller.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });
    }
    
    updateScrollButtons() {
        if (!this.prevBtn || !this.nextBtn) return;
        
        const isAtStart = this.scroller.scrollLeft <= 10;
        const isAtEnd = this.scroller.scrollLeft >= 
            (this.scroller.scrollWidth - this.scroller.clientWidth - 10);
        
        this.prevBtn.disabled = isAtStart;
        this.nextBtn.disabled = isAtEnd;
        
        // Tooltip'leri de güncelle (opsiyonel)
        this.prevBtn.title = this.currentLang === 'tr' ? 'Önceki' : 
                           this.currentLang === 'en' ? 'Previous' :
                           this.currentLang === 'ar' ? 'السابق' : 'Предыдущий';
        
        this.nextBtn.title = this.currentLang === 'tr' ? 'Sonraki' : 
                           this.currentLang === 'en' ? 'Next' :
                           this.currentLang === 'ar' ? 'التالي' : 'Следующий';
    }
    
    updateProgress() {
        if (!this.progressBar) return;
        
        const scrollWidth = this.scroller.scrollWidth - this.scroller.clientWidth;
        const scrollPosition = this.scroller.scrollLeft;
        
        if (scrollWidth > 0) {
            const progressPercentage = (scrollPosition / scrollWidth) * 100;
            this.progressBar.style.width = `${progressPercentage}%`;
        }
    }
    
    setupDragEvents() {
        // ... mevcut setupDragEvents kodu aynı ...
        this.scroller.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.startX = e.pageX - this.scroller.offsetLeft;
            this.scrollLeft = this.scroller.scrollLeft;
            this.scroller.style.cursor = 'grabbing';
            this.scroller.style.userSelect = 'none';
        });
        
        document.addEventListener('mouseup', () => {
            this.isDragging = false;
            this.scroller.style.cursor = 'grab';
            this.scroller.style.userSelect = 'auto';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            e.preventDefault();
            
            const x = e.pageX - this.scroller.offsetLeft;
            const walk = (x - this.startX) * 2;
            this.scroller.scrollLeft = this.scrollLeft - walk;
        });
    }
    
    setupTouchEvents() {
        // ... mevcut setupTouchEvents kodu aynı ...
        let startX, scrollLeft;
        
        this.scroller.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - this.scroller.offsetLeft;
            scrollLeft = this.scroller.scrollLeft;
        });
        
        this.scroller.addEventListener('touchmove', (e) => {
            if (!startX) return;
            
            const x = e.touches[0].pageX - this.scroller.offsetLeft;
            const walk = (x - startX) * 2;
            this.scroller.scrollLeft = scrollLeft - walk;
        });
        
        this.scroller.addEventListener('touchend', () => {
            startX = null;
        });
    }
    
    handleKeyboard(e) {
        // ... mevcut handleKeyboard kodu aynı ...
        if (!document.activeElement.closest('#products')) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.scroll(-1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.scroll(1);
                break;
            case 'Home':
                e.preventDefault();
                this.scroller.scrollTo({ left: 0, behavior: 'smooth' });
                break;
            case 'End':
                e.preventDefault();
                this.scroller.scrollTo({ 
                    left: this.scroller.scrollWidth, 
                    behavior: 'smooth' 
                });
                break;
        }
    }
    
    showEmptyState() {
        // Boş durum mesajlarını da çok dilli yap
        const messages = {
            tr: {
                title: "Ürünler Yükleniyor",
                message: "Lütfen bekleyin...",
                button: "Sayfayı Yenile"
            },
            en: {
                title: "Products Loading",
                message: "Please wait...",
                button: "Refresh Page"
            },
            ar: {
                title: "تحميل المنتجات",
                message: "يرجى الانتظار...",
                button: "تحديث الصفحة"
            },
            ru: {
                title: "Загрузка товаров",
                message: "Пожалуйста, подождите...",
                button: "Обновить страницу"
            }
        };
        
        const msg = messages[this.currentLang] || messages.tr;
        
        this.scroller.innerHTML = `
        <div class="col-12 text-center py-5">
            <i class="fas fa-box-open fa-3x text-muted mb-3"></i>
            <h4 class="mb-2">${msg.title}</h4>
            <p class="text-muted mb-4">${msg.message}</p>
            <button class="btn btn-primary" onclick="window.location.reload()">
                <i class="fas fa-redo me-2"></i>${msg.button}
            </button>
        </div>
        `;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for other scripts to load
    setTimeout(() => {
        try {
            window.productsScroller = new ProductsHorizontalScroller();
        } catch (error) {
            console.error('Products scroller initialization error:', error);
            
            // Hata mesajını da çok dilli yap
            const scroller = document.getElementById('horizontalScroller');
            if (scroller) {
                const messages = {
                    tr: {
                        title: "Teknik Sorun",
                        message: "Ürünler yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin."
                    },
                    en: {
                        title: "Technical Issue",
                        message: "A problem occurred while loading products. Please try again later."
                    },
                    ar: {
                        title: "مشكلة تقنية",
                        message: "حدثت مشكلة أثناء تحميل المنتجات. يرجى المحاولة مرة أخرى لاحقًا."
                    },
                    ru: {
                        title: "Техническая проблема",
                        message: "Произошла проблема при загрузке товаров. Пожалуйста, попробуйте позже."
                    }
                };
                
                // Varsayılan dil TR, dil switcher henüz yüklenmemiş olabilir
                const msg = messages.tr;
                
                scroller.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fas fa-exclamation-triangle fa-2x text-warning mb-3"></i>
                    <h4 class="mb-2">${msg.title}</h4>
                    <p class="text-muted">${msg.message}</p>
                </div>
                `;
            }
        }
    }, 500);
});

// LanguageSwitcher ile entegrasyon için custom event
document.addEventListener('DOMContentLoaded', function() {
    // LanguageSwitcher dil değiştirdiğinde event göndersin
    const originalSwitchLanguage = window.languageSwitcher?.switchLanguage;
    
    if (originalSwitchLanguage) {
        window.languageSwitcher.switchLanguage = function(lang) {
            const result = originalSwitchLanguage.call(this, lang);
            
            // Custom event gönder
            const event = new CustomEvent('languageChanged', {
                detail: { lang: lang }
            });
            document.dispatchEvent(event);
            
            return result;
        };
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductsHorizontalScroller;
}