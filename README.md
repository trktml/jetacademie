# JetAcademie

![JetAcademie Preview](./jet-example.png)

JetAcademie is a mobile-first Progressive Web Application (PWA) designed for students to sequentially follow and track their monthly and weekly development curriculum.

## Product Structure

- `/`: Landing page leading directly to Curriculum, Targets, Curriculum Books, and Campaigns sections.
- `/mufredat`: First-time visitors choose one of six grades from a dedicated selection screen. The choice is remembered in that browser, while `?sinif=1..6` links open a grade directly. The archive shows the current grade and a visible change control above its 9-category capsule navigation (sticky on mobile, fixed on the left on desktop with an integrated quick selector). Categories are listed sequentially with minimalist gradient dividers and comfortable vertical breathing room. Files employ a physical folder metaphor with staggered Manila tabs. Locked files cannot be accessed until preceding entries in that category are completed. Beyond the standard 48-week curriculum (12 months × 4 weeks), extra content continues directly as consecutive folder tabs in the same stack (`Extra 1 · Add-on`, `Extra 2`, etc.), unlocking progressively without separate isolated sections. When marking any file as read, the view smoothly scrolls to the top of that category to bring the next unlocked content into focus, and an immediate 7-second countdown undo action ('Undo') appears synchronously both on the active card and in the bottom snackbar toast, enabling rapid one-tap reversals without navigating away. Furthermore, the header bar includes a counter-enabled 'History' button that transitions to a focused, dedicated history space isolated from other categories. Inside, a quick jump selector with a 'Go' button, period shortcut chips ('Newest', 'Oldest', Month pills, 'Extra'), and spotlight card animations enable seamless travel across past completed readings, with support for reverting accidentally completed entries on the latest file.
- `/hedefler`: M1–M6 yıllık Word planlarına dayanan sınıf hedefleri, yıl sonu kazanımları ve öğrenci başarı cümleleri. Her sınıf için çalışma yöntemi ile 9 ünite / 36 haftalık konu, ana soru ve kaynak akışı gösterilir. Eylül–Mayıs etiketleri mevcut dörder haftalık arayüz eşlemesidir; kaynak planlarda ay belirtilmez. Sınıf ve ay filtreleri, arama ve anne-baba hakkı vurguları korunur.
- `/mufredat-kitaplari` (and `/kitaplar`): Curriculum Books and Reference Works library. Contains core textbooks, fiqh manuals (ilmihal), hadith and sirah compendiums, Risale-i Nur collections, and prayer books studied across the 6-year educational curriculum. Features level filtering (Middle School M1–M3, High School M4–M6, Grades 1–6), category tabs, live search, and a detailed book view modal.
- `/kampanyalar`: Seasonal Campaigns and Mobilization Announcements section. Displays official campaign posters (Risale-i Nur Works Reading Campaign, etc.), reading tiers (Groups A, B, C), book lists, and incentive rewards in a visual gallery format; supports full-screen poster inspection and high-resolution downloads.
- Account: Privacy-first anonymous authentication. No personal data (name, email) is collected; users only choose a password, and sequential usernames (`user1`, `user2`, etc.) are assigned automatically with gap-filling on account deletion. Password changes and account deletion require the current password.
- Theme: Persistent semantic theme architecture supporting light, dark, and system preferences.

Curriculum entries are stored in PostgreSQL (`curriculum_entries` table, seeded across all 6 Belgium grades) with grade-scoped IDs (`g1-` through `g6-`); existing first-grade IDs and their progress are migrated automatically. The curriculum page loads only the selected grade; switching grades fetches that grade through `/api/curriculum?sinif=1..6` and caches it in the browser. The database seed and category freshness checks run once per server process, rather than on every page visit.

- **Ayet**: Comprehensive 55-week Quranic verses curriculum with Arabic text, Turkish translation (Suat Yıldırım), and level-adapted explanations: Grades 1–3 follow the Middle School program, while Grades 4–6 follow the High School program (48 standard weeks + 7 progressive extra tabs).
- **Hadis**: Comprehensive 55-week core hadith curriculum with full Arabic matn, simplified Turkish meaning, verified authentic sources (Sahîh-i Buhârî & Sahîh-i Müslim), and direct one-click verification links (`sunnah.com`): Grades 1–3 follow the Middle School program, while Grades 4–6 follow the High School program (48 standard weeks + 7 progressive extra tabs).
- **Efendimiz**: Comprehensive 55-week life and exemplary morals curriculum of the Prophet Muhammad (pbuh): Grades 1–3 follow the Middle School program, while Grades 4–6 follow the High School program (48 standard weeks + 7 progressive extra tabs) featuring concrete incidents and weekly practical action targets (_This week_ / _Put into practice_).
- **Sahabe**: Comprehensive 55-week curriculum with vivid historical incidents, ethical takeaways, and practical weekly actions: Grades 1–3 follow the Middle School program (55 weeks from _Sevgili Peygamberimizin Arkadaşları_), while Grades 4–6 follow the High School program (55 weeks from _Hayâtü’s-Sahâbe_ and historical records) (48 standard weeks + 7 progressive extra tabs).
- **Esmâü'l-Hüsnâ**: Comprehensive 55-week divine names and attributes curriculum with pedagogical reflections and moral applications: Grades 1–3 follow the Middle School program with relatable life examples, while Grades 4–6 follow the High School program focusing on marifetullah (knowledge of God), contemplation, and character development (48 standard weeks + 7 progressive extra tabs).
- **Adab-ı Muaşeret**: Comprehensive 54-week etiquette and manners curriculum: Grades 1–3 follow the Middle School program, while Grades 4–6 follow the High School program (48 standard weeks + 6 progressive extra tabs).
- **İlmihal**: Comprehensive gender-specific curriculum with Male and Female tracks:
  - Grades 1–3 (Middle School): 28 weeks for both Male and Female.
  - Grades 4–6 (High School): 104 weeks for Female (48 standard weeks + 56 progressive extra tabs) and 98 weeks for Male (48 standard weeks + 50 progressive extra tabs).
  - Users select their preferred track using the segmented toggle in the İlmihal category. Preferences are stored persistently in the `user_preferences` database table for authenticated users. Anonymous non-guest visitors are prompted with an auth modal to choose between 1-click Guest mode or Account login/registration, and guest preferences migrate automatically to their account upon sign-in.
  - **Weekly Split PDFs & PDF Reader**: Master textbooks are systematically split into individual weekly PDF files (`/public/curriculum/ilmihal/{level}/{gender}/hafta-XX.pdf`). An in-app minimalist PDF Reader modal (`PdfReaderModal`) allows page-by-page reading with canvas rendering, keyboard navigation, mobile touch swipe gestures, and zoom controls. The user's current reading page is remembered locally across sessions so resuming a lesson returns immediately to where they left off (`p. X`).
- **Hocaefendi Sohbetleri**: Comprehensive 48-week video curriculum for each of the 6 Belgium grades (total 288 video records) featuring embedded YouTube talks of Fethullah Gülen Hocaefendi, pedagogical Turkish summaries, responsive 16:9 player, and a dedicated Belgium student vocabulary guide (`Vocabulary`) providing simple Turkish definitions along with Dutch (`NL:`) and French (`FR:`) translations.
- **Haftanın Konusu**: Pedagogically structured deep-dive and contemplation lessons for all 6 Belgium grades (Grade 1 – Grade 6). Folder cards feature an eye-catching subtitle/question quote, concept badges, estimated reading duration, and a 'Read Lesson' button. Clicking smoothly expands an in-card custom lesson reader (`KonuLessonReader`) offering a rich text narrative with subheadings, interactive in-text concept tooltips, 'Let's Reflect & Discuss' contemplation prompts, a weekly practical application guide, a gold-accented 'Key Takeaways for This Week' summary box, and a teal-themed concept glossary.

## Progress & Curriculum Model

- **Belgium 6 Grades**: Tailored for the Belgian educational levels (Grade 1 – Grade 6). A first-time visit to `/mufredat` asks for a grade; later visits resume the saved grade in the same browser. Direct `?sinif=1..6` links open the requested grade and update that choice. Users can switch grades using the labeled control above the archive or the capsule's quick selector.
- **Gender-Specific Tracks**: In İlmihal, Male and Female tracks are maintained with independent sequential progress tracking. Users can switch their active track at any time without losing completed readings in either track.
- **Curriculum & Extra Content**: Standard content covers up to 48 weeks (12 months × 4 weeks). Under the automatic 48-week curriculum rule, all entries up to week 48 are standard weeks; no premature extra tabs can appear before the 48 weeks are filled. Once standard weeks exceed 48 (from week 49 onwards), subsequent contents automatically convert to `isExtra: true` with sequential `extraOrder` (1, 2, 3...), appearing as continuation tabs (`Extra 1 · Add-on`, `Extra 2`, etc.) and unlocking progressively only after the 48th week is finished.
- **Progress Tracking**: Progress is saved per user in the `curriculum_progress` table (`userId`, `entryId`, `completedAt`) and in guest storage (`jetacademie-guest`). Sequential completion is enforced per category and grade. If an entry is completed by accident, users can immediately undo it via a 7-second countdown undo button (available synchronously on the active card and in the floating toast notification), or later revert the latest completed entry via History to maintain sequential integrity.

## Tech Stack

- Bun 1.3+
- Next.js 16 App Router & React 19
- Tailwind CSS v4
- Zustand v5
- TanStack Query v5
- Better-Auth & PostgreSQL (Bun SQLite for isolated tests)
- Zod v4
- Vaul bottom sheet

## Local Development

```bash
bun install
bun dev
```

### Müfredat Kaynak Araştırma Motoru (Local AI & Developer Tool)

Müfredat içerikleri üretilirken Risale-i Nur, Pırlanta ve `sources/` altındaki kaynaklarda AI context'ini şişirmeden 0 token ile araştırma yapmak için yerel SQLite FTS5 motoru kullanılır:

```bash
# Yeni kaynaklar sources/ klasörüne eklendiğinde indeksleme:
bun run sources:index

# Hızlı terminal arama komutu:
bun run sources:search -- -q "ihlas" -n 5
bun run sources:search -- --read "Lemalar" --page 160
```

### 36 Haftalık Müfredat Yönetim Aracı (`curriculum` CLI)

Haftalık müfredat içerikleri (6 kategori: `konu`, `ayet`, `hadis`, `efendimiz`, `sahabe-kissalari`, `hocaefendi-dinleme` × 6 sınıf = 36 kayıt) kod tabanında yüzlerce statik TypeScript veya Markdown dosyası oluşturmadan doğrudan veritabanında yönetilir. `adab-i-muaseret`, `ilmihal` ve `esma` kategorileri korunur.

```bash
# 36 haftanın durum raporunu listele (boş, taslak, yayında):
bun run curriculum list

# AI tarafından üretilen haftalık paketi doğrula ve taslak olarak veritabanına kaydet:
bun run curriculum save --week 3 --file hafta-3.json

# Taslak yerine doğrudan yayına alarak kaydet:
bun run curriculum save --week 3 --file hafta-3.json --publish

# Taslak durumundaki haftayı yayına al (öğrencilere aç):
bun run curriculum publish --week 3

# İhtiyaç halinde haftalık kayıtları gözden geçirmek için Markdown dosyalarına aktar:
bun run curriculum export --week 3

# Bir haftanın 6 içerik kategorisini sil (adab, ilmihal ve esma asla silinmez):
bun run curriculum delete --week 3
```

The application runs by default at `http://localhost:3000`. Refer to `.env.example` for environment variables.

## Verification

```bash
bun test
bun run lint
bun run format:check
bun run build
```

> **Note:** Unit tests automatically run against an isolated in-memory test driver (`:memory:`), ensuring tests run in under 2 seconds without requiring an external PostgreSQL daemon.

## Database & Data Migration

- **Primary Database**: PostgreSQL 16 (connected via `pg.Pool` connection pooling in `src/lib/db.ts`).
- **Better-Auth**: Configured with native PostgreSQL connection pool adapter.
- **Schema bootstrap**: `bun run db:migrate` creates missing tables and indexes from the app's `SCHEMA_SQL` and exits on database errors. Existing columns are not altered; schema changes need explicit migration SQL. The older Better Auth CLI dependency was removed from the install tree.
- **SQLite to PostgreSQL Migration**:
  If migrating from an existing `auth.sqlite` database:
  ```bash
  DATABASE_URL="postgres://postgres:password@localhost:5432/jetacademie" bun scripts/migrate-sqlite-to-pg.ts
  ```
- **Backup & Restore**:
  ```bash
  ./scripts/backup-db.sh
  ./scripts/restore-db.sh ./backups/jetacademie_backup_YYYYMMDD_HHMMSS.sql
  ```
- **Müfredat Temizliği**:
  Adab, İlmihal ve Esmâ dışındaki tüm kategorileri PostgreSQL'den güvenle temizlemek ve otomatik tohumlamayı engellemek için:
  ```bash
  bun run db:clean-curriculum
  ```

## Remote Deployment (Tailscale & Docker)

For full Tailscale instructions, see [docs/tailscale.md](docs/tailscale.md).

### 1. One-Command Tailscale Deploy

Deploy directly from your local terminal to your Tailscale remote server (`100.80.51.7`):

```bash
./scripts/deploy.sh root@100.80.51.7
# Or if deploy host is set:
./scripts/deploy.sh
```

> **Port & IP Isolation (High Security)**:
>
> - PostgreSQL host port is mapped to `5433` (`PG_HOST_PORT=5433`) to prevent collision with any existing PostgreSQL instance running on port `5432`.
> - PostgreSQL is strictly bound to Tailscale IP `100.80.51.7` (`PG_BIND_IP=100.80.51.7`), blocking all public WAN exposure so only authorized Tailnet devices can connect.
> - Web app host port defaults to `3001` and binds to loopback (`HOST_BIND_IP=127.0.0.1`) for Tailscale Serve or a local reverse proxy.

### 2. Tailscale Serve (Automatic HTTPS)

Run on your remote server to enable instant HTTPS with Let's Encrypt certificates:

```bash
tailscale serve --bg 3001
```

Your application will be live at `https://<server-name>.<tailnet-name>.ts.net`.

### 3. Dokploy / Docker Compose Guidelines

- `docker-compose.yml` provides both `db` (Postgres 16 Alpine with persistent volume `pgdata`) and `web` (stateless Next.js 16 standalone container).
- Health checks ensure `web` waits for `db` to be ready before starting.
- Environment variables:
  - `POSTGRES_USER`: `jetacademie`
  - `POSTGRES_PASSWORD`: Strong password
  - `POSTGRES_DB`: `jetacademie`
  - `DATABASE_URL`: `postgres://jetacademie:<pass>@db:5432/jetacademie`
  - `BETTER_AUTH_SECRET`: Random 32+ char secret (`openssl rand -base64 32`)
  - `BETTER_AUTH_URL`: Canonical URL (e.g. `https://<tailnet>.ts.net` or domain)
  - `NEXT_PUBLIC_APP_URL`: Canonical URL

### Security settings

- Set `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to the same external HTTPS origin before users sign in. Keep `BETTER_AUTH_SECRET` at least 32 random characters; production rejects a missing or example secret.
- Behind a reverse proxy, preserve the public `Host` or send `X-Forwarded-Host` and `X-Forwarded-Proto`. Account mutations verify the browser's `Origin` against that public request origin, and the auth client uses the current browser origin. Set the canonical URLs to `https://jetacademie.be` when that is the public address.
- The anonymous login and registration endpoints accept same-origin JSON requests only. New passwords must have at least four characters and can have up to 128. Login attempts for each existing account are limited to five per 15 minutes across app instances, alongside Better Auth's request rate limit. Password changes and account deletion require the current password. A password change invalidates other sessions.
- The web port binds to loopback by default. If a remote reverse proxy needs a different bind address, set `HOST_BIND_IP` explicitly and restrict access at the network boundary.
- Authentication and account responses are marked `no-store`. Baseline browser security headers restrict framing, object embeds, base URL changes, and form submissions.

## Özel Müfredat Düzenleme Ekranı

`/duzenle` adresi yalnız elle açılır; uygulama menüsünde bağlantısı yoktur. Bu ekranın hesabı, oturum çerezi ve tabloları Better Auth kullanıcılarından ayrıdır. Tek yetkisi müfredat içeriğini eklemek ve düzenlemektir.

```bash
# Tek hesabı oluşturur; rastgele şifreyi bir kez terminalde gösterir.
bun run editor:setup

# Gerektiğinde şifreyi ve oturum anahtarını yeniler; eski oturumları geçersiz kılar.
bun run editor:setup -- --rotate
```

Üretilen kullanıcı adı, scrypt şifre özeti ve ayrı oturum anahtarı Git tarafından dışlanan `.env` dosyasına yazılır. Şifrenin kendisi `.env` içinde tutulmaz. Geliştirme sunucusunu yeni ayarlardan sonra yeniden başlatın. `CURRICULUM_ADMIN_USERNAME`, `CURRICULUM_ADMIN_PASSWORD_HASH` ve `CURRICULUM_ADMIN_SECRET` değerlerini üretim ortamına güvenli biçimde aktarın; `CURRICULUM_ADMIN_ORIGIN` değerini dışarıdan kullanılan HTTPS origin olarak belirleyin (örneğin `https://jetacademie.be`, sonunda `/` olmadan). Docker Compose bu değişkenleri web servisine aktarır. Eksik veya geçersiz ayarlarda admin erişimi kapalıdır. Deploy betiği yerel `.env` dosyasını uzak sunucuya kopyalamaz; bu ayarlar uzak ortamda ayrıca tanımlanmalıdır.

Sınıf, ay, hafta ve kategori seçimleriyle boş/dolu içerikler görünür. İlmihal içerikleri erkek/bayan hattına göre ayrılır. Mevcut haftalar düzenlenebilir, boş haftalara metin eklenebilir; 48 normal hafta tamamlandıktan sonra ek haftalar açılır. UIW Markdown editörü biçimlendirme araçları sunar; önizleme ve öğrenci ekranı aynı `react-markdown`, `remark-gfm` ve `rehype-sanitize` bileşenini kullanır. Ham HTML, görseller ve çalıştırılabilir bağlantılar render edilmez. Arapça paragrafların yazı yönü otomatik belirlenir. Kaydetme içeriği doğrudan yayınlar; kaydedilmemiş değişikliklerde gezinme uyarısı vardır.

Düzenlemeler `curriculum_editor_content` tablosunda sürüm numarasıyla saklanır ve temel müfredata uygulanır. Bu yöntem seed işlemlerinin editör değişikliklerini ezmesini engeller, mevcut kayıt kimliklerini ve öğrenci ilerlemelerini korur. Aynı içeriğin eski sürümüyle kayıt yapılırsa 409 yanıtı döner; güncel içerik yüklenmelidir. Yedekler editör içerik tablosunu da kapsamalıdır.

Güvenlik: 8 saatlik rastgele oturum anahtarının yalnız SHA-256 özeti veritabanında tutulur. Üretimde çerez `__Host-` öneki, `HttpOnly`, `Secure` ve `SameSite=Strict` kullanır. Tüm yazma işlemleri ayrı admin oturumu, sabit origin ve oturuma bağlı CSRF anahtarıyla doğrulanır. Girişler, farklı kullanıcı adları dâhil, tüm uygulama örnekleri için toplam 10 deneme / 15 dakika ile sınırlandırılır. JSON boyutu akış okunurken denetlenir; sorgular parametrelidir. Admin sayfası/API önbelleğe alınmaz ve indekslemeye kapalıdır. URL gizliliği bir güvenlik sınırı değildir; yetki kontrolü her API isteğinde uygulanır.
