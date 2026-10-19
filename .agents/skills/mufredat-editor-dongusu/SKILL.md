---
name: mufredat-editor-dongusu
description: >-
  JetAcademie öğrenci müfredatını üretirken, revize ederken veya son okumadan
  geçirirken kanıtlı eleştiri, düzeltme ve yeniden okuma döngüsünü yürüt.
  Konu ve dinleme metinlerinin kaynak, bağımsız anlama, yaşa uygun dil ve anlatı
  kontrollerini kullanıcıdan ayrı ayrı istem beklemeden tamamla.
  Yalnız uygulama kodu veya yönerge düzenleme işlerinde kullanma.
---

# Müfredat editör döngüsü

İlk taslağı teslimle yetinme. Kullanıcının üretim veya düzeltme isteği içinde,
metni eleştir, gerekli değişiklikleri yap ve sonucu yeniden değerlendir.
Kullanıcının ayrıca “bir daha kontrol et” demesini bekleme.

## Yetkili kılavuz ve kapsam

- [Yazım kılavuzunu](../../../mufredat-docs/planlar/MUFREDAT-INSTRUCTIONS.md)
  oku; tam ders üretiminde/revizyonunda ilgili yıllık planı da incele.
  Ayrıntılı döngü ve bitirme ölçüsü **bölüm 18.6**'dadır;
  kaynak ve öğrenci/anlatı kontrolleri **18.1–18.2**'dedir. Aynı kuralların ikinci
  bir kopyasını üretme.
- Veritabanındaki bir ders revize edilecekse güncel kaydı oradan al. Eski yerel
  hazırlık kopyasını yetkili girdi sayma. Kayıt kimliği, sınıf, hafta, kategori,
  hedef ve öğrenci profilini belirle. Yalnız kullanıcı tarafından verilen bir
  parça inceleniyorsa onu girdi kabul et; eksik kayıt kimliğini uydurma.
- Kullanıcı yalnız bir paragrafın dili veya bir inceleme raporu gibi dar bir iş
  istemişse o sınırda kal. Paragraf incelemesini bütün dersin kaynak/yayın onayı gibi
  sunma. Açıkça yalnız rapor veya metne dokunmadan inceleme istenmişse metni ya da
  veritabanını değiştirme.
- Kaynak ararken [mufredat-kaynak-arama](../mufredat-kaynak-arama/SKILL.md)
  becerisini kullan. Arama sonucunu özgün kaynak doğrulaması sayma.

## Uygulama

1. Yeni üretimde kılavuzun plan, kaynak ve örnek ders sırasını izle. Revizyonda
   önce iyi çalışan giriş, sahne, düşünce bağı ve kapanışı belirle; bunları koru.
2. Bölüm 18.6'yı her kayıt için ayrı uygula. Kaynak incelemesiyle öğrenci/anlatı
   okumasını ayır. Önce kısa bulguları ve bunlara dayalı düzeltme önerilerini
   kaydet; sonra metni değiştir. “Güzel olmuş” veya genel bir puan bulgu değildir.
3. Düzeltilen yeri komşu paragraflarıyla, ardından bütün metni tekrar oku. Eski
   sorunun çözüldüğünü ve yeni bir kopukluk, anlam kaybı veya anlatı zayıflaması
   oluşmadığını kontrol et. Çok sınıflı pakette her dersin bağımsızlığını ve
   haftalık bütünlüğü ayrıca değerlendir.
4. Kullanıcıdan rutin düzeltmelere onay istemeden yetkili kapsamda devam et.
   Somut eksik kalmadığında son okumayı yapıp bitir. Gerçekten gerekli bilgi veya
   erişim yoksa yapılabilen işi tamamla, eksik incelemeyi doğru kaydet; aynı
   başarısız araç denemesini tekrar tekrar çalıştırma.
5. Veritabanına kaydedilecek bir ders/paket üzerinde çalışıyorsan, yetkili güncel
   taslağı mevcut `curriculum` CLI ile doğrula ve kaydet; veritabanından geri
   okuyarak gövde, başlık ve taslak durumunu karşılaştır. Seçilen kapsam dışındaki
   kayıtları koru. Bu döngü
   kendiliğinden yayın yetkisi vermez; yürürlükteki kullanıcı talebini ve kılavuzun
   kabul şartlarını uygula.

## Kayıt ve teslim

Mevcut bölüm 18 kontrol kaydını `data/curriculum-preparation/` altında güncelle.
Kısa metin kanıtı, öneri, uygulanan değişiklik ve yeniden kontrol sonucunu tut;
çalışma notlarını öğrenci metnine taşıma. Geçersiz tam ders kopyalarını veya onları
yeniden üreten betikleri bırakma.

Son yanıtta sonucu, önemli düzeltmeleri, güncel metnin yerini ve varsa zorunlu
inceleme eksiklerini kısa bildir. Öz değerlendirmeyi gerçek öğrenci geri bildirimi
veya bağımsız bir insanın onayı gibi sunma. Yapılmayan dinleme, sesli okuma veya
kaynak kontrolünü geçti sayma.

Bu beceriyi değiştirdiğinde, [davranış senaryolarını](references/deneme-senaryolari.md)
ayrı bir hazırlık alanında dene. Bunlar öğrenci dersleri veya her çalıştırmada
okunması gereken ek yönergeler değildir.
