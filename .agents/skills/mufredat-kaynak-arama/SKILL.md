---
name: mufredat-kaynak-arama
description: >-
  JetAcademie müfredatı, haftalık ders planları ve pedagojik içerikler hazırlanırken
  Risale-i Nur ve Pırlanta külliyatından veya sources/ altındaki kaynaklardan araştırma
  yapmak, ilgili kavram ve konular için nokta atışı pasaj bulmak, sayfa numarası ve İsnad
  dipnotu tespit etmek için kullanılır. AI context'ini şişirmeden 0 token ile yerel
  SQLite FTS5 motorunu çalıştırır.
---

# Müfredat Kaynak Araştırma Motoru (Context-Korumalı Arama)

JetAcademie projesinde müfredat hazırlayan yapay zeka ajanları (Antigravity, subagentlar) için geliştirilmiş yerel, token tüketmeyen, ultra hızlı (2–5ms) FTS5 araştırma aracıdır.

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

### 4. Nokta Atışı Tek Bir Sayfayı Okuma (~300 Kelime)

Arama sonucunda bulunan bir pasajın tüm bağlamını görmek için sadece o sayfayı okuyun:

```bash
bun scripts/search-sources.ts --read "Lemalar" --page 160
```

_Bu işlem sadece o sayfayı getirir (~400 token). Koca bir kitabı yüklemez._

### 5. Yeni Kaynakları İndeksleme

Kullanıcı `sources/` klasörüne yeni PDF, metin veya klasör eklediğinde:

```bash
bun run sources:index
```

---

## 📋 Müfredat Hazırlama Akışı (Adım Adım)

1. **Arama**: İlgili haftanın konusu için (örn. M1 1. Hafta "Bismillah", M2 "Gıybet", M3 "İhlas") arama yapın:
   ```bash
   bun scripts/search-sources.ts -q "ihlas" -n 3
   ```
2. **Pasaj Seçimi**: Gelen sonuçlar arasından hedef yaş grubunun (M1–M3 Ortaokul, M4–M6 Lise) seviyesine uygun, çarpıcı bir pasaj ve sayfa numarası seçin.
3. **Gerekirse Sayfayı Oku**: Pasajın öncesini ve sonrasını kontrol etmek gerekirse `--read` komutunu kullanın.
4. **İsnad Dipnotu ve Alıntı**:
   - `mufredat-docs/planlar/MUFREDAT-INSTRUCTIONS.md` kurallarına göre alıntıyı orijinal metin olarak bir quote bloğu içine yerleştirin.
   - Kitap adı ve sayfa numarasını İsnad dipnot formatında ekleyin.
   - Çocukların anlayacağı dilde açıklamasını ve "Bana ne söylüyor?" maddelerini yazın.
