// main.js - OPTİMİZE EDİLMİŞ VERSİYON

/**
 * Preline Main JavaScript File
 * Tüm temel fonksiyonları içerir
 */

class PrelineWebsite {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.init();
    }
    
    init() {
        console.log('Preline website initializing...');
        
        // Initialize all components
        this.initNavbar();
        this.initSmoothScroll();
        this.initBackToTop();
        this.initFormValidation();
        this.initResponsive();
        this.initPerformance();
        
        console.log('Preline website initialized successfully');
    }
    
    initNavbar() {
        const navbar = document.querySelector('.custom-navbar');
        if (!navbar) return;
        
        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Mobile menu close on click
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            });
        });
    }
    
    initSmoothScroll() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    
                    const navbarHeight = document.querySelector('.custom-navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    initBackToTop() {
        // Create back to top button
        const backToTopBtn = document.createElement('button');
        backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.setAttribute('aria-label', 'Sayfanın başına dön');
        
        // Style the button
        Object.assign(backToTopBtn.style, {
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '50px',
            height: '50px',
            background: 'var(--primary-color)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            opacity: '0',
            visibility: 'hidden',
            transition: 'all 0.3s ease',
            zIndex: '999',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        });
        
        document.body.appendChild(backToTopBtn);
        
        // Show/hide button on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        });
        
        // Scroll to top on click
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Hover effects
        backToTopBtn.addEventListener('mouseenter', () => {
            backToTopBtn.style.transform = 'translateY(-3px)';
            backToTopBtn.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
        });
        
        backToTopBtn.addEventListener('mouseleave', () => {
            backToTopBtn.style.transform = 'translateY(0)';
            backToTopBtn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        });
    }
    
    initFormValidation() {
        // Contact form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            this.setupFormValidation(contactForm, 'contact');
        }
        
        // Application form
        const appForm = document.getElementById('partnerApplicationForm');
        if (appForm) {
            this.setupFormValidation(appForm, 'application');
        }
    }
    
    setupFormValidation(form, type) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            const requiredInputs = form.querySelectorAll('[required]');
            const errors = [];
            
            // Validate required fields
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                    errors.push(`${input.previousElementSibling?.textContent || 'Bu alan'} gereklidir`);
                } else {
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');
                }
            });
            
            // Special validation for email
            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value)) {
                    isValid = false;
                    emailInput.classList.add('is-invalid');
                    errors.push('Geçerli bir email adresi girin');
                }
            }
            
            if (isValid) {
                this.showToast('Başarılı! Formunuz gönderildi.', 'success');
                form.reset();
                
                // Remove validation classes
                form.querySelectorAll('.is-valid').forEach(el => {
                    el.classList.remove('is-valid');
                });
            } else {
                this.showToast('Lütfen tüm alanları doğru şekilde doldurun.', 'error');
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim()) {
                    input.classList.remove('is-invalid');
                }
            });
        });
    }
    
    showToast(message, type) {
        // Remove existing toasts
        const existingToasts = document.querySelectorAll('.preline-toast');
        existingToasts.forEach(toast => toast.remove());
        
        // Create toast
        const toast = document.createElement('div');
        toast.className = `preline-toast ${type}`;
        
        const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
        const color = type === 'success' ? '#38A169' : '#E53E3E';
        
        Object.assign(toast.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'white',
            padding: '15px 20px',
            borderRadius: '8px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.15)',
            zIndex: '9999',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            borderLeft: `4px solid ${color}`,
            transform: 'translateX(150%)',
            transition: 'transform 0.3s ease'
        });
        
        toast.innerHTML = `
            <i class="fas ${icon}" style="color: ${color}; font-size: 20px;"></i>
            <div>
                <div style="font-weight: 600; margin-bottom: 2px;">
                    ${type === 'success' ? 'Başarılı' : 'Hata'}
                </div>
                <div style="font-size: 14px;">${message}</div>
            </div>
            <button class="toast-close" style="
                background: none;
                border: none;
                color: #718096;
                margin-left: 15px;
                cursor: pointer;
                font-size: 18px;
                padding: 0;
            ">
                &times;
            </button>
        `;
        
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.style.transform = 'translateX(150%)';
            setTimeout(() => toast.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.transform = 'translateX(150%)';
                setTimeout(() => toast.remove(), 300);
            }
        }, 5000);
    }
    
    initResponsive() {
        // Check if mobile
        this.isMobile = window.innerWidth <= 768;
        
        // Add mobile class to body
        if (this.isMobile) {
            document.body.classList.add('mobile');
        } else {
            document.body.classList.remove('mobile');
        }
        
        // Handle resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.isMobile = window.innerWidth <= 768;
                
                if (this.isMobile) {
                    document.body.classList.add('mobile');
                } else {
                    document.body.classList.remove('mobile');
                }
                
                // Dispatch custom event for other components
                window.dispatchEvent(new CustomEvent('preline:resize'));
            }, 250);
        });
    }
    
    initPerformance() {
        // Lazy load all images
        this.lazyLoadImages();
        
        // Optimize videos
        this.optimizeVideos();
        
        // Add loading class to body
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            console.log('Page fully loaded');
        });
    }
    
    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        if (images.length === 0) return;
        
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
            }, {
                rootMargin: '50px 0px'
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback
            images.forEach(img => {
                img.src = img.dataset.src;
                img.classList.add('loaded');
            });
        }
    }
    
    optimizeVideos() {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
            video.muted = true;
            
            // Add loaded class when video is ready
            video.addEventListener('loadeddata', () => {
                video.classList.add('loaded');
            });
            
            // Error handling
            video.addEventListener('error', () => {
                console.warn('Video failed to load:', video.src);
                video.style.display = 'none';
                
                // Show fallback image if available
                const fallback = video.parentElement.querySelector('img');
                if (fallback) {
                    fallback.style.display = 'block';
                }
            });
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.prelineWebsite = new PrelineWebsite();
    
    // Update social links with actual numbers
    setTimeout(() => {
        const whatsappLinks = document.querySelectorAll('a[href*="whatsapp"]');
        whatsappLinks.forEach(link => {
            // Replace with your actual WhatsApp number
            link.href = link.href.replace('905XXXXXXXXX', 'YOUR_WHATSAPP_NUMBER');
        });
    }, 1000);
});

// Utility functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PrelineWebsite,
        debounce,
        throttle
    };
}