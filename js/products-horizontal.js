/**
 * PRODUCTS HORIZONTAL SCROLLER - OPTİMİZE EDİLMİŞ
 * Preline ürün slider'ı
 */

class ProductsHorizontalScroller {
    constructor() {
        this.scroller = document.getElementById('horizontalScroller');
        this.prevBtn = document.querySelector('.btn-scroll-prev');
        this.nextBtn = document.querySelector('.btn-scroll-next');
        this.progressBar = document.querySelector('.progress-bar');
        
        this.products = this.getProductsData();
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
        
        this.renderProducts();
        this.setupEventListeners();
        this.updateScrollButtons();
        this.updateProgress();
        
        console.log(`Products scroller initialized with ${this.products.length} products`);
    }
    
    getProductsData() {
        return [
            {
                id: 1,
                name: "Preline Bebek Bezi",
                description: "Japon teknolojisi ile üretilen konforlu premium seri",
                image: "image/products/product1.png",
                category: "Bebek Bezi",
                features: ["Vitamin E", "Yüksek Emicilik", "Sızdırmaz Bariyer", "Esnek Anatomik Yapı"],
                link: "https://online.fliphtml5.com/akzrp/qmgh/#p=1",
                whatsappText: "Preline Baby Diapers hakkında bilgi almak istiyorum"
            },
            {
                id: 2,
                name: "Preline Bebek Külot Bezi",
                description: "Japon teknolojisi ile üretilen konforlu premium seri",
                image: "image/products/product5.png",
                category: "Bebek Külot Bezi",
                features: ["Elastik Bel Bölgesi", "Islaklık Göstergesi", "Kolay Giydirme", "Koku Kontrol"],
                link: "https://online.fliphtml5.com/akzrp/qmgh/#p=1",
                whatsappText: "Preline Premium Serisi hakkında bilgi almak istiyorum"
            },
            {
                id: 3,
                name: "Preline Adult Diapers",
                description: "Gün boyu güvenilir koruma ve konfor sunar",
                image: "image/products/product3.png",
                category: "Yetişkin Bezi",
                features: ["Nefes ALabilen Pamuk yüzey", "Islaklık Göstergesi", "Dermatolojik testli"],
                link: "https://online.fliphtml5.com/akzrp/qmgh/#p=1",
                whatsappText: "Preline Active hakkında bilgi almak istiyorum"
            },
            {
                id: 4,
                name: "Preline Wet Wipes",
                description: "Hijyen ve tazelik için ideal çözüm",
                image: "image/products/product4.png",
                category: "Islak Mendil",
                features: ["Yumuşak Doku", "Alkol ve Paraben içermez", "Hipoalerjenik"],
                link: "https://online.fliphtml5.com/akzrp/qmgh/#p=1",
                whatsappText: "Preline Wet Wipes hakkında bilgi almak istiyorum"
            },
            {
                id: 5,
                name: "Preline Lady",
                description: "Güvenilir koruma ve konfor sunar",
                image: "image/products/product2.png",
                category: "Kadın Pedi",
                features: ["Yüksek Emicilik", "Nefes alabilir", "İnce ve Hafif", "Dermatolojik Testli"],
                link: "https://online.fliphtml5.com/akzrp/qmgh/#p=1",
                whatsappText: "Preline Lady hakkında bilgi almak istiyorum"
            },
            {
                id: 6,
                name: "Preline Surface Cleaning Towels",
                description: "Etkili ve pratik temizlik çözümü",
                image: "image/products/product6.png",
                category: "Yüzey Temizleme",
                features: ["Kalın ve Geniş Kumaş", "Doğa Dostu", "Çok Amaçlı Kullanım"],
                link: "https://online.fliphtml5.com/akzrp/qmgh/#p=1",
                whatsappText: "Preline Night Serisi hakkında bilgi almak istiyorum"
            }
        ];
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
    }
    
    createProductHTML(product) {
        const featuresHTML = product.features && product.features.length > 0 
            ? product.features.map(feature => 
                `<li><i class="fas fa-check-circle text-success me-2"></i> ${feature}</li>`
            ).join('')
            : '';
        
        // WhatsApp number - Replace with your actual number
        const whatsappNumber = "905XXXXXXXXX";
        const whatsappMessage = encodeURIComponent(product.whatsappText);
        
        return `
        <div class="scroll-item" data-product-id="${product.id}">
            <div class="card product-card h-100">
                <div class="product-image-wrapper">
                    <img src="image/placeholder.jpg" 
                         data-src="${product.image}" 
                         class="card-img-top" 
                         alt="${product.name}"
                         loading="lazy"
                         onerror="this.src='image/default-product.jpg'">
                </div>
                <div class="card-body d-flex flex-column">
                    <span class="badge bg-primary mb-2">${product.category}</span>
                    <h5 class="card-title text-primary">${product.name}</h5>
                    <p class="card-text flex-grow-1">${product.description}</p>
                    
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
                           class="btn btn-details btn-sm">
                            <i class="fas fa-info-circle me-1"></i>Detaylar
                        </a>
                        <a href="https://wa.me/${whatsappNumber}?text=${whatsappMessage}" 
                           target="_blank" 
                           class="btn btn-whatsapp btn-sm"
                           aria-label="WhatsApp ile sor">
                            <i class="fab fa-whatsapp"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    
    lazyLoadImages() {
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
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
                img.classList.add('loaded');
            });
        }
    }
    
    setupEventListeners() {
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
        // Only handle if focus is within the products section
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
        this.scroller.innerHTML = `
        <div class="col-12 text-center py-5">
            <i class="fas fa-box-open fa-3x text-muted mb-3"></i>
            <h4 class="mb-2">Ürünler Yükleniyor</h4>
            <p class="text-muted mb-4">Lütfen bekleyin...</p>
            <button class="btn btn-primary" onclick="window.location.reload()">
                <i class="fas fa-redo me-2"></i>Sayfayı Yenile
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
            
            // Show error message
            const scroller = document.getElementById('horizontalScroller');
            if (scroller) {
                scroller.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fas fa-exclamation-triangle fa-2x text-warning mb-3"></i>
                    <h4 class="mb-2">Teknik Sorun</h4>
                    <p class="text-muted">Ürünler yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.</p>
                </div>
                `;
            }
        }
    }, 500);
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductsHorizontalScroller;
}