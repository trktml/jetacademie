# JetAcademie

![JetAcademie Preview](./jet-example.png)

JetAcademie is a mobile-first Progressive Web Application (PWA) designed for students to sequentially follow and track their monthly and weekly development curriculum.

## Product Structure

- `/`: Landing page leading directly to Curriculum, Targets, Curriculum Books, and Campaigns sections.
- `/mufredat`: Curriculum section featuring a 10-category capsule navigation (sticky on mobile, fixed on the left on desktop with an integrated Belgium 6-grade quick selector dropdown right at the top) and an archive folder deck for the selected category. Categories are listed sequentially with minimalist gradient dividers and comfortable vertical breathing room. Files employ a physical folder metaphor with staggered Manila tabs. Locked files cannot be accessed until preceding entries in that category are completed. Beyond the standard 48-week curriculum (12 months × 4 weeks), extra contents continue directly as consecutive folder tabs in the same stack (`Ekstra 1 · İlave`, `Ekstra 2`, etc.), unlocking progressively without separate isolated sections. When marking any file as read, the view smoothly scrolls to the top of that category to bring the next unlocked content into focus, and an immediate 7-second countdown undo action (`Geri Al`) appears synchronously both on the active card and in the bottom snackbar toast, enabling rapid one-tap reversals without navigating away. Furthermore, the header bar includes a counter-enabled 'History' button that transitions to a focused, dedicated history space isolated from other categories. Inside, a quick jump selector with a 'Git' button, period shortcut chips ('En Yeni', 'En Eski', Month pills, 'Ekstra'), and spotlight card animations enable seamless travel across past completed readings, with support for reverting accidentally completed entries on the latest file.
- `/hedefler`: Targets & Annual Plans section showcasing the comprehensive 6-year development roadmap (M1–M6 for Belgian Grades 1–6). Features an interactive progression ladder (_Merak → Anlama → Hayat → İhtiyaç → Tahkik → Temsil_), year-end student achievement showcases (_Öğrenci Sene Sonunda Ne Elde Edecek?_), core competencies, student declarations, methodology flow, an expandable 9-unit / 36-week thematic question & source guide mapped to the 9 school months (_Eylül – Mayıs_), and the integrated 6-year family respect development lineage (_Anne-Baba ve Büyüklere Hürmet Hattı_).
- `/mufredat-kitaplari` (ve `/kitaplar`): Müfredat Kitapları ve Kaynak Eserler kütüphanesi. 6 yıllık eğitim müfredatında takip edilen temel ders kitapları, fıkıh ilmihalleri, hadis ve siyer külliyatları, Risale-i Nur ve dua eserlerini içerir. Kademe filtreleme (Ortaokul M1–M3, Lise M4–M6, 1–6. sınıflar), kategori sekmeleri, canlı arama ve eser detay modalı sunar.
- `/kampanyalar`: Dönemsel Kampanyalar ve Seferberlik Duyuruları bölümü. Resmi kampanya afişlerini (Risale-i Nur Külliyatı Okuma Kampanyası vb.), okuma kademelerini (A, B, C grupları), eser listelerini ve teşvik ödüllerini görsel galeri formatında sunar; afişleri tam ekran inceleme ve yüksek çözünürlükte indirme imkanı sağlar.
- Account: Privacy-first anonymous authentication. No personal data (name, email) is collected; users only choose a password, and sequential usernames (`user1`, `user2`, etc.) are assigned automatically with gap-filling on account deletion. Direct password updates and account deletion are supported.
- Theme: Persistent semantic theme architecture supporting light, dark, and system preferences.

Curriculum entries are managed directly via SQLite (`curriculum_entries` table with auto-seeding across all 6 Belgium grades: 1. Sınıf – 6. Sınıf) and can be easily extended or linked to administrative endpoints.

- **Ayet**: Comprehensive 55-week curriculum with Arabic text, Suat Yıldırım Turkish translation, and level-adapted explanations: Grades 1–3 follow the Middle School (_Ortaokul_) program, while Grades 4–6 follow the High School (_Lise_) program (48 standard weeks + 7 progressive extra tabs).
- **Hadis**: Comprehensive 55-week core hadith curriculum with full Arabic matn, simplified Turkish meaning, verified authentic sources (Sahîh-i Buhârî & Sahîh-i Müslim), and direct one-click verification links (`sunnah.com`): Grades 1–3 follow the Middle School (_Ortaokul_) program, while Grades 4–6 follow the High School (_Lise_) program (48 standard weeks + 7 progressive extra tabs).
- **Efendimiz**: Comprehensive 55-week life and exemplary morals curriculum of the Prophet Muhammad (pbuh): Grades 1–3 follow the Middle School (_Ortaokul_) program, while Grades 4–6 follow the High School (_Lise_) program (48 standard weeks + 7 progressive extra tabs) featuring concrete incidents and weekly practical action targets (_Bu hafta_ / _Hayata taşı_).
- **Sahabe**: Comprehensive 55-week curriculum with vivid historical incidents, ethical takeaways, and practical weekly actions: Grades 1–3 follow the Middle School (_Ortaokul_) program (55 weeks from _Sevgili Peygamberimizin Arkadaşları_), while Grades 4–6 follow the High School (_Lise_) program (55 weeks from _Hayâtü’s-Sahâbe_ and historical records) (48 standard weeks + 7 progressive extra tabs).
- **Esmâü'l-Hüsnâ**: Comprehensive 55-week divine names and attributes curriculum with pedagogical reflections and moral applications: Grades 1–3 follow the Middle School (_Ortaokul_) program with relatable life examples, while Grades 4–6 follow the High School (_Lise_) program focusing on marifetullah, contemplation, and character development (48 standard weeks + 7 progressive extra tabs).
- **Adab-ı Muaşeret**: Comprehensive 54-week curriculum: Grades 1–3 follow the Middle School (_Ortaokul_) program, while Grades 4–6 follow the High School (_Lise_) program (48 standard weeks + 6 progressive extra tabs).
- **İlmihal**: Comprehensive gender-specific curriculum with Erkek and Bayan tracks:
  - Grades 1–3 (_Ortaokul_): 28 weeks for both Erkek and Bayan.
  - Grades 4–6 (_Lise_): 104 weeks for Bayan (48 standard weeks + 56 progressive extra tabs) and 98 weeks for Erkek (48 standard weeks + 50 progressive extra tabs).
  - Users select their preferred track using the segmented toggle in the İlmihal category. Preferences are stored persistently in the `user_preferences` database table for authenticated users. Anonymous non-guest visitors are prompted with an auth modal to choose between 1-click Guest mode or Account login/registration, and guest preferences migrate automatically to their account upon sign-in.
  - **Weekly Split PDFs & PDF Reader**: Master textbooks are systematically split into individual weekly PDF files (`/public/curriculum/ilmihal/{level}/{gender}/hafta-XX.pdf`). An in-app minimalist PDF Reader modal (`PdfReaderModal`) allows page-by-page reading with canvas rendering, keyboard navigation, mobile touch swipe gestures, and zoom controls. The user's current reading page is remembered locally across sessions so resuming a lesson returns immediately to where they left off (`s. X'te kaldınız`).
- **Hocaefendi Sohbetleri**: Comprehensive 48-week video curriculum for each of the 6 Belgium grades (total 288 video records) featuring embedded YouTube talks of Fethullah Gülen Hocaefendi, pedagogical Turkish summaries, responsive 16:9 player, and a dedicated Belgium student vocabulary guide (`Kelimeler`) providing simple Turkish definitions along with Dutch (`NL:`) and French (`FR:`) translations.
- **Haftanın Konusu**: 6 Belçika sınıfı (1. Sınıf – 6. Sınıf) için pedagojik olarak yapılandırılmış derinleşme ve tefekkür dersleri. Klasör kartı üzerinde çarpıcı alt başlık/soru alıntısı, kavram rozetleri ve tahmini okuma süresi barındıran 'Dersi Oku' butonu bulunur. Tıklandığında kart içinde akıcı olarak açılan özel ders okuyucusu (`KonuLessonReader`); ara başlıklı zengin metin akışı, metin içi etkileşimli kavram araç ipuçları (tooltips), 'Düşünelim ve Konuşalım' tefekkür soruları, haftalık pratik uygulama rehberi, altın vurgulu 'Bu Hafta Aklımızda Kalsın' özet kutusu ve teal temalı kavram kartları sözlüğü sunar.

## Progress & Curriculum Model

- **Belgium 6 Grades**: Tailored for the Belgian educational levels (1. Sınıf – 6. Sınıf). Users can switch grade quickly using the pill dropdown attached above the capsule rail (or pinned on the left on mobile). The selected grade syncs seamlessly with URL query parameter (`?sinif=1..6`) and client storage.
- **Gender-Specific Tracks**: In İlmihal, Erkek and Bayan tracks are maintained with independent sequential progress tracking. Users can switch their active track at any time without losing completed readings in either track.
- **Curriculum & Extra Content**: Standard content covers up to 48 weeks (12 months × 4 weeks). Under the automatic 48-week curriculum rule, all entries up to week 48 are standard weeks; no premature extra tabs can appear before the 48 weeks are filled. Once standard weeks exceed 48 (from week 49 onwards), subsequent contents automatically convert to `isExtra: true` with sequential `extraOrder` (1, 2, 3...), appearing as continuation tabs (`Ekstra 1 · İlave`, `Ekstra 2`, etc.) and unlocking progressively only after the 48th week is finished.
- **Progress Tracking**: Progress is saved per user in the `curriculum_progress` table (`userId`, `entryId`, `completedAt`) and in guest storage (`jetacademie-guest`). Sequential completion is enforced per category and grade. If an entry is completed by accident, users can immediately undo it via a 7-second countdown undo button (available synchronously on the active card and in the floating toast notification), or later revert the latest completed entry via History to maintain sequential integrity.

## Tech Stack

- Bun 1.3+
- Next.js 16 App Router & React 19
- Tailwind CSS v4
- Zustand v5
- TanStack Query v5
- Better-Auth & Bun SQLite
- Zod v4
- Vaul bottom sheet

## Local Development

```bash
bun install
bun dev
```

The application runs by default at `http://localhost:3000`. Refer to `.env.example` for environment variables.

## Verification

```bash
bun test
bun run lint
bun run format:check
bun run build
```

> **Note:** Unit tests automatically run against in-memory SQLite (`:memory:`), ensuring the local development database (`auth.sqlite`) is never reset during test runs.

## Deployment (Dokploy / Docker)

Key guidelines when deploying as a Compose application on Dokploy:

1. **Port Conflict Prevention:**
   - Dokploy's dashboard UI binds to host port `3000` by default. To prevent host port collisions (`port is already allocated`), `docker-compose.yml` uses `expose: 3000` rather than binding host ports directly.
   - In Dokploy UI, go to your application's **Domains** tab, add your domain, and set the target service to **`web`** and port to **`3000`**. Dokploy's built-in Traefik reverse proxy handles automatic SSL (Let's Encrypt) and routes traffic to the container.

2. **Persistent Database (SQLite):**
   - The `/app/data` container directory is mounted to the named `app-data` Docker volume to persist data across container recreations.
   - Database location: `DATABASE_URL=/app/data/auth.sqlite`.

3. **Environment Variables (Dokploy UI > Environment):**
   - `BETTER_AUTH_SECRET`: Secure random string of at least 32 characters (`openssl rand -base64 32`).
   - `BETTER_AUTH_URL`: Your canonical production URL (e.g., `https://jetacademie.com`).
   - `NEXT_PUBLIC_APP_URL`: Your canonical production URL (e.g., `https://jetacademie.com`).
   - `DATABASE_URL`: `/app/data/auth.sqlite`.
