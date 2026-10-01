<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# JetAcademie Agent & LLM Guidance

This repository is **JetAcademie**, a full-stack Next.js 16 application with Bun, Tailwind CSS v4, Zustand v5, TanStack Query v5, Zod v4, Better-Auth (PostgreSQL via pg.Pool), Prettier, and Docker/Dokploy.

This guide provides authoritative rules and conventions for AI coding agents working on this project.

---

## ⚡ Non-Negotiable Core Rules

1. **Bun Runtime Only**: Use Bun for JavaScript/TypeScript commands (e.g. `bun install`, `bun dev`, `bun run test`, `bun run build`). Never execute `npm`, `yarn`, or `pnpm`.
2. **Preserve Next.js Auto-Block**: The `<!-- BEGIN:nextjs-agent-rules -->` block above must NEVER be deleted or modified.
3. **Quality Verification Loop**: Before declaring any coding task complete, execute and verify:
   - `bun run test` (runs the package script with `DATABASE_URL=:memory:`; all unit tests must pass)
   - `bun run lint` (Zero ESLint errors or warnings)
   - `bun run format:check` (Prettier compliance; run `bun run format` to auto-fix)
   - `bun run build` (Next.js type-checking and standalone build must succeed)
4. **Git Commit Format**: Suggest or use Conventional Commits:
   - Format: `type(scope): description`
   - Examples: `feat(query): add tanstack query provider and demo`, `fix(auth): handle invalid credentials error`
5. **Curriculum Writing**: Before creating or revising any of the six student-facing curriculum categories, read `mufredat-docs/planlar/MUFREDAT-INSTRUCTIONS.md` and the relevant grade's canonical `M1_Yillik_Plan.md`–`M6_Yillik_Plan.md` (see `mufredat-docs/planlar/README.md`). Apply its source and category-specific editorial checks to each entry; passing code tests alone does not establish content quality. Follow the single workflow at the start of that guide: plan and learner profile, source verification, representative lesson, writing, separate source and language reviews, corrections, and publication assessment. Section 10 defines grade/month/language expectations; section 18 defines the required per-entry evidence record and acceptance outcomes (suitable / revision required / review incomplete, recorded under the guide’s original labels). Known issues or missing required reviews must be resolved before content is considered ready for publication. M1 means approximately age 12–13, not primary-school grade 1; age alone never establishes Turkish reading ability. The `mufredat-kaynak-arama` skill helps find passages, but search snippets must be checked against the original source. Hadith citations, including hadith-based reports in other categories, use bibliographic footnotes without external verification links or a hadith-site `resourceUrl` (writing guide section 19.8); research URLs may remain in private preparation records. For 36-week curriculum packages, the database is the single source of truth (`isDraft: 1` for review/draft, `isDraft: 0` for live). Do not generate static lesson code modules or commit student-facing lesson Markdown files into git. Canonical annual plans and writing guidance are maintained as tracked Markdown documents. Validate and stage batches via `bun run curriculum save --week N --file <path>`, publish with `bun run curriculum publish --week N`, and export on demand with `bun run curriculum export --week N`. Preserved categories (`adab-i-muaseret`, `ilmihal`, `esma`) are never touched or deleted.

6. **Documentation Language**: Maintain `README.md` and `AGENTS.md` in English. Keep the website interface, student-facing curriculum, original quotations, and content-format labels in their existing languages; documentation translation does not authorize translating application content. Preserve commands, paths, identifiers, and the Next.js auto-generated block.

---

## 🏛️ Architecture & State Management Strategy

### 1. Client State vs. Server State Separation

- **Local client state (Zustand)**:
  - Use `src/store/*.ts` for UI state and locally persisted preferences or guest progress, as in `use-ui-store.ts`, `use-curriculum-store.ts`, and `use-guest-store.ts`.
  - Do not copy authenticated server data into a Zustand store as a second cache.
- **Remote data (TanStack Query v5 and Server Components)**:
  - Fetch initial server data in Server Components where appropriate. Use TanStack Query for client fetching and caching, as in `src/lib/queries/curriculum.ts` and `src/components/curriculum-page-content.tsx`.
  - Existing mutations such as curriculum progress use server actions in `src/app/mufredat/actions.ts`; preserve that flow when extending it.
  - `<QueryProvider>` is configured in `src/app/layout.tsx`. Access the QueryClient with `getQueryClient()` from `@/lib/query-client` and prefer `queryOptions(...)` for reusable queries.

### 2. TanStack Query SSR Singleton Pattern

In Next.js App Router, QueryClient instances must be managed cleanly:

- **On the Server**: A new `QueryClient` is instantiated per request to prevent cross-request data leaks.
- **In the Browser**: A singleton `QueryClient` is reused across re-renders and React Suspense boundaries.
- **Implementation**: Handled automatically via `getQueryClient()` in `src/lib/query-client.ts`:
  ```ts
  import { getQueryClient } from "@/lib/query-client";
  // Always use getQueryClient() rather than 'new QueryClient()' in components
  ```
- **DevTools**: `<ReactQueryDevtools initialIsOpen={false} />` is included in `src/providers/query-provider.tsx`.
- **Server Component Prefetching**: When prefetching queries in React Server Components, dehydrate the query client and wrap the client tree in `<HydrationBoundary>`:
  ```tsx
  import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
  import { getQueryClient } from "@/lib/query-client";
  import { healthQueryOptions } from "@/lib/queries/health";

  export default async function Page() {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(healthQueryOptions);

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MyClientComponent />
      </HydrationBoundary>
    );
  }
  ```
- **Isomorphic Fetching**: A server-side `fetch` needs an absolute URL; `src/lib/queries/health.ts` shows a `getBaseUrl()` example. Server Components may instead call server data functions directly, as `src/app/mufredat/page.tsx` does.

### 3. Validation (Zod v4)

- Keep Zod schemas organized in `src/lib/validations/`.
- Infer TypeScript types directly from schemas:
  ```ts
  export const mySchema = z.object({ ... });
  export type MyInput = z.infer<typeof mySchema>;
  ```

### 4. Authentication & Database (Better-Auth + PostgreSQL)

- Database manager: `src/lib/db.ts` (manages `pg.Pool`, async queries, parameter mapping, and in-memory test fallback).
- Server instance: `src/lib/auth.ts` (configured with Better-Auth PostgreSQL adapter and universal schema DDL).
- React client: `src/lib/auth-client.ts` (`authClient`, `useSession`, `signIn`, `signUp`, `signOut`).
- Route handler: `src/app/api/auth/[...all]/route.ts`.
- Production DB: PostgreSQL 16 Alpine via `docker-compose.yml` (`db` service with `pgdata` volume).
- Remote Deployment: Tailscale deploy script (`scripts/deploy.sh`) and Tailscale Serve HTTPS (`docs/tailscale.md`).
- Test DB: In-memory SQLite via `bun:sqlite`; the `bun run test` script sets `DATABASE_URL=:memory:` and test mode resolves to it. Use the package script for the full test suite.

### 5. Next.js 16 & React 19 Specifics

- Page & Layout route props (`params`, `searchParams`) are asynchronous `Promise` objects. Always `await` them.
- Root layout utilizes Next.js 16 `LayoutProps<"/">`.
- Default to React Server Components. Add `"use client"` only when components require browser hooks (`useState`, `useQuery`, `useCounterStore`, event handlers).

### 6. Mobile-First PWA & Accessibility Standards

- **Viewport Configuration**: Export `viewport: Viewport` from `src/app/layout.tsx` using `viewportFit: "cover"` and `interactiveWidget: "resizes-content"`.
- **Safe Area Insets**: Use Tailwind v4 custom utilities (`pt-safe`, `pb-safe`, `pl-safe`, `pr-safe`, `px-safe`) for fixed headers, bottom sheets, and navigation bars.
- **Touch Target Minimum**: Every button, tab, and clickable control must satisfy the 44x44px target size (`min-h-[44px]` or `min-w-[44px]`).
- **iOS Zoom Prevention**: Keep input font size at or above 16px on mobile screens (< 768px).
- **Vaul Sheets**: `src/components/account-sheet.tsx` uses `vaul`; follow its responsive and accessible patterns when extending sheets.
- **Shared UI State**: `src/store/use-ui-store.ts` manages the account sheet. Use a shared store only when state must be coordinated across components.

---

## 📂 Project Map

Use this short map to find the current code; inspect the directory for the exact files before editing.

| Area                                | Current location                                                                                                           |
| :---------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| App Router pages and APIs           | `src/app/` (`mufredat`, `hedefler`, `duzenle`, `api/auth`, `api/curriculum`, `api/editor`)                                 |
| Shared interface                    | `src/components/` (`curriculum-archive.tsx`, `curriculum-page-content.tsx`, `account-sheet.tsx`, `konu-lesson-reader.tsx`) |
| Authentication and database         | `src/lib/auth.ts`, `src/lib/auth-client.ts`, `src/lib/db.ts`, `src/lib/curriculum-db.ts`, `src/lib/editor/`                |
| Curriculum and annual plans in code | `src/lib/data/`, especially `curriculum-plans.ts` and `konu-curriculum.ts`                                                 |
| Client state and remote queries     | `src/store/`, `src/lib/queries/`, `src/lib/query-client.ts`, `src/providers/query-provider.tsx`                            |
| Source plans and writing guidance   | `mufredat-docs/planlar/M1_Yillik_Plan.md` through `M6_Yillik_Plan.md`, `mufredat-docs/planlar/MUFREDAT-INSTRUCTIONS.md`    |
| Source research                     | `.agents/skills/mufredat-kaynak-arama/SKILL.md`, `scripts/search-sources.ts`, `scripts/index-sources.py`, local `sources/` |
| Content export/import               | `scripts/` (import/export scripts when curriculum batches are prepared)                                                    |
| Deployment                          | `Dockerfile`, `docker-compose.yml`, `scripts/deploy.sh`, `docs/tailscale.md`                                               |

The yearly Markdown plans are authoritative for the lesson topic, question, outcomes, and primary source. Read `mufredat-docs/planlar/README.md` for document precedence. The original DOCX files were removed after migration verification; use Markdown for current plans. `src/lib/data/curriculum-plans.ts` is a partial application representation; compare it with the relevant Markdown plan before changing curriculum content and keep it aligned when plan fields change. Source PDFs and generated exports can be local or ignored, so check their presence instead of assuming they are committed.

---

## 🛠️ Essential Command Reference

| Task                   | Command                                  |
| :--------------------- | :--------------------------------------- |
| Start Dev Server       | `bun dev`                                |
| Run Test Suite         | `bun run test`                           |
| Run Specific Test      | `bun test src/lib/query-client.test.ts`  |
| Lint Code              | `bun run lint`                           |
| Check Code Formatting  | `bun run format:check`                   |
| Auto-fix Formatting    | `bun run format`                         |
| Production Build       | `bun run build`                          |
| Better-Auth Migration  | `bun run db:migrate`                     |
| Curriculum Status      | `bun run curriculum list`                |
| Curriculum Save Batch  | `bun run curriculum save --week N -f ..` |
| Curriculum Publish     | `bun run curriculum publish --week N`    |
| Curriculum Export      | `bun run curriculum export --week N`     |
| Curriculum Delete Week | `bun run curriculum delete --week N`     |

---

## 🧪 Testing Guidelines for Agents

- Use `bun:test` (`describe`, `expect`, `it`, `mock`).
- Write tests alongside implementation files (e.g., `feature.ts` -> `feature.test.ts`).
- Avoid mocking React DOM unless necessary; test query functions, hooks, state stores, and validation logic directly.
- Mock network calls with `globalThis.fetch = mock(...)` and restore the original fetch in `finally` blocks.
