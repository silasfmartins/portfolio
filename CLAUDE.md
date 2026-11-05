# CLAUDE.md

## Executive context
This repository is a personal portfolio built with Next.js App Router and Hygraph as CMS.
The product goal is to present:
- Home overview (hero, skills, highlighted projects, experience, education)
- Projects listing
- Project detail pages
- Contact form

The frontend was modernized in **April 2026** (patterns from the `AutoCore Hub` web frontend) and aligned in **October 2026** with the UI rules of Cortix (`~/Programacao/Pessoal/barbearia/web`) and Marmitix (`~/Programacao/Pessoal/marmitix/web`), keeping the portfolio identity and existing content.

Production: https://silasmartins.vercel.app (Vercel, deploys from `main`).

## Technical baseline
- Runtime: Next.js 16.4 + React 19.3 on Node 26
- Package manager: pnpm 11 (pinned in `package.json#packageManager`; Vercel runs the same version)
- Language: TypeScript 7 (strict, `target`/`lib` from the Node 26 preset)
- Styling: Tailwind CSS v4, CSS-first (`@theme inline` in `globals.css`, no `tailwind.config`) + CSS variables for design tokens
- Component styling: `tailwind-variants` (`tv`) for components with variants; `tailwind-merge` (`cn`) only for components without variants
- Lint/format: Biome + Ultracite (no Prettier)
- Animations: Framer Motion
- Forms: react-hook-form + zod
- URL state: nuqs (`NuqsAdapter` in `Providers.tsx`)
- Tests: Playwright + axe (`e2e/`, against the production build); CI in `.github/workflows/ci.yml`
- i18n: next-intl (`pt-BR`, `en`)
- Theme: custom provider (`src/components/theme-provider.tsx`)
- Content: Hygraph GraphQL API, read on the server and cached for 1 day (`unstable_cache`)
- Rendering: `cacheComponents` + `partialPrefetching`; home and projects pages are static (`○`), project detail is Partial Prerender (`◐`)

## Important files
- Global layout and providers:
  - `src/app/[locale]/layout.tsx`
  - `src/app/[locale]/Providers.tsx`
  - `src/app/[locale]/globals.css`
- i18n and routing:
  - `src/i18n.ts`
  - `src/i18n/request.ts`
  - `src/i18n/routing.ts`
  - `src/navigation.ts`
  - `src/proxy.ts`
  - `messages/pt-BR.json`
  - `messages/en.json`
- Pages and data:
  - `src/app/[locale]/page.tsx` (home query)
  - `src/app/[locale]/projects/projects-content.tsx` (paginated projects query, shared by `/projects` and `/projects/page/[page]`)
  - `src/app/[locale]/projects/[slug]/page.tsx` (project detail query)
- CMS data contracts:
  - `src/types/page-info.ts`
  - `src/types/projects.ts`
  - `src/utils/fetch-hygraph-query.ts`
  - `src/lib/hygraph-locale.ts`
  - `src/lib/fallback-content.ts`
- UI primitives:
  - `src/components/ui/*` (barrel `index.ts`, `cn.ts`)
  - `src/components/ui/CLAUDE.md` (component pattern, read before creating or changing a component)
- CMS rendering helpers:
  - `src/components/CMSIcon` (sanitizes and normalizes `iconSvg` markup)
  - `src/components/RichText` (Hygraph rich text, `tone="overlay"` over photos)
  - `src/components/ProjectsPagination` (projects page navigation)
  - `src/components/ProjectsSearch` (search and technology filter, `?q=` and `?tech=`)
- Quality:
  - `e2e/*.spec.ts`, `playwright.config.ts`
  - `scripts/i18n-check.mjs` (`pnpm i18n:check`)

## Architecture notes
1. **Locale-first routing**
   - All pages are served under `/[locale]`.
   - Locale handling must remain compatible with `next-intl` middleware.

2. **Server data fetching**
   - Page data is fetched on the server from Hygraph.
   - Keep cache/revalidate behavior stable unless intentionally changing performance characteristics.
   - Hygraph caps every list (top-level and nested) at 10 items: every list field asks for `first: 100`.
   - Fetch inside `unstable_cache`; catch and fall back in the request-level `cache()` wrapper, so a failure (e.g. a 429) is never cached.
   - Projects page: 9 per page (`PROJECTS_PER_PAGE`, a full 3-column grid), page 1 at `/projects`, pages 2..N at `/projects/page/[page]`. One cached query reads all projects (`first: 100`); pages are sliced on the server. Pagination stays in route segments, not `searchParams`, to keep pages static.
   - Projects search (nuqs): `SearchPanel` covers all projects and is loaded with `ssr: false`, because reading the URL during prerender would make the routes dynamic. The prerendered grid stays in the HTML and is hidden through CSS (`group-has-[[data-search-active]]`) while a search is active.
   - Home "Conhecimentos" shows `KNOWN_TECHS_STEP` (9) items and a "Ver mais"/"Ver menos" button reveals the next batch client-side (`src/components/KnowTechs`). Hidden items stay in the HTML (`hidden`) so the home stays static and fully indexed; route pagination is only for the projects page.
   - After touching a page, `pnpm build` must still list `/pt-BR`, `/en` and their `/projects` as `○`.

3. **Design system direction** (same rules as Cortix and Marmitix web)
   - Use semantic tokens (`--background`, `--foreground`, `--primary`, etc.). Tokens are HSL triplets in `:root`/`.dark` and become Tailwind colors through `@theme inline`; a new token needs both.
   - No fixed colors in screens (`bg-zinc-900`, `#fff`, `rgba(...)`); the only exception is content over photos (project detail hero).
   - Prefer composition from base UI primitives, imported from `@/components/ui`.
   - Components with variants use `tv` (`xVariants` + `XProps`, `className` inside the `tv` call, no `cn`); components without variants use `cn`. Full pattern in `src/components/ui/CLAUDE.md`.
   - Named exports only (except `page.tsx`/`layout.tsx`/config files).
   - Links that look like buttons use `buttonVariants(...)`; never nest `<Button>` inside a link.
   - Keep strong responsive behavior and avoid desktop-only assumptions.

4. **Motion system**
   - Use Framer Motion for staged reveals and section transitions.
   - Keep animations subtle and not blocking interaction.

5. **CMS content rules**
   - Tech and social icons come as SVG text (`iconSvg`). Single-color icons become `currentColor` and `1em`; multi-color icons keep their colors. Prefer single-color SVGs with `fill="currentColor"`.
   - Each locale (`pt_BR`, `en`) stores its own copy of localized fields; fix content in both.
   - Content fixes take up to 1 day to show in production (cache). Locally, delete `.next/cache/fetch-cache` to see them.

## Known issue and fix log
- **Issue (April 1, 2026):** `pnpm dev` failed with
  `[next-intl] Could not locate request configuration module`.
- **Fix applied:** `next.config.mjs` updated to use
  `createNextIntlPlugin('./src/i18n/request.ts')`.
- **Decision (April 1, 2026):** Axios usage is disallowed in this repository.
  All HTTP calls must use native `fetch`.
- **Issue (April 1, 2026):** invalid locale errors from `pt_BR` with `next-intl` v4.
- **Fix applied:** migrated route locale to `pt-BR` and added proxy redirect for legacy URLs.
- **Issue (April 1, 2026):** local dev crash when Hygraph env vars are missing.
- **Fix applied:** explicit env validation in fetch layer + safe fallback content for home/projects.
- **Issue (April 1, 2026):** React console error from script tag inside theme provider.
- **Fix applied:** replaced `next-themes` wrapper with a custom theme provider hook/context without runtime script injection.
- **Issue (April 1, 2026):** runtime image error for Hygraph asset host `sa-east-1.graphassets.com`.
- **Fix applied:** added host to `images.remotePatterns` in `next.config.mjs`.
- **Issue (April 1, 2026):** runtime crash when Hygraph returned `null` for `workExperiences.description`.
- **Fix applied:** made description nullable in types and guarded rendering in experience item component.
- **Issue (April 1, 2026):** layout looked left-biased on wide screens because `.container` lacked centering/padding.
- **Fix applied:** added global `.container` override with `margin-inline: auto` and responsive horizontal padding in `src/app/[locale]/globals.css`.
- **Issue (April 3, 2026):** project required parity with newer Next.js rendering/caching patterns from AutoCore Hub.
- **Fix applied:** adopted `Suspense` + `React.use()` in App Router layout/pages, added locale `generateStaticParams`, and cached CMS page fetches with `unstable_cache` (1-day revalidate).
- **Issue (April 3, 2026):** prerender failed when Hygraph returned null image references in projects.
- **Fix applied:** made project image fields nullable in types and added `/images/hero-bg.png` fallbacks in project cards/details/sections components.
- **Issue (April 3, 2026):** request-bound i18n calls in locale layout could suspend sequentially and create waterfalls.
- **Fix applied:** changed locale provider to start `getMessages` + `getTranslations` together via `Promise.all` and unwrap once with `use()`.
- **Issue (April 3, 2026):** some shared components were receiving many primitive props, increasing prop drilling and coupling.
- **Fix applied:** applied composition pattern:
  - `Providers` reduced to a composition shell (`children` only)
  - `layout.tsx` now composes structural blocks (`Header`, `main`, `ContactForm`, `Footer`) directly
  - `ContactForm` migrated to `children` slot for heading + grouped `copy` object for labels/messages
- **Issue (April 3, 2026):** request requested compound components with shared context and stronger async deduplication per request.
- **Fix applied:**
  - `ContactForm` migrated to compound+context architecture (`Root`, `Title`, `Panel`, `Form`, `Fields`, `SubmitButton`) with shared form/copy state through React Context.
  - To stay compatible with App Router server boundaries, layout now imports compound parts as named client exports (instead of static object property access across RSC boundary).
  - Added React `cache()` wrappers for request-scoped deduplication of i18n and page async reads while keeping `unstable_cache` for cross-request caching.
- **Issue (April 3, 2026):** avoid unnecessary state-like recalculation when values can be derived on render.
- **Fix applied:** derived `Header` navigation items directly during render (removed `useMemo` indirection).
- **Issue (April 3, 2026):** avoid effect-driven derived state in theming flow.
- **Fix applied:** removed `resolvedTheme` state from theme provider and derive it during render from `theme` + system preference (`useSyncExternalStore`); removed `ThemeSwitcher` mounted gate state/effect.
- **Issue (April 3, 2026):** request asked to leverage React 19.2 `<Activity>` where it improves UX/performance.
- **Fix applied:**
  - Header mobile menu now uses `<Activity mode={menuOpen ? "visible" : "hidden"}>` instead of unmounting, preserving subtree state and reducing remount churn.
  - Home/projects/project-detail pages now wrap major sections in always-visible Activity boundaries to provide clearer hydration split points while keeping the same UI.
- **Issue (April 3, 2026):** request asked for stronger loading UX in Suspense boundaries and standardized Next request/response types in route handlers.
- **Fix applied:**
  - Contact API route switched from `Request` to `NextRequest` and returns structured `NextResponse.json` for server errors.
  - Added reusable skeleton building blocks (`ui/skeleton`) and dedicated fallback components under `src/components/Skeletons`.
  - Suspense fallbacks now render explicit skeleton screens with loading status text in locale layout, home, projects, and project details.
- **Issue (October 30, 2026):** Vercel build failed on `pnpm install` (`packages field missing or empty`) after a dependency upgrade done with npm.
- **Fix applied:** pinned `packageManager: pnpm@11.28.10`, removed `package-lock.json`, regenerated `pnpm-lock.yaml`; `tsconfig.json` moved to the Node 26 preset target/lib (TypeScript 7 dropped `es5`); `profilePicture` made nullable with hero fallback image.
- **Issue (October 30, 2026):** Tailwind v4 was ignoring `tailwind.config.mjs` (no `@config`), so token utilities (`bg-primary`, `bg-card`, `text-muted-foreground`, `border-border`, custom radius/fonts/shadows) were missing from production CSS.
- **Fix applied:** theme moved to `@theme inline` + `@custom-variant dark` in `globals.css`, `tailwind.config.mjs` deleted, `next/font` variables renamed to `--font-manrope`/`--font-jetbrains-mono` to avoid clashing with Tailwind's `--font-sans`/`--font-mono`.
- **Decision (October 30, 2026):** UI follows the Cortix/Marmitix component pattern (`tailwind-variants` + `tailwind-merge`, barrel `@/components/ui`, named exports, tokens only).
- **Fix applied:** `ui/*` rewritten with `tv`/`cn`, `src/lib/utils.ts` and the `components/Button` re-export removed, `<Button>` inside links replaced by `buttonVariants`, contact submit given `type="submit"`, hardcoded colors replaced by tokens (`--success`, `shadow-card`, `shadow-elevated`), dead `SoftSkills` and unused assets removed, Prettier removed.
- **Issue (October 30, 2026):** Next warned that `cacheComponents` was enabled without `partialPrefetching`.
- **Fix applied:** `partialPrefetching: true` (no `<Link prefetch={true}>` to migrate). The project detail page now awaits `params` inside its Suspense child so the App Shell is shared across slugs. Home and projects list keep `use(params)` at the top: `locale` comes from `generateStaticParams`, and moving it into Suspense turned those routes from Static into Partial Prerender.
- **Issue (October 31, 2026):** CMS tech icons (`iconSvg`) came with fixed colors (`#ffffff`, invisible in the light theme) and fixed sizes (Playwright 24px).
- **Fix applied:** `CMSIcon` normalizes the markup: single-color icons switch to `currentColor`, multi-color brand icons (Spring) keep their colors, every icon gets `1em` and `aria-hidden`. The PostgreSQL icon path has a typo in Hygraph (`3a7.800781` must be `37.800781`); that is a content fix, not a code one.
- **Issue (October 31, 2026):** projects page showed only 10 of 14 projects, and Minha Cidade+ showed 10 of 11 technologies.
- **Fix applied:** Hygraph returns 10 items by default for top-level and nested lists. Every list field in the home, projects and project-detail queries now asks for `first: 100`.
- **Decision (October 31, 2026):** projects page paginated at 10 per page with static routes: page 1 at `/projects`, pages 2..N at `/projects/page/[page]` (prerendered via `generateStaticParams` from `projectsConnection.aggregate.count`). Shared query and content in `src/app/[locale]/projects/projects-content.tsx`; nav in `src/components/ProjectsPagination`. Route segments are used instead of `?pagina=` to keep the pages static. (Since November 5 the page count comes from the single all-projects query.)
- **Decision (November 1, 2026):** `PROJECTS_PER_PAGE` changed from 10 to 9 so each page fills the 3-column grid (matches the home knowledge section).
- **Issue (October 31, 2026):** a Hygraph 429 (burst rate limit during a parallel local build) returned fallback content, and the fallback was stored by `unstable_cache` for 1 day because the try/catch lived inside the cached function.
- **Fix applied:** cached functions now only fetch; the try/catch with fallback moved to the request-level `cache()` wrappers (home, projects, project detail), so failures are never cached.
- **Decision (November 5, 2026):** projects search uses nuqs in a browser-only island (`ssr: false`), so `/projects` routes stay static (`○`). `axe` runs in `e2e/acessibilidade.spec.ts` in both themes; keep it green.

## Working history snapshot
### April 1-3, 2026 - modern frontend phase
- Dependency upgrade and lock refresh (`package.json`, `pnpm-lock.yaml`, `tsconfig.json`)
- Theme/design token foundation expanded (`tailwind.config.mjs`, `src/app/[locale]/globals.css`)
- Shared UI primitives added (`src/components/ui/*`)
- Theme provider adapter added (`src/components/theme-provider.tsx`)
- Multiple portfolio sections refactored to newer visual patterns:
  - Header/navigation and controls
  - Hero
  - Skills and highlighted projects
  - Experience and education blocks
  - Contact, footer, toaster, utility components
- Axios removed end-to-end:
  - Client contact submit now uses `fetch`
  - API webhook delivery now uses `fetch`
  - Axios removed from all dependency manifests and lockfiles
- Biome + Ultracite toolchain adopted:
  - `biome.jsonc` extends `ultracite/biome/core` and `ultracite/biome/next`
  - scripts now use `ultracite check` and `ultracite fix`
- Runtime hardening pass with live CMS content:
  - Theme handling moved off `next-themes` to avoid script-tag console errors
  - Hygraph region image domain allowed in Next image config
  - Home/projects fallback logs now include real Hygraph error reason
  - Work experience description rendering now tolerates `null` content
- Layout alignment pass:
  - Global `.container` centering and spacing normalized for consistent viewport-centered sections
- Next.js rendering/caching parity pass:
  - `layout.tsx` migrated to `use(params)` with Suspense-wrapped locale providers (`use(getMessages/getTranslations)`)
  - Locale i18n reads in layout now execute in parallel (`Promise.all`) before `use()` to avoid waterfalls
  - Home/projects/project-detail pages now stream through Suspense boundaries
  - CMS fetchers for these pages wrapped with `unstable_cache` and tagged revalidation
  - Build now reports `Partial Prerender` for key routes under `cacheComponents`
- Composition architecture pass:
  - Reduced translation prop-drilling by composing page structure in layout
  - Standardized form copy handling via grouped config object + slot-based heading rendering
  - Upgraded `ContactForm` to compound components with shared context to remove internal prop chains
  - Added request-level dedup wrappers (`cache()`) around i18n and page data access paths
- Render-derivation cleanup:
  - Theme resolution now derived during render (no effect-driven mirrored state)
  - Theme switcher no longer uses hydration-only mounted state for icon/render gating
- Activity boundaries pass:
  - Mobile menu hide/show moved to Activity hidden/visible mode
  - Main route sections wrapped with visible Activity boundaries for selective hydration-friendly segmentation
- Suspense loading UX + request typing pass:
  - Route handler request typing standardized with `NextRequest`/`NextResponse`
  - Suspense fallback UIs moved to reusable component-level skeletons with explicit loading messaging

### October 30, 2026 - toolchain and UI pattern alignment
- Deploy fix: pnpm 11 pinned, lockfile regenerated, `package-lock.json` removed, `tsconfig.json` on the Node 26 preset
- Tailwind v4 theme moved into CSS (`@theme inline`); token utilities restored in production CSS
- `tailwind-variants` adopted with the Cortix/Marmitix rules; `src/components/ui/CLAUDE.md` added
- Biome rules `noJsxPropsBind` and `useBaseline` turned off with written reasons; `pnpm lint` clean
- Partial Prefetching enabled; no instant-navigation insights in `next dev`

### October 31, 2026 - CMS content and projects page
- `CMSIcon` normalizes CMS SVGs (Playwright and Docker were invisible in the light theme)
- Every Hygraph list field queries `first: 100` (projects page showed 10 of 14)
- Projects page paginated (static `/projects/page/[page]` routes), later changed from 10 to 9 per page
- Fallback content no longer cached when Hygraph fails
- Home knowledge section shows 9 items with "Ver mais"/"Ver menos"

### November 1, 2026
- Projects page shows 9 per page (was 10) so every page fills the 3-column grid

### November 5, 2026 - search and quality tools from Cortix/Marmitix
- Projects search with nuqs (`?q=`, `?tech=`), accent-insensitive (`src/lib/search.ts`), `SearchInput` and `Select` added to `ui/`
- Playwright + axe tests, `pnpm i18n:check` and GitHub Actions CI added
- Dependencies updated (`tailwind-variants` 4, `@hookform/resolvers` 7); `next-themes` and `autoprefixer` removed
- Accessibility fixes found by axe: icon links got names, light `--primary` darkened to reach 4.5:1
- Not adopted from those projects because the portfolio has no use for them: Leaflet, QR Code, Stripe

## Pending content fixes (Hygraph, not code)
- Countdown project: English title is empty in the published version.

Done on October 31, 2026: PostgreSQL icon path fixed (`37.800781`) and Spring Boot icon replaced by a single-color version, both locales.

## Suggested next steps
1. Fix the typo in the `HighlighetdProjects` folder name.
2. Add `instant()` Playwright tests if prefetched UI starts to matter (see Next guide "Adopting Partial Prefetching").

## Maintenance rule
Whenever a major architectural or UX change is made, append a dated note here and mirror a concise version in `AGENTS.md`.
