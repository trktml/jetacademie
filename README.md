# JetAcademie

JetAcademie, Belçika'daki altı ortaöğretim düzeyi (M1–M6) için manevi gelişim müfredatı sunan, mobil öncelikli bir web uygulamasıdır. Öğrenciler dersleri okuyabilir, sohbetleri izleyebilir ve ilerlemelerini misafir olarak ya da hesaplarıyla takip edebilir.

![JetAcademie ana sayfası](./jet-example.png)

## Uygulama bölümleri

| Adres                 | İçerik                                                                                                          |
| --------------------- | --------------------------------------------------------------------------------------------------------------- |
| `/`                   | Müfredat, Hedefler, Müfredat Kitapları ve Kampanyalar bölümlerine açılan ana sayfa.                             |
| `/mufredat`           | Sınıf seçimi, sıralı ders takibi ve haftalık müfredat.                                                          |
| `/hedefler`           | Sınıf hedefleri, yıl sonu kazanımları ve yıllık planlardaki haftalık konular.                                   |
| `/mufredat-kitaplari` | Seviyeye ve kategoriye göre filtrelenebilen ders kitapları ve başvuru eserleri. `/kitaplar` bu adrese yönlenir. |
| `/kampanyalar`        | Kampanya afişleri, okuma grupları ve kitap listeleri.                                                           |
| `/duzenle`            | Ayrı oturum gerektiren müfredat editörü. Ana menüde bağlantısı yoktur.                                          |

Müfredatta sınıf seçimi tarayıcıda hatırlanır. **Sıralı** görünümde dersler sınıf ve kategori bazında sırayla tamamlanır. **Haftalık** görünümde öğrenciler seçilen dönemin yayımlanmış derslerini ilerlemelerini değiştirmeden açabilir. Ek haftalar ilgili kategorinin sıralı akışında yer alır. Örnek doğrudan bağlantı: `/mufredat?sinif=2&gorunum=haftalik&ay=9&hafta=2`.

Kayıtta ad ve e-posta istenmez. Öğrenci bir parola belirler ve uygulama `user1` biçiminde bir kullanıcı adı atar. Hesap ilerlemesi PostgreSQL'de, misafir ilerlemesi ve tercihleri tarayıcıda saklanır. Girişte misafir verileri hesaba aktarılır. İlmihal parkurlarının ilerlemesi ayrı ayrı kaydedilir. Yanlışlıkla tamamlanan ders hemen geri alınabilir; Geçmiş ekranından da ilgili sıradaki en son ders geri alınabilir.

## Güncel müfredat kategorileri

| Kategori              | Kimlik               | Öğrencinin gördüğü içerik                                                                                                                         |
| --------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Haftanın Konusu       | `konu`               | Sınıfa özel Markdown dersleri, metin içi kelime açıklamaları ve dipnotlar.                                                                        |
| Hocaefendi Sohbetleri | `hocaefendi-dinleme` | YouTube sohbetleri, Türkçe açıklamalar ve Türkçe, Fransızca, Felemenkçe kelime kartları.                                                          |
| İlmihal               | `ilmihal`            | Bayan ve Erkek parkurları, ders içinde açılan haftalık PDF'ler. Paketle gelen parkurlar M1–M3'te 28 hafta, M4–M6'da sırasıyla 104 ve 98 haftadır. |
| Adab-ı Muaşeret       | `adab-i-muaseret`    | M1–M3'te haftalık PDF'ler (30 hafta), M4–M6'da metin dersleri (54 hafta).                                                                         |
| Esmâü'l-Hüsnâ         | `esma`               | Arapça isimler, Türkçe anlamlar ve sınıf düzeyine uygun açıklamalar (55 hafta).                                                                   |
| Kâinat ve Tefekkür    | `tefekkur`           | Her sınıf için 36 haftalık kısa video ve tefekkür metni.                                                                                          |

**Siyer, Sahabe, Ayet ve Hadis artık ayrı müfredat kategorileri değildir.** Doğrulanmış olay ve pasajlar, haftanın Konu anlatımını desteklediği yerde kullanılır. Eski kayıtlar öğrenci ve editör kataloglarında görünmez ve Konu derslerine otomatik aktarılmaz.

[Yıllık planlar](mufredat-docs/planlar/README.md) her sınıf için dokuz ünite ve **36 hafta** içerir. Uygulama bunları Eylül–Mayıs arasında ayda dört haftaya eşler. Konu ve Dinleme paketlerinin yayın akışı bu 36 haftayı kapsar. Arşiv ve editördeki genel takvim ise **48 standart haftayı** destekler; bazı kategorilerde bunları ek haftalar izler.

## Yerel geliştirme

Gereksinimler: `package.json` ve CI'da sabitlenen **Bun 1.4.4** ile uygulamanın erişebileceği bir **PostgreSQL 16** veritabanı.

```bash
bun install --frozen-lockfile
test -f .env || cp .env.example .env
```

`.env` dosyasına yerel PostgreSQL adresinizi `DATABASE_URL` olarak yazın. `BETTER_AUTH_URL` ve `NEXT_PUBLIC_APP_URL` için `http://localhost:3000` değerini kullanın. Ayarların tamamı için [`.env.example`](.env.example) dosyasına bakın.

Yerel PostgreSQL kurulumunuz yoksa aşağıdaki Compose komutuyla yalnızca veritabanını başlatın. `.env` içindeki `POSTGRES_USER`, `POSTGRES_PASSWORD` ve `POSTGRES_DB` değerlerini yerel `DATABASE_URL` ile eşleştirin. Örneğin varsayılan kullanıcı ve veritabanı adıyla bağlantı biçimi `postgres://jetacademie:PAROLA@127.0.0.1:5433/jetacademie` olur. `PAROLA` yerine `POSTGRES_PASSWORD` değerini URL kodlamasıyla yazın.

```bash
PG_BIND_IP=127.0.0.1 docker compose up -d --wait db
```

```bash
bun dev
```

Uygulama `http://localhost:3000` adresinde açılır. Sunucu başlangıcında veritabanı şeması hazırlanır; şemayı ayrı olarak hazırlamak için `bun run db:migrate` kullanılabilir. `dev` ve `build`, PDF.js'in worker, CMap, yazı tipi ve WASM dosyalarını kilitli paket sürümünden `public/pdfjs/` altına hazırlar.

## Müfredat hazırlama ve yayınlama

Yıllık Markdown planları konu, ana soru, kazanım ve birincil kaynak için esas alınır. [Müfredat yazım kılavuzu](mufredat-docs/planlar/MUFREDAT-INSTRUCTIONS.md) anlatımı, kaynak doğrulamayı, dipnotları ve editoryal kabulü belirler. Her sınıfın dersi, öğrenci başka bir sınıfın dersini veya kaynak kitabı okumadan anlayabileceği bir bütün olmalıdır. Kaynak ve dil incelemesini ayrı yürütün; [müfredat editör döngüsünü](.agents/skills/mufredat-editor-dongusu/SKILL.md) uygulayın. CLI doğrulaması editoryal incelemenin yerini almaz.

İlk dört hafta tanışma ve meraka ayrılır; bu haftalar için planlarda birincil kaynak belirlenmemiştir. Kullanılan alıntılar yine doğrulanır. Beşinci haftadan itibaren planın birincil kaynağı esas alınır. Dinleme içeriğinin üç dilli `Kelimeler` biçimi ve kaynak kuralları yazım kılavuzunda tanımlanır.

### Yerel kaynak arama

`sources/` altındaki Risale-i Nur, Pırlanta ve diğer kaynaklar yerel SQLite FTS5 dizininde aranabilir. İndeksleme için Python 3 ve `pypdf` gerekir.

```bash
bun run sources:index
bun run sources:search -- -q "ihlas" -n 5
bun run sources:search -- -q "ihlas ve samimiyet" --exact
bun run sources:search -- --read "Lemalar" --page 160
```

Normal aramada tüm terimler birlikte bulunamazsa motor genişletilmiş sonuçları ayrıca etiketler. `--exact` ile yapılan tam ifade araması genişletilmez. Arama sonucunu, alıntıyı ve basıma ait sayfa bilgisini özgün kaynakla karşılaştırın. Ayrıntılar için [kaynak arama rehberine](.agents/skills/mufredat-kaynak-arama/SKILL.md) bakın.

### Haftalık paketler

Öğrenciye sunulan içeriğin ve yayın durumunun kaynağı veritabanıdır. Boş bir veritabanına uygulamayla gelen başlangıç içerikleri, Hocaefendi Sohbetleri kayıtları dahil, yüklenir. Yeni Konu ve Dinleme paketleri veritabanına kaydedilir; öğrenci derslerini statik kod ya da Markdown dosyası olarak Git'e eklemeyin.

Bir tam paket, `weekNumber` ve `entries` alanlarıyla altı sınıfın her biri için bir Konu ve bir Dinleme kaydı içerir: **toplam 12 kayıt**. Kayıt kimlikleri `g2-konu-eylul-1` örneğindeki biçimi izler. [Paket şeması](src/lib/validations/curriculum-entry.ts) alanları, kimlikleri ve içerik doğrulamasını tanımlar. `save` varsayılan olarak taslak kaydeder; öğrenci ekranında taslaklar görünmez.

```bash
# Boş, taslak, kısmi ve yayındaki haftaları listeleyin.
bun run curriculum list

# Tam bir paketi ya da yalnızca bir kategorinin altı kaydını taslak kaydedin.
bun run curriculum save --week 3 --file hafta-3.json
bun run curriculum save --week 5 --category konu --file hafta-5-konu.json

# İncelenen haftanın taslaklarını yayınlayın.
bun run curriculum publish --week 3

# İnceleme için haftayı sınıf başına Markdown olarak dışa aktarın.
bun run curriculum export --week 3
```

`publish`, taslakları açmadan önce altı sınıfın her birinde tam bir Konu ve bir Dinleme kaydı bulunduğunu doğrular. Daha önce yayına alınan kayıtlar da sayılır. `--publish` seçeneğiyle doğrudan yayınlama yalnızca tam paket kaydında kullanılabilir. `export`, seçili haftanın taslaklarını ve diğer aktif kategorilerin kayıtlarını da içerebilir.

`bun run curriculum delete --week 3` yalnızca belirtilen standart haftanın Konu ve Dinleme kayıtlarını, ilgili editör kayıtlarını ve bunlara bağlı öğrenci ilerlemesini siler. Âdâb, İlmihal, Esmâ ve Tefekkür bu komutun kapsamı dışındadır.

### Müfredat editörü

`bun run editor:setup` ile editör hesabını oluşturun ve sunucuyu yeniden başlatın. Komut parolayı terminalde bir kez gösterir; `.env` dosyasında kullanıcı adı, parola özeti ve oturum sırrı tutulur. `bun run editor:setup -- --rotate` parolayı ve sırrı yenileyip eski editör oturumlarını geçersiz kılar.

`/duzenle` ekranında sınıf, hafta ve kategori seçerek Markdown içeriğini önizleyebilir ve düzenleyebilirsiniz. Bir taslağı düzenlemek onu taslak olarak bırakır; yayındaki kaydın düzenlemesi öğrenciye yansır. Editör değişiklikleri `curriculum_editor_content` tablosunda sürümlenir. Başka bir sekme veya paket aktarımı aynı kaydı değiştirdiyse kayıt isteği `409` döner; yeniden düzenlemeden önce güncel sürümü yükleyin.

Editör oturumu öğrenci hesaplarından ayrıdır. Üretimde `CURRICULUM_ADMIN_USERNAME`, `CURRICULUM_ADMIN_PASSWORD_HASH` ve `CURRICULUM_ADMIN_SECRET` değerlerini güvenli biçimde tanımlayın. `CURRICULUM_ADMIN_ORIGIN` değerine editöre erişilen tam HTTPS kaynağını, sonunda eğik çizgi olmadan yazın. Geçerli kimlik bilgileri sağlanmazsa editör erişimi kapalıdır.

## Doğrulama ve mimari

```bash
bun run check
```

Bu komut `bun run test`, `bun run lint`, `bun run format:check` ve `bun run build` adımlarını çalıştırır. Birim testleri bellek içi SQLite kullanır. PostgreSQL'e özgü işlem ve eşzamanlılık kontrolleri için ayrı bir test veritabanında `bun run test:postgres` çalıştırın ve bağlantıyı `TEST_DATABASE_URL` ile verin. [GitHub Actions](.github/workflows/quality.yml) bunlara ek olarak bağımlılıkları ve Git geçmişini tarar.

- **Arayüz:** Next.js 16 App Router, React 19, Tailwind CSS 4, Vaul ve PDF.js.
- **Durum yönetimi:** TanStack Query sunucu verisini, Zustand tarayıcı tercihlerini ve misafir ilerlemesini yönetir.
- **Sunucu:** Better Auth, PostgreSQL (`pg.Pool`) ve Zod. Şema ve başlangıç `src/lib/database-schema.ts` ile `src/instrumentation.ts` içinde; müfredat kataloğu `src/lib/curriculum-db.ts`, paket işlemleri `src/lib/curriculum/weeks.ts` içindedir.

Ayrıntılar için [mimari ve güvenlik incelemesine](docs/mimari-guvenlik-incelemesi.md) bakın.

## Dağıtım ve yedekler

[Docker Compose](docker-compose.yml), kalıcı `pgdata` hacmiyle PostgreSQL 16 ve bağımsız Next.js web servisini çalıştırır. Üretim derlemesi için veritabanı veya sır gerekmez; sunucu başlangıcı için PostgreSQL bağlantısı, rastgele bir `BETTER_AUTH_SECRET` ve aynı HTTPS kaynağını gösteren `BETTER_AUTH_URL` ile `NEXT_PUBLIC_APP_URL` gerekir. Ek erişim adresleri `AUTH_TRUSTED_ORIGINS` ile tanımlanır.

Web servisi varsayılan olarak `127.0.0.1:3001` üzerinden Tailscale Serve veya yerel ters proxy'ye açılır. Dokploy web servisine iç ağdan bağlanabilir. PostgreSQL genel internete (`0.0.0.0`) açılmaz; varsayılan olarak yalnızca Tailscale IP adresinde (`${PG_BIND_IP:-100.80.51.7}:5433`) dinler. `scripts/deploy.sh` yalnızca Git'teki `HEAD` sürümünü gönderir; yerel `.env` dosyasını kopyalamaz. Kurulum ve PostgreSQL rolleri için [Tailscale ve Docker dağıtım kılavuzuna](docs/tailscale.md) bakın.

- **Haftalık müfredat:** `bun run curriculum backup` haftalık paketleri, tablo anlık görüntülerini, Markdown çıktılarını ve SQL betiğini yerel olarak saklar. `bun run curriculum restore --dry-run` ile önizleyin. CLI geri yüklemesi seçili standart Konu ve Dinleme haftalarını editör revizyonlarıyla geri yükler; `--week N` ile tek hafta seçilebilir.
- **Tam PostgreSQL yedeği:** `scripts/backup-db.sh` ve `scripts/restore-db.sh` kullanılır. Uygulama verilerini boş bir hedef veritabanına aktarmak için [tam yedek yönergesini](docs/tailscale.md#yedekleme) izleyin. Eski bir `auth.sqlite` veritabanından geçiş için `scripts/migrate-sqlite-to-pg.ts` bulunur.
