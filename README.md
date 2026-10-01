# JetAcademie

![JetAcademie Preview](./jet-example.png)

JetAcademie is a mobile-first Progressive Web Application (PWA) designed for students to sequentially follow and track their monthly and weekly development curriculum.

Documentation is maintained in English. The website interface and student-facing curriculum retain their existing languages.

## Product Structure

- `/`: Landing page leading directly to Curriculum, Targets, Curriculum Books, and Campaigns sections.
- `/mufredat`: First-time visitors choose one of six grades from a dedicated selection screen. The choice is remembered in that browser, while `?sinif=1..6` links open a grade directly. The archive shows the current grade and a visible change control above its 9-category capsule navigation (sticky on mobile, fixed on the left on desktop with an integrated quick selector). Categories are listed sequentially with minimalist gradient dividers and comfortable vertical breathing room. Files employ a physical folder metaphor with staggered Manila tabs. Locked files cannot be accessed until preceding entries in that category are completed. Beyond the standard 48-week curriculum (12 months × 4 weeks), extra content continues directly as consecutive folder tabs in the same stack (`Extra 1 · Add-on`, `Extra 2`, etc.), unlocking progressively without separate isolated sections. When marking any file as read, the view smoothly scrolls to the top of that category to bring the next unlocked content into focus, and an immediate 7-second countdown undo action ('Undo') appears synchronously both on the active card and in the bottom snackbar toast, enabling rapid one-tap reversals without navigating away. Furthermore, the header bar includes a counter-enabled 'History' button that transitions to a focused, dedicated history space isolated from other categories. Inside, a quick jump selector with a 'Go' button, period shortcut chips ('Newest', 'Oldest', Month pills, 'Extra'), and spotlight card animations enable seamless travel across past completed readings, with support for reverting accidentally completed entries on the latest file.
- `/hedefler`: Grade goals, year-end outcomes, and student achievement statements based on the M1–M6 annual Markdown plans. Each grade includes its study method and a 9-unit, 36-week sequence of topics, main questions, and sources. September–May labels follow the existing four-weeks-per-month interface mapping; the source plans do not specify months. Grade and month filters, search, and highlights for respecting parents are preserved.
- `/mufredat-kitaplari` (and `/kitaplar`): Curriculum Books and Reference Works library. Contains core textbooks, fiqh manuals (ilmihal), hadith and sirah compendiums, Risale-i Nur collections, and prayer books studied across the 6-year educational curriculum. Features level filtering (Middle School M1–M3, High School M4–M6, Grades 1–6), category tabs, live search, and a detailed book view modal.
- `/kampanyalar`: Seasonal Campaigns and Mobilization Announcements section. Displays official campaign posters (Risale-i Nur Works Reading Campaign, etc.), reading tiers (Groups A, B, C), book lists, and incentive rewards in a visual gallery format; supports full-screen poster inspection and high-resolution downloads.
- Account: Privacy-first anonymous authentication. No personal data (name, email) is collected; users only choose a password, and sequential usernames (`user1`, `user2`, etc.) are assigned automatically with gap-filling on account deletion. Password changes and account deletion require the current password.
- Theme: Persistent semantic theme architecture supporting light, dark, and system preferences.

Curriculum entries are stored in PostgreSQL (`curriculum_entries` table, seeded across all 6 Belgium grades) with grade-scoped IDs (`g1-` through `g6-`); existing first-grade IDs and their progress are migrated automatically. The curriculum page loads only the selected grade; switching grades fetches that grade through `/api/curriculum?sinif=1..6` and caches it in the browser. The database seed and category freshness checks run once per server process, rather than on every page visit.

- **Weekly Topic**: Pedagogically structured deep-dive and contemplation lessons for all 6 Belgium grades (Grade 1 – Grade 6). Folder cards feature an eye-catching subtitle/question quote, concept badges, estimated reading duration, and a 'Read Lesson' button. Clicking smoothly expands an in-card custom lesson reader (`KonuLessonReader`) offering a rich text narrative with subheadings, interactive in-text concept tooltips, 'Let's Reflect & Discuss' contemplation prompts, a weekly practical application guide, a gold-accented 'Key Takeaways for This Week' summary box, and a teal-themed concept glossary.
- **Hocaefendi Talks**: Comprehensive 48-week video curriculum for each of the 6 Belgium grades (total 288 video records) featuring embedded YouTube talks of Fethullah Gülen Hocaefendi, pedagogical Turkish summaries, responsive 16:9 player, and a dedicated Belgium student vocabulary guide (`Vocabulary`) providing simple Turkish definitions along with Dutch (`NL:`) and French (`FR:`) translations.
- **The Prophet’s Life**: Comprehensive 55-week life and exemplary morals curriculum of the Prophet Muhammad (pbuh): Grades 1–3 follow the Middle School program, while Grades 4–6 follow the High School program (48 standard weeks + 7 progressive extra tabs) featuring concrete incidents and weekly practical action targets (_This week_ / _Put into practice_).
- **Companions**: Comprehensive 55-week curriculum with vivid historical incidents, ethical takeaways, and practical weekly actions: Grades 1–3 follow the Middle School program (55 weeks from _Sevgili Peygamberimizin Arkadaşları_), while Grades 4–6 follow the High School program (55 weeks from _Hayâtü’s-Sahâbe_ and historical records) (48 standard weeks + 7 progressive extra tabs).
- **Quranic Verses**: Comprehensive 55-week Quranic verses curriculum with Arabic text, Turkish translation (Suat Yıldırım), and level-adapted explanations: Grades 1–3 follow the Middle School program, while Grades 4–6 follow the High School program (48 standard weeks + 7 progressive extra tabs).
- **Hadith**: Comprehensive 55-week core hadith curriculum with full Arabic matn, simplified Turkish meaning, and verified authentic sources (Sahîh-i Buhârî & Sahîh-i Müslim): Grades 1–3 follow the Middle School program, while Grades 4–6 follow the High School program (48 standard weeks + 7 progressive extra tabs). Current curriculum writing rules require source footnotes with the work, section, and verified hadith number, without external verification links.
- **Islamic Practice (İlmihal)**: Comprehensive gender-specific curriculum with Male and Female tracks:
  - Grades 1–3 (Middle School): 28 weeks for both Male and Female.
  - Grades 4–6 (High School): 104 weeks for Female (48 standard weeks + 56 progressive extra tabs) and 98 weeks for Male (48 standard weeks + 50 progressive extra tabs).
  - Users select their preferred track using the segmented toggle in the İlmihal category. Preferences are stored persistently in the `user_preferences` database table for authenticated users. Anonymous non-guest visitors are prompted with an auth modal to choose between 1-click Guest mode or Account login/registration, and guest preferences migrate automatically to their account upon sign-in.
  - **Weekly Split PDFs & PDF Reader**: Master textbooks are systematically split into individual weekly PDF files (`/public/curriculum/ilmihal/{level}/{gender}/hafta-XX.pdf`). An in-app minimalist PDF Reader modal (`PdfReaderModal`) allows page-by-page reading with canvas rendering, keyboard navigation, mobile touch swipe gestures, and zoom controls. The user's current reading page is remembered locally across sessions so resuming a lesson returns immediately to where they left off (`p. X`).
- **Etiquette and Manners**: Comprehensive 54-week etiquette and manners curriculum: Grades 1–3 follow the Middle School program, while Grades 4–6 follow the High School program (48 standard weeks + 6 progressive extra tabs).
- **Divine Names (Esmâü’l-Hüsnâ)**: Comprehensive 55-week divine names and attributes curriculum with pedagogical reflections and moral applications: Grades 1–3 follow the Middle School program with relatable life examples, while Grades 4–6 follow the High School program focusing on marifetullah (knowledge of God), contemplation, and character development (48 standard weeks + 7 progressive extra tabs).

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

### Curriculum Source Search Engine (Local AI & Developer Tool)

When preparing curriculum content, use the local SQLite FTS5 engine to find relevant passages in Risale-i Nur, Pırlanta, and the sources under `sources/`. Retrieving only relevant text reduces context usage; search results and `--read` output do not replace verification against the original source. Compare the quotation, context, and edition-specific page reference with the original:

```bash
# Index new sources added to sources/:
bun run sources:index

# Search from the terminal:
bun run sources:search -- -q "ihlas" -n 5
bun run sources:search -- --read "Lemalar" --page 160
```

### Curriculum Writing and Quality Guidance

[MUFREDAT-INSTRUCTIONS.md](mufredat-docs/planlar/MUFREDAT-INSTRUCTIONS.md) defines the detailed production workflow for Topic lessons and the shared language and source reviews for all six categories. The [annual Markdown plans](mufredat-docs/planlar/README.md) govern topics, main questions, outcomes, and primary sources; the writing guide governs student-facing language, narrative, and presentation. DOCX copies have been removed; current plans are edited in Markdown. All six grades leave primary sources unspecified in weeks 1–4: preparation is not restricted to a particular work or section, and the interface omits the source row. Source verification and citation rules still apply whenever a source is used. Timing and file-layout suggestions retained from older plans do not require longer texts or a separate bibliography.

Texts should support both independent reading and discussion with a mentor. Explanations remain simple across M1–M6 while the expected thinking becomes deeper. A Topic lesson may have a short introduction before the verse; the verse appears early in the narrative, preserving the Arabic text → translation → footnote order. Every Topic lesson provides at least one meaningful opportunity to think. Review categories within the same week and nearby weeks together for repetition. Report source and editorial reviews separately from actual student trials; changing guidance does not mean existing lessons have been revised.

Every production task follows the single workflow at the start of the guide: **plan and learner profile → source verification → representative lesson → writing → independent source and language reviews → corrections → publication assessment**. Section 9 governs curiosity and tone; section 10 governs grade, month, and language expectations; section 11 governs the line of thought; section 18 governs per-entry evidence records and acceptance. Explanations remain simple across M1–M6; age does not establish Turkish reading ability or justify longer quotations. Review each grade and category separately, including the language of the listening recording itself.

Each review record includes evidence from the text, corrections, and one of the guide’s acceptance outcomes: **suitable (`uygun`) / revision required (`düzeltme gerekli`) / review incomplete (`değerlendirme eksik`)**. Content is not ready for publication until known issues and missing required reviews are resolved. Report the absence of student trials separately; it does not by itself prevent editorial acceptance. Records are not shown to students and are kept in the Git-ignored preparation directory. The revised M1 week-one lesson in the database is a reference example, not a template to copy or a standard validated with students. CLI validation does not perform editorial acceptance automatically.

### 36-Week Curriculum Management Tool (`curriculum` CLI)

Weekly curriculum content is managed directly in the database rather than hundreds of static TypeScript or Markdown files: six categories (`konu`, `ayet`, `hadis`, `efendimiz`, `sahabe-kissalari`, `hocaefendi-dinleme`) × six grades = 36 entries per weekly package. The `adab-i-muaseret`, `ilmihal`, and `esma` categories are preserved.

The student reader preserves authored Markdown structure, including verse–translation order, bold quotations, headings, and footnotes. Across all six categories, `<u>Kelime</u>` markers matched to `**Kelime** — definition` entries in the existing Turkish glossary sections (`Bu Hafta Tanıştığımız Kelimeler` or `Kelime Açıklaması`) become buttons that reveal meanings on click/tap, keyboard focus, and hover. Define inflected words using the same spelling as in the source. Other raw HTML tags are not executed. These Turkish section names and examples describe the student-content format; keep their original spelling.

Use only hadith verified as sahih, including hadith quotations and hadith-based reports in all six curriculum categories. Reports graded only hasan, weak or fabricated reports, and reports whose sahih status cannot be verified are excluded. Record the grading source and its location in the private review record; unresolved grading disputes or missing verification prevent publication readiness. For hadith cards and hadith-based reports in other categories, cite the reliable work, book/section, and verified hadith number in a footnote. Do not add Sunnah.com or another hadith verification website to the student text or `resourceUrl`. Research links may be kept only in preparation records; follow section 19.8 of the writing guide for source verification requirements.

Glossaries support Turkish reading skills. Do not include words found only in the Arabic text or their Latin transliterations; Turkish words of Arabic origin, such as `niyet`, may be included when they appear in the Turkish text. Package saves, editor saves, and weekly publication validate the pairing of marked Turkish words and definitions; footnotes are excluded from this matching. These technical checks do not replace a language review based on age and Turkish proficiency or verification against the original source. The writing guide does not treat 40 minutes as a text-length target; during the first four weeks, use simple explanations without assuming prior knowledge and preserve original quotations.

```bash
# List status for all 36 weeks (empty, draft, published):
bun run curriculum list

# Validate an AI-generated weekly package and save it as a database draft:
bun run curriculum save --week 3 --file hafta-3.json

# Save and publish directly instead of creating a draft:
bun run curriculum save --week 3 --file hafta-3.json --publish

# Publish a draft week and make it available to students:
bun run curriculum publish --week 3

# Export weekly records to Markdown for review when needed:
bun run curriculum export --week 3

# Delete a week's six content categories (adab, ilmihal, and esma are never deleted):
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
- **Curriculum Cleanup**:
  To remove all categories except Adab, İlmihal, and Esmâ from PostgreSQL and prevent automatic reseeding:
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

## Private Curriculum Editor

Open `/duzenle` manually; it is not linked from the application menu. Its account, session cookie, and tables are separate from Better Auth users. Its only permission is to add and edit curriculum content.

```bash
# Create the single account; show the random password once in the terminal.
bun run editor:setup

# Rotate the password and session secret when needed, invalidating old sessions.
bun run editor:setup -- --rotate
```

The generated username, scrypt password hash, and separate session secret are written to the Git-ignored `.env` file. The password itself is not stored there. Restart the development server after changing these settings. Transfer `CURRICULUM_ADMIN_USERNAME`, `CURRICULUM_ADMIN_PASSWORD_HASH`, and `CURRICULUM_ADMIN_SECRET` securely to production; set `CURRICULUM_ADMIN_ORIGIN` to the external HTTPS origin (for example, `https://jetacademie.be`, without a trailing slash). Docker Compose passes these variables to the web service. Missing or invalid configuration disables admin access. The deployment script does not copy the local `.env` file to the remote server; configure these settings separately on that server.

Grade, month, week, and category selectors show empty and populated entries. İlmihal content is split into male and female tracks. Existing weeks can be edited and empty weeks can be populated; extra weeks become available after all 48 standard weeks are filled. The UIW Markdown editor provides formatting tools; its preview and the student screen share the same `react-markdown`, `remark-gfm`, and `rehype-sanitize` component. Raw HTML, images, and executable links are not rendered. Footnote numbers and return links point to unique targets within the same card; external source links open in a new tab. Arabic paragraphs determine their text direction automatically. Saving publishes the content immediately; navigation warns about unsaved changes.

Edits are versioned in the `curriculum_editor_content` table and applied to the base curriculum. This prevents seed operations from overwriting editor changes while preserving existing entry IDs and student progress. Saving an outdated version returns a 409 response; load the current content before retrying. Backups must include the editor content table.

Security: only the SHA-256 hash of the random eight-hour session token is stored in the database. In production, the cookie uses the `__Host-` prefix, `HttpOnly`, `Secure`, and `SameSite=Strict`. Every write requires a separate admin session, a fixed origin, and a session-bound CSRF token. Login attempts, including attempts across different usernames, are limited to 10 per 15 minutes across all application instances. JSON size is checked while streaming the request; queries are parameterized. The admin page and API are not cached and are excluded from indexing. A hidden URL is not a security boundary; every API request enforces authorization.
