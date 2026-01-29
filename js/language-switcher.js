// language-switcher.js - OPTİMİZE EDİLMİŞ

class LanguageSwitcher {
    constructor() {
        this.currentLang = 'tr';
        this.translations = this.getAllTranslations();
        this.init();
    }
    
    init() {
        this.loadSavedLanguage();
        this.bindEvents();
        this.updatePageDirection();
        console.log('Language switcher initialized');
    }
    
    getAllTranslations() {
        return {
            tr: this.getTurkishTranslations(),
            en: this.getEnglishTranslations(),
            ar: this.getArabicTranslations(),
            ru: this.getRussianTranslations()
        };
    }
    
    getTurkishTranslations() {
        return {
            nav: {
                home: "Ana Sayfa",
                about: "Hakkımızda",
                products: "Ürünler",
                contact: "İletişim",
                application: "Başvuru"
            },
            hero: {
                title: "Preline'e Hoş Geldiniz",
                subtitle: "Kalite ve inovasyonun buluştuğu nokta",
                products: "Ürünleri Keşfet",
                about: "Hakkımızda"
            },
            about: {
                title: "Hakkımızda",
                lead: "Preline olarak, çeyrek asra yaklaşan sektörel tecrübemizle, mükemmeliyetçi hizmet anlayışımızı birleştiriyoruz.",
                quality: "Kalite Standartları",
                quality_desc: "Uluslararası standartlarda, tavizsiz kalite kontrol süreçleri",
                customer: "Müşteri Memnuniyeti",
                customer_desc: "Müşteri beklentilerinin ötesinde değer yaratan çözüm odaklı yaklaşım",
                innovation: "İnovasyon",
                innovation_desc: "Teknolojik dönüşümü merkeze alan Ar-Ge odaklı sürekli gelişim"
            },
            products: {
                title: "Ürünlerimiz",
                details: "Detaylı Bilgi"
            },
            contact: {
                title: "İletişim",
                name: "Adınız",
                email: "E-posta",
                subject: "Konu",
                message: "Mesajınız",
                send: "Gönder"
            },
            application: {
                title: "Başvuru Formu",
                lead: "Bizimle çalışmak için başvurunuzu gönderin.",
                apply: "Başvuru Yap"
            },
            footer: {
                navigation: "Navigasyon",
                contact: "İletişim",
                languages: "Diller",
                tagline: "Kalite ve inovasyonun buluştuğu nokta",
                copyright: "© 2025 Preline. Tüm hakları saklıdır."
            }
        };
    }
    
    getEnglishTranslations() {
        return {
            nav: {
                home: "Home",
                about: "About Us",
                products: "Products",
                contact: "Contact",
                application: "Application"
            },
            hero: {
                title: "Welcome to Preline",
                subtitle: "Where quality meets innovation",
                products: "Explore Products",
                about: "About Us"
            },
            about: {
                title: "About Us",
                lead: "With nearly a quarter century of sectoral experience, we combine our perfectionist service approach.",
                quality: "Quality Standards",
                quality_desc: "Uncompromising quality control processes at international standards",
                customer: "Customer Satisfaction",
                customer_desc: "Solution-oriented approach that creates value beyond customer expectations",
                innovation: "Innovation",
                innovation_desc: "Continuous development focused on R&D, centered on technological transformation"
            },
            products: {
                title: "Our Products",
                details: "Learn More"
            },
            contact: {
                title: "Contact",
                name: "Your Name",
                email: "Email",
                subject: "Subject",
                message: "Your Message",
                send: "Send"
            },
            application: {
                title: "Application Form",
                lead: "Submit your application to work with us.",
                apply: "Apply Now"
            },
            footer: {
                navigation: "Navigation",
                contact: "Contact",
                languages: "Languages",
                tagline: "Where quality meets innovation",
                copyright: "© 2025 Preline. All rights reserved."
            }
        };
    }
    
    getArabicTranslations() {
        return {
            nav: {
                home: "الصفحة الرئيسية",
                about: "من نحن",
                products: "المنتجات",
                contact: "اتصل بنا",
                application: "التقديم"
            },
            hero: {
                title: "مرحباً بكم في بريلاين",
                subtitle: "حيث تلتقي الجودة بالابتكار",
                products: "استكشف المنتجات",
                about: "من نحن"
            },
            about: {
                title: "من نحن",
                lead: "مع خبرة قطاعية تقترب من ربع قرن، نجمع بين نهج خدمتنا المثالي.",
                quality: "معايير الجودة",
                quality_desc: "عمليات مراقبة الجودة التي لا هوادة فيها وفق المعايير الدولية",
                customer: "رضا العملاء",
                customer_desc: "نهج يركز على الحلول ويخلق قيمة تتجاوز توقعات العملاء",
                innovation: "الابتكار",
                innovation_desc: "تطوير مستمر يركز على البحث والتطوير، مركزاً على التحول التكنولوجي"
            },
            products: {
                title: "منتجاتنا",
                details: "المزيد من المعلومات"
            },
            contact: {
                title: "اتصل بنا",
                name: "اسمك",
                email: "البريد الإلكتروني",
                subject: "الموضوع",
                message: "رسالتك",
                send: "إرسال"
            },
            application: {
                title: "نموذج الطلب",
                lead: "قدم طلبك للعمل معنا.",
                apply: "قدم الآن"
            },
            footer: {
                navigation: "التنقل",
                contact: "اتصل بنا",
                languages: "اللغات",
                tagline: "حيث تلتقي الجودة بالابتكار",
                copyright: "© 2025 بريلاين. جميع الحقوق محفوظة."
            }
        };
    }
    
    getRussianTranslations() {
        return {
            nav: {
                home: "Главная",
                about: "О нас",
                products: "Продукты",
                contact: "Контакты",
                application: "Заявка"
            },
            hero: {
                title: "Добро пожаловать в Preline",
                subtitle: "Где качество встречается с инновациями",
                products: "Исследовать продукты",
                about: "О нас"
            },
            about: {
                title: "О нас",
                lead: "Имея почти четверть века отраслевого опыта, мы сочетаем наш перфекционистский подход к обслуживанию.",
                quality: "Стандарты качества",
                quality_desc: "Неукоснительные процессы контроля качества по международным стандартам",
                customer: "Удовлетворенность клиентов",
                customer_desc: "Решение-ориентированный подход, создающий ценность, превышающую ожидания клиентов",
                innovation: "Инновации",
                innovation_desc: "Непрерывное развитие, ориентированное на НИОКР, с акцентом на технологические преобразования"
            },
            products: {
                title: "Наши продукты",
                details: "Подробнее"
            },
            contact: {
                title: "Контакты",
                name: "Ваше имя",
                email: "Эл. почта",
                subject: "Тема",
                message: "Ваше сообщение",
                send: "Отправить"
            },
            application: {
                title: "Форма заявки",
                lead: "Отправьте заявку для работы с нами.",
                apply: "Подать заявку"
            },
            footer: {
                navigation: "Навигация",
                contact: "Контакты",
                languages: "Языки",
                tagline: "Где качество встречается с инновациями",
                copyright: "© 2025 Preline. Все права защищены."
            }
        };
    }
    
    bindEvents() {
        // Language dropdown items
        const langOptions = document.querySelectorAll('.language-option');
        langOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = e.target.getAttribute('data-lang');
                this.switchLanguage(lang);
            });
        });
    }
    
    switchLanguage(lang) {
        if (!this.translations[lang]) {
            console.error(`Language "${lang}" not found`);
            return;
        }
        
        this.currentLang = lang;
        this.updateContent();
        this.updateDropdown();
        this.updatePageDirection();
        this.saveLanguage();
        this.showLanguageChangeToast(lang);
    }
    
    updateContent() {
        const translation = this.translations[this.currentLang];
        
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const keys = element.getAttribute('data-i18n').split('.');
            let value = translation;
            
            // Navigate through nested keys
            for (const key of keys) {
                if (value && value[key]) {
                    value = value[key];
                } else {
                    value = null;
                    break;
                }
            }
            
            if (value) {
                // If element has child with nav-text or btn-text class, update that
                const textElement = element.querySelector('.nav-text, .btn-text');
                if (textElement) {
                    textElement.textContent = value;
                } else {
                    element.textContent = value;
                }
            }
        });
    }
    
    updateDropdown() {
        const dropdownToggle = document.querySelector('#languageDropdown .lang-code');
        if (dropdownToggle) {
            const langCodes = {
                'tr': 'TR',
                'en': 'EN',
                'ar': 'AR',
                'ru': 'RU'
            };
            dropdownToggle.textContent = langCodes[this.currentLang] || this.currentLang.toUpperCase();
        }
    }
    
    updatePageDirection() {
        const html = document.documentElement;
        html.lang = this.currentLang;
        
        if (this.currentLang === 'ar') {
            html.dir = 'rtl';
            html.classList.add('rtl');
        } else {
            html.dir = 'ltr';
            html.classList.remove('rtl');
        }
    }
    
    saveLanguage() {
        try {
            localStorage.setItem('preline-language', this.currentLang);
        } catch (e) {
            console.warn('Could not save language preference:', e);
        }
    }
    
    loadSavedLanguage() {
        try {
            const savedLang = localStorage.getItem('preline-language');
            if (savedLang && this.translations[savedLang]) {
                this.switchLanguage(savedLang);
            }
        } catch (e) {
            console.warn('Could not load saved language:', e);
        }
    }
    
    showLanguageChangeToast(lang) {
        const messages = {
            'tr': 'Dil Türkçe olarak değiştirildi',
            'en': 'Language changed to English',
            'ar': 'تم تغيير اللغة إلى العربية',
            'ru': 'Язык изменен на русский'
        };
        
        // Create toast
        const toast = document.createElement('div');
        toast.className = 'language-toast';
        
        Object.assign(toast.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'var(--primary-color)',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            zIndex: '9999',
            transform: 'translateY(-100px)',
            transition: 'transform 0.3s ease'
        });
        
        toast.textContent = messages[lang] || 'Language changed';
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.style.transform = 'translateY(0)';
        }, 10);
        
        // Hide after 3 seconds
        setTimeout(() => {
            toast.style.transform = 'translateY(-100px)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }, 3000);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    window.languageSwitcher = new LanguageSwitcher();
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Language switcher error:', e.error);
});