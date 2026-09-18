# JetAcademie

![JetAcademie Preview](./jet-example.png)

JetAcademie is a mobile-first Progressive Web Application (PWA) designed for students to sequentially follow and track their monthly and weekly development curriculum.

## Product Structure

- `/`: Landing page leading directly to Curriculum and Targets sections.
- `/mufredat`: Curriculum section featuring a 9-category capsule navigation (sticky on mobile, fixed on the left on desktop) and an archive folder deck for the selected category. Categories are listed sequentially with minimalist gradient dividers and comfortable vertical breathing room. Files employ a physical folder metaphor with staggered Manila tabs. Locked files cannot be accessed until preceding entries in that category are completed. The header bar includes a counter-enabled 'History' button to inspect completed archives in reverse chronological order, allowing users to revert accidentally completed entries.
- `/hedefler`: Targets section prepared for upcoming goal tracking features.
- Account: Privacy-first anonymous authentication. No personal data (name, email) is collected; users only choose a password, and sequential usernames (`user1`, `user2`, etc.) are assigned automatically with gap-filling on account deletion. Direct password updates and account deletion are supported.
- Theme: Persistent semantic theme architecture supporting light, dark, and system preferences.

Real curriculum entries are stored in `src/lib/curriculum.ts` and can be attached to any future headless CMS or database source.

## Progress Model

Each entry carries category, year, month, and week metadata. Progress is saved per user in the `curriculum_progress` table. Sequential completion is enforced per category. If an entry is completed by accident, only the latest completed entry in that category can be reverted via History to maintain sequential integrity.

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
