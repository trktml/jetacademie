---
name: mufredat-kaynak-arama
description: >-
  JetAcademie müfredatı, haftalık ders planları ve pedagojik içerikler hazırlanırken
  Risale-i Nur ve Pırlanta külliyatından veya sources/ altındaki kaynaklardan araştırma
  yapmak, ilgili kavram ve konular için nokta atışı pasaj bulmak, sayfa numarası ve İsnad
  dipnotu tespit etmek için kullanılır. Yerel SQLite FTS5 indeksinde ilgili pasajları bulur;
  alıntılar ve kaynak bilgileri asıl sayfa veya bölümden ayrıca doğrulanır.
---

# Müfredat Kaynak Araştırma Motoru (Context-Korumalı Arama)

JetAcademie müfredat hazırlığında kullanılan yerel SQLite FTS5 araştırma aracıdır. Kitabın tamamı yerine ilgili pasajları getirerek bağlam yükünü azaltır; dönen metin yine model bağlamına girer. Arama hızı indeksin ve sorgunun durumuna bağlıdır.

> [!IMPORTANT]
> **Context Şişirmeme Kuralı**:
> Asla yüzlerce sayfalık PDF dosyalarını veya tüm kitapları doğrudan context'e yüklemeyin / okumayın!
> Bunun yerine terminalden arama komutunu (`bun scripts/search-sources.ts`) çalıştırıp yalnızca aradığınız konuyla ilgili küçük pasajları veya ilgili tek bir sayfayı çekin.

---

## ⚡ Temel Kullanım Komutları

### 1. Konu veya Kavram Arama (Top 5 Pasaj)

Konuyla ilgili en uygun pasajları ve sayfa numaralarını listelemek için:

```bash
bun scripts/search-sources.ts -q "ihlas hakikati" -n 5
```

### 2. Kategoriye Göre Filtreleme

Yalnızca Risale-i Nur veya Pırlanta kaynaklarında arama yapmak için:

```bash
# Sadece Risalelerde ara
bun scripts/search-sources.ts -q "namaz" -c risale -n 5

# Sadece Pırlantalarda ara
bun scripts/search-sources.ts -q "marifetullah" -c pirlanta -n 5
```

### 3. Belirli Bir Kitapta Arama

Doğrudan belirli bir eserde (örn: _Sözler_, _Lemalar_, _İrşad Ekseni_) arama:

```bash
bun scripts/search-sources.ts -q "bismillah" -b "Sözler" -n 3
```

### 4. İndeksteki İlgili Sayfayı Okuma

Arama sonucundaki pasajın indekslenmiş sayfa metnini görmek için:

```bash
bun scripts/search-sources.ts --read "Lemalar" --page 160
```

Bu işlem ilgili sayfanın indeks metnini getirir; metin miktarı sayfaya bağlıdır. Asıl kaynakla karşılaştırmanın yerine geçmez. Bağlam sayfa sınırını aşıyorsa komşu sayfa veya ilgili bölüm de okunmalıdır.

### 5. Yeni Kaynakları İndeksleme

Kullanıcı `sources/` klasörüne yeni PDF, metin veya klasör eklediğinde:

```bash
bun run sources:index
```

---

## 📋 Müfredat Hazırlama Akışı (Adım Adım)

Önce [MUFREDAT-INSTRUCTIONS.md](../../../mufredat-docs/planlar/MUFREDAT-INSTRUCTIONS.md) ve ilgili sınıfın yıllık planını oku. Konu, ana soru, kazanım ve temel kaynak yıllık plandan; öğrenci metninin dili, anlatısı ve sunumu yazım yönergesinden alınır. Bu beceri kaynak bulmayı destekler, kategoriye özel çıktı düzeninin yerine geçmez.

1. **Arama:** Planda belirtilen konu ve temel kaynakla arama yap; aşağıdaki sorgu yalnız komut örneğidir, herhangi bir sınıfın haftalık konusu değildir:
   ```bash
   bun scripts/search-sources.ts -q "ihlas" -n 3
   ```
2. **Pasaj seçimi:** Hedef yaşın yanında öğrencinin Türkçe okuma düzeyini, ön bilgisini ve programdaki ayını dikkate al. Ana soruya katkı sunan, gerekli anlam desteğiyle anlaşılabilecek bir pasaj seç.
3. **Zorunlu özgün kaynak doğrulaması:** `--read` ile indeks metnini incele; ardından sonucun kaynak dosyasındaki asıl sayfa veya bölümünü aç. Alıntıyı kelime kelime karşılaştır; bağlamı ve künyeyi doğrula. PDF'den çıkarılan metindeki eksik karakterleri, satır birleşmelerini veya kaynağın dipnotlarının alıntıya karışmasını kontrol et. İndeksin PDF sayfa sırasını basılı sayfa numarası sanma; dipnotta kullanılan baskının doğrulanmış sayfasını veya bölümünü belirt. Nakledilen hadis ve tarihî olaylarda dayanak kaynağı da doğrula. Kaynağa erişilemiyorsa arama sonucunu doğrulanmış alıntı gibi kullanma; ana içeriği etkileyen eksikliği ayrı bildir ve dersi yayıma hazır sayma.
4. **Alıntı ve sunum:** Özgün pasajı değiştirmeden, koyu yazılmış alıntı olarak ve kendi dipnotuyla sun. Yaşa uygun açıklamayı alıntının dışında ver. Kapanış, kelime açıklaması ve dipnotların yerini ilgili kategorinin yönergesinden al; Konu'nun 3–6 maddelik kapanışını kısa kartlara taşıma.
5. **Doğrulama kaydı:** Kullanılan kaynak dosyasını/baskısını, ilgili sayfa veya bölümü ve karşılaştırılan pasajı öğrenciye gösterilmeyen hazırlık notunda belirt. Arama sonucu, özet veya önceki ders metni tek başına doğrulama değildir.
