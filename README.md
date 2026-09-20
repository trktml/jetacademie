# JetAcademie

![JetAcademie Preview](./jet-example.png)

JetAcademie is a mobile-first Progressive Web Application (PWA) designed for students to sequentially follow and track their monthly and weekly development curriculum.

## Product Structure

- `/`: Landing page leading directly to Curriculum and Targets sections.
- `/mufredat`: Curriculum section featuring a 9-category capsule navigation (sticky on mobile, fixed on the left on desktop with an integrated Belgium 6-grade quick selector dropdown right at the top) and an archive folder deck for the selected category. Categories are listed sequentially with minimalist gradient dividers and comfortable vertical breathing room. Files employ a physical folder metaphor with staggered Manila tabs. Locked files cannot be accessed until preceding entries in that category are completed. Beyond the standard 48-week curriculum (12 months × 4 weeks), extra contents continue directly as consecutive folder tabs in the same stack (`Ekstra 1 · İlave`, `Ekstra 2`, etc.), unlocking progressively without separate isolated sections. The header bar includes a counter-enabled 'History' button that transitions to a focused, dedicated history space isolated from other categories. Inside, a quick jump selector with a 'Git' button, period shortcut chips ('En Yeni', 'En Eski', Month pills, 'Ekstra'), and spotlight card animations enable seamless travel across past completed readings, with support for reverting accidentally completed entries on the latest file.
- `/hedefler`: Targets section prepared for upcoming goal tracking features.
- Account: Privacy-first anonymous authentication. No personal data (name, email) is collected; users only choose a password, and sequential usernames (`user1`, `user2`, etc.) are assigned automatically with gap-filling on account deletion. Direct password updates and account deletion are supported.
- Theme: Persistent semantic theme architecture supporting light, dark, and system preferences.

Curriculum entries are managed directly via SQLite (`curriculum_entries` table with auto-seeding across all 6 Belgium grades: 1. Sınıf – 6. Sınıf) and can be easily extended or linked to administrative endpoints.

## Progress & Curriculum Model

- **Belgium 6 Grades**: Tailored for the Belgian educational levels (1. Sınıf – 6. Sınıf). Users can switch grade quickly using the pill dropdown attached above the capsule rail (or pinned on the left on mobile). The selected grade syncs seamlessly with URL query parameter (`?sinif=1..6`) and client storage.
- **Curriculum & Extra Content**: Standard content covers 48 weeks (12 months × 4 weeks with `isExtra = 0`). Additional contents extending beyond the 48 weeks are flagged with `isExtra = 1` and sequential `extraOrder` (1, 2, 3...), appearing sequentially as the next folder tabs in the deck and unlocking progressively as standard weeks are finished.
- **Progress Tracking**: Progress is saved per user in the `curriculum_progress` table (`userId`, `entryId`, `completedAt`) and in guest storage (`jetacademie-guest`). Sequential completion is enforced per category and grade. If an entry is completed by accident, only the latest completed entry in that category can be reverted via History to maintain sequential integrity.

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
