// Advanced Animations and Effects
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded - Initializing animations...');
    
    // 1. Scroll Animations
    class ScrollAnimations {
        constructor() {
            this.init();
        }
        
        init() {
            this.setupIntersectionObserver();
            this.createScrollProgress();
            this.createBackToTopButton();
        }
        
        setupIntersectionObserver() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateElement(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in').forEach(el => {
                observer.observe(el);
            });
        }
        
        animateElement(element) {
            if (element.classList.contains('fade-in-up')) {
                element.style.animation = 'fadeInUp 0.6s ease forwards';
            } else if (element.classList.contains('fade-in-left')) {
                element.style.animation = 'fadeInLeft 0.6s ease forwards';
            } else if (element.classList.contains('fade-in-right')) {
                element.style.animation = 'fadeInRight 0.6s ease forwards';
            } else if (element.classList.contains('scale-in')) {
                element.style.animation = 'scaleIn 0.6s ease forwards';
            }
        }
        
        createScrollProgress() {
            const progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: var(--primary-color);
                z-index: 9999;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);
            
            window.addEventListener('scroll', () => {
                const winHeight = window.innerHeight;
                const docHeight = document.documentElement.scrollHeight;
                const scrollTop = window.pageYOffset;
                const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
                progressBar.style.width = scrollPercent + '%';
            });
        }
        
        createBackToTopButton() {
            const backToTop = document.createElement('button');
            backToTop.className = 'back-to-top';
            backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
            backToTop.style.cssText = `
                position: fixed;
                bottom: 80px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: var(--primary-color);
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 1000;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            `;
            document.body.appendChild(backToTop);
            
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTop.style.opacity = '1';
                    backToTop.style.visibility = 'visible';
                } else {
                    backToTop.style.opacity = '0';
                    backToTop.style.visibility = 'hidden';
                }
            });
            
            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            backToTop.addEventListener('mouseenter', () => {
                backToTop.style.transform = 'translateY(-3px)';
                backToTop.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
            });
            
            backToTop.addEventListener('mouseleave', () => {
                backToTop.style.transform = 'translateY(0)';
                backToTop.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
            });
        }
    }
    
    // 2. Hero Media Slider
    class HeroMediaSlider {
        constructor() {
        this.mediaItems = document.querySelectorAll('.hero-media');
        this.controlButtons = document.querySelectorAll('.media-control-btn');
        this.currentIndex = 0;
        this.interval = null;
        
        console.log('Found media items:', this.mediaItems.length);
        
        if (this.mediaItems.length > 0) {
            this.init();
        }
    }
    
        
        init() {
        // Önce tüm medya öğelerini gizle
        this.mediaItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // İlk öğeyi aktif yap
        if (this.mediaItems.length > 0) {
            this.mediaItems[0].classList.add('active');
            this.playMedia(this.mediaItems[0]);
        }
        
        // Kontrolleri aktif yap
        if (this.controlButtons.length > 0) {
            this.controlButtons[0].classList.add('active');
        }
        
        this.setupControls();
        this.startAutoSlide();
    }
         playMedia(media) {
        if (media.tagName === 'VIDEO') {
            media.play().catch(e => {
                console.log('Video autoplay prevented, waiting for user interaction');
            });
        }
    }
    
    setupControls() {
        this.controlButtons.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.goToSlide(index);
                this.resetAutoSlide();
            });
        });
    }
    
    activateItem(index) {
        // Önceki aktif öğeyi devre dışı bırak
        this.mediaItems.forEach(item => {
            item.classList.remove('active');
            if (item.tagName === 'VIDEO') {
                item.pause();
                item.currentTime = 0;
            }
        });
        
        this.controlButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Yeni öğeyi aktif yap
        this.currentIndex = index;
        this.mediaItems[this.currentIndex].classList.add('active');
        this.controlButtons[this.currentIndex].classList.add('active');
        
        // Medyayı oynat
        this.playMedia(this.mediaItems[this.currentIndex]);
    }
    
        setupVideoEvents() {
            this.mediaItems.forEach(item => {
                if (item.tagName === 'VIDEO') {
                    item.addEventListener('loadeddata', () => {
                        console.log('Video loaded:', item.src);
                    });
                    
                    item.addEventListener('error', () => {
                        console.error('Video failed to load:', item.src);
                    });
                }
            });
        }
        
        activateItem(index) {
            // Eski öğeyi devre dışı bırak
            if (this.mediaItems[this.currentIndex]) {
                this.mediaItems[this.currentIndex].classList.remove('active');
                this.controlButtons[this.currentIndex].classList.remove('active');
                
                // Video ise durdur
                const oldItem = this.mediaItems[this.currentIndex];
                if (oldItem.tagName === 'VIDEO') {
                    oldItem.pause();
                    oldItem.currentTime = 0;
                }
            }
            
            // Yeni öğeyi aktif yap
            this.currentIndex = index;
            this.mediaItems[this.currentIndex].classList.add('active');
            this.controlButtons[this.currentIndex].classList.add('active');
            
            // Video ise oynat
            const newItem = this.mediaItems[this.currentIndex];
            if (newItem.tagName === 'VIDEO') {
                this.playVideo(newItem);
            }
        }
        
        playVideo(video) {
            const playPromise = video.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log('Video autoplay prevented:', error.name);
                    
                    // Fallback: Kullanıcı tıklamasını bekle
                    const playOnInteraction = () => {
                        video.play().then(() => {
                            video.removeEventListener('click', playOnInteraction);
                        }).catch(e => {
                            console.log('Still cannot play video');
                        });
                    };
                    
                    video.addEventListener('click', playOnInteraction);
                    video.style.cursor = 'pointer';
                });
            }
        }
        
        goToSlide(index) {
            if (index < 0 || index >= this.mediaItems.length) return;
            this.activateItem(index);
        }
        
        nextSlide() {
            let nextIndex = this.currentIndex + 1;
            if (nextIndex >= this.mediaItems.length) nextIndex = 0;
            this.goToSlide(nextIndex);
        }
        
        startAutoSlide() {
            this.interval = setInterval(() => {
                this.nextSlide();
            }, 5000);
        }
        
        resetAutoSlide() {
            clearInterval(this.interval);
            this.startAutoSlide();
        }
        
        destroy() {
            clearInterval(this.interval);
        }
    }
    
    // 3. Floating Social Buttons
    class FloatingButtons {
        constructor() {
            this.buttons = document.querySelector('.floating-social-buttons');
            if (this.buttons) {
                this.init();
            }
        }
        
        init() {
            // Butonları göster
            setTimeout(() => {
                this.buttons.style.opacity = '0';
                this.buttons.style.transition = 'opacity 0.5s ease';
                this.buttons.style.display = 'flex';
                
                setTimeout(() => {
                    this.buttons.style.opacity = '1';
                }, 100);
            }, 1000);
            
            // Scroll ile hide/show
            let lastScrollTop = 0;
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > lastScrollTop) {
                    // Aşağı scroll - butonları gizle
                    this.buttons.style.transform = 'translateY(100px)';
                    this.buttons.style.opacity = '0';
                } else {
                    // Yukarı scroll - butonları göster
                    this.buttons.style.transform = 'translateY(0)';
                    this.buttons.style.opacity = '1';
                }
                lastScrollTop = scrollTop;
            });
        }
    }
    
    // 4. Form Validation
    // animations.js dosyasındaki FormValidation sınıfını bulun ve şu şekilde değiştirin:

class FormValidation {
    constructor() {
        this.contactForm = document.getElementById('contactForm');
        this.applicationForm = document.getElementById('partnerApplicationForm');
        this.init();
    }
    
    init() {
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => this.handleContactSubmit(e));
        }
        
        if (this.applicationForm) {
            this.applicationForm.addEventListener('submit', (e) => this.handleApplicationSubmit(e));
        }
        
        // Form input validation
        this.setupInputValidation();
    }
    
    setupInputValidation() {
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.getAttribute('placeholder') || field.getAttribute('name') || 'Bu alan';
        
        // Zorunlu alan kontrolü
        if (field.hasAttribute('required') && !value) {
            this.showError(field, `${fieldName} zorunludur`);
            return false;
        }
        
        // Email kontrolü
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showError(field, 'Geçerli bir email adresi giriniz');
                return false;
            }
        }
        
        // Telefon numarası kontrolü
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[0-9+\-\s()]{10,20}$/;
            if (!phoneRegex.test(value)) {
                this.showError(field, 'Geçerli bir telefon numarası giriniz (örn: 5551234567)');
                return false;
            }
        }
        
        // Vergi numarası kontrolü (sadece rakam)
        if (field.name === 'taxNumber' && value) {
            const taxRegex = /^[0-9]{10,11}$/;
            if (!taxRegex.test(value)) {
                this.showError(field, 'Geçerli bir vergi numarası giriniz (10-11 haneli)');
                return false;
            }
        }
        
        this.showSuccess(field);
        return true;
    }
    
    showError(field, message) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
        
        // Mevcut hata mesajını temizle
        let errorDiv = field.parentElement.querySelector('.invalid-feedback');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'invalid-feedback';
            field.parentElement.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
    
    showSuccess(field) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
        
        const errorDiv = field.parentElement.querySelector('.invalid-feedback');
        if (errorDiv) {
            errorDiv.textContent = '';
            errorDiv.style.display = 'none';
        }
    }
    
    clearError(field) {
        field.classList.remove('is-invalid');
        field.classList.remove('is-valid');
        
        const errorDiv = field.parentElement.querySelector('.invalid-feedback');
        if (errorDiv) {
            errorDiv.textContent = '';
            errorDiv.style.display = 'none';
        }
    }
    
    handleContactSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        // Tüm zorunlu alanları kontrol et
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            this.showSuccessMessage('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
            form.reset();
            
            // Form alanlarını temizle
            form.querySelectorAll('input, textarea').forEach(field => {
                field.classList.remove('is-valid');
            });
        } else {
            this.showErrorMessage('Lütfen tüm zorunlu alanları doğru şekilde doldurun.');
        }
    }
    
    handleApplicationSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const requiredInputs = form.querySelectorAll('[required]');
        const kvkkCheckbox = document.getElementById('kvkk');
        let isValid = true;
        
        // KVKK kontrolü
        if (!kvkkCheckbox.checked) {
            this.showError(kvkkCheckbox, 'KVKK onayı gereklidir. Lütfen kutucuğu işaretleyin.');
            isValid = false;
        } else {
            this.clearError(kvkkCheckbox);
        }
        
        // Diğer zorunlu alanlar
        requiredInputs.forEach(input => {
            if (input !== kvkkCheckbox && !this.validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Başarılı mesajı
            this.showSuccessMessage('Başvurunuz başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğiz.');
            
            // Formu sıfırla
            form.reset();
            
            // KVKK checkbox'ını sıfırla
            if (kvkkCheckbox) {
                kvkkCheckbox.checked = false;
                this.clearError(kvkkCheckbox);
            }
            
            // Form gönderildikten sonra sayfayı yukarı kaydır
            window.scrollTo({
                top: form.offsetTop - 100,
                behavior: 'smooth'
            });
        } else {
            this.showErrorMessage('Lütfen tüm zorunlu alanları doğru şekilde doldurun ve KVKK onayını işaretleyin.');
        }
    }
    
    showSuccessMessage(message) {
        // Geçici bir success mesajı göster
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-success alert-dismissible fade show';
        alertDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            max-width: 400px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            border: none;
            border-left: 4px solid #28a745;
        `;
        alertDiv.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas fa-check-circle me-3" style="font-size: 24px; color: #28a745;"></i>
                <div>
                    <strong>Başarılı!</strong>
                    <div style="font-size: 14px;">${message}</div>
                </div>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" style="position: absolute; top: 15px; right: 15px;"></button>
        `;
        
        document.body.appendChild(alertDiv);
        
        // 5 saniye sonra kaldır
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }
    
    showErrorMessage(message) {
        // Geçici bir error mesajı göster
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-danger alert-dismissible fade show';
        alertDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            max-width: 400px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            border: none;
            border-left: 4px solid #dc3545;
        `;
        alertDiv.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas fa-exclamation-circle me-3" style="font-size: 24px; color: #dc3545;"></i>
                <div>
                    <strong>Dikkat!</strong>
                    <div style="font-size: 14px;">${message}</div>
                </div>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" style="position: absolute; top: 15px; right: 15px;"></button>
        `;
        
        document.body.appendChild(alertDiv);
        
        // 5 saniye sonra kaldır
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }

        
        showSuccess(field) {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
            
            const errorDiv = field.parentElement.querySelector('.invalid-feedback');
            if (errorDiv) {
                errorDiv.textContent = '';
            }
        }
        
        clearError(field) {
            field.classList.remove('is-invalid');
            field.classList.remove('is-valid');
            
            const errorDiv = field.parentElement.querySelector('.invalid-feedback');
            if (errorDiv) {
                errorDiv.textContent = '';
            }
        }
        
        handleContactSubmit(e) {
            e.preventDefault();
            
            const form = e.target;
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                this.showSuccessMessage('Mesajınız başarıyla gönderildi!');
                form.reset();
                
                // Form alanlarını temizle
                form.querySelectorAll('input, textarea').forEach(field => {
                    field.classList.remove('is-valid');
                });
            }
        }
        
        handleApplicationSubmit(e) {
            e.preventDefault();
            
            const form = e.target;
            const requiredInputs = form.querySelectorAll('[required]');
            const kvkkCheckbox = document.getElementById('kvkk');
            let isValid = true;
            
            // KVKK kontrolü
            if (!kvkkCheckbox.checked) {
                this.showError(kvkkCheckbox, 'KVKK onayı gereklidir');
                isValid = false;
            } else {
                this.clearError(kvkkCheckbox);
            }
            
            // Diğer alanlar
            requiredInputs.forEach(input => {
                if (input !== kvkkCheckbox && !this.validateField(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                this.showSuccessMessage('Başvurunuz başarıyla gönderildi!');
                form.reset();
                
                // Tüm valid sınıflarını kaldır
                form.querySelectorAll('.is-valid').forEach(el => {
                    el.classList.remove('is-valid');
                });
            }
        }
        
        showSuccessMessage(message) {
            // Geçici bir success mesajı göster
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert alert-success alert-dismissible fade show';
            alertDiv.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 9999;
                min-width: 300px;
            `;
            alertDiv.innerHTML = `
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            
            document.body.appendChild(alertDiv);
            
            // 5 saniye sonra kaldır
            setTimeout(() => {
                if (alertDiv.parentNode) {
                    alertDiv.remove();
                }
            }, 5000);
        }
    }
    
    // 5. Language Switcher
    class LanguageSwitcher {
        constructor() {
            this.currentLang = 'tr';
            this.langButtons = document.querySelectorAll('.language-option');
            this.init();
        }
        
        init() {
            // Mevcut dili localStorage'dan al
            const savedLang = localStorage.getItem('preline_lang');
            if (savedLang) {
                this.currentLang = savedLang;
                this.updateLanguageDisplay();
            }
            
            // Dil butonlarına event listener ekle
            this.langButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const lang = btn.getAttribute('data-lang');
                    this.changeLanguage(lang);
                });
            });
        }
        
        changeLanguage(lang) {
            this.currentLang = lang;
            localStorage.setItem('preline_lang', lang);
            this.updateLanguageDisplay();
            
            // Dil değiştiğinde bildirim göster
            this.showLanguageChangeMessage(lang);
        }
        
        updateLanguageDisplay() {
            // Dil kodunu güncelle
            const langCodeElements = document.querySelectorAll('.lang-code');
            langCodeElements.forEach(el => {
                el.textContent = this.currentLang.toUpperCase();
            });
            
            // Dropdown butonunu güncelle
            const dropdownBtn = document.getElementById('languageDropdown');
            if (dropdownBtn) {
                const langText = this.getLanguageName(this.currentLang);
                dropdownBtn.innerHTML = `<i class="fas fa-globe me-2"></i>${langText}`;
            }
        }
        
        getLanguageName(code) {
            const languages = {
                'tr': 'Türkçe',
                'en': 'English',
                'ar': 'العربية',
                'ru': 'Русский'
            };
            return languages[code] || code.toUpperCase();
        }
        
        showLanguageChangeMessage(lang) {
            const messages = {
                'tr': 'Dil Türkçe olarak değiştirildi',
                'en': 'Language changed to English',
                'ar': 'تم تغيير اللغة إلى العربية',
                'ru': 'Язык изменен на русский'
            };
            
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert alert-info alert-dismissible fade show';
            alertDiv.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 9999;
                min-width: 300px;
            `;
            alertDiv.innerHTML = `
                ${messages[lang] || 'Language changed'}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            
            document.body.appendChild(alertDiv);
            
            setTimeout(() => {
                if (alertDiv.parentNode) {
                    alertDiv.remove();
                }
            }, 3000);
        }
    }
    
    // 6. Navbar Scroll Effect
    class NavbarScroll {
        constructor() {
            this.navbar = document.querySelector('.custom-navbar');
            if (this.navbar) {
                this.init();
            }
        }
        
        init() {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    this.navbar.classList.add('scrolled');
                } else {
                    this.navbar.classList.remove('scrolled');
                }
            });
        }
    }
    
    // 7. Initialize All Components
    function initializeAll() {
        console.log('Initializing all components...');
        
        // Add animation classes to elements
        document.querySelectorAll('.feature-item, .product-card').forEach((el, index) => {
            el.classList.add('fade-in-up');
            el.style.animationDelay = `${index * 0.1}s`;
        });
        
        // Initialize components
        new ScrollAnimations();
        window.heroSlider = new HeroMediaSlider();
        new FloatingButtons();
        new FormValidation();
        new LanguageSwitcher();
        new NavbarScroll();
        
        // Add hover effect for product cards
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
        
        console.log('All components initialized successfully!');
    }
    
    // 8. Video Optimization
    function optimizeVideos() {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
            video.muted = true;
            
            // Video yüklendiğinde
            video.addEventListener('loadeddata', function() {
                this.classList.add('loaded');
                console.log('Video loaded:', this.src);
            });
            
            // Video hatası
            video.addEventListener('error', function() {
                console.error('Video loading error:', this.src);
                this.style.display = 'none';
                
                // Fallback için parent element'e gradient ekle
                const parent = this.parentElement;
                if (parent && parent.classList.contains('hero-media-container')) {
                    parent.style.background = `linear-gradient(135deg, 
                        rgba(255, 107, 139, 0.85) 0%, 
                        rgba(78, 205, 196, 0.85) 100%)`;
                }
            });
        });
    }
    
    // 9. Responsive adjustments
    function setupResponsive() {
        function handleResize() {
            const heroControls = document.querySelector('.hero-media-controls');
            const heroContent = document.querySelector('.hero-content-overlay');
            
            if (window.innerWidth <= 768) {
                // Tablet ve mobil ayarları
                if (heroControls) {
                    heroControls.style.bottom = '20px';
                }
                
                if (heroContent) {
                    heroContent.style.padding = '2rem';
                    heroContent.style.margin = '1rem';
                }
                
                // Hero title boyutu
                const heroTitle = document.querySelector('.hero-title');
                if (heroTitle) {
                    heroTitle.style.fontSize = '2.2rem';
                }
                
                // Hero subtitle boyutu
                const heroSubtitle = document.querySelector('.hero-subtitle');
                if (heroSubtitle) {
                    heroSubtitle.style.fontSize = '1.2rem';
                }
            } else {
                // Desktop ayarları
                if (heroControls) {
                    heroControls.style.bottom = '30px';
                }
                
                if (heroContent) {
                    heroContent.style.padding = '3rem';
                    heroContent.style.margin = '0';
                }
                
                // Hero title boyutu
                const heroTitle = document.querySelector('.hero-title');
                if (heroTitle) {
                    heroTitle.style.fontSize = '3rem';
                }
                
                // Hero subtitle boyutu
                const heroSubtitle = document.querySelector('.hero-subtitle');
                if (heroSubtitle) {
                    heroSubtitle.style.fontSize = '1.5rem';
                }
            }
            
            // Çok küçük ekranlar (400px altı)
            if (window.innerWidth <= 400) {
                // Hero slider'ı durdur
                if (window.heroSlider) {
                    window.heroSlider.destroy();
                }
                
                // Sadece gradient göster
                const heroSection = document.querySelector('.hero-section-with-video');
                if (heroSection) {
                    heroSection.style.background = `linear-gradient(135deg, 
                        rgba(255, 107, 139, 0.85) 0%, 
                        rgba(78, 205, 196, 0.85) 100%)`;
                }
            }
        }
        
        // İlk yüklemede ve resize'da çalıştır
        handleResize();
        window.addEventListener('resize', handleResize);
    }
    
    // 10. Main Initialization
    initializeAll();
    optimizeVideos();
    setupResponsive();
    
    // 11. Add CSS for form validation
    const style = document.createElement('style');
    style.textContent = `
        .invalid-feedback {
            display: block;
            width: 100%;
            margin-top: 0.25rem;
            font-size: 0.875em;
            color: #dc3545;
        }
        
        .is-invalid {
            border-color: #dc3545 !important;
        }
        
        .is-valid {
            border-color: #198754 !important;
        }
        
        .form-check-input.is-invalid {
            border-color: #dc3545;
        }
        
        .form-check-label {
            color: var(--dark-color) !important;
        }
        
        /* Animation classes */
        .fade-in-up {
            opacity: 0;
            transform: translateY(30px);
        }
        
        .fade-in-left {
            opacity: 0;
            transform: translateX(-30px);
        }
        
        .fade-in-right {
            opacity: 0;
            transform: translateX(30px);
        }
        
        .scale-in {
            opacity: 0;
            transform: scale(0.8);
        }
        
        /* Video loading state */
        video.loaded {
            opacity: 1;
            transition: opacity 1s ease;
        }
    `;
    document.head.appendChild(style);
    
    // 12. Performance optimization
    window.addEventListener('load', function() {
        console.log('Page fully loaded');
        
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        if (images.length > 0) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    });
});