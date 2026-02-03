// hero-slider-fix.js - SLIDER SORUNUNU ÇÖZEN JS

class HeroSliderFix {
    constructor() {
        this.mediaItems = document.querySelectorAll('.hero-media');
        this.controlButtons = document.querySelectorAll('.media-control-btn');
        this.currentIndex = 0;
        this.autoSlideInterval = null;
        
        console.log('Hero Slider Fix: Found', this.mediaItems.length, 'media items');
        console.log('Hero Slider Fix: Found', this.controlButtons.length, 'control buttons');
        
        if (this.mediaItems.length > 0 && this.controlButtons.length > 0) {
            this.init();
        } else {
            console.error('Hero Slider Fix: Media items or controls not found');
        }
    }
    
    init() {
        // Aktif olmayan tüm öğeleri gizle
        this.mediaItems.forEach((item, index) => {
            if (index !== 0) {
                item.style.opacity = '0';
                item.style.zIndex = '0';
            }
        });
        
        // İlk öğeyi aktif yap
        if (this.mediaItems[0]) {
            this.mediaItems[0].classList.add('active');
            this.mediaItems[0].style.opacity = '1';
            this.mediaItems[0].style.zIndex = '1';
        }
        
        // İlk kontrol butonunu aktif yap
        if (this.controlButtons[0]) {
            this.controlButtons[0].classList.add('active');
        }
        
        // Kontrolleri bağla
        this.bindControls();
        
        // Otomatik slider'ı başlat
        this.startAutoSlide();
        
        console.log('Hero Slider Fix: Initialized successfully');
    }
    
    bindControls() {
        this.controlButtons.forEach((button, index) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Button clicked:', index);
                this.goToSlide(index);
                this.resetAutoSlide();
            });
        });
    }
    
    goToSlide(index) {
        // Geçersiz index kontrolü
        if (index < 0 || index >= this.mediaItems.length) {
            console.error('Invalid slide index:', index);
            return;
        }
        
        console.log('Going to slide:', index);
        
        // Eski aktif öğeyi devre dışı bırak
        if (this.mediaItems[this.currentIndex]) {
            this.mediaItems[this.currentIndex].classList.remove('active');
            this.mediaItems[this.currentIndex].style.opacity = '0';
            this.mediaItems[this.currentIndex].style.zIndex = '0';
            
            // Video ise durdur
            if (this.mediaItems[this.currentIndex].tagName === 'VIDEO') {
                this.mediaItems[this.currentIndex].pause();
                this.mediaItems[this.currentIndex].currentTime = 0;
            }
        }
        
        // Eski aktif butonu devre dışı bırak
        if (this.controlButtons[this.currentIndex]) {
            this.controlButtons[this.currentIndex].classList.remove('active');
        }
        
        // Yeni index'i ayarla
        this.currentIndex = index;
        
        // Yeni aktif öğeyi göster
        if (this.mediaItems[this.currentIndex]) {
            this.mediaItems[this.currentIndex].classList.add('active');
            this.mediaItems[this.currentIndex].style.opacity = '1';
            this.mediaItems[this.currentIndex].style.zIndex = '1';
            
            // Video ise oynat
            if (this.mediaItems[this.currentIndex].tagName === 'VIDEO') {
                this.playVideo(this.mediaItems[this.currentIndex]);
            }
        }
        
        // Yeni aktif butonu göster
        if (this.controlButtons[this.currentIndex]) {
            this.controlButtons[this.currentIndex].classList.add('active');
        }
    }
    
    playVideo(video) {
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('Video autoplay prevented, will play on click');
                video.style.cursor = 'pointer';
                
                video.addEventListener('click', () => {
                    video.play().catch(e => {
                        console.log('Still cannot play video');
                    });
                });
            });
        }
    }
    
    nextSlide() {
        let nextIndex = this.currentIndex + 1;
        if (nextIndex >= this.mediaItems.length) {
            nextIndex = 0;
        }
        this.goToSlide(nextIndex);
    }
    
    startAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }
        
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // 5 saniyede bir değişsin
    }
    
    resetAutoSlide() {
        clearInterval(this.autoSlideInterval);
        this.startAutoSlide();
    }
}

// Floating Butonlar için fix
function fixFloatingButtons() {
    const floatingButtons = document.querySelector('.floating-social-buttons');
    if (floatingButtons) {
        // Z-index ve opacity ayarla
        floatingButtons.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            z-index: 1000;
            display: flex !important;
            flex-direction: column;
            gap: 15px;
            opacity: 1 !important;
            visibility: visible !important;
        `;
        
        // WhatsApp ve Telegram linklerini güncelle (KENDİ BİLGİLERİNİZİ YAZIN)
        const whatsappBtn = floatingButtons.querySelector('.whatsapp');
        const telegramBtn = floatingButtons.querySelector('.telegram');
        
        if (whatsappBtn) {
            whatsappBtn.href = "https://wa.me/905XXXXXXXXX?text=Preline%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum";
            whatsappBtn.target = "_blank";
            whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
        }
        
        if (telegramBtn) {
            telegramBtn.href = "https://t.me/preline_official";
            telegramBtn.target = "_blank";
            telegramBtn.innerHTML = '<i class="fab fa-telegram"></i>';
        }
        
        console.log('Floating buttons fixed');
    }
}

// Metin görünürlüğü için fix
function fixTextVisibility() {
    // Hero bölümündeki tüm metinleri kontrol et
    const heroTexts = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-content-overlay *');
    heroTexts.forEach(text => {
        if (text) {
            text.style.textShadow = '1px 1px 3px rgba(0, 0, 0, 0.5)';
            text.style.color = 'white';
        }
    });
    
    // Contact form placeholder'ları
    const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    inputs.forEach(input => {
        input.style.color = 'white';
        input.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        input.style.borderColor = 'rgba(255, 255, 255, 0.3)';
    });
}

// Sayfa yüklendiğinde tüm düzeltmeleri çalıştır
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, applying fixes...');
    
    // Hero slider'ı başlat
    setTimeout(() => {
        window.heroSlider = new HeroSliderFix();
    }, 100);
    
    // Floating butonları düzelt
    fixFloatingButtons();
    
    // Metin görünürlüğünü düzelt
    fixTextVisibility();
    
    // Test için console log
    console.log('All fixes applied successfully');
});

// Hata yakalama
window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.error);
});
