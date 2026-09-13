# JetAcademie

JetAcademie, öğrencilerin aylık ve haftalık manevi gelişim müfredatını sırayla takip ettiği mobil öncelikli bir PWA uygulamasıdır.

## Ürün yapısı

- `/`: Yalnızca Müfredat ve Hedefler bölümlerine açılan ana sayfa.
- `/mufredat`: Sol tarafta sabit (mobilde üstte yapışkan) 9 kategorili kapsül navigasyon ile seçilen kategoriye ait fiziksel arşiv klasörü destesi (archive folder deck). Kategoriler doğal sayfa akışında alt alta listelenir; kategoriler arasına yerleştirilen iki uca doğru zarifçe solan minimalist ayraç çizgileri ve ferah dikey nefes payı ile bölümler birbirine karışmadan net bir hiyerarşiyle ayrılmıştır. Dosyalar fiziksel klasör metaforuyla arkasına doğru basamaklı derinlikte ("üst üste ve arkasına doğru") Manila kulakçıklarıyla yerleştirilmiştir. Sıradaki dosya tamamlanmadan arkadaki kilitli dosyaya geçilemez; başlık çubuğundaki sayaçlı 'Geçmiş' tuşuyla tamamlanan arşiv kayıtları son arşivlenenden ilke doğru ters kronolojik olarak incelenebilir.
- `/hedefler`: Bir sonraki ürün çalışması için hazırlanmış Hedefler sayfası.
- Hesap: GDPR uyumlu anonim kimlik doğrulama. Kişisel veri (ad, soyad, e-posta) toplanmaz; kullanıcı sadece şifre belirler ve sistem otomatik olarak ardışık kullanıcı adı atar (`user1`, `user2`...). Silinen hesapların numaraları sonraki kayıtlara devredilir (gap filling). Kullanıcı adı ve şifre ile giriş yapılır; doğrudan şifre değiştirme ve tek onaylı hesap silme desteklenir.
- Tema: Açık, koyu ve sistem tercihlerini destekleyen kalıcı semantik tema altyapısı.

Gerçek haftalık müfredat sağlanana kadar uygulama sahte ders içeriği göstermez. Haftalık kayıtlar `src/lib/curriculum.ts` içindeki `curriculumEntries` koleksiyonuna veya ileride kurulacak içerik yönetim kaynağına bağlanabilir.

## İlerleme modeli

Her içerik bir kategori, yıl, ay ve hafta bilgisi taşır. Kullanıcı bir dosyayı okundu olarak işaretlediğinde kayıt `curriculum_progress` tablosunda kullanıcı kimliğiyle saklanır. Aynı kategoride önceki dosyalar tamamlanmadan sonraki dosya tamamlanamaz. Risale ve İlmihal kayıtlarında ileride PDF sayfa/yüzde takibi için `resourceUrl` ve `pageCount` alanları hazırdır.

## Teknoloji

- Bun 1.3+
- Next.js 16 App Router ve React 19
- Tailwind CSS v4
- Zustand v5
- TanStack Query v5
- Better-Auth ve Bun SQLite
- Zod v4
- Vaul bottom sheet

## Yerel geliştirme

```bash
bun install
bun dev
```

Uygulama varsayılan olarak `http://localhost:3000` adresinde açılır. Ortam değişkenleri için `.env.example` dosyasını temel alın.

## Doğrulama

```bash
bun test
bun run lint
bun run format:check
bun run build
```

## Dağıtım

Dokploy/Docker dağıtımında kalıcı SQLite dosyası için `DATABASE_URL=/app/data/auth.sqlite` kullanın ve `/app/data` dizinini kalıcı volume olarak bağlayın. `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` ve `NEXT_PUBLIC_APP_URL` değerlerini üretim ortamına göre ayarlayın.
