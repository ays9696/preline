// Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initSmoothScroll();
    initAnimations();
    initContactForm();
    initPartnerApplicationForm(); // Yeni eklenen fonksiyon
});

// Navbar Scroll Effect
function initNavbar() {
    const navbar = document.querySelector('.custom-navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Smooth Scroll
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animations on Scroll
function initAnimations() {
    const animatedElements = document.querySelectorAll('.feature-item, .product-card, .section-title');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData);
            
            // Basic validation
            let isValid = true;
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
            });
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Gönderiliyor...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    alert('Mesajınız başarıyla gönderildi!');
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                } else {
                    this.classList.remove('is-valid');
                }
            });
        });
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavbar,
        initSmoothScroll,
        initAnimations,
        initContactForm
    };
}
// Partner Application Form Handling
function initPartnerApplicationForm() {
    const applicationForm = document.getElementById('partnerApplicationForm');
    
    if (applicationForm) {
        applicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData);
            
            // Basic validation
            let isValid = true;
            const requiredInputs = this.querySelectorAll('input[required], textarea[required]');
            const kvkkCheckbox = this.querySelector('#kvkk');
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
            });
            
            // KVKK validation
            if (!kvkkCheckbox.checked) {
                isValid = false;
                kvkkCheckbox.classList.add('is-invalid');
            } else {
                kvkkCheckbox.classList.remove('is-invalid');
            }
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Gönderiliyor...';
                submitBtn.disabled = true;
                
                // Prepare data for email
                const applicationData = {
                    company: formValues.companyName,
                    contact_person: formValues.contactPerson,
                    email: formValues.email,
                    phone: formValues.phone,
                    city: formValues.city,
                    tax_number: formValues.taxNumber,
                    position: formValues.position,
                    is_corporate: formValues.isCorporate ? 'Evet' : 'Hayır',
                    additional_info: formValues.additionalInfo,
                    submission_date: new Date().toLocaleString('tr-TR')
                };
                
                // Simulate API call - Bu kısmı backend entegrasyonu ile değiştireceksiniz
                setTimeout(() => {
                    // Email template verilerini burada kullanabilirsiniz
                    console.log('Application Data:', applicationData);
                    
                    alert('Başvurunuz başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğiz.');
                    applicationForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Form gönderildikten sonra sayfayı yukarı kaydır
                    window.scrollTo({
                        top: applicationForm.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }, 2000);
            }
        });
        
        // Real-time validation
        const inputs = applicationForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.type === 'checkbox') {
                    if (this.checked) {
                        this.classList.remove('is-invalid');
                    }
                } else if (this.value.trim()) {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                } else {
                    this.classList.remove('is-valid');
                }
            });
        });
    }
    // CSRF Token ekleyin
function addCSRFToken() {
    const token = this.generateCSRFToken();
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'csrf_token';
        input.value = token;
        form.appendChild(input);
    });
}

// Captcha ekleyin (Google reCAPTCHA v3)
function addCaptcha() {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY';
    document.head.appendChild(script);
    
    // Form submit'te
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            grecaptcha.ready(() => {
                grecaptcha.execute('YOUR_SITE_KEY', {action: 'submit'})
                    .then(token => {
                        // Token'ı form'a ekle
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = 'g-recaptcha-response';
                        input.value = token;
                        form.appendChild(input);
                        
                        // Formu gönder
                        form.submit();
                    });
            });
        });
    });
}
}
// Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    console.log('Preline Website Loaded');
    
    // Initialize components
    initSmoothScroll();
    initFormSubmissions();
    initNavbar();
    initScrollToTop();
    
    // Performance optimization
    initLazyLoading();
    initVideoOptimization();
});

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(targetId);
            }
        });
    });
}

// Update active navigation link
function updateActiveNavLink(targetId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// Form submissions
function initFormSubmissions() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send data to server
            alert('Mesajınız başarıyla gönderildi!');
            this.reset();
        });
    }
    
    // Application form
    const appForm = document.getElementById('partnerApplicationForm');
    if (appForm) {
        appForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Validate KVKK
            const kvkkCheckbox = document.getElementById('kvkk');
            if (!kvkkCheckbox.checked) {
                alert('Lütfen KVKK onayını işaretleyiniz.');
                kvkkCheckbox.focus();
                return;
            }
            
            // Here you would typically send data to server
            alert('Başvurunuz başarıyla gönderildi! Teşekkür ederiz.');
            this.reset();
        });
    }
}

// Navbar scroll effect
function initNavbar() {
    const navbar = document.querySelector('.custom-navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Scroll to top functionality
function initScrollToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
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
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Lazy loading for images
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
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
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Video optimization
function initVideoOptimization() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.muted = true;
        
        // Handle video loading errors
        video.addEventListener('error', function() {
            console.error('Video failed to load:', this.src);
            // You could show a fallback image here
        });
    });
}

// Responsive adjustments
function handleResponsive() {
    // Check if mobile
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Mobile-specific adjustments
        document.body.classList.add('mobile');
    } else {
        document.body.classList.remove('mobile');
    }
}

// Initialize on load and resize
window.addEventListener('load', handleResponsive);
window.addEventListener('resize', handleResponsive);