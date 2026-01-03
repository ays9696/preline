
/**
 * PRODUCTS HORIZONTAL SCROLLER
 * Preline Template - Modern Ürün Slider
 */

class ProductsHorizontalScroller {
    constructor() {
        this.scroller = document.getElementById('horizontalScroller');
        this.prevBtn = document.querySelector('.btn-scroll-prev');
        this.nextBtn = document.querySelector('.btn-scroll-next');
        this.progressBar = document.querySelector('.progress-bar');
        
        // Ürün verileri - Preline ürünleriniz
        this.products = this.getProductsData();
        
        this.isDragging = false;
        this.startX = 0;
        this.scrollLeft = 0;
        
        this.init();
    }
    
    init() {
        if (!this.scroller) return;
        
        this.renderProducts();
        this.setupEventListeners();
        this.updateScrollButtons();
        this.setCursorStyle();
        
        console.log('Products Horizontal Scroller başlatıldı');
    }
    
    // PRELINE ÜRÜN VERİLERİ - BU KISMI KENDİ ÜRÜNLERİNİZLE GÜNCELLEYİN
    getProductsData() {
        return [
            {
                id: 1,
                name: "Preline Baby Diapers",
                description: "Complete Range for All Sizes. Japan Quality, Dermatologically Tested",
                image: "image/products/product1.png", // Veya "images/products/preline-baby.jpg"
                category: "Bebek Bezi",
                features: ["Tüm bedenler için", "Japon kalitesi", "Dermatolojik olarak test edilmiş"],
                price: "₺XXX",
                link: "https://online.fliphtml5.com/akzrp/qmgh/#p=1",
                whatsappText: "Preline Baby Diapers hakkında bilgi almak istiyorum"
            },
            {
                id: 2,
                name: "Preline Lady",
                description: "Reliable Comfort & Care. Dermatologically Tested & Breathable. Made in Türkiye",
                image: "image//products/product2.png",
                category: "Yetişkin Bezi",
                features: ["Güvenilir konfor", "Nefes alabilir", "Türkiye'de üretilmiş"],
                price: "₺XXX",
                link: "https://online.fliphtml5.com/akzrp/qmgh/#p=1",
                whatsappText: "Preline Lady hakkında bilgi almak istiyorum"
            },
            {
                id: 3,
                name: "Preline Active",
                description: "Medium Online Adult Patient Diaper. Textile Surface, Dermatologically Tested, Reliable Comfort",
                image: "image//products/product3.png",
                category: "Yetişkin Bezi",
                features: ["Tekstil yüzey", "Dermatolojik testli", "Güvenilir konfor"],
                price: "₺XXX",
                link: "https://online.fliphtml5.com/akzrp/qmgh/#p=1",
                whatsappText: "Preline Active hakkında bilgi almak istiyorum"
            },
            {
                id: 4,
                name: "Preline Wet Wipes",
                description: "Gentle Care, Powerful Protection. Trusted Softness, Dermatologically Tested, For Every Need",
                image: "image//products/product4.png",
                category: "Islak Mendil",
                features: ["Nazik bakım", "Güçlü koruma", "Dermatolojik testli"],
                price: "₺XXX",
                link: "https://online.fliphtml5.com/akzrp/qmgh/#p=1",
                whatsappText: "Preline Wet Wipes hakkında bilgi almak istiyorum"
            },
            {
                id: 5,
                name: "Preline Premium Serisi",
                description: "Ekstra emici ve konforlu premium seri",
                image: "images/products/product5.png",
                category: "Premium",
                features: ["Ekstra emici", "24 saat koruma", "Cilt dostu"],
                price: "₺XXX",
                link: "https://online.fliphtml5.com/akzrp/qmgh/#p=1",
                whatsappText: "Preline Premium Serisi hakkında bilgi almak istiyorum"
            },
            {
                id: 6,
                name: "Preline Surface Cleaning Towels",
                description: "Gece kullanımı için özel tasarlanmış seri",
                image: "images/products/product6.png",
                category: "Gece",
                features: ["Gece kullanımı", "Ekstra koruma", "Kuru kalma"],
                price: "₺XXX",
                link: "https://online.fliphtml5.com/akzrp/qmgh/#p=1",
                whatsappText: "Preline Night Serisi hakkında bilgi almak istiyorum"
            }
        ];
    }
    
    // Ürünleri render et
    renderProducts() {
        if (this.products.length === 0) {
            this.showEmptyState();
            return;
        }
        
        this.scroller.innerHTML = '';
        
        this.products.forEach(product => {
            const productHTML = this.createProductHTML(product);
            this.scroller.innerHTML += productHTML;
        });
    }
    
    // Ürün HTML'i oluştur - BASİT VERSİYON (resimleriniz için)
    createProductHTML(product) {
        const featuresHTML = product.features && product.features.length > 0 
            ? product.features.map(feature => 
                `<li><i class="fas fa-check-circle"></i> ${feature}</li>`
            ).join('')
            : '';
        
        // WhatsApp numarasını kendi numaranızla değiştirin
        const whatsappNumber = "905XXXXXXXXX"; // KENDİ NUMARANIZI YAZIN
        const whatsappMessage = encodeURIComponent(product.whatsappText);
        
        return `
        <div class="scroll-item" data-product-id="${product.id}">
            <div class="card product-card">
                <div class="product-image-wrapper">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}" loading="lazy" 
                         onerror="this.src='images/default-product.jpg'; this.onerror=null;">
                </div>
                <div class="card-body">
                    <span class="product-badge">${product.category}</span>
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    
                    ${featuresHTML ? `
                    <div class="product-features">
                        <ul class="list-unstyled">
                            ${featuresHTML}
                        </ul>
                    </div>
                    ` : ''}
                    
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <div class="product-price">
                            <span class="text-primary fw-bold">${product.price}</span>
                        </div>
                        <div class="product-actions">
                            <button class="btn btn-details" onclick="location.href='${product.link}'">
                                <i class="fas fa-info-circle me-1"></i>Detaylar
                            </button>
                            <a href="https://wa.me/${whatsappNumber}?text=${whatsappMessage}" 
                               target="_blank" 
                               class="btn btn-whatsapp"
                               title="WhatsApp'tan sor">
                                <i class="fab fa-whatsapp"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    
    // Boş durum göster
    showEmptyState() {
        this.scroller.innerHTML = `
        <div class="horizontal-scroller-empty">
            <i class="fas fa-box-open fa-3x text-muted mb-3"></i>
            <h4 class="mb-2">Ürünler Yükleniyor</h4>
            <p class="text-muted">Lütfen bekleyin...</p>
        </div>
        `;
    }
    
    // Event listeners kur
    setupEventListeners() {
        // Scroll butonları
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.scroll(-1));
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.scroll(1));
        }
        
        // Scroll event
        this.scroller.addEventListener('scroll', () => {
            this.updateScrollButtons();
            this.updateProgress();
        });
        
        // Mouse drag events
        this.setupDragEvents();
        
        // Touch events
        this.setupTouchEvents();
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Resize event
        window.addEventListener('resize', () => {
            this.updateScrollButtons();
            this.updateProgress();
        });
    }
    
    // Kaydırma işlemi
    scroll(direction) {
        const scrollAmount = this.scroller.clientWidth * 0.8;
        const targetScroll = this.scroller.scrollLeft + (scrollAmount * direction);
        
        this.scroller.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });
    }
    
    // Scroll butonlarını güncelle
    updateScrollButtons() {
        if (!this.prevBtn || !this.nextBtn) return;
        
        const isAtStart = this.scroller.scrollLeft <= 10;
        const isAtEnd = this.scroller.scrollLeft >= (this.scroller.scrollWidth - this.scroller.clientWidth - 10);
        
        this.prevBtn.disabled = isAtStart;
        this.nextBtn.disabled = isAtEnd;
    }
    
    // Progress bar'ı güncelle
    updateProgress() {
        if (!this.progressBar) return;
        
        const scrollWidth = this.scroller.scrollWidth - this.scroller.clientWidth;
        const scrollPosition = this.scroller.scrollLeft;
        
        if (scrollWidth > 0) {
            const progressPercentage = (scrollPosition / scrollWidth) * 100;
            this.progressBar.style.width = `${progressPercentage}%`;
        }
    }
    
    // Mouse drag events
    setupDragEvents() {
        this.scroller.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.startX = e.pageX - this.scroller.offsetLeft;
            this.scrollLeft = this.scroller.scrollLeft;
            this.scroller.style.cursor = 'grabbing';
            this.scroller.style.userSelect = 'none';
        });
        
        this.scroller.addEventListener('mouseleave', () => {
            this.isDragging = false;
            this.scroller.style.cursor = 'grab';
            this.scroller.style.userSelect = 'auto';
        });
        
        this.scroller.addEventListener('mouseup', () => {
            this.isDragging = false;
            this.scroller.style.cursor = 'grab';
            this.scroller.style.userSelect = 'auto';
        });
        
        this.scroller.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            e.preventDefault();
            
            const x = e.pageX - this.scroller.offsetLeft;
            const walk = (x - this.startX) * 2;
            this.scroller.scrollLeft = this.scrollLeft - walk;
        });
    }
    
    // Touch events
    setupTouchEvents() {
        this.scroller.addEventListener('touchstart', (e) => {
            this.startX = e.touches[0].pageX - this.scroller.offsetLeft;
            this.scrollLeft = this.scroller.scrollLeft;
        });
        
        this.scroller.addEventListener('touchmove', (e) => {
            if (!this.startX) return;
            
            const x = e.touches[0].pageX - this.scroller.offsetLeft;
            const walk = (x - this.startX) * 2;
            this.scroller.scrollLeft = this.scrollLeft - walk;
        });
        
        this.scroller.addEventListener('touchend', () => {
            this.startX = null;
        });
    }
    
    // Keyboard navigation
    handleKeyboard(e) {
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
    
    // Cursor style ayarla
    setCursorStyle() {
        this.scroller.style.cursor = 'grab';
    }
    
    // Dışarıdan ürün ekleme metodu
    addProduct(product) {
        this.products.push(product);
        this.renderProducts();
    }
    
    // Ürünleri güncelle
    updateProducts(newProducts) {
        this.products = newProducts;
        this.renderProducts();
    }
    
    // Hata yönetimi için - resim yüklenmezse
    handleImageError(img) {
        img.src = 'images/default-product.jpg';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    try {
        window.productsScroller = new ProductsHorizontalScroller();
        console.log('Products scroller başarıyla yüklendi');
    } catch (error) {
        console.error('Products scroller yüklenirken hata:', error);
        
        // Hata durumunda basit bir mesaj göster
        const scroller = document.getElementById('horizontalScroller');
        if (scroller) {
            scroller.innerHTML = `
            <div class="text-center p-5">
                <i class="fas fa-exclamation-triangle fa-2x text-warning mb-3"></i>
                <p>Ürünler yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.</p>
            </div>
            `;
        }
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductsHorizontalScroller;
}
