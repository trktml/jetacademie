# JetAcademie

![JetAcademie Preview](./jet-example.png)

JetAcademie is a mobile-first Progressive Web Application (PWA) designed for students to sequentially follow and track their monthly and weekly development curriculum.

## Product Structure

- `/`: Landing page leading directly to Curriculum, Targets, Curriculum Books, and Campaigns sections.
- `/mufredat`: Curriculum section featuring a 10-category capsule navigation (sticky on mobile, fixed on the left on desktop with an integrated Belgium 6-grade quick selector dropdown right at the top) and an archive folder deck for the selected category. Categories are listed sequentially with minimalist gradient dividers and comfortable vertical breathing room. Files employ a physical folder metaphor with staggered Manila tabs. Locked files cannot be accessed until preceding entries in that category are completed. Beyond the standard 48-week curriculum (12 months × 4 weeks), extra content continues directly as consecutive folder tabs in the same stack (`Extra 1 · Add-on`, `Extra 2`, etc.), unlocking progressively without separate isolated sections. When marking any file as read, the view smoothly scrolls to the top of that category to bring the next unlocked content into focus, and an immediate 7-second countdown undo action ('Undo') appears synchronously both on the active card and in the bottom snackbar toast, enabling rapid one-tap reversals without navigating away. Furthermore, the header bar includes a counter-enabled 'History' button that transitions to a focused, dedicated history space isolated from other categories. Inside, a quick jump selector with a 'Go' button, period shortcut chips ('Newest', 'Oldest', Month pills, 'Extra'), and spotlight card animations enable seamless travel across past completed readings, with support for reverting accidentally completed entries on the latest file.
- `/hedefler`: Targets & Annual Plans section showcasing the comprehensive 6-year development roadmap (M1–M6 for Belgian Grades 1–6). Features an interactive progression ladder (_Curiosity → Understanding → Life → Need → Investigation → Representation_), year-end student achievement showcases (_What Will the Student Achieve at Year-End?_), core competencies, student declarations, methodology flow, an expandable 9-unit / 36-week thematic question & source guide mapped to the 9 school months (_September – May_), and the integrated 6-year family respect development lineage (_Parents and Elders Respect Lineage_).
- `/mufredat-kitaplari` (and `/kitaplar`): Curriculum Books and Reference Works library. Contains core textbooks, fiqh manuals (ilmihal), hadith and sirah compendiums, Risale-i Nur collections, and prayer books studied across the 6-year educational curriculum. Features level filtering (Middle School M1–M3, High School M4–M6, Grades 1–6), category tabs, live search, and a detailed book view modal.
- `/kampanyalar`: Seasonal Campaigns and Mobilization Announcements section. Displays official campaign posters (Risale-i Nur Works Reading Campaign, etc.), reading tiers (Groups A, B, C), book lists, and incentive rewards in a visual gallery format; supports full-screen poster inspection and high-resolution downloads.
- Account: Privacy-first anonymous authentication. No personal data (name, email) is collected; users only choose a password, and sequential usernames (`user1`, `user2`, etc.) are assigned automatically with gap-filling on account deletion. Direct password updates and account deletion are supported.
- Theme: Persistent semantic theme architecture supporting light, dark, and system preferences.

Curriculum entries are managed directly via SQLite (`curriculum_entries` table with auto-seeding across all 6 Belgium grades: Grade 1 – Grade 6) and can be easily extended or linked to administrative endpoints.

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

- **Belgium 6 Grades**: Tailored for the Belgian educational levels (Grade 1 – Grade 6). Users can switch grades quickly using the pill dropdown attached above the capsule rail (or pinned on the left on mobile). The selected grade syncs seamlessly with URL query parameters (`?sinif=1..6`) and client storage.
- **Gender-Specific Tracks**: In İlmihal, Male and Female tracks are maintained with independent sequential progress tracking. Users can switch their active track at any time without losing completed readings in either track.
- **Curriculum & Extra Content**: Standard content covers up to 48 weeks (12 months × 4 weeks). Under the automatic 48-week curriculum rule, all entries up to week 48 are standard weeks; no premature extra tabs can appear before the 48 weeks are filled. Once standard weeks exceed 48 (from week 49 onwards), subsequent contents automatically convert to `isExtra: true` with sequential `extraOrder` (1, 2, 3...), appearing as continuation tabs (`Extra 1 · Add-on`, `Extra 2`, etc.) and unlocking progressively only after the 48th week is finished.
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

> **Note:** Unit tests automatically run against an isolated in-memory test driver (`:memory:`), ensuring tests run in under 2 seconds without requiring an external PostgreSQL daemon.

## Database & Data Migration

- **Primary Database**: PostgreSQL 16 (connected via `pg.Pool` connection pooling in `src/lib/db.ts`).
- **Better-Auth**: Configured with native PostgreSQL connection pool adapter.
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
> - Web app host port defaults to `3001` (`HOST_PORT=3001`) to prevent collision with Dokploy's dashboard on port `3000`.

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
