
/**
 * Basit ve Çalışan Çerez Onay Sistemi
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Çerez kontrolü
    if (!getCookie('cookie_consent')) {
        // 2 saniye sonra banner'ı göster
        setTimeout(showCookieBanner, 2000);
    } else {
        console.log('Çerez onayı zaten verilmiş');
    }
    
    function showCookieBanner() {
        // Banner HTML'i
        const bannerHTML = `
        <div id="cookieBanner" class="cookie-banner" style="
            position: fixed;
            bottom: 20px;
            left: 20px;
            right: 20px;
            max-width: 500px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            padding: 20px;
            z-index: 9999;
            font-family: Arial, sans-serif;
            border-left: 5px solid #4ECDC4;
            display: none;
        ">
            <div class="cookie-content">
                <div class="cookie-header" style="
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;
                ">
                    <div style="
                        background: #FF6B8B;
                        color: white;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-right: 10px;
                    ">
                        <i class="fas fa-cookie-bite"></i>
                    </div>
                    <h5 style="margin: 0; color: #2D3748; font-weight: 600;">
                        Çerez Kullanımı
                    </h5>
                </div>
                
                <p style="
                    color: #4A5568;
                    font-size: 14px;
                    line-height: 1.5;
                    margin-bottom: 15px;
                ">
                    Sitemizde size en iyi deneyimi sunmak için çerezleri kullanıyoruz. 
                    Çerez politikamız hakkında daha fazla bilgi için 
                    <a href="cookie-policy.html" target="_blank" style="color: #4ECDC4; font-weight: 600;">buraya tıklayın</a>.
                </p>
                
                <div class="cookie-buttons" style="
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                ">
                    <button id="cookieReject" style="
                        padding: 8px 16px;
                        background: #E2E8F0;
                        border: none;
                        border-radius: 5px;
                        color: #4A5568;
                        font-weight: 600;
                        cursor: pointer;
                        flex: 1;
                        transition: all 0.3s;
                    ">
                        Sadece Gerekli
                    </button>
                    <button id="cookieAccept" style="
                        padding: 8px 16px;
                        background: linear-gradient(135deg, #4ECDC4, #FF6B8B);
                        border: none;
                        border-radius: 5px;
                        color: white;
                        font-weight: 600;
                        cursor: pointer;
                        flex: 2;
                        transition: all 0.3s;
                    ">
                        Tüm Çerezlere İzin Ver
                    </button>
                </div>
            </div>
        </div>
        `;
        
        // Banner'ı sayfaya ekle
        document.body.insertAdjacentHTML('beforeend', bannerHTML);
        
        // Font Awesome ekle (eğer yoksa)
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const faLink = document.createElement('link');
            faLink.rel = 'stylesheet';
            faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
            document.head.appendChild(faLink);
        }
        
        // Banner'ı göster (fade in efekti)
        const banner = document.getElementById('cookieBanner');
        banner.style.display = 'block';
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(20px)';
        banner.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            banner.style.opacity = '1';
            banner.style.transform = 'translateY(0)';
        }, 100);
        
        // Buton event'larını ekle
        document.getElementById('cookieAccept').addEventListener('click', function() {
            setCookie('cookie_consent', 'accepted_all', 365);
            hideBanner();
            showToast('Tüm çerezlere izin verildi', 'success');
        });
        
        document.getElementById('cookieReject').addEventListener('click', function() {
            setCookie('cookie_consent', 'necessary_only', 365);
            hideBanner();
            showToast('Sadece gerekli çerezlere izin verildi', 'info');
        });
        
        // Buton hover efektleri
        const buttons = document.querySelectorAll('#cookieBanner button');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        });
    }
    
    function hideBanner() {
        const banner = document.getElementById('cookieBanner');
        if (banner) {
            banner.style.opacity = '0';
            banner.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                banner.remove();
            }, 500);
        }
    }
    
    function showToast(message, type) {
        // Toast HTML'i
        const toastHTML = `
        <div class="cookie-toast" style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 8px;
            padding: 15px 20px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.15);
            z-index: 10000;
            display: flex;
            align-items: center;
            border-left: 4px solid ${type === 'success' ? '#38A169' : '#4299E1'};
            transform: translateX(150%);
            transition: transform 0.5s ease;
        ">
            <div style="
                background: ${type === 'success' ? '#38A169' : '#4299E1'};
                color: white;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 10px;
            ">
                <i class="fas fa-${type === 'success' ? 'check' : 'info-circle'}"></i>
            </div>
            <div>
                <div style="font-weight: 600; color: #2D3748; margin-bottom: 2px;">
                    ${type === 'success' ? 'Başarılı' : 'Bilgi'}
                </div>
                <div style="font-size: 14px; color: #4A5568;">
                    ${message}
                </div>
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
        </div>
        `;
        
        // Toast'ı ekle
        document.body.insertAdjacentHTML('beforeend', toastHTML);
        
        // Toast'ı göster
        const toast = document.querySelector('.cookie-toast');
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        // Kapat butonu
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', function() {
            toast.style.transform = 'translateX(150%)';
            setTimeout(() => {
                toast.remove();
            }, 500);
        });
        
        // 5 saniye sonra otomatik kapat
        setTimeout(() => {
            if (toast && toast.parentNode) {
                toast.style.transform = 'translateX(150%)';
                setTimeout(() => {
                    if (toast && toast.parentNode) {
                        toast.remove();
                    }
                }, 500);
            }
        }, 5000);
    }
    
    // Çerez fonksiyonları
    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }
    
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
        }
        return null;
    }
    
    // Çerez yönetimi butonu için (footer'a ekleyebilirsiniz)
    function createCookieManager() {
        // Footer'da çerez yönetimi linki oluştur
        const footerLinks = document.querySelector('.footer .col-lg-3');
        if (footerLinks) {
            const cookieLink = document.createElement('li');
            cookieLink.innerHTML = `
                <a href="#" id="cookieSettings">
                    <i class="fas fa-sliders-h me-2"></i>Çerez Ayarları
                </a>
            `;
            footerLinks.querySelector('ul').appendChild(cookieLink);
            
            // Linke tıklanınca ayarları göster
            document.getElementById('cookieSettings').addEventListener('click', function(e) {
                e.preventDefault();
                showCookieSettings();
            });
        }
    }
    
    function showCookieSettings() {
        // Çerez ayarları modal'ı
        const modalHTML = `
        <div id="cookieSettingsModal" style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 10001;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        ">
            <div style="
                background: white;
                border-radius: 15px;
                padding: 30px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                transform: translateY(-30px);
                transition: transform 0.3s ease;
            ">
                <div style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                ">
                    <h4 style="margin: 0; color: #2D3748;">
                        <i class="fas fa-cog me-2"></i>Çerez Ayarları
                    </h4>
                    <button id="closeSettings" style="
                        background: none;
                        border: none;
                        font-size: 24px;
                        color: #718096;
                        cursor: pointer;
                        padding: 0;
                    ">
                        &times;
                    </button>
                </div>
                
                <div style="margin-bottom: 25px;">
                    <p style="color: #4A5568; font-size: 14px; line-height: 1.6;">
                        Çerez tercihlerinizi aşağıdan yönetebilirsiniz. Her kategori için 
                        açıklamaları okuyarak kararınızı verebilirsiniz.
                    </p>
                </div>
                
                <div style="margin-bottom: 25px;">
                    <div class="cookie-option" style="
                        background: #F7FAFC;
                        padding: 15px;
                        border-radius: 8px;
                        margin-bottom: 15px;
                        border: 2px solid #E2E8F0;
                    ">
                        <div style="
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-bottom: 10px;
                        ">
                            <div>
                                <div style="font-weight: 600; color: #2D3748;">Zorunlu Çerezler</div>
                                <div style="font-size: 12px; color: #718096;">Her zaman aktif</div>
                            </div>
                            <div style="
                                width: 50px;
                                height: 26px;
                                background: #38A169;
                                border-radius: 13px;
                                position: relative;
                            ">
                                <div style="
                                    position: absolute;
                                    top: 3px;
                                    left: 28px;
                                    width: 20px;
                                    height: 20px;
                                    background: white;
                                    border-radius: 50%;
                                "></div>
                            </div>
                        </div>
                        <p style="
                            font-size: 13px;
                            color: #4A5568;
                            margin: 0;
                            line-height: 1.5;
                        ">
                            Site çalışması için gerekli çerezler. Bu çerezler olmadan site düzgün çalışmaz.
                        </p>
                    </div>
                    
                    <div class="cookie-option" style="
                        background: #F7FAFC;
                        padding: 15px;
                        border-radius: 8px;
                        margin-bottom: 15px;
                        border: 2px solid #E2E8F0;
                    ">
                        <div style="
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-bottom: 10px;
                        ">
                            <div>
                                <div style="font-weight: 600; color: #2D3748;">Performans Çerezleri</div>
                                <div style="font-size: 12px; color: #718096;">Site analizi için</div>
                            </div>
                            <div style="
                                width: 50px;
                                height: 26px;
                                background: #CBD5E0;
                                border-radius: 13px;
                                position: relative;
                                cursor: pointer;
                            " id="toggleAnalytics">
                                <div style="
                                    position: absolute;
                                    top: 3px;
                                    left: 3px;
                                    width: 20px;
                                    height: 20px;
                                    background: white;
                                    border-radius: 50%;
                                    transition: left 0.3s;
                                "></div>
                            </div>
                        </div>
                        <p style="
                            font-size: 13px;
                            color: #4A5568;
                            margin: 0;
                            line-height: 1.5;
                        ">
                            Site kullanımını analiz etmek ve geliştirmek için kullanılır.
                        </p>
                    </div>
                </div>
                
                <div style="
                    display: flex;
                    justify-content: space-between;
                    gap: 10px;
                ">
                    <button id="saveSettings" style="
                        flex: 1;
                        padding: 12px;
                        background: linear-gradient(135deg, #4ECDC4, #FF6B8B);
                        border: none;
                        border-radius: 8px;
                        color: white;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s;
                    ">
                        Ayarları Kaydet
                    </button>
                    <button id="acceptAllSettings" style="
                        flex: 1;
                        padding: 12px;
                        background: #38A169;
                        border: none;
                        border-radius: 8px;
                        color: white;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s;
                    ">
                        Tümünü Kabul Et
                    </button>
                </div>
            </div>
        </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        const modal = document.getElementById('cookieSettingsModal');
        const content = modal.querySelector('div > div');
        
        // Modal'ı göster
        setTimeout(() => {
            modal.style.opacity = '1';
            content.style.transform = 'translateY(0)';
        }, 10);
        
        // Event listener'lar
        document.getElementById('closeSettings').addEventListener('click', closeModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Toggle butonu
        let analyticsEnabled = getCookie('cookie_consent') === 'accepted_all';
        const toggleBtn = document.getElementById('toggleAnalytics');
        const toggleCircle = toggleBtn.querySelector('div > div');
        
        if (analyticsEnabled) {
            toggleBtn.style.background = '#38A169';
            toggleCircle.style.left = '28px';
        }
        
        toggleBtn.addEventListener('click', function() {
            analyticsEnabled = !analyticsEnabled;
            this.style.background = analyticsEnabled ? '#38A169' : '#CBD5E0';
            toggleCircle.style.left = analyticsEnabled ? '28px' : '3px';
        });
        
        // Kaydet butonu
        document.getElementById('saveSettings').addEventListener('click', function() {
            const consentValue = analyticsEnabled ? 'accepted_all' : 'necessary_only';
            setCookie('cookie_consent', consentValue, 365);
            closeModal();
            showToast('Çerez ayarlarınız kaydedildi', 'success');
        });
        
        // Tümünü kabul et
        document.getElementById('acceptAllSettings').addEventListener('click', function() {
            setCookie('cookie_consent', 'accepted_all', 365);
            closeModal();
            showToast('Tüm çerezlere izin verildi', 'success');
        });
        
        // Hover efektleri
        const buttons = modal.querySelectorAll('button[id]');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        });
        
        function closeModal() {
            modal.style.opacity = '0';
            content.style.transform = 'translateY(-30px)';
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }
    
    // Footer'a çerez yönetimi linki ekle
    createCookieManager();
});
