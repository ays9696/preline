<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Hangi formdan geldiğini kontrol et
    $formType = $data['form_type'] ?? 'contact'; // 'contact' veya 'application'
    
    // E-posta alıcısı
    $to = "arselyusuf01@gmail.com";
    $subject = "";
    $message = "";
    $headers = "From: arselyusuf01@gmail.com\r\n";
    $headers .= "Reply-To: " . ($data['email'] ?? $data['contactEmail'] ?? 'arselyusuf01@gmail.com') . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    if ($formType === 'contact') {
        // İletişim Formu
        $subject = "İletişim Formu: " . htmlspecialchars($data['subject']);
        $message = "
        <html>
        <head>
            <title>Yeni İletişim Formu</title>
        </head>
        <body>
            <h2>Yeni İletişim Formu Gönderildi</h2>
            <p><strong>Adı:</strong> " . htmlspecialchars($data['name']) . "</p>
            <p><strong>E-posta:</strong> " . htmlspecialchars($data['email']) . "</p>
            <p><strong>Konu:</strong> " . htmlspecialchars($data['subject']) . "</p>
            <p><strong>Mesaj:</strong><br>" . nl2br(htmlspecialchars($data['message'])) . "</p>
            <hr>
            <p><small>Gönderim Tarihi: " . date('d.m.Y H:i:s') . "</small></p>
        </body>
        </html>
        ";
    } else {
        // Başvuru Formu
        $subject = "Yeni İş Birliği Başvurusu: " . htmlspecialchars($data['companyName']);
        $isCorporate = isset($data['isCorporate']) && $data['isCorporate'] ? 'Evet' : 'Hayır';
        
        $message = "
        <html>
        <head>
            <title>Yeni Başvuru Formu</title>
        </head>
        <body>
            <h2>Yeni İş Birliği Başvurusu</h2>
            
            <h3>Şirket Bilgileri</h3>
            <p><strong>Firma Ünvanı:</strong> " . htmlspecialchars($data['companyName']) . "</p>
            <p><strong>Tüzel Kişi:</strong> " . $isCorporate . "</p>
            
            <h3>İletişim Bilgileri</h3>
            <p><strong>Adı Soyadı:</strong> " . htmlspecialchars($data['contactPerson']) . "</p>
            <p><strong>Ünvanı:</strong> " . htmlspecialchars($data['position']) . "</p>
            <p><strong>E-posta:</strong> " . htmlspecialchars($data['email']) . "</p>
            <p><strong>Telefon:</strong> " . htmlspecialchars($data['phone']) . "</p>
            <p><strong>Şehir:</strong> " . htmlspecialchars($data['city']) . "</p>
            
            <h3>Ek Bilgiler</h3>
            <p>" . nl2br(htmlspecialchars($data['additionalInfo'] ?? 'Belirtilmedi')) . "</p>
            
            <h3>KVKK Onayı</h3>
            <p><strong>KVKK Kabulü:</strong> " . (isset($data['kvkk']) && $data['kvkk'] ? 'Evet' : 'Hayır') . "</p>
            
            <hr>
            <p><small>Başvuru Tarihi: " . date('d.m.Y H:i:s') . "</small></p>
        </body>
        </html>
        ";
    }
    
    // E-posta gönder
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Form başarıyla gönderildi!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'E-posta gönderilemedi.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Geçersiz istek metodü.']);
}
?>