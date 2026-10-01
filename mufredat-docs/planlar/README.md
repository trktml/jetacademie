# Yıllık müfredat planları

Bu dizindeki `M1_Yillik_Plan.md`–`M6_Yillik_Plan.md` dosyaları yıllık planların **esas alınan ve düzenlenen sürümleridir**. Konu, ana soru, yıllık kazanımlar, başlangıç ilkeleri ve temel kaynak seçiminde ilgili Markdown planını kullan.

## Plan seçimi

| Plan                    | Okul seviyesi | Yaklaşık yaş | Yıllık gelişim yönü             |
| ----------------------- | ------------- | ------------ | ------------------------------- |
| [M1](M1_Yillik_Plan.md) | Ortaokul 1    | 12–13        | Merak ve muhabbet               |
| [M2](M2_Yillik_Plan.md) | Ortaokul 2    | 13–14        | Okuma ve anlama                 |
| [M3](M3_Yillik_Plan.md) | Ortaokul 3    | 14–15        | Hayata taşıma                   |
| [M4](M4_Yillik_Plan.md) | Lise 1        | 15–16        | İhtiyaç hissetme                |
| [M5](M5_Yillik_Plan.md) | Lise 2        | 16–17        | Tahkik ve mukayese              |
| [M6](M6_Yillik_Plan.md) | Lise 3        | 17–18        | Bütünlük, şahsî duruş ve temsil |

Yaş aralıkları [yazım yönergesinden](MUFREDAT-INSTRUCTIONS.md) alınır; Türkçe okuma düzeyi yaşından çıkarılmaz. M1 ilkokul birinci sınıf anlamına gelmez. Önceki seviyelerin tamamlandığını varsayma; ilgili planın başlangıç ilkesini oku.

## Bir haftayı hazırlarken

1. İlgili sınıfın yıllık hedeflerini, başlangıç ilkesini ve çalışma yöntemini oku.
2. `M2 — Hafta 01` gibi sınıf ve hafta başlığını bul. Ünite içindeki yerini, **Konu**, **Ana soru** ve **Temel kaynak** alanlarını birlikte oku. Yakın haftaları tekrar ve ilerleyiş açısından karşılaştır.
3. Yıllık gelişim haritasını, yıl sonu beklentisini ve anne-baba hakkı hattını ilgili haftayla birlikte değerlendir. Yıl sonu becerisini ilk haftanın ön bilgisi sayma.
4. [MUFREDAT-INSTRUCTIONS.md](MUFREDAT-INSTRUCTIONS.md) başındaki üretim akışını ve kategorinin kurallarını uygula. Kaynak pasajlarını özgün eserlerden ayrıca doğrula.

Her plan 9 ünite ve 36 hafta içerir. Haftalar 01–36 arasında kesintisiz numaralanır. Planlar ay belirtmez; uygulamadaki Eylül–Mayıs eşlemesi dörder haftalık takvim düzenidir, kaynak planın bilgisi olarak gösterilmez. Haftalık alanlara dönüşüm sırasında yeni kazanım veya doğrulanmamış pasaj/sayfa eklenmedi. Haftanın hedefi, ana soru ve yıllık hedeflerle ilişkisi üzerinden hazırlık kaydında belirlenir.

## Belge önceliği

- **Yıllık Markdown planı:** Konu, ana soru, kazanım/hedef, başlangıç ilkesi ve temel kaynak için yetkilidir.
- **MUFREDAT-INSTRUCTIONS.md:** Öğrenci metninin dili, anlatısı, kategori düzeni, alıntı ve dipnot sunumu, kaynak kontrolü ve editoryal kabul için yetkilidir.
- **Uygulamadaki `src/lib/data/curriculum-plans.ts`:** Planların öğrenci arayüzünde kullanılan temsilidir; planın tamamını içermez. Plan metninin yerine kullanılmaz.
- **Veritabanı:** Üretilmiş öğrenci içeriklerinin asıl kayıt yeridir. Plan dosyaları ders paketi veya yayın durumu değildir.

Kaynak DOCX belgelerindeki “Haftalık Ders Dosyaları Hazırlanırken”, “Haftalık Ders Dosyası Standardı”, “Kaynak Metin İlkesi” ve görsel/video önerileri, aktarımın eksiksiz olması için korundu. Bu eski sunum önerileri güncel yazım yönergesini değiştirmez: 15–20 dakika metin uzunluğu hedefi değildir; ayrı kaynak başlıkları, öğretmen notu, cevap anahtarı, toplu kaynakça veya her ders için görsel zorunluluğu doğurmaz. Özgün alıntı sadeleştirilmez; anlaşılır açıklama alıntının dışında verilir. Çözülmemiş konu/kaynak çelişkisi ayrıca bildirilir.

## Güncelleme ve dışa aktarım

Değişiklikleri önce ilgili Markdown planında yap. Konu, ana soru veya temel kaynak değişiyorsa uygulama temsilini de aynı değişiklikte karşılaştırıp güncelle. Markdown dosyaları Git üzerinden izlenir; farklı plan sürümlerini elle paralel düzenleme.

DOCX dosyaları, **1 Ekim 2026 Markdown geçişinin doğrulanmasının ardından kaldırıldı**. Özgün belgeler Git geçmişinden bulunabilir. Word veya PDF paylaşımı gerektiğinde güncel Markdown'dan dışa aktar; plan değişikliklerini Markdown üzerinde yap.

Geçişte altı DOCX belgesinin bütün metin paragrafları ve tablo hücreleri karşılaştırıldı. 54 ünite ve 216 haftanın konu, ana soru ve kaynak alanları aktarıldı; haftalık tablolar ayrı hafta başlıklarına dönüştürüldü. Diğer tablolar ve metinlerin sırası korundu. Sayfa düzeni, renk ve yazı tipi Markdown'ın parçası değildir.
