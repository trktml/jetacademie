# JetAcademie

![JetAcademie Önizleme](./jet-example.png)

JetAcademie, öğrencilerin aylık ve haftalık gelişim müfredatlarını sıralı olarak takip etmeleri ve kaydetmeleri için tasarlanmış, öncelikle mobil odaklı (mobile-first) bir Progresif Web Uygulamasıdır (PWA).

Dokümantasyon Türkçe olarak sürdürülmektedir. Web sitesi arayüzü ve öğrencilere yönelik müfredat mevcut dillerini korur.

## Ürün Yapısı

- `/`: Müfredat, Hedefler, Müfredat Kitapları ve Kampanyalar bölümlerine doğrudan yönlendiren karşılama (landing) sayfası.
- **Birleşik Yüzen Üst Çubuk (Topbar) & Haftalık Gezinme**: Yüzen bir ada kapsül araç çubuğu; sınıf seçimini (`1. Sınıf` – `6. Sınıf` açılır menüsü), tarih ve dönem navigasyonunu (kısa ay adlarıyla mobilde iki satırlı ay ızgarası (360 px altındaki ekranlarda üç satır) ve 2×2 hafta düğmeleri, masaüstünde tek satırlı aylar ve altında tarih aralıklı dört hafta düğmesi içeren kompakt açılır pencere ile `Ay Yıl · Hafta` menüsü) ve doğrudan parçalı görünüm geçişini (`Sıralı` | `Haftalık`) bir araya getirir. Sıralı modda, kapsülün tamamen sıralı ilerlemeye odaklanmasını sağlamak amacıyla dönem seçici gizlenir; burada ekstra devam modülleri kategori parkurlarının sonunda doğal olarak takip edilir. Haftalık modda kullanıcılar, sıralı tamamlama ilerlemelerini değiştirmeden yayınlanmış standart haftalardaki ana müfredata doğrudan erişir. Metinler ve videolar anında açılır; PDF'ler isteğe bağlı olarak yüklenir. Kategori kapsülü, haftanın bölümleri arasında geçiş yapar. Eksik yayınlanan içerikler açıkça gösterilir ve taslaklar gizli kalır. Görünüm modu ve sınıf başına dönemler yerel olarak hatırlanır; açık URL parametreleri önceliklidir (`/mufredat?sinif=2&gorunum=haftalik&ay=9&hafta=2`). Sayfa yenileme ve tarayıcı ileri/geri işlemleri seçili görünümü geri yükler.

- `/hedefler`: M1–M6 yıllık Markdown planlarına dayalı sınıf hedefleri, yıl sonu kazanımları ve öğrenci başarı ifadeleri. Her sınıf; çalışma metodunu ve 9 ünite, 36 haftalık konu dizilimini, ana soruları ve kaynakları içerir. Eylül–Mayıs etiketleri, mevcut ay başına dört hafta arayüz eşlemesini takip eder; kaynak planlar ayları belirtmez. Sınıf ve ay filtreleri, arama ve anne-babaya saygı vurguları korunmuştur.
- `/mufredat-kitaplari` (ve `/kitaplar`): Müfredat Kitapları ve Başvuru Eserleri kütüphanesi. 6 yıllık eğitim müfredatı boyunca işlenen temel ders kitaplarını, ilmihalleri, hadis ve siyer külliyatlarını, Risale-i Nur eserlerini ve dua kitaplarını içerir. Seviye filtreleme (Ortaokul M1–M3, Lise M4–M6, 1–6. Sınıflar), kategori sekmeleri, canlı arama ve ayrıntılı kitap inceleme modülü sunar.
- `/kampanyalar`: Dönemsel Kampanyalar ve Seferberlik Duyuruları bölümü. Resmi kampanya afişlerini (Risale-i Nur Külliyatı Okuma Kampanyası vb.), okuma seviyelerini (A, B, C Grupları), kitap listelerini ve teşvik ödüllerini görsel galeri formatında sergiler; tam ekran afiş incelemeyi ve yüksek çözünürlüklü indirmeleri destekler.
- Hesap: Gizlilik öncelikli anonim kimlik doğrulama. Kişisel veri (isim, e-posta) toplanmaz; kullanıcılar yalnızca bir parola belirler ve hesap silindiğinde boşlukları dolduracak şekilde sıralı kullanıcı adları (`user1`, `user2` vb.) otomatik atanır. Parola değişiklikleri ve hesap silme işlemleri mevcut parolayı gerektirir.
- Tema: Açık (light), koyu (dark) ve sistem tercihlerini destekleyen kalıcı anlamsal tema mimarisi.

Müfredat kayıtları, tüm 6 Belçika sınıfı için önceden yüklenmiş (seeded) olarak sınıf kapsamlı kimliklerle (`g1-` - `g6-`) PostgreSQL'de (`curriculum_entries` tablosu) saklanır; mevcut birinci sınıf kimlikleri ve ilerlemeleri otomatik olarak taşınır. Müfredat sayfası yalnızca seçilen sınıfı yükler; sınıf değiştirildiğinde `/api/curriculum?sinif=1..6` üzerinden o sınıf getirilir ve tarayıcıda önbelleğe alınır. Veritabanı ön yüklemesi ve kategori güncellik kontrolleri, her sayfa ziyaretinde değil, sunucu süreci başına bir kez çalışır.

- **Haftalık Konu**: 6 Belçika sınıfının tümü (1. Sınıf – 6. Sınıf) için pedagojik olarak yapılandırılmış derinlemesine inceleme ve tefekkür dersleri. Klasör kartları; dikkat çekici bir alt başlık/soru alıntısı, kavram rozetleri, tahmini okuma süresi ve 'Dersi Oku' butonu içerir. Tıklandığında, kart içi özel bir ders okuyucu (`KonuLessonReader`) akıcı bir şekilde genişler; alt başlıklar içeren zengin metin anlatımı, etkileşimli metin içi kavram ipuçları (tooltips), 'Düşünelim & Konuşalım' tefekkür soruları, haftalık pratik uygulama rehberi, altın vurgulu 'Bu Haftanın Özeti' kutusu ve camgöbeği (teal) temalı kavram sözlüğü sunar.
- **Hocaefendi Dinleme**: 6 Belçika sınıfının her biri için Fethullah Gülen Hocaefendi'nin gömülü YouTube sohbetlerini, pedagojik Türkçe özetlerini, duyarlı 16:9 oynatıcıyı ve basit Türkçe tanımların yanı sıra Felemenkçe (`NL:`) ve Fransızca (`FR:`) çeviriler sağlayan Belçikalı öğrencilere özel bir kelime rehberini (`Kelimeler`) içeren kapsamlı 48 haftalık video müfredatı (toplam 288 video kaydı).
- **Siyer**: Peygamber Efendimiz'in (sallallâhu aleyhi ve sellem) hayatı ve örnek ahlakına dair kapsamlı 55 haftalık müfredat: 1–3. Sınıflar Ortaokul programını, 4–6. Sınıflar ise Lise programını takip eder (48 standart hafta + 7 aşamalı ekstra sekme); somut olaylar ve haftalık pratik eylem hedefleri (_Bu hafta_ / _Hayata geçir_) içerir.
- **Sahabe**: Canlı tarihi olaylar, ahlaki kazanımlar ve pratik haftalık eylemler içeren kapsamlı 55 haftalık müfredat: 1–3. Sınıflar Ortaokul programını (_Sevgili Peygamberimizin Arkadaşları_ eserinden 55 hafta), 4–6. Sınıflar ise Lise programını (_Hayâtü’s-Sahâbe_ ve tarihi kaynaklardan 55 hafta) takip eder (48 standart hafta + 7 aşamalı ekstra sekme).
- **Ayet**: Arapça metin, Türkçe meal (Suat Yıldırım) ve seviyeye uyarlanmış açıklamalar içeren kapsamlı 55 haftalık Kur'an ayetleri müfredatı: 1–3. Sınıflar Ortaokul programını, 4–6. Sınıflar ise Lise programını takip eder (48 standart hafta + 7 aşamalı ekstra sekme).
- **Hadis**: Tam Arapça metin, sadeleştirilmiş Türkçe anlam ve doğrulanmış sahih kaynaklar (Sahîh-i Buhârî & Sahîh-i Müslim) içeren kapsamlı 55 haftalık temel hadis müfredatı: 1–3. Sınıflar Ortaokul programını, 4–6. Sınıflar ise Lise programını takip eder (48 standart hafta + 7 aşamalı ekstra sekme). Güncel müfredat yazım kuralları; harici doğrulama bağlantıları olmadan, eser, bölüm ve doğrulanmış hadis numarasını içeren kaynak dipnotları gerektirir.
- **İlmihal**: Erkek ve Kız parkurlarını içeren kapsamlı cinsiyete özel müfredat:
  - 1–3. Sınıflar (Ortaokul): Hem Erkek hem de Kız için 28 hafta.
  - 4–6. Sınıflar (Lise): Kızlar için 104 hafta (48 standart hafta + 56 aşamalı ekstra sekme) ve Erkekler için 98 hafta (48 standart hafta + 50 aşamalı ekstra sekme).
  - Kullanıcılar, İlmihal kategorisindeki parçalı anahtarı kullanarak tercih ettikleri parkuru seçer. Tercihler, kimliği doğrulanmış kullanıcılar için `user_preferences` veritabanı tablosunda kalıcı olarak saklanır. Anonim misafir olmayan ziyaretçilere, tek tıkla Misafir modu veya Hesap girişi/kaydı arasında seçim yapmaları için bir kimlik doğrulama modülü gösterilir ve misafir tercihleri giriş yapıldığında otomatik olarak hesaplarına aktarılır.
  - **Haftalık Bölünmüş PDF'ler & PDF Okuyucu**: Ana ders kitapları sistematik olarak ayrı haftalık PDF dosyalarına bölünmüştür (`/public/curriculum/ilmihal/{level}/{gender}/hafta-XX.pdf`). Uygulama içi minimalist PDF Okuyucu modülü (`PdfReaderModal`), canvas işleme, klavye ile gezinme, mobil dokunmatik kaydırma hareketleri ve yakınlaştırma kontrolleriyle sayfa sayfa okuma imkanı sunar. Kullanıcının mevcut okuma sayfası oturumlar arasında yerel olarak hatırlanır, böylece derse devam edildiğinde doğrudan kaldıkları sayfaya (`s. X`) dönülür.
- **Âdâb-ı Muâşeret**: Kapsamlı müfredat: 1–3. Sınıflar (Ortaokul), haftalık modüler PDF'lere (`/public/curriculum/adab/ortaokul/hafta-XX.pdf`) bölünmüş ve satır içi okuyucu ile görüntülenen hafta başına 3 görsel içeren, _Peygamber Efendimizin Sünnetleri - Gül Gibi Hayat_ (Muştu Yayınları) eserine dayalı 30 haftalık modüler bir müfredatı takip eder; 4–6. Sınıflar ise Lise programını takip eder (48 standart hafta + 6 aşamalı ekstra sekme).
- **Esmâü’l-Hüsnâ**: Doğrulanmış harekelere (teşkil) sahip belirgin Arapça hat başlıkları (`EsmaCardHeader`), Türkçe anlamlar ve kainattan ve yaratılıştan somut örnekler (kozmik ince ayar, biyoloji, ekosistemler ve günlük hayat için pratik çıkarımlar) sergileyen zenginleştirilmiş tefekküri açıklamalar içeren kapsamlı 55 haftalık ilahi isimler ve sıfatlar müfredatı: 1–3. Sınıflar somut doğa ve günlük yaşam gözlemleriyle Ortaokul programını takip ederken, 4–6. Sınıflar marifetullah, derin kozmik tefekkür ve karakter gelişimine odaklanan Lise programını takip eder (48 standart hafta + 7 aşamalı ekstra sekme).
- **Tefekkür**: 6 Belçika sınıfının tümü için 36 haftalık derinlemesine evren ve yaratılış tefekkürü müfredatı (`tefekkur`, kısa etiket `Tefekkür`, gök mavisi vurgu) (toplam 216 video kaydı). Yıllık planlardaki haftalık hedefler ve konu başlıklarıyla pedagojik olarak eşleştirilmiş `@kozmozvebiz` YouTube Shorts videolarını (her sınıfta 36 hafta boyunca sıfır video tekrarı ile), zengin Türkçe tefekküri değerlendirmeleri, odak sorularını ve duyarlı video oynatıcıları sunar.

## İlerleme & Müfredat Modeli

- **6 Belçika Sınıfı**: Belçika eğitim kademelerine (1. Sınıf – 6. Sınıf) göre uyarlanmıştır. `/mufredat` sayfasına ilk ziyaret bir sınıf seçilmesini ister; sonraki ziyaretler aynı tarayıcıda kaydedilen sınıftan devam eder. Doğrudan `?sinif=1..6` bağlantıları istenen sınıfı açar ve bu tercihi günceller. Kullanıcılar arşivin üzerindeki etiketli kontrolü veya kapsülün hızlı seçicisini kullanarak sınıf değiştirebilir.
- **Cinsiyete Özel Parkurlar**: İlmihal'de, Erkek ve Kız parkurları bağımsız sıralı ilerleme takibiyle yürütülür. Kullanıcılar, her iki parkurda da tamamlanan okumaları kaybetmeden aktif parkurlarını istedikleri zaman değiştirebilirler.
- **İlerleme Takibi**: İlerleme, kullanıcı başına `curriculum_progress` tablosunda (`userId`, `entryId`, `completedAt`) ve misafir depolama alanında (`jetacademie-guest`) kaydedilir. Kategori ve sınıf başına sıralı tamamlama zorunludur. Kimlik doğrulama sonrasında (giriş, kayıt veya çıkış), okuma ilerlemesi ve tercihler manuel sayfa yenilemesi gerektirmeden TanStack Query (`/api/curriculum/progress`) aracılığıyla reaktif olarak senkronize edilir. Bir içerik yanlışlıkla tamamlandıysa, kullanıcılar 7 saniyelik geri sayımlı geri alma butonuyla (aktif kartta ve kayan bildirimde eşzamanlı olarak bulunur) bunu hemen geri alabilir veya sıralı bütünlüğü korumak için Geçmiş üzerinden en son tamamlanan kaydı daha sonra geri alabilirler.

## Teknoloji Yığını

- Bun 1.3+
- Next.js 16 App Router & React 19
- Tailwind CSS v4
- Zustand v5
- TanStack Query v5
- Better-Auth & PostgreSQL (İzole testler için Bun SQLite)
- Zod v4
- Vaul bottom sheet

## Yerel Geliştirme

```bash
bun install
bun dev
```

### Müfredat Kaynak Arama Motoru (Yerel Yapay Zeka & Geliştirici Aracı)

Müfredat içeriği hazırlarken Risale-i Nur, Pırlanta ve `sources/` altındaki kaynaklardaki ilgili pasajları bulmak için yerel SQLite FTS5 motorunu kullanın. Yalnızca ilgili metnin getirilmesi bağlam kullanımını azaltır; arama sonuçları ve `--read` çıktısı, orijinal kaynakla doğrulamayı ikame etmez. Alıntıyı, bağlamı ve basıma özel sayfa referansını orijinaliyle karşılaştırın:

```bash
# sources/ dizinine eklenen yeni kaynakları indeksleyin:
bun run sources:index

# Terminalden arama yapın:
bun run sources:search -- -q "ihlas" -n 5
bun run sources:search -- --read "Lemalar" --page 160
```

### Müfredat Yazımı ve Kalite Kılavuzu

[MUFREDAT-INSTRUCTIONS.md](mufredat-docs/planlar/MUFREDAT-INSTRUCTIONS.md), Konu dersleri için ayrıntılı üretim iş akışını ve Konu ile dinleme içeriği için paylaşılan dil ve kaynak incelemelerini tanımlar. [Yıllık Markdown planları](mufredat-docs/planlar/README.md) konuları, ana soruları, kazanımları ve birincil kaynakları belirler; yazım kılavuzu ise öğrencilere yönelik dili, anlatımı ve sunumu yönetir. DOCX kopyaları kaldırılmıştır; güncel planlar Markdown olarak düzenlenir. Altı sınıfın tümü 1–4. haftalarda birincil kaynakları belirtilmemiş olarak bırakır: hazırlık belirli bir eser veya bölümle sınırlı değildir ve arayüz kaynak satırını göstermez. Bir kaynak kullanıldığında kaynak doğrulama ve alıntı kuralları geçerliliğini korur. Eski planlardan kalan zamanlama ve dosya düzeni önerileri, daha uzun metinler veya ayrı bir kaynakça gerektirmez.

Metinler hem bağımsız okumayı hem de bir rehberle tartışmayı desteklemelidir. M1–M6 boyunca açıklamalar sade kalırken, beklenen düşünce derinleşir. Okuma zevki ve devam etmek için somut bir neden; giriş, gelişme ve sonuçtan kanıtlarla birlikte zorunlu editoryal kriterlerdir. Konu dersleri; gelişmiş girişlere, birbiriyle bağlantılı sahnelere, amaçlı tekrarlara, yaratıcı başlıklandırmaya ve esnek kapanışlara izin verir. Kaynaklar anlatımın ihtiyaç duyduğu yerde devreye girer; her ayet Arapça metin → meal → dipnot sırasını korur. 1–4. haftalarda Konu dersleri, zorunlu ayet veya doğrudan kaynak alıntıları olmaksızın doğrulanmış hikayeler aracılığıyla eserleri tanıtabilir ve bir davranış görevi yerine bir keşif sorusuyla sona erebilir. Siyer, Sahabe, Ayet ve Hadis yalnızca Konu anlatımını desteklediklerinde dahil edilir; ayrı kartları veya zorunlu kotaları yoktur. Dinleme kendi sunumunu korur. Her Konu dersi en az bir anlamlı düşünme fırsatı sunar. Tekrarları önlemek için aynı hafta ve yakın haftalardaki kategorileri birlikte inceleyin. Kaynak ve editoryal incelemeleri gerçek öğrenci denemelerinden ayrı olarak raporlayın; rehberin değişmesi mevcut derslerin revize edildiği anlamına gelmez.

Her üretim görevi, kılavuzun başındaki tek iş akışını takip eder: **plan ve öğrenen profili → kaynak doğrulama → temsilci ders → yazım → bağımsız kaynak ve dil incelemeleri → düzeltmeler → yayın değerlendirmesi**. Bölüm 9 merak ve üslubu; bölüm 10 sınıf, ay ve dil beklentilerini; bölüm 11 düşünce çizgisini; bölüm 18 ise kayıt bazında kanıt kayıtlarını ve kabulü yönetir. Açıklamalar M1–M6 boyunca sade kalır; yaş, Türkçe okuma becerisini belirlemez veya daha uzun alıntıları haklı çıkarmaz. Dinleme kaydının kendi dili dahil olmak üzere her sınıfı ve kategoriyi ayrı ayrı inceleyin.

[Müfredat editör döngüsü](.agents/skills/mufredat-editor-dongusu/SKILL.md), her üretim ve revizyonda bu kontrolleri ayrıca istenmesini beklemeden yürütür: **metinden kanıtlı eleştiri → somut öneri → düzeltme → yeniden okuma → iyileşmeyi doğrulama**. Ayrıntılı yöntem ve bitirme ölçüsü yazım kılavuzunun 18.6 bölümündedir. İyi çalışan anlatı korunur; yalnız söyleyiş değiştirmek için sonsuz düzeltme yapılmaz. Kısa kullanım örnekleri: `6. haftanın Konu metinlerini üret.` veya `$mufredat-editor-dongusu ile 6. haftanın Konu taslaklarını olgunlaştır.` Her iki durumda da kapsam içindeki düzeltmeler aynı görevde tamamlanır. Açıkça yalnız rapor veya metne dokunmadan inceleme istenmişse metin değiştirilmez; yapılamayan zorunlu kontroller açıkça bildirilir ve yayın yetkisi ayrıca mevcut kullanıcı talebinden değerlendirilir.

Haftalık müfredat üretilirken her sınıfın (M1–M6) metni, ilgili yaş düzeyine özel **tamamen müstakil ve bağımsız** bir ders olarak kaleme alınır. Sınıflar arası metinler asla bir yazı dizisinin birbirini izleyen parçaları gibi kurgulanamaz (örn. 1. sınıfta 1. madde, 2. sınıfta 2. madde gibi bölümlendirmeler veya sınıflar arası ardışıklık atıfları kesinlikle yasaktır). 1. sınıftaki öğrenci (~12–13 yaş) ile 2. sınıftaki öğrenci (~13–14 yaş) farklı bireylerdir; her ders, o yaştaki öğrencinin önüne tek başına geldiğinde eksiksiz bir giriş, merak unsuru, derinlik ve kapanış bütünlüğü sunmalıdır.

Öğrencinin kaynak Risale veya Pırlanta bölümünü önceden okuduğu varsayılmaz. Konu dersi, kaynağın akışını yorumlamakla yetinmeden meseleyi, gerekli bağlamı ve seçilen gerekçeyi kendi içinde anlatır. Kaynak adı ve dipnot, eksik açıklamayı başka bir sayfaya erteleme yolu değildir; özgün alıntılar ise anlam desteğiyle korunur. [Yazım kılavuzunun](mufredat-docs/planlar/MUFREDAT-INSTRUCTIONS.md) 1. bölümündeki kaynak kapalı okuma kontrolü her derse uygulanır ve 18. bölümde kanıtıyla kaydedilir. Bu ölçü bütün sınıflar ve haftalar için geçerlidir.

Zengin Konu anlatımları durumu hayal etmek, her kaynağın katkısını anlamak ve gelişen düşünceyi takip etmek için yeterli bağlamı sağlar; kaynak sayıları ve metin uzunluğu kalite hedefi değildir. Sıcak, akıcı, anlaşılır imgelere sahip, ilgili yerlerde doğrulanmış mekan ve insan detayları içeren ve doğal cümle ritmine sahip bir nesir tercih edin. Sade dil edebi niteliklerini koruyabilir. Kısaltma yaparken gerekli bağlamı ve açıklamaları koruyun. Revizyon sırasında eski ve yeni metni karşılaştırın; etkili girişleri, atmosferi, insan emeğini, ritmi ve okumaya devam etme çağrılarını koruyun; desteklenmeyen ayrıntıları mümkün olduğunda doğrulanmış alternatiflerle düzeltin. Etkili bir anlatıyı kaybedip kuru bir özete dönüşen bir revizyon, bölüm 18 kapsamında daha fazla çalışma gerektirir.

Amaçlı tekrar; yeni olgular eklemeden anlamı pekiştirebilir, bir olayın ağırlığını iletebilir, ritim kurabilir veya giriş ile sonucu birbirine bağlayabilir; belirlenebilir bir amaca hizmet etmeyen tekrarları kaldırın. Ayet, hadis, siyer ve sahabe örnekleri her haftada isteğe bağlı kalırken, yıllık planın birincil kaynağı 1–4. haftalardan sonra zorunlu kalmaya devam eder. Hocaefendi'den bir pasaj araştırmak onu eklemeyi gerektirmez; yalnızca somut bir tamamlayıcı katkısı olan, doğrulanmış ve erişilebilir pasajları dahil edin. Ayrı dinleme gereksinimleri geçerliliğini korur. Bölüm 18'in çeşitlilik matrisi, destekleyici kaynak türlerini ve somut katkıları kaydeder. Her ünitenin sonunda, kaynak türlerini eşitlemeden veya her türün her hafta araştırılmasını gerektirmeden, anlamayı önemli ölçüde geliştirebilecek fırsatları gözden geçirin.

Her inceleme kaydı; metinden kanıtları, düzeltmeleri ve kılavuzun kabul sonuçlarından birini içerir: **uygun (`uygun`) / düzeltme gerekli (`düzeltme gerekli`) / değerlendirme eksik (`değerlendirme eksik`)**. Bilinen sorunlar ve eksik zorunlu incelemeler çözülene kadar içerik yayına hazır değildir. Öğrenci denemelerinin eksikliğini ayrı olarak bildirin; bu durum tek başına editoryal kabulü engellemez. Kayıtlar öğrencilere gösterilmez ve Git tarafından yok sayılan hazırlık dizininde tutulur. Veritabanındaki mevcut dersler, referans örnek olarak kullanılmadan önce güncel kılavuza göre yeniden değerlendirilmelidir; kılavuzun değişmesi bunları doğrulamaz veya revize etmez. CLI doğrulaması editoryal kabulü otomatik olarak gerçekleştirmez.

### 36 Haftalık Müfredat Yönetim Aracı (`curriculum` CLI)

Haftalık müfredat içeriği, yüzlerce statik TypeScript veya Markdown dosyası yerine doğrudan veritabanında yönetilir: iki kategori (`konu`, `hocaefendi-dinleme`) × altı sınıf = haftalık paket başına 12 kayıt. `adab-i-muaseret`, `ilmihal` ve `esma` kategorileri korunur. Kullanımdan kaldırılan ayet, hadis, siyer ve sahabe kategorileri ön yüklemeden, öğrenci/editör okumalarından, haftalık özetlerden, dışa aktarmalardan ve yayınlamadan hariç tutulur. Mevcut veritabanı kayıtları, editör revizyonları ve ilerlemeler referans amacıyla saklanmaya devam eder; içerik hiçbir zaman Konu'ya otomatik olarak eklenmez. Eski statik kategori modülleri ve bunların oluşturucusu kaldırılmıştır.

Öğrenci okuyucusu; ayet–meal sırası, kalın alıntılar, başlıklar ve dipnotlar dahil olmak üzere yazılmış Markdown yapısını korur. Konu ve dinleme içeriğinde, mevcut Türkçe sözlük bölümlerindeki (`Bu Hafta Tanıştığımız Kelimeler` veya `Kelime Açıklaması`) `**Kelime** — tanım` kayıtlarıyla eşleşen `<u>Kelime</u>` işaretleri; tıklama/dokunma, klavye odağı ve üzerine gelindiğinde anlamları gösteren butonlara dönüşür. Ek almış kelimeleri kaynaktaki yazımıyla tanımlayın. Diğer ham HTML etiketleri çalıştırılmaz. Bu Türkçe bölüm adları ve örnekler öğrenci içeriği formatını tanımlar; orijinal yazımlarını koruyun.

Tüm müfredat içeriğindeki hadis alıntıları ve hadise dayalı rivayetler dahil olmak üzere yalnızca sahih olduğu doğrulanmış hadisleri kullanın. Yalnızca hasen derecesinde olan rivayetler, zayıf veya uydurma rivayetler ve sahihlik durumu doğrulanamayan rivayetler hariç tutulur. Derecelendirme kaynağını ve konumunu özel inceleme kaydına kaydedin; çözülmemiş derecelendirme ihtilafları veya eksik doğrulama yayına hazır olmayı engeller. Konu veya diğer içerikler içindeki hadis alıntıları ve hadise dayalı rivayetler için muteber eseri, kitabı/bölümü ve doğrulanmış hadis numarasını dipnotta belirtin. Öğrenci metnine veya `resourceUrl` alanına Sunnah.com veya başka bir hadis doğrulama web sitesi eklemeyin. Araştırma bağlantıları yalnızca hazırlık kayıtlarında tutulabilir; kaynak doğrulama gereksinimleri için yazım kılavuzunun 19.8 bölümünü takip edin.

Sözlükler Türkçe okuma becerilerini destekler. Yalnızca Arapça metinde bulunan kelimeleri veya bunların Latin harfli transkripsiyonlarını dahil etmeyin; `niyet` gibi Arapça kökenli Türkçe kelimeler, Türkçe metinde yer aldıklarında dahil edilebilir. Paket kaydetme, editör kaydetme ve haftalık yayınlama işlemleri işaretli Türkçe kelimelerin ve tanımların eşleşmesini doğrular; dipnotlar bu eşleştirmeden hariç tutulur. Bu teknik kontroller, yaşa ve Türkçe yeterliliğine dayalı bir dil incelemesinin veya orijinal kaynakla doğrulamanın yerini almaz. Yazım kılavuzu 40 dakikayı bir metin uzunluğu hedefi olarak görmez; ilk dört hafta boyunca önceden bilgi sahibi olunduğunu varsaymadan basit açıklamalar kullanın ve orijinal alıntıları koruyun.

```bash
# 36 haftanın tamamının durumunu listeleyin (boş, taslak, yayında):
bun run curriculum list

# Yapay zeka tarafından oluşturulan haftalık bir paketi doğrulayın ve veritabanı taslağı olarak kaydedin:
bun run curriculum save --week 3 --file hafta-3.json

# Yalnız bir kategorinin altı sınıfını taslak kaydedin; diğer kategoriye dokunmaz:
bun run curriculum save --week 5 --category konu --file hafta-5-konu.json

# Taslak oluşturmak yerine doğrudan kaydedin ve yayınlayın:
bun run curriculum save --week 3 --file hafta-3.json --publish

# Taslak bir haftayı yayınlayın ve öğrencilerin erişimine açın:
bun run curriculum publish --week 3

# Gerektiğinde inceleme için haftalık kayıtları Markdown olarak dışa aktarın:
bun run curriculum export --week 3

# Bir haftanın iki içerik kategorisini silin (adab, ilmihal ve esma asla silinmez):
bun run curriculum delete --week 3

# Tam bir yerel anlık görüntü yedeği oluşturun (haftalık paketler, veritabanı tabloları JSON, SQL geri yükleme betiği, Markdown):
bun run curriculum backup

# Yerel yedekten önizleyin veya geri yükleyin (tek bir hafta için --week N veya tümü için parametresiz):
bun run curriculum restore --dry-run
bun run curriculum restore --week 1
bun run curriculum restore
```

Uygulama varsayılan olarak `http://localhost:3000` adresinde çalışır. Ortam değişkenleri için `.env.example` dosyasına bakın.

## Doğrulama

```bash
bun test
bun run lint
bun run format:check
bun run build
```

> **Not:** Birim testleri, izole edilmiş bellek içi test sürücüsüne (`:memory:`) karşı otomatik olarak çalışır ve harici bir PostgreSQL arka plan programı gerektirmeden testlerin 2 saniyenin altında tamamlanmasını sağlar.

## Veritabanı & Veri Migrasyonu

- **Birincil Veritabanı**: PostgreSQL 16 (`src/lib/db.ts` içindeki `pg.Pool` bağlantı havuzu aracılığıyla bağlanır).
- **Better-Auth**: Yerel PostgreSQL bağlantı havuzu bağdaştırıcısıyla yapılandırılmıştır.
- **Şema Başlatma**: `bun run db:migrate`, uygulamanın `SCHEMA_SQL` dosyasındaki eksik tabloları ve indeksleri oluşturur ve veritabanı hatalarında çıkar. Mevcut sütunlar değiştirilmez; şema değişiklikleri açık migrasyon SQL'i gerektirir. Eski Better Auth CLI bağımlılığı yükleme ağacından kaldırılmıştır.
- **SQLite'tan PostgreSQL'e Migrasyon**:
  Mevcut bir `auth.sqlite` veritabanından geçiş yapılıyorsa:
  ```bash
  DATABASE_URL="postgres://postgres:password@localhost:5432/jetacademie" bun scripts/migrate-sqlite-to-pg.ts
  ```
- **Yedekleme & Geri Yükleme**:
  ```bash
  ./scripts/backup-db.sh
  ./scripts/restore-db.sh ./backups/jetacademie_backup_YYYYMMDD_HHMMSS.sql
  ```
- **Müfredat Temizleme**:
  PostgreSQL'den Âdâb, İlmihal ve Esmâ dışındaki tüm kategorileri kaldırmak ve otomatik yeniden yüklemeyi önlemek için:
  ```bash
  bun run db:clean-curriculum
  ```

## Uzaktan Dağıtım (Tailscale & Docker)

Ayrıntılı Tailscale talimatları için [docs/tailscale.md](docs/tailscale.md) dosyasına bakın.

### 1. Tek Komutla Tailscale Dağıtımı

Yerel terminalinizden Tailscale uzak sunucunuza (`100.80.51.7`) doğrudan dağıtım yapın:

```bash
./scripts/deploy.sh root@100.80.51.7
# Veya deploy host ortam değişkeni ayarlanmışsa:
./scripts/deploy.sh
```

> **Port & IP İzolasyonu (Yüksek Güvenlik)**:
>
> - PostgreSQL ana bilgisayar portu, 5432 portunda çalışan mevcut herhangi bir PostgreSQL örneğiyle çakışmayı önlemek için `5433`'e eşlenmiştir (`PG_HOST_PORT=5433`).
> - PostgreSQL, yalnızca yetkili Tailnet cihazlarının bağlanabilmesi için tüm genel WAN erişimini engelleyerek kesin olarak Tailscale IP'si `100.80.51.7`'ye bağlanır (`PG_BIND_IP=100.80.51.7`).
> - Web uygulaması ana bilgisayar portu varsayılan olarak `3001`'dir ve Tailscale Serve veya yerel bir ters proxy için geri döngüye (`HOST_BIND_IP=127.0.0.1`) bağlanır.

### 2. Tailscale Serve (Otomatik HTTPS)

Let's Encrypt sertifikalarıyla anında HTTPS'yi etkinleştirmek için uzak sunucunuzda çalıştırın:

```bash
tailscale serve --bg 3001
```

Uygulamanız `https://<server-name>.<tailnet-name>.ts.net` adresinde yayında olacaktır.

### 3. Dokploy / Docker Compose Yönergeleri

- `docker-compose.yml` hem `db` (kalıcı `pgdata` hacmine sahip Postgres 16 Alpine) hem de `web` (durumsuz Next.js 16 bağımsız konteyner) sağlar.
- Sağlık kontrolleri (health checks), `web`'in başlamadan önce `db`'nin hazır olmasını beklemesini sağlar.
- Ortam değişkenleri:
  - `POSTGRES_USER`: `jetacademie`
  - `POSTGRES_PASSWORD`: Güçlü parola
  - `POSTGRES_DB`: `jetacademie`
  - `DATABASE_URL`: `postgres://jetacademie:<pass>@db:5432/jetacademie`
  - `BETTER_AUTH_SECRET`: Rastgele 32+ karakterli gizli anahtar (`openssl rand -base64 32`)
  - `BETTER_AUTH_URL`: Kurallı URL (örn. `https://<tailnet>.ts.net` veya alan adı)
  - `NEXT_PUBLIC_APP_URL`: Kurallı URL

### Güvenlik Ayarları

- Kullanıcılar oturum açmadan önce `BETTER_AUTH_URL` ve `NEXT_PUBLIC_APP_URL` değişkenlerini aynı harici HTTPS kaynağına ayarlayın. `BETTER_AUTH_SECRET` değerini en az 32 rastgele karakter olarak tutun; üretim ortamı eksik veya örnek bir anahtarı reddeder.
- Ters proxy arkasında genel `Host` değerini koruyun veya `X-Forwarded-Host` ve `X-Forwarded-Proto` başlıklarını gönderin. Hesap işlemleri, tarayıcının `Origin` değerini bu genel istek kaynağına karşı doğrular ve kimlik doğrulama istemcisi mevcut tarayıcı kaynağını kullanır. Genel adres bu olduğunda kurallı URL'leri `https://jetacademie.be` olarak ayarlayın.
- Anonim giriş ve kayıt uç noktaları yalnızca aynı kaynaktan (same-origin) gelen JSON isteklerini kabul eder. Yeni parolalar en az 4, en fazla 128 karaktere sahip olmalıdır. Better Auth'un istek hızı sınırının yanı sıra, mevcut her hesap için oturum açma denemeleri tüm uygulama örneklerinde 15 dakikada 5 ile sınırlıdır. Parola değişiklikleri ve hesap silme işlemleri mevcut parolayı gerektirir. Parola değişikliği diğer oturumları geçersiz kılar.
- Web portu varsayılan olarak geri döngüye (loopback) bağlanır. Uzak bir ters proxy farklı bir bağlama adresine ihtiyaç duyuyorsa `HOST_BIND_IP` değerini açıkça ayarlayın ve erişimi ağ sınırında kısıtlayın.
- Kimlik doğrulama ve hesap yanıtları `no-store` olarak işaretlenir. Temel tarayıcı güvenlik başlıkları çerçevelemeyi (framing), nesne gömmeyi, temel URL değişikliklerini ve form gönderimlerini kısıtlar.

## Özel Müfredat Editörü

`/duzenle` adresini manuel olarak açın; uygulama menüsünde bağlantısı yoktur. Hesabı, oturum çerezi ve tabloları Better Auth kullanıcılarından ayrıdır. Tek yetkisi müfredat içeriği eklemek ve düzenlemektir.

```bash
# Tek hesabı oluşturun; rastgele parolayı terminalde bir kez gösterir.
bun run editor:setup

# Eski oturumları geçersiz kılarak parolayı ve oturum sırrını gerektiğinde yenileyin.
bun run editor:setup -- --rotate
```

Oluşturulan kullanıcı adı, scrypt parola hash'i ve ayrı oturum sırrı Git tarafından yok sayılan `.env` dosyasına yazılır. Parolanın kendisi orada saklanmaz. Bu ayarları değiştirdikten sonra geliştirme sunucusunu yeniden başlatın. `CURRICULUM_ADMIN_USERNAME`, `CURRICULUM_ADMIN_PASSWORD_HASH` ve `CURRICULUM_ADMIN_SECRET` değerlerini üretim ortamına güvenli bir şekilde aktarın; `CURRICULUM_ADMIN_ORIGIN` değerini harici HTTPS kaynağına ayarlayın (örneğin, sonunda eğik çizgi olmadan `https://jetacademie.be`). Docker Compose bu değişkenleri web servisine iletir. Eksik veya geçersiz yapılandırma yönetici erişimini devre dışı bırakır. Dağıtım betiği yerel `.env` dosyasını uzak sunucuya kopyalamaz; bu ayarları o sunucuda ayrıca yapılandırın.

Sınıf, ay, hafta ve kategori seçicileri boş ve dolu kayıtları gösterir. İlmihal içeriği erkek ve kız parkurlarına ayrılmıştır. Mevcut haftalar düzenlenebilir ve boş haftalar doldurulabilir; ekstra haftalar 48 standart haftanın tamamı doldurulduktan sonra kullanılabilir hale gelir. UIW Markdown editörü biçimlendirme araçları sağlar; önizlemesi ve öğrenci ekranı aynı `react-markdown`, `remark-gfm` ve `rehype-sanitize` bileşenini paylaşır. Ham HTML, görseller ve çalıştırılabilir bağlantılar işlenmez. Dipnot numaraları ve geri dönüş bağlantıları aynı kart içindeki benzersiz hedeflere işaret eder; harici kaynak bağlantıları yeni bir sekmede açılır. Arapça paragraflar metin yönünü otomatik olarak belirler. Kaydetme işlemi içeriği anında yayınlar; gezinme kaydedilmemiş değişiklikler konusunda uyarır.

Düzenlemeler `curriculum_editor_content` tablosunda sürümlendirilir ve temel müfredata uygulanır. Bu, mevcut kayıt kimliklerini ve öğrenci ilerlemesini korurken tohumlama (seed) işlemlerinin editör değişikliklerinin üzerine yazmasını engeller. Güncel olmayan bir sürümü kaydetmek 409 yanıtı döndürür; yeniden denemeden önce güncel içeriği yükleyin. Yedeklemeler editör içerik tablosunu içermelidir.

Güvenlik: Veritabanında yalnızca sekiz saatlik rastgele oturum belirtecinin SHA-256 hash'i saklanır. Üretim ortamında çerez `__Host-` önekini, `HttpOnly`, `Secure` ve `SameSite=Strict` özelliklerini kullanır. Her yazma işlemi ayrı bir yönetici oturumu, sabit bir kaynak ve oturuma bağlı bir CSRF belirteci gerektirir. Farklı kullanıcı adları arasındaki denemeler de dahil olmak üzere oturum açma denemeleri, tüm uygulama örneklerinde 15 dakikada 10 ile sınırlıdır. İstek akışı sırasında JSON boyutu kontrol edilir; sorgular parametrelendirilir. Yönetici sayfası ve API önbelleğe alınmaz ve indekslemeden hariç tutulur. Gizli bir URL bir güvenlik sınırı değildir; her API isteği yetkilendirmeyi zorunlu kılar.

Dinleme kelime kartları, ayrı Fransızca ve Felemenkçe satırlarının üzerinde bir Türkçe kelime ve tanım gösterir. Yeni veritabanı içeriği `## Kelimeler` başlığını, üst düzey `- **kelime**: Türkçe tanım` ve ardından girintili `- FR: **kelime**: Fransızca tanım` ile `- NL: **kelime**: Felemenkçe tanım` formatını kullanır. Eski satır içi çeviriler desteklenmeye devam eder. Üretim ve dil inceleme gereksinimleri müfredat yazım kılavuzunda tutulur.
