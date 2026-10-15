# Sakarya Üniversitesi — Mezun Bilgi Sistemi (prototip)

mezun.giresun.edu.tr'deki sayfa yapısı örnek alınarak Sakarya Üniversitesi için hazırlanmış,
sunucu gerektirmeyen statik bir prototiptir. Tasarım ve kod özgündür; Giresun Üniversitesi'ne ait
görsel, metin veya veri kullanılmamıştır.

> **Önemli:** `assets/veri.js` boşken tüm sayılar **sentetik örnek veridir** (sayfalarda sarı
> şerit görünür). Birim ve program adları sakarya.edu.tr akademik birimler sayfasından alınmıştır
> (Ekim 2026); program listesi temsilîdir, kurumun güncel program kataloğuyla karşılaştırılmalıdır.

## Sayfalar

| Dosya | Giresun karşılığı | İçerik |
|---|---|---|
| `index.html` | `/` | Kahraman alanı, rakamlarla mezunlar, vitrin, köşe, duyurular, hizmetler |
| `kose.html` | `/Kose` | Tür sekmeleri (Yazı, Başarı Hikâyesi, Etkinlik, İş İlanı) + bölüm/yıl filtresi (`?tur=IsIlani`) |
| `kose-detay.html?id=N` | `/KoseDetay/N` | İçerik detayı, yazar kartı, görüntülenme |
| `vitrin.html` | `/Vitrin` | Öne çıkan mezun hikâyeleri |
| `duyurular.html` | `/Duyurular` | Duyuru listesi + arama |
| `istatistikler.html` | `/GIstatistikler` | Tür dağılımı, yıllara göre, il haritası, ilk iller, sektör, uluslararası, birim akordeonu |
| `il-dagilimi.html` | `/IlDagilimi` | Türkiye kabarcık haritası (yakınlaştır/kaydır), ilk 10, 81 il tablosu |
| `birim-bazli.html` | `/BirimBazli` | Grup karşılaştırma, birim/program seçmeli yıllık seri, program tabloları |
| `giris.html` | `/Account/Login` | 3 adımlı giriş: numara + toplama sorusu → kimlik doğrulama (seçerek/yazarak, 3 hak) → program seçimi |
| `yonetici-giris.html` | `/Account/PersonelLogin` | Personel girişi ekranı (SSO'ya bağlanacak) |
| `panel.html` | (giriş sonrası) | İletişim, çalışma bilgileri, köşeye içerik gönderme |
| `anketler.html` | `/Student/Anketler` | Mezun memnuniyet ve istihdam anketi |

Prototipte giriş denemek için: öğrenci no `B201000001` veya biçimce geçerli bir T.C. no (`10000000146`).
Formlar hiçbir sunucuya veri göndermez; kayıtlar yalnızca tarayıcı oturumunda (sessionStorage) tutulur.

## Çalıştırma

Dosyaları bir web sunucusundan açın (ör. `python3 -m http.server` ve `http://localhost:8000`)
ya da klasörü GitHub Pages'e yükleyin. İnternet bağlantısı gerekir (Chart.js cdnjs'den, yazı tipi Google Fonts'tan yüklenir).

## Gerçek veriyle çalıştırma

1. SABİS/Öğrenci İşleri'nden her satırı bir mezun olan bir CSV alın. Sütunlar:
   `birim_grup, birim, program, tur, mezuniyet_yili, cinsiyet, il, uyruk, sektor`
   (`il`, `uyruk`, `sektor` isteğe bağlı; ad/T.C./öğrenci no **gerekmez**.)
2. `python3 araclar/veri_donustur.py mezunlar.csv --kayitli 1834 > assets/veri.js`
3. Sayfayı yenileyin — örnek veri şeridi kalkar, tüm grafikler gerçek toplamlarla çizilir.

Mezun Köşesi ve duyuru içerikleri `assets/data.js` içindeki `V.kose` / `V.duyurular` dizilerindedir;
gerçek içerikleri ya oraya yazın ya da `assets/veri.js` içinde `window.MEZUN_KOSE = [...]` ve
`window.MEZUN_DUYURU = [...]` tanımlayın (aynı alan adlarıyla).

## Özelleştirme

`assets/app.js` başındaki `SITE` nesnesi: kurum adı, logo yolu (`logo: "assets/logo.png"`),
diploma talep bağlantısı, sosyal medya hesapları ve alt bilgi birimi.

## Canlıya alma için eksikler

Gerçek kimlik doğrulama (SABİS SSO / e-Devlet), içerik onay ve yönetici paneli, anket yanıtlarının
kaydı ve KVKK aydınlatma metni sunucu tarafında geliştirilmelidir. Sakarya Üniversitesi'nin
halihazırda `mezun.sakarya.edu.tr` adresinde bir mezun sitesi olduğu da göz önünde bulundurulmalıdır.

## Dosya yapısı

```
index.html … anketler.html   12 sayfa
assets/style.css             ortak stil
assets/app.js                üst/alt şablon, menü, yardımcılar, SITE ayarları
assets/data.js               birimler, iller, örnek veri üreteci, toplam fonksiyonları
assets/veri.js               gerçek veri (boşsa örnek veri kullanılır)
assets/harita.js             Türkiye il kabarcık haritası
assets/bilesen.js            il tablosu, birim akordeonu, grafik yardımcıları
araclar/veri_donustur.py     CSV → assets/veri.js
```
# sau-mezun
