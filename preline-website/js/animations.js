// Advanced Animations and Effects

class ScrollAnimations {
    constructor() {
        this.elements = [];
        this.observer = null;
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.addScrollEffects();
        this.addParallaxEffect();
    }
    
    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe all animatable elements
        const animatableElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
        animatableElements.forEach(el => {
            this.observer.observe(el);
        });
    }
    
    animateElement(element) {
        const animationType = this.getAnimationType(element);
        
        switch (animationType) {
            case 'fade-in-up':
                element.style.animation = 'fadeInUp 0.6s ease forwards';
                break;
            case 'fade-in-left':
                element.style.animation = 'fadeInLeft 0.6s ease forwards';
                break;
            case 'fade-in-right':
                element.style.animation = 'fadeInRight 0.6s ease forwards';
                break;
            case 'scale-in':
                element.style.animation = 'scaleIn 0.6s ease forwards';
                break;
        }
        
        // Stop observing after animation
        this.observer.unobserve(element);
    }
    
    getAnimationType(element) {
        if (element.classList.contains('fade-in-up')) return 'fade-in-up';
        if (element.classList.contains('fade-in-left')) return 'fade-in-left';
        if (element.classList.contains('fade-in-right')) return 'fade-in-right';
        if (element.classList.contains('scale-in')) return 'scale-in';
        return 'fade-in-up';
    }
    
    addScrollEffects() {
        // Add scroll progress indicator
        this.createScrollProgress();
        
        // Add back to top button
        this.createBackToTopButton();
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
    }
    
    addParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// Additional CSS Animations
const style = document.createElement('style');
style.textContent = `
    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
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
    
    .back-to-top:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(0,0,0,0.3);
    }
`;
document.head.appendChild(style);

// Initialize Animations
document.addEventListener('DOMContentLoaded', function() {
    new ScrollAnimations();
});

// Image Lazy Loading
class LazyLoader {
    constructor() {
        this.images = [];
        this.observer = null;
        this.init();
    }
    
    init() {
        this.images = document.querySelectorAll('img[data-src]');
        this.setupIntersectionObserver();
    }
    
    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        });
        
        this.images.forEach(img => {
            this.observer.observe(img);
        });
    }
    
    loadImage(img) {
        const src = img.getAttribute('data-src');
        img.src = src;
        img.classList.remove('lazy');
        img.classList.add('loaded');
    }
}

// Initialize Lazy Loader
if ('IntersectionObserver' in window) {
    document.addEventListener('DOMContentLoaded', function() {
        new LazyLoader();
    });
}

class FloatingButtons {
    constructor() {
        this.buttons = document.querySelector('.floating-social-buttons');
        this.init();
    }
    
    init() {
        if (this.buttons) {
            // Sayfa yüklendikten sonra butonları göster
            setTimeout(() => {
                this.buttons.style.opacity = '0';
                this.buttons.style.transition = 'opacity 0.5s ease';
                this.buttons.style.display = 'flex';
                
                setTimeout(() => {
                    this.buttons.style.opacity = '1';
                }, 100);
            }, 1000);
            
            // Scroll ile hide/show efekti
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
}

// Initialize Floating Buttons
document.addEventListener('DOMContentLoaded', function() {
    new FloatingButtons();
});