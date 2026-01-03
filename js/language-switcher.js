// Language Switcher Functionality - DÜZELTİLMİŞ VERSİYON

class LanguageSwitcher {
    constructor() {
        this.currentLang = 'tr';
        this.translations = {
            tr: this.getTurkishTranslations(),
            en: this.getEnglishTranslations(),
            ar: this.getArabicTranslations(),
            ru: this.getRussianTranslations()
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadSavedLanguage();
        console.log('Language switcher initialized');
    }
    
    bindEvents() {
        // Dropdown language selection
        const langLinks = document.querySelectorAll('.language-option');
        langLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = e.target.getAttribute('data-lang');
                console.log('Language selected:', lang);
                this.switchLanguage(lang);
            });
        });
    }
    
    switchLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLang = lang;
            this.updateContent();
            this.updateDropdown(lang);
            this.saveLanguage(lang);
            this.updateDirection(lang);
            console.log('Language switched to:', lang);
        } else {
            console.error('Language not found:', lang);
        }
    }
    
    updateContent() {
        const translation = this.translations[this.currentLang];
        
        // Tüm çeviri elementlerini bul ve güncelle
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const keys = key.split('.');
            let value = translation;
            
            // Nested key'leri işle (örnek: "nav.home")
            for (const k of keys) {
                if (value && value[k]) {
                    value = value[k];
                } else {
                    value = null;
                    break;
                }
            }
            
            if (value) {
                // Eğer element içinde span varsa, span'ın içeriğini güncelle
                const textSpan = element.querySelector('.nav-text, .btn-text');
                if (textSpan) {
                    textSpan.textContent = value;
                } else {
                    element.textContent = value;
                }
            }
        });
    }
    
    updateDropdown(lang) {
        const dropdownToggle = document.querySelector('#languageDropdown .lang-code');
        if (dropdownToggle) {
            const langText = lang.toUpperCase();
            dropdownToggle.textContent = langText;
        }
    }
    
    updateDirection(lang) {
        const html = document.documentElement;
        if (lang === 'ar') {
            html.dir = 'rtl';
            html.lang = 'ar';
            html.classList.add('rtl');
        } else {
            html.dir = 'ltr';
            html.lang = lang;
            html.classList.remove('rtl');
        }
    }
    
    saveLanguage(lang) {
        try {
            localStorage.setItem('preline-language', lang);
        } catch (e) {
            console.warn('LocalStorage not available');
        }
    }
    
    loadSavedLanguage() {
        try {
            const savedLang = localStorage.getItem('preline-language');
            if (savedLang && this.translations[savedLang]) {
                this.switchLanguage(savedLang);
            }
        } catch (e) {
            console.warn('LocalStorage not available');
        }
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
                video: "Tanıtım Videosu"
            },
            about: {
                title: "Hakkımızda",
                lead: "Preline olarak, sektördeki 20 yılı aşkın deneyimimizle kaliteli ürün ve hizmetler sunmaktayız.",
                quality: "Kalite Standartları",
                quality_desc: "En yüksek kalite standartlarında üretim",
                customer: "Müşteri Memnuniyeti",
                customer_desc: "Müşteri odaklı yaklaşım",
                innovation: "İnovasyon",
                innovation_desc: "Sürekli gelişim ve yenilik"
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
                title: "İş Ortağı Başvuru Formu",
                lead: "Bizimle çalışmak için başvurunuzu gönderin.",
                apply: "Başvuruyu Gönder"
            },
            footer: {
                navigation: "Navigasyon",
                contact: "İletişim",
                languages: "Diller",
                tagline: "Kalite ve inovasyonun buluştuğu nokta",
                copyright: "© 2024 Preline. Tüm hakları saklıdır."
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
                video: "Watch Video"
            },
            about: {
                title: "About Us",
                lead: "With over 20 years of experience in the industry, we provide quality products and services.",
                quality: "Quality Standards",
                quality_desc: "Manufacturing with the highest quality standards",
                customer: "Customer Satisfaction",
                customer_desc: "Customer-focused approach",
                innovation: "Innovation",
                innovation_desc: "Continuous development and innovation"
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
    title: "Partner Application Form",
    lead: "Submit your application to work with us.",
    apply: "Submit Application"
}
,
            footer: {
                navigation: "Navigation",
                contact: "Contact",
                languages: "Languages",
                tagline: "Where quality meets innovation",
                copyright: "© 2024 Preline. All rights reserved."
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
                video: "شاهد الفيديو"
            },
            about: {
                title: "من نحن",
                lead: "بخبرة تزيد عن 20 عامًا في المجال، نقدم منتجات وخدمات عالية الجودة.",
                quality: "معايير الجودة",
                quality_desc: "التصنيع بأعلى معايير الجودة",
                customer: "رضا العملاء",
                customer_desc: "نهج يركز على العميل",
                innovation: "الابتكار",
                innovation_desc: "التطوير المستمر والابتكار"
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
    title: "نموذج طلب الشريك",
    lead: "قدم طلبك للعمل معنا.",
    apply: "إرسال الطلب"},
            footer: {
                navigation: "التنقل",
                contact: "اتصل بنا",
                languages: "اللغات",
                tagline: "حيث تلتقي الجودة بالابتكار",
                copyright: "© 2024 بريلاين. جميع الحقوق محفوظة."
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
                video: "Смотреть видео"
            },
            about: {
                title: "О нас",
                lead: "Имея более 20 лет опыта в отрасли, мы предоставляем качественные продукты и услуги.",
                quality: "Стандарты качества",
                quality_desc: "Производство по высочайшим стандартам качества",
                customer: "Удовлетворенность клиентов",
                customer_desc: "Клиентоориентированный подход",
                innovation: "Инновации",
                innovation_desc: "Постоянное развитие и инновации"
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
    title: "Форма заявки партнера", 
    lead: "Отправьте заявку для работы с нами.",
    apply: "Отправить заявку"
},
            footer: {
                navigation: "Навигация",
                contact: "Контакты",
                languages: "Языки",
                tagline: "Где качество встречается с инновациями",
                copyright: "© 2024 Preline. Все права защищены."
            }
        };
    }
}

// Initialize Language Switcher
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing language switcher...');
    window.languageSwitcher = new LanguageSwitcher();
});

// Hata yönetimi
window.addEventListener('error', function(e) {
    console.error('Language switcher error:', e.error);
    
});
