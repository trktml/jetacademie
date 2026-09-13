<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# JetAcademie Agent & LLM Guidance

This repository is **JetAcademie**, a full-stack Next.js 16 application with Bun, Tailwind CSS v4, Zustand v5, TanStack Query v5, Zod v4, Better-Auth (Bun SQLite), Prettier, and Docker/Dokploy.

This guide provides authoritative rules and conventions for AI coding agents working on this project.

---

## ⚡ Non-Negotiable Core Rules

1. **Bun Runtime Only**: Always run commands using `bun` (e.g. `bun install`, `bun dev`, `bun test`, `bun run build`). Never execute `npm`, `yarn`, or `pnpm`.
2. **Preserve Next.js Auto-Block**: The `<!-- BEGIN:nextjs-agent-rules -->` block above must NEVER be deleted or modified.
3. **Quality Verification Loop**: Before declaring any coding task complete, execute and verify:
   - `bun test` (All unit tests must pass)
   - `bun run lint` (Zero ESLint errors or warnings)
   - `bun run format:check` (Prettier compliance; run `bun run format` to auto-fix)
   - `bun run build` (Next.js type-checking and standalone build must succeed)
4. **Git Commit Format**: Suggest or use Conventional Commits:
   - Format: `type(scope): description`
   - Examples: `feat(query): add tanstack query provider and demo`, `fix(auth): handle invalid credentials error`

---

## 🏛️ Architecture & State Management Strategy

### 1. Client State vs. Server State Separation

- **Client/UI State (Zustand)**:
  - Use Zustand stores (`src/store/*.ts`) exclusively for transient client-side UI state (e.g., modals, active sidebar, theme toggles, local step trackers).
  - Define stores with TypeScript interfaces and export custom hooks (`useCounterStore`, etc.).
- **Server State (TanStack Query v5)**:
  - Use TanStack Query (`@tanstack/react-query`) for all remote server data fetching, mutations, caching, and cache invalidation.
  - Wrap components inside `<QueryProvider>` (already configured at `src/app/layout.tsx`).
  - Access the QueryClient using `getQueryClient()` from `@/lib/query-client`.
  - For query definitions, prefer `queryOptions({ queryKey: [...], queryFn: ... })` (see `src/lib/queries/health.ts`).

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
- **Isomorphic Fetching**: Server-side queries must resolve absolute URLs. Use `getBaseUrl()` from `@/lib/queries/health` (or configure `NEXT_PUBLIC_APP_URL`) so fetches do not fail with relative URL errors during SSR.

### 3. Validation (Zod v4)

- Keep Zod schemas organized in `src/lib/validations/`.
- Infer TypeScript types directly from schemas:
  ```ts
  export const mySchema = z.object({ ... });
  export type MyInput = z.infer<typeof mySchema>;
  ```

### 4. Authentication (Better-Auth + SQLite)

- Server instance: `src/lib/auth.ts` (configured with Bun SQLite adapter and auto-migration).
- React client: `src/lib/auth-client.ts` (`authClient`, `useSession`, `signIn`, `signUp`, `signOut`).
- Route handler: `src/app/api/auth/[...all]/route.ts`.
- Local DB: `./auth.sqlite` (ignored by Git).
- Production DB: `/app/data/auth.sqlite` (mounted via Dokploy persistent volume).
- Test DB: In-memory `:memory:` (automatically resolved in `NODE_ENV === "test"` to protect `./auth.sqlite` from being wiped during test runs).

### 5. Next.js 16 & React 19 Specifics

- Page & Layout route props (`params`, `searchParams`) are asynchronous `Promise` objects. Always `await` them.
- Root layout utilizes Next.js 16 `LayoutProps<"/">`.
- Default to React Server Components. Add `"use client"` only when components require browser hooks (`useState`, `useQuery`, `useCounterStore`, event handlers).

### 6. Mobile-First PWA & Accessibility Standards

- **Viewport Configuration**: Export `viewport: Viewport` from `src/app/layout.tsx` using `viewportFit: "cover"` and `interactiveWidget: "resizes-content"`.
- **Safe Area Insets**: Use Tailwind v4 custom utilities (`pt-safe`, `pb-safe`, `pl-safe`, `pr-safe`, `px-safe`) for fixed headers, bottom sheets, and navigation bars.
- **Touch Target Minimum**: Every button, tab, and clickable control must satisfy the 44x44px target size (`min-h-[44px]` or `min-w-[44px]`).
- **iOS Zoom Prevention**: Keep input font size at or above 16px on mobile screens (< 768px).
- **Vaul Bottom Sheet & Desktop Dialog**: Use `vaul` (`Drawer.Root`, `Drawer.Portal`, etc.) for sheets. Optimize layout on mobile (bottom sheet, drag handle) and desktop (floating modal container).
- **Zustand UI Store & Active Section**: Orchestrate UI modals, sheets, and active navigation tabs using `src/store/use-ui-store.ts` and `src/hooks/use-active-section.ts`.

---

## 📂 Project Map

```text
jetacademie/
├── .cursorrules                  # Cursor & IDE agent rules referencing AGENTS.md
├── AGENTS.md                     # Agent & LLM directives (preserve Next.js header!)
├── CLAUDE.md                     # Anthropic/Claude agent link pointing to AGENTS.md
├── Dockerfile                    # Multi-stage Bun production build
├── docker-compose.yml            # Dokploy / local Docker composition with healthcheck
├── package.json                  # Scripts & dependencies
├── README.md                     # Project documentation
├── tsconfig.json                 # Strict TypeScript configuration
├── public/                       # PWA icons & static assets
│   ├── icon-192.png              # PWA 192x192 icon
│   ├── icon-512.png              # PWA 512x512 icon
│   ├── icon-maskable-512.png     # PWA maskable 512x512 icon
│   ├── apple-touch-icon.png      # iOS home screen icon (180x180)
│   └── icon.svg                  # Vector brand icon
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/
│   │   │   ├── auth/[...all]/    # Better-Auth catch-all handler
│   │   │   └── health/           # Health check endpoint (/api/health)
│   │   ├── globals.css           # Tailwind CSS v4 directives, theme & safe-area utilities
│   │   ├── layout.tsx            # Root layout with Viewport, PWA metadata & QueryProvider
│   │   ├── manifest.ts           # Dynamic PWA Web App Manifest
│   │   ├── manifest.test.ts      # PWA Manifest unit tests
│   │   └── page.tsx              # Starter showcase page (responsive mobile & desktop)
│   ├── components/               # UI components
│   │   ├── app-header.tsx        # Responsive desktop & mobile header
│   │   ├── bottom-nav.tsx        # Mobile bottom navigation bar (pb-safe)
│   │   ├── quick-actions-drawer.tsx # Vaul bottom sheet drawer & desktop modal
│   │   ├── auth-zod-demo.tsx     # Zod + Better-Auth auth demo (min-h-[44px] targets)
│   │   ├── counter-demo.tsx      # Zustand state management demo (min-h-[44px] buttons)
│   │   └── query-demo.tsx        # TanStack Query useQuery/mutation demo
│   ├── hooks/                    # Custom React hooks
│   │   ├── use-active-section.ts # IntersectionObserver active section hook
│   │   └── use-active-section.test.ts # Active section hook tests
│   ├── lib/                      # Core utilities & configurations
│   │   ├── auth.ts               # Better-Auth server configuration
│   │   ├── auth.test.ts          # Better-Auth unit tests
│   │   ├── auth-client.ts        # Better-Auth client library
│   │   ├── query-client.ts       # TanStack QueryClient factory & SSR singleton
│   │   ├── query-client.test.ts  # TanStack QueryClient unit tests
│   │   ├── queries/              # Query definitions and fetchers (e.g. health.ts)
│   │   │   ├── health.ts         # Health query fetcher & queryOptions
│   │   │   └── health.test.ts    # Health query unit tests
│   │   └── validations/          # Zod schemas (e.g. auth.ts)
│   │       ├── auth.ts           # Auth validation schemas
│   │       └── auth.test.ts      # Auth schema validation tests
│   ├── providers/                # React Context providers
│   │   ├── query-provider.tsx    # TanStack QueryClientProvider & DevTools
│   │   └── query-provider.test.tsx # QueryProvider unit tests
│   └── store/                    # Zustand stores
│       ├── use-counter-store.ts      # Counter Zustand store
│       ├── use-counter-store.test.ts # Counter store unit tests
│       ├── use-ui-store.ts           # UI / Drawer state Zustand store
│       └── use-ui-store.test.ts      # UI store unit tests
```

---

## 🛠️ Essential Command Reference

| Task                   | Command                                 |
| :--------------------- | :-------------------------------------- |
| Start Dev Server       | `bun dev`                               |
| Run Test Suite         | `bun test`                              |
| Run Specific Test      | `bun test src/lib/query-client.test.ts` |
| Lint Code              | `bun run lint`                          |
| Check Code Formatting  | `bun run format:check`                  |
| Auto-fix Formatting    | `bun run format`                        |
| Production Build       | `bun run build`                         |
| Start Production Build | `bun start`                             |
| Better-Auth Migration  | `bun run db:migrate`                    |

---

## 🧪 Testing Guidelines for Agents

- Use `bun:test` (`describe`, `expect`, `it`, `mock`).
- Write tests alongside implementation files (e.g., `feature.ts` -> `feature.test.ts`).
- Avoid mocking React DOM unless necessary; test query functions, hooks, state stores, and validation logic directly.
- Mock network calls with `globalThis.fetch = mock(...)` and restore the original fetch in `finally` blocks.
