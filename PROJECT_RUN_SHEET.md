# PROJECT_RUN_SHEET — saragrahi_platform

> System document for the Saragrahi wellness practice marketing site. Repository: single-package Next.js application at repo root — not a monorepo. Last audited: 2026-07-06.

---

## 🏛️ CORE ARCHITECTURAL MATRIX

- **The Core Stack:**
  - **Frontend framework:** Next.js `16.2.9` (App Router exclusively; legacy `pages/` directory is empty after demo removal). React `19.2.4` / react-dom `19.2.4`.
  - **State management:** None at the application layer. Three isolated client islands use local `useState` only: `app/components/Nav.tsx` (mobile menu toggle), `app/components/PalmistryUploadForm.tsx` (file selection + submit stub), `app/components/WaitlistForm.tsx` (email stub — not mounted anywhere). No Redux, Zustand, Context, or data-fetching library in app code.
  - **Rendering strategy:** Default App Router static generation at `next build` time. All four route modules (`app/page.tsx`, `app/about/page.tsx`, `app/services/page.tsx`, `app/palmistry-intake/page.tsx`) are Server Components that emit static HTML. No `export const dynamic`, `revalidate`, `generateStaticParams`, `fetch()` cache directives, ISR, or edge runtime configuration. Client hydration is limited to Nav (global) and PalmistryUploadForm (route-local). Third-party Acuity Scheduling iframes render client-side post-hydration via `next/script` with `strategy="afterInteractive"`.
  - **Styling system:** Tailwind CSS v4 (`tailwindcss ^4`, `@tailwindcss/postcss ^4`) imported via `@import "tailwindcss"` in `app/globals.css`. Design tokens declared in `:root` CSS variables and bridged into Tailwind via `@theme inline` (`--color-background`, `--font-sans`, etc.). Palette is hard-coded in utility classes (`#fcfbf9` background, `#334155` foreground, `#8b7355` accent). Typography via `next/font/google` — Geist Sans + Geist Mono self-hosted in `app/layout.tsx`. No CSS Modules, styled-components, or component library.
  - **Database / CMS layer:** No database, ORM, or API backend. Content management is **TinaCMS `^3.9.3`** (git-backed Markdown in `content/posts/`, schema in `tina/config.ts`, admin UI output target `public/admin/`). Tina is **partially integrated**: dev runs via `tinacms dev`, but production `build` script skips `tinacms build`; no frontend route consumes `content/posts/*.md`. Booking flows delegate to **Acuity Scheduling** (owner `14259136`, appointment types `28700185` palmistry, `94852568` trauma consulting) embedded as iframes in `app/services/page.tsx`.
  - **Deployment targets:** **Vercel** (primary; README + `.gitignore` entry for `.vercel`). No Docker, no `vercel.json`, no CI workflows (`.github/workflows/` absent). Remote: `https://github.com/sesanaag/saragrahi-platform.git`.

- **Critical Dependencies & Decoupling:**
  1. **`next@16.2.9`** — Owns routing (`app/` file-system router), metadata API (`app/layout.tsx` `export const metadata`), image optimization (`next/image` on `/saragrahi-logo.jpg` with `priority` on LCP elements), font inlining (`next/font`), and deferred third-party script loading (`next/script`). The entire site lifecycle is `next dev` → `next build` → `next start`; no custom server or middleware layer exists.
  2. **`tinacms@^3.9.3` + `@tinacms/cli@^2.5.1`** — Wired in `tina/config.ts` with branch resolution chain (`GITHUB_BRANCH` → `VERCEL_GIT_COMMIT_REF` → `HEAD` → `"main"`). Dev script runs `TINA_PUBLIC_IS_LOCAL=true tinacms dev -c "next dev"`, spawning a local GraphQL server alongside Next. Production build **decoupled** from Tina: `build` was changed from `tinacms build && next build` to `next build` only (commit `91585b9`) to avoid `TINA_TOKEN` auth failures on Vercel. Admin assets in `public/admin/` are stale artifacts; `tina/__generated__` is gitignored.
  3. **`tailwindcss@^4`** — PostCSS pipeline in `postcss.config.mjs` (`@tailwindcss/postcss` plugin). Zero runtime CSS-in-JS; all styles compile to static CSS at build. Token system in `globals.css` keeps palette changes centralized without touching component files.
  4. **Acuity Scheduling (external, not NPM)** — Integrated as raw iframe embeds + `https://embed.acuityscheduling.com/js/embed.js`. No Acuity SDK package; booking state, payment, and calendar logic live entirely inside Acuity's origin. The site only controls viewport geometry via the `CompactAcuityEmbed` wrapper in `app/services/page.tsx`.

---

## ⚡ MEASURE TWICE, CUT ONCE: COMPLETED WINS & METRICS

- **Quantifiable Performance Wins:**
  - **Client JS surface minimization:** 3 of 10 application TSX files carry `"use client"` (~30% file-level client boundary). All page shells (`page.tsx` × 4) and `Footer.tsx` remain Server Components — page content ships as zero-hydration HTML. Estimated client bundle is confined to Nav (~100 LOC), PalmistryUploadForm (~120 LOC), and React runtime overhead; no data-fetching or state-management libraries in direct dependencies.
  - **Acuity embed viewport compression (commit `7356ea8`):** Clipped embed container reduced from `h-[380px]` to `h-[280px]` — **26.3% vertical footprint reduction** on the services page (two embeds). Iframe negative margin increased from `-mt-[80px]` to `-mt-[140px]`, cropping an additional 60px of Acuity chrome (header/nav within iframe). Removed nested scroll wrapper (`<div className="h-full overflow-y-auto">`) in favor of single `overflow-y-auto overscroll-contain` container — one fewer DOM node per embed, reduced scroll-event bubbling.
  - **LCP optimization:** `next/image` with `priority` on hero logo (`app/page.tsx`, 200×200) and nav logo (`app/components/Nav.tsx`, 36×36) — signals Next.js to preload above-the-fold images and bypass lazy-loading deferral.
  - **Font pipeline:** `next/font/google` inlines Geist Sans/Mono as CSS variables (`--font-geist-sans`, `--font-geist-mono`) — eliminates external Google Fonts DNS lookup + render-blocking `<link>` on critical path.
  - **Third-party script deferral:** Acuity `embed.js` loaded via `next/script strategy="afterInteractive"` — executes after hydration, keeping main thread free during First Contentful Paint.
  - **Build pipeline slimming:** Removing `tinacms build` from production `build` script eliminates Tina admin bundle regeneration (~thousands of transitive deps including Zustand, Redux, TanStack Table pulled only by Tina). Removing `pages/demo/blog/[filename].tsx` (218 LOC, commit `c42ee17`) eliminated the hybrid Pages Router + Tina GraphQL client fetch layer from the build graph.
  - **Static data structures:** Home page `PILLARS` array declared `as const` in `app/page.tsx` — TypeScript narrows literal types at compile time with zero runtime object mutation; pillar config is tree-shaken into static HTML during SSG.
  - **Computed architecture efficiency:** 4 routes × 100% Server Component page shells = **0 KB client JS per route content** (excluding global Nav island). External booking/payment logic offloaded to Acuity origin — **100% of transactional state externalized**, zero API routes in `app/api/`.

- **Type Safety & Data Integrity:**
  - **TypeScript `strict: true`** (`tsconfig.json`) with `moduleResolution: "bundler"`, path alias `@/*` → `./*`, `noEmit: true` (type-check only, Next handles emit). All component props use inline typed interfaces: `Credential`, `PortraitPlaceholder`, `CompactAcuityEmbed`, `PhotoExampleCard`, `TagStrip`.
  - **ESLint TypeScript gate:** `eslint.config.mjs` extends `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript` — enforces React hooks rules, Next.js image/link conventions, and TS-aware linting. No dedicated `typecheck` script; `tsc --noEmit` is implicit via Next build.
  - **TinaCMS schema validation:** `tina/config.ts` defines `post` collection with `title` field `required: true`, `isTitle: true`; `body` as `rich-text` with `isBody: true`. Schema locked in `tina/tina-lock.json` (committed). Content files (`content/posts/hello-world.md`) use YAML frontmatter matching schema. No runtime Zod/Prisma/Pydantic in app code — Tina validates at CMS edit time; app does not yet consume validated content at runtime.
  - **Client form state typing:** `PalmistryUploadForm` uses discriminated union `useState<"idle" | "submitted">` — prevents invalid status transitions at compile time. File input constrained via `accept="image/*"` + `multiple` HTML attributes (browser-level validation; no server-side upload validation exists yet).
  - **Navigation link typing:** `NAV_LINKS` declared `as const` with `external: false` discriminant — enables conditional spread of `target`/`rel` attributes without runtime type checks.

---

## 💥 THE PROBLEM/SOLUTION LOG (THE WAR STORIES)

### War Story 1: TinaCMS Production Build Blocked Vercel Deployments

- **The Friction Point:** Commit `0b073fc` introduced TinaCMS with `build: "tinacms build && next build"`. Vercel CI failed because `tinacms build` requires `TINA_TOKEN` (read token) and `NEXT_PUBLIC_TINA_CLIENT_ID` for Tina Cloud authentication — secrets not configured in the Vercel project. The build hung/failed before `next build` could execute, blocking all deployments. Additionally, the demo blog route `pages/demo/blog/[filename].tsx` created a hybrid App Router + Pages Router setup that pulled Tina's GraphQL client into the production bundle.
- **The Engineering Answer:** Three-commit rollback sequence: (1) `91585b9` — stripped `tinacms build` from `package.json`, leaving `build: "next build"` only; (2) `63825b5` — pinned `TINA_PUBLIC_IS_LOCAL=true` in the `dev` script so local development bypasses cloud token requirements; (3) `c42ee17` — deleted `pages/demo/blog/[filename].tsx` (218 lines) and its Tina data-fetching layer entirely. Tina config (`tina/config.ts`) and content (`content/posts/`) remain for future re-integration, but production deploys are fully decoupled from Tina's auth lifecycle. Admin UI at `/admin` serves stale pre-built assets from `public/admin/`.

### War Story 2: Acuity Scheduling Embed Dominated Page Layout

- **The Friction Point:** Acuity's default iframe renders a full calendar UI (~800px tall) with owner branding, navigation tabs, and appointment-type selector chrome. Embedding two full-height iframes on `/services` pushed booking sections below the fold and broke the site's restrained visual rhythm (max content width `max-w-4xl`, light typography). The initial clipped wrapper (`0b073fc`) used `h-[380px]` with `-mt-[80px]` — still left ~100px of unwanted Acuity header visible, and the nested scroll container caused scroll-jank on mobile (`overscroll` propagated to parent).
- **The Engineering Answer:** Built `CompactAcuityEmbed` component with a `clipped` boolean prop. Clipped mode applies a CSS viewport mask: fixed container `h-[280px] max-h-[280px]`, iframe `height={500}` with `-mt-[140px]` to shift Acuity's header out of the visible window, `overflow-x-hidden` to clip horizontal scrollbar, `overscroll-contain` to trap scroll events inside the embed. Non-clipped mode (`h-[500px]`, full iframe) retained for future use but unused in production. Iterative tuning: 380px → 280px container, -80px → -140px offset (commit `7356ea8`). Acuity `embed.js` deferred via `next/script strategy="afterInteractive"` so iframe resize logic doesn't block initial paint.

### War Story 3: Mobile Navigation Was Non-Functional

- **The Friction Point:** Initial `Nav` component (`8d1794c`) rendered a hamburger button on viewports `< md` but had no click handler, no state, and no mobile menu panel — users on mobile/tablet could not reach `/services`, `/about`, or the Academy link. With 3 of 4 routes unreachable on mobile, the site failed basic navigation UX on the primary traffic device class.
- **The Engineering Answer:** PR #1 (`cca12a0`, merged `f3345c6`) converted `Nav` to a Client Component (`"use client"`), added `useState<boolean>` for `isOpen`, wired `onClick` toggle on the hamburger button with `aria-label`/`aria-expanded` for accessibility, and conditionally rendered a mobile dropdown panel (`md:hidden`) listing all `NAV_LINKS` plus the Academy external link. Each mobile link calls `setIsOpen(false)` on click to collapse the menu post-navigation. Desktop nav (`hidden md:flex`) unchanged — single component serves both breakpoints with minimal client JS (~15 lines of state logic).

---

## 🔗 LOCAL INFRASTRUCTURE & AUTOMATION HOOKS

- **Runtime Variables:**

  | Variable | Format | Required | Purpose |
  |----------|--------|----------|---------|
  | `TINA_PUBLIC_IS_LOCAL` | `true` | Dev only (set in `dev` script) | Forces TinaCMS local GraphQL mode; bypasses cloud auth |
  | `NEXT_PUBLIC_TINA_CLIENT_ID` | `string` (UUID) | Tina Cloud / `tinacms build` | Tina Cloud project client ID |
  | `TINA_TOKEN` | `string` (bearer token) | Tina Cloud / `tinacms build` | Tina Cloud read token for content API |
  | `GITHUB_BRANCH` | `string` (branch name) | Optional | Tina content branch override |
  | `VERCEL_GIT_COMMIT_REF` | `string` (branch name) | Auto on Vercel | Tina branch resolution (injected by Vercel) |
  | `HEAD` | `string` (branch name) | Optional | Generic branch fallback for Tina |

  No `.env.example` is committed. `.gitignore` excludes `.env*`. No environment variables required for Acuity embeds (owner/appointment IDs are hard-coded in `app/services/page.tsx` URLs), file uploads, email waitlist, or analytics.

  **Setup dependencies:**
  - Node.js (compatible with Next.js 16; `@types/node ^20`)
  - npm (lockfile: `package-lock.json`)
  - `npm install` from repo root
  - Optional: Tina Cloud account + token pair for full CMS workflow

- **Build & Test Pipelines:**

  | Command | Script | What it does |
  |---------|--------|--------------|
  | `npm run dev` | `TINA_PUBLIC_IS_LOCAL=true tinacms dev -c "next dev"` | Starts Tina local GraphQL + Next.js dev server (default `http://localhost:3000`) |
  | `npm run build` | `next build` | Production static build; outputs to `.next/` |
  | `npm run start` | `next start` | Serves production build |
  | `npm run lint` | `eslint` | ESLint flat config (`eslint.config.mjs`); ignores `.next/`, `out/`, `build/` |

  **Validation gates present:**
  - ESLint with `eslint-config-next/core-web-vitals` (performance + accessibility rules for Next.js)
  - TypeScript `strict` mode (enforced at build time by Next.js compiler)
  - Tina schema lock file (`tina/tina-lock.json`) prevents schema drift in CMS config

  **Validation gates absent:**
  - No `test` script — no Jest, Vitest, Playwright, or Cypress
  - No `typecheck` script (`tsc --noEmit` not in CI)
  - No Prettier/format script
  - No GitHub Actions, GitLab CI, or pre-commit hooks
  - No `error.tsx`, `not-found.tsx`, or error boundaries
  - No bundle analyzer or Lighthouse CI

  **Route map for manual verification:**

  | Route | Component | Nav-linked |
  |-------|-----------|------------|
  | `/` | `app/page.tsx` | Yes |
  | `/services` | `app/services/page.tsx` | Yes |
  | `/about` | `app/about/page.tsx` | Yes |
  | `/palmistry-intake` | `app/palmistry-intake/page.tsx` | No (orphan route) |
  | `/admin` | `public/admin/index.html` | No (stale Tina admin) |

  **Known incomplete features (verify before treating as production-ready):**
  - `PalmistryUploadForm` — client-only stub; no upload API, no storage backend
  - `WaitlistForm` — exists but not imported on any route
  - Tina blog content — no frontend route reads `content/posts/`; router in `tina/config.ts` still points to deleted `/demo/blog/${filename}`
  - Practitioner portraits — `PortraitPlaceholder` components on `/about`; no images in `public/`
  - `saragrahi-logo.jpg` referenced in Nav/Footer/Home but not present in tracked `public/` directory (may be untracked local asset)
