// language-switcher.js - GÜNCELLENMİŞ

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
                catalog: "E-Katalog",
                contact: "İletişim",
                application: "Başvuru"
            },
            hero: {
                title: "Preline: Teknolojinin Japon Disipliniyle Yeniden Tanımı",
                subtitle: "Sadece bir üretici değil, yüksek teknoloji ve inovasyonun stratejik çözüm ortağıyız. Geleneksel iş disiplinimizi, dünyanın en ileri teknolojileriyle geleceğe taşıyoruz.",
                products: "Ürünleri Keşfet",
                about: "Kurumsal Profilimiz"
            },
            about: {
                title: "Hakkımızda",
                lead: "Sektördeki 20 yılı aşkın köklü geçmişimiz ve derin uzmanlığımızla Preline, sürdürülebilir kalite ve müşteri memnuniyetini odağına alan bir hizmet anlayışına sahiptir. Profesyonel birikimimizi, yenilikçi yaklaşımlarla harmanlayarak yüksek standartlarda çözümler üretiyoruz.",
                quality: "Kalite Standartları",
                quality_desc: "Üretimin her aşamasında yüksek standartlar; her detayda üstün nitelik.",
                customer: "Müşteri Memnuniyeti",
                customer_desc: "Müşteri deneyimini odağına alan, güven ve şeffaflık üzerine kurulu hizmet kültürü.",
                innovation: "İnovasyon",
                innovation_desc: "Geleceği bugünden tasarlayan yenilikçi fikirler ve dinamik gelişim süreçleri."
            },
            products: {
                title: "Ürünlerimiz",
                subtitle: "Yan yana kaydırarak tüm ürünlerimizi görün",
                prev: "Önceki ürünler",
                next: "Sonraki ürünler",
                all_products: "Tüm Ürünleri Listele",
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
                company_info: "Şirket Bilgileri",
                company_name: "Firma Ünvanı *",
                is_corporate: "Tüzel Kişi (Kurumsal Müşteri)",
                contact_info: "İletişim Bilgileri",
                contact_person: "Adınız Soyadınız *",
                position: "Ünvanınız *",
                phone: "Telefon *",
                city: "Şehir *",
                additional_info: "Ek Bilgiler",
                additional_info_label: "İş birliği için faydalı olabilecek diğer bilgiler",
                additional_info_placeholder: "Proje teklifleri, özel ihtiyaçlar veya sorularınız...",
                kvkk: "Kişisel verilerimin işlenmesini kabul ediyorum. (KVKK) *",
                apply: "Başvuru Yap"
            },
            footer: {
                navigation: "Navigasyon",
                contact: "İletişim",
                legal: "Yasal",
                cookie_policy: "Çerez Politikası",
                privacy_policy: "Gizlilik Politikası",
                kvkk: "KVKK Aydınlatma Metni",
                terms: "Kullanım Şartları",
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
                catalog: "E-Catalog",
                contact: "Contact",
                application: "Application"
            },
            hero: {
                title: "Preline: Redefining Technology with Japanese Discipline",
                subtitle: "We are not just a manufacturer, but a strategic solution partner for high technology and innovation. We carry our traditional business discipline into the future with the world's most advanced technologies.",
                products: "Explore Products",
                about: "Our Corporate Profile"
            },
            about: {
                title: "About Us",
                lead: "With over 20 years of deep-rooted history and expertise in the sector, Preline has a service approach focused on sustainable quality and customer satisfaction. We combine our professional experience with innovative approaches to produce high-standard solutions.",
                quality: "Quality Standards",
                quality_desc: "High standards at every stage of production; superior quality in every detail.",
                customer: "Customer Satisfaction",
                customer_desc: "Service culture centered on customer experience, built on trust and transparency.",
                innovation: "Innovation",
                innovation_desc: "Innovative ideas and dynamic development processes that design the future today."
            },
            products: {
                title: "Our Products",
                subtitle: "Swipe horizontally to see all our products",
                prev: "Previous products",
                next: "Next products",
                all_products: "List All Products",
                details: "More Information"
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
                company_info: "Company Information",
                company_name: "Company Title *",
                is_corporate: "Legal Entity (Corporate Customer)",
                contact_info: "Contact Information",
                contact_person: "Your Name Surname *",
                position: "Your Title *",
                phone: "Phone *",
                city: "City *",
                additional_info: "Additional Information",
                additional_info_label: "Other information that may be useful for cooperation",
                additional_info_placeholder: "Project proposals, special needs or questions...",
                kvkk: "I accept the processing of my personal data. (KVKK) *",
                apply: "Apply"
            },
            footer: {
                navigation: "Navigation",
                contact: "Contact",
                legal: "Legal",
                cookie_policy: "Cookie Policy",
                privacy_policy: "Privacy Policy",
                kvkk: "KVKK Disclosure Text",
                terms: "Terms of Use",
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
                catalog: "الكتروني كتالوج",
                contact: "اتصل بنا",
                application: "تقديم"
            },
            hero: {
                title: "بريلين: إعادة تعريف التكنولوجيا بالانضباط الياباني",
                subtitle: "نحن لسنا مجرد مُصنِّع، بل شريك حل استراتيجي للتكنولوجيا العالية والابتكار. نحمل انضباط عملنا التقليدي إلى المستقبل بأكثر التقنيات تقدماً في العالم.",
                products: "استكشاف المنتجات",
                about: "ملفنا المؤسسي"
            },
            about: {
                title: "من نحن",
                lead: "بخبرة تزيد عن 20 عامًا في القطاع، يتبنى بريلين نهج خدمة يركز على الجودة المستدامة ورضا العملاء. نجمع بين خبرتنا المهنية والأساليب المبتكرة لإنتاج حلول ذات معايير عالية.",
                quality: "معايير الجودة",
                quality_desc: "معايير عالية في كل مرحلة من مراحل الإنتاج؛ جودة فائقة في كل تفصيل.",
                customer: "رضا العملاء",
                customer_desc: "ثقافة خدمة تتمحور حول تجربة العميل، مبنية على الثقة والشفافية.",
                innovation: "الابتكار",
                innovation_desc: "أفكار مبتكرة وعمليات تطوير ديناميكية تصمم المستقبل اليوم."
            },
            products: {
                title: "منتجاتنا",
                subtitle: "اسحب أفقيًا لرؤية جميع منتجاتنا",
                prev: "المنتجات السابقة",
                next: "المنتجات التالية",
                all_products: "عرض جميع المنتجات",
                details: "مزيد من المعلومات"
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
                company_info: "معلومات الشركة",
                company_name: "عنوان الشركة *",
                is_corporate: "كيان قانوني (عميل مؤسسي)",
                contact_info: "معلومات الاتصال",
                contact_person: "اسمك ولقبك *",
                position: "لقبك *",
                phone: "هاتف *",
                city: "المدينة *",
                additional_info: "معلومات إضافية",
                additional_info_label: "معلومات أخرى قد تكون مفيدة للتعاون",
                additional_info_placeholder: "مقترحات المشاريع، احتياجات خاصة أو أسئلة...",
                kvkk: "أوافق على معالجة بياناتي الشخصية. (KVKK) *",
                apply: "تقديم"
            },
            footer: {
                navigation: "التنقل",
                contact: "اتصل بنا",
                legal: "قانوني",
                cookie_policy: "سياسة الكوكيز",
                privacy_policy: "سياسة الخصوصية",
                kvkk: "نص إفصاح KVKK",
                terms: "شروط الاستخدام",
                tagline: "حيث تلتقي الجودة بالابتكار",
                copyright: "© 2025 بريلين. جميع الحقوق محفوظة."
            }
        };
    }
    
    getRussianTranslations() {
        return {
            nav: {
                home: "Главная",
                about: "О нас",
                products: "Продукты",
                catalog: "Электронный каталог",
                contact: "Контакты",
                application: "Заявка"
            },
            hero: {
                title: "Preline: Переопределение технологий с японской дисциплиной",
                subtitle: "Мы не просто производитель, а стратегический партнер по решениям в области высоких технологий и инноваций. Мы несем нашу традиционную деловую дисциплину в будущее с самыми передовыми технологиями мира.",
                products: "Исследовать продукты",
                about: "Наш корпоративный профиль"
            },
            about: {
                title: "О нас",
                lead: "Более чем 20-летней историей и глубокой экспертизой в отрасли, Preline придерживается подхода к обслуживанию, ориентированного на устойчивое качество и удовлетворенность клиентов. Мы сочетаем наш профессиональный опыт с инновационными подходами для создания высококачественных решений.",
                quality: "Стандарты качества",
                quality_desc: "Высокие стандарты на каждом этапе производства; превосходное качество в каждой детали.",
                customer: "Удовлетворенность клиентов",
                customer_desc: "Культура обслуживания, ориентированная на клиентский опыт, построенная на доверии и прозрачности.",
                innovation: "Инновации",
                innovation_desc: "Инновационные идеи и динамичные процессы развития, проектирующие будущее уже сегодня."
            },
            products: {
                title: "Наши продукты",
                subtitle: "Проведите горизонтально, чтобы увидеть все наши продукты",
                prev: "Предыдущие продукты",
                next: "Следующие продукты",
                all_products: "Показать все продукты",
                details: "Подробнее"
            },
            contact: {
                title: "Контакты",
                name: "Ваше имя",
                email: "Электронная почта",
                subject: "Тема",
                message: "Ваше сообщение",
                send: "Отправить"
            },
            application: {
                title: "Форма заявки",
                lead: "Отправьте заявку для работы с нами.",
                company_info: "Информация о компании",
                company_name: "Название компании *",
                is_corporate: "Юридическое лицо (Корпоративный клиент)",
                contact_info: "Контактная информация",
                contact_person: "Ваше имя и фамилия *",
                position: "Ваша должность *",
                phone: "Телефон *",
                city: "Город *",
                additional_info: "Дополнительная информация",
                additional_info_label: "Другая информация, которая может быть полезна для сотрудничества",
                additional_info_placeholder: "Предложения по проектам, особые потребности или вопросы...",
                kvkk: "Я согласен на обработку моих персональных данных. (KVKK) *",
                apply: "Подать заявку"
            },
            footer: {
                navigation: "Навигация",
                contact: "Контакты",
                legal: "Правовая информация",
                cookie_policy: "Политика использования файлов cookie",
                privacy_policy: "Политика конфиденциальности",
                kvkk: "Текст разъяснения KVKK",
                terms: "Условия использования",
                tagline: "Где качество встречается с инновациями",
                copyright: "© 2025 Preline. Все права защищены."
            }
        };
    }
    
    // ... Diğer metotlar aynı kalacak ...
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
                // Handle different types of elements
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    if (element.hasAttribute('placeholder')) {
                        element.placeholder = value;
                    }
                } else {
                    // If element has child with specific text classes, update that
                    const textElements = element.querySelectorAll('.nav-text, .btn-text, span:not([class]), p, h1, h2, h3, h4, h5, h6, a:not([class*="btn"])');
                    
                    if (textElements.length > 0) {
                        // Check if we should update direct children or the element itself
                        let updated = false;
                        textElements.forEach(textElement => {
                            if (textElement.parentElement === element && 
                                !textElement.classList.contains('fa') && 
                                !textElement.classList.contains('fas') && 
                                !textElement.classList.contains('fab')) {
                                textElement.textContent = value;
                                updated = true;
                            }
                        });
                        
                        if (!updated) {
                            element.textContent = value;
                        }
                    } else {
                        element.textContent = value;
                    }
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

