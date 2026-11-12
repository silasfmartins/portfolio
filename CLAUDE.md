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
- Node: **26** everywhere (`.nvmrc`, `package.json#engines`, Vercel project setting, GitHub Actions)
- Runtime: Next.js 16.4 + React 19.3
- Package manager: pnpm 11 (pinned in `package.json#packageManager`; Vercel runs the same version)
- Language: TypeScript 7 (strict, `target`/`lib` from the Node 26 preset)
- Modules: ESM only (`"type": "module"` in `package.json`). Use `import`/`export`; config files and scripts are `.mjs`/`.ts` with `export default`. Never add `require`, `module.exports`, `__dirname` or `.cjs` files; when a tool forces CommonJS, write down why.
- Styling: Tailwind CSS v4, CSS-first (`@theme inline` in `globals.css`, no `tailwind.config`) + CSS variables for design tokens
- Component styling: `tailwind-variants` (`tv`) for components with variants; `tailwind-merge` (`cn`) only for components without variants
- Lint/format: Biome + Ultracite (no Prettier)
- Animations: Framer Motion
- Forms: react-hook-form + zod
- URL state: nuqs (`NuqsAdapter` in `Providers.tsx`)
- Tests: Playwright + axe (`e2e/`, against the production build); CI in `.github/workflows/ci.yml`. **Paused since November 12, 2026:** the tests stay in the repo but do not run, locally or in CI (the CI steps were removed, with a comment on how to bring them back); do not run them or re-enable them unless the owner asks. When they return: always headless (never `--ui` or `--headed`). The e2e tests run only in GitHub Actions, which installs its own Chromium: never download Playwright browsers on the Mac (`playwright install`). The Dia browser was tried and ignores `--headless` (it opens a window, checked November 12, 2026), and Safari has no headless mode, so neither is used. Locally, check with lint, type-check, i18n and build instead; Playwright is set aside on the owner's Mac for now.
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
  - `src/app/[locale]/page.tsx` (home page); `src/lib/home-data.ts` (home query, shared with the resume PDF)
  - `src/app/api/resume/[locale]/route.tsx` + `src/lib/resume/*` (resume PDF built with `@react-pdf/renderer` from the home data; `modern-resume-document.tsx` and `simple-resume-document.tsx`)
  - `src/lib/resume/resume-content.ts` (resume text per locale) and `src/lib/resume/courses.ts` (certifications)
  - `src/lib/projects-data.ts` (single projects query, used by the pages, quick search and sitemap)
  - `src/app/[locale]/projects/projects-content.tsx` (content shared by `/projects` and `/projects/page/[page]`)
  - `src/app/api/contact/route.ts` + `src/lib/contact-schema.ts` (contact form; the schema is shared with the client)
  - `src/app/sitemap.ts`, `robots.ts`, `manifest.ts`; `src/lib/site.ts` (site URL, `NEXT_PUBLIC_SITE_URL`)
  - `src/app/[locale]/privacy/page.tsx` (text in the `Privacy` namespace of `messages/*.json`)
  - `src/app/[locale]/error.tsx`, `src/app/[locale]/not-found.tsx`, `src/app/[locale]/[...rest]/page.tsx`, `src/app/global-error.tsx`
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
  - `src/components/Header/QuickSearch.tsx` (search modal: Ctrl+K, `?search=` through nuqs, desktop header only; groups Pages and Projects, icons, thumbnails, keyboard hints; items built in `layout.tsx`)
  - `src/components/StatusScreen` (404 and error screens)
- Quality:
  - `e2e/*.spec.ts`, `playwright.config.ts`
  - `scripts/i18n-check.mjs` (`pnpm i18n:check`)
  - `scripts/generate-brand-assets.mjs` (icons and `public/og.png` from the logo)

## Architecture notes
1. **Locale-first routing**
   - All pages are served under `/[locale]`.
   - Locale handling must remain compatible with `next-intl` middleware.
   - API routes live outside `[locale]` (`src/app/api/*`); the proxy skips `/api`, `_next` and files. Unknown addresses reach `[locale]/[...rest]` and get the site's 404.
   - The locale layout calls `notFound()` when the first segment is not a locale. Without it, a missing file such as `/_vercel/insights/script.js` (outside Vercel) rendered the site with locale `_vercel` and next-intl logged `INVALID_MESSAGE` (found November 11, 2026).
   - Theme: `themeInitScript` runs in `<head>` of the server layout so the theme never flashes; keep it in sync with `ThemeProvider`.

2. **Server data fetching**
   - Page data is fetched on the server from Hygraph.
   - Keep cache/revalidate behavior stable unless intentionally changing performance characteristics.
   - Hygraph caps every list (top-level and nested) at 10 items: every list field asks for `first: 100`.
   - Fetch inside `unstable_cache`; catch and fall back in the request-level `cache()` wrapper, so a failure (e.g. a 429) is never cached.
   - Projects page: 9 per page (`PROJECTS_PER_PAGE`, a full 3-column grid), page 1 at `/projects`, pages 2..N at `/projects/page/[page]`. One cached query reads all projects (`first: 100`); pages are sliced on the server. Pagination stays in route segments, not `searchParams`, to keep pages static.
   - Every component that reads nuqs state loads with `ssr: false` (`SearchPanel`, `QuickSearch`). The Ctrl+K hint is only shown on the projects page, on screens with a keyboard.
   - Projects search (nuqs): `SearchPanel` covers all projects and is loaded with `ssr: false`, because reading the URL during prerender would make the routes dynamic. The prerendered grid stays in the HTML and is hidden through CSS (`group-has-[[data-search-active]]`) while a search is active.
   - Home "Conhecimentos" shows `KNOWN_TECHS_STEP` (9) items and a "Ver mais"/"Ver menos" button reveals the next batch client-side (`src/components/KnowTechs`). Hidden items stay in the HTML (`hidden`) so the home stays static and fully indexed; route pagination is only for the projects page.
   - Resume PDF: `/api/resume/pt-BR` and `/api/resume/en` render the CV from the same cached home data, so it never goes stale; cached 1 day on the CDN. `?preview=1` serves it inline. Section titles stay with their first entry so a title never ends alone at the bottom of a page.
   - Two styles: `modern` (default; sidebar with photo, contacts, objective, about and certifications, based on the owner's Canva resume) and `simple` (`?style=simple`; one column, no photo or colors, easy for recruiting systems). Both use the Hygraph photo, links, experiences, education and featured projects, plus `resume-content.ts` (headline, summary, grouped skills, experience bullets matched by the experience start month `yyyy-MM`) and `courses.ts`.
   - Limit of 1 page (decided November 11, 2026, replacing the earlier 2): the route renders the fullest version first and tightens step by step until it fits (`FITS`: 3 projects with descriptions, then without descriptions, then 2, then 1 project); projects show at most 8 technologies. Today everything fits at the first step. `e2e/curriculo.spec.ts` checks that all four PDFs have one page.
   - Age: computed on each render from `birthDate` in `resume-content.ts` (`getAgeLabel` in `date-labels.ts`), shown as "22 anos | São Paulo, SP".
   - The photo is Hygraph's `profilePicture`, cropped by Hygraph to a 400px JPEG (the PDF takes only PNG/JPEG) and downloaded in the route; on failure, or with the sample content, the initials are shown.
   - Certifications come from LinkedIn ("Licenças e certificados"); LinkedIn has no public API, so new ones are added by hand at the top of `courses.ts` (with the credential `url` when there is one).
   - `resume-styles.ts` holds the style list apart from the PDF code, so the browser bundle never loads `@react-pdf`.
   - Resume page `/[locale]/resume` (static): shows the PDF embedded with `<object>`, with "Moderno"/"Simples" buttons to switch the preview, and offers the downloads. `ResumePreview` checks `navigator.pdfViewerEnabled`: browsers without a PDF viewer (Android phones, and the headless browser used by the tests) get an "open in a new tab" button instead of an empty frame. Only `/api/resume/*` may be framed, and only by the site (`frame-ancestors 'self'`, `SAMEORIGIN` in `next.config.mjs`). Reached from the home ("Ver currículo"), the Ctrl+K modal and the sitemap.
   - Header (November 11, 2026): nav items Página Inicial, Projetos, Currículo and Contato (`/#contact`), built in `layout.tsx`. "Currículo" opens the resume page to view it first; downloads happen there. Below `lg` the name next to the logo is hidden and the nav gap shrinks so the header never wraps at 768px.
   - Resume downloads go through `ResumeDownloadMenu` (home and resume page only, not the header): one "Baixar currículo" button that opens the choice of style ("Moderno, com foto" / "Simples, CV tradicional") and language (Português / English); it closes on outside click, Esc or after choosing.
   - Home "Certificações" (`src/components/Certifications`) lists `courses.ts`, the same list as the resume PDF, with a "Ver credencial" link when there is one.
   - Instant navigation: `e2e/navegacao-instantanea.spec.ts` uses `instant()` from `@next/playwright`. It needs a build with `EXPOSE_TESTING_API=1` (Vercel never sets it; the CI did until the e2e tests were paused). Pagination links use `prefetch` so page 2 opens with its content, not the skeleton.
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
   - `MotionConfig reducedMotion="user"` in `Providers.tsx` respects the visitor's system setting.

5. **CMS content rules**
   - Tech and social icons come as SVG text (`iconSvg`). Single-color icons become `currentColor` and `1em`; multi-color icons keep their colors. Prefer single-color SVGs with `fill="currentColor"`.
   - Each Hygraph locale (`pt_BR`, `en`) stores its own copy of localized fields; fix content in both.
   - Hygraph's plan allows only 2 locales (`pt_BR`, `en`), so the site has no Spanish. Old `/es` links redirect to `/en` in `src/proxy.ts`.
   - Project thumbnails have mixed ratios (1:1 up to 2.34:1): show them in an `aspect-video` box with `object-contain` and `bg-muted/40`, never `object-cover`, or logos get cropped.
   - Share previews: each project has its own Open Graph image (`src/app/[locale]/projects/[slug]/opengraph-image.tsx`, `next/og`): title, short description (cut between words), up to 6 technologies, the thumbnail (resized by Hygraph through `hygraphTransform` in `src/lib/hygraph-image.ts`) and the site name. The project query lives in `src/lib/project-detail-data.ts`, shared by the page, its metadata and the image. Other pages use `public/og.png`; `twitter:card` is `summary_large_image`.
   - Every CMS image goes through `next/image` with `sizes` (no `unoptimized`, no CSS `background-image`): the originals are large PNGs (page 2 of projects went from 2.5 MB to about 72 KB). AVIF/WebP and a 30-day cache are set in `next.config.mjs`.
   - Content fixes take up to 1 day to show in production (cache). Locally, delete `.next/cache/fetch-cache` to see them.

6. **Forms and personal data**
   - Form controls go inside `Field` (visible label and error). Validation lives in a schema shared by client and server.
   - LGPD: `/privacy` lists controller, legal basis of each treatment, cookies, providers (Discord, Vercel, Hygraph), international transfer, retention, art. 18 rights and the ANPD. When the data handled by the site changes (new field, new provider, analytics, new cookie), update it and its date in both languages.
   - Only essential storage is used (`NEXT_LOCALE` cookie, `theme` in local storage). Adding analytics or marketing cookies requires a consent banner first.
   - Visit statistics: Vercel Web Analytics (`src/components/SiteAnalytics`, in the root layout), cookieless and without a visitor ID, so no consent banner. `beforeSend` drops the query string, so search text (`?q=`, `?search=`) is never sent. Resume downloads send a custom event (`Resume download`, with style and language), visible only on Vercel plans with custom events. Analytics must be enabled in the Vercel project (Analytics tab); the root layout renders `SiteAnalytics` only when `VERCEL=1` (set by Vercel during the build), so local runs and CI never request the script. `@vercel/analytics` 2 loads its script from a random same-site path (e.g. `/fcdb9309d7ab3510/script.js`) and posts to `.../view`, not `/_vercel/insights/*`: look for those when checking that it runs in production (confirmed on November 11, 2026). The privacy policy lists it (data, legal basis, cookies note, Vercel, retention).
   - Tests never reach the real webhook: `e2e/contato.spec.ts` intercepts the valid submission.
   - `/api/contact` allows 5 delivered messages per IP every 10 minutes (`src/lib/rate-limit.ts`, in memory per server instance, so it slows abuse but is not a strict global limit). To test it locally, start the server with `WEBHOOK_URL` pointing to a dead address so nothing reaches Discord.
   - Security headers (`frame-ancestors`, `X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`) are set in `next.config.mjs`.

7. **Quality gates**
   - `pnpm lint`, `pnpm type-check`, `pnpm i18n:check` and `pnpm build` must pass (`pnpm test:e2e` is paused); CI runs all of them on Node 26, without Hygraph secrets (fallback content), so tests cannot depend on real CMS content.
   - All visible text and page metadata go in `messages/pt-BR.json` and `messages/en.json`; dates and durations in `src/lib/date-labels.ts`.

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
- **Issue (November 5, 2026):** contact form was broken since April 3, 2026 (commit `83eeabd`): the client posts to `/api/contact`, but the route lived in `/[locale]/api/contact`, so it answered 404. Invalid data answered 500.
- **Fix applied:** route moved to `src/app/api/contact`, shared `contactSchema`, 400 for invalid data, honeypot field, visible labels and per-field errors.
- **Issue (November 5, 2026):** first CI run failed on `pnpm type-check`: `next-env.d.ts` is generated and gitignored, so a clean clone had no image types.
- **Fix applied:** `type-check` runs `next typegen` first; GitHub Actions updated to versions on Node 24 runtimes (the job itself runs Node 26 from `.nvmrc`).
- **Issue (November 5, 2026):** an unknown project slug crashed the page.
- **Fix applied:** `notFound()` on missing project. On streamed routes (`[slug]`, `page/[page]`, `[...rest]`) the 404 screen may arrive with HTTP 200, because the status is sent before the content resolves. The fallback content also no longer turns an unknown slug into the first sample project.
- **Issue (November 9, 2026):** CI failed from commit `349fe79` to `1bac60c` on `pnpm test:e2e`. Without Hygraph variables, `fetchHygraphQuery` threw during the build; even with the fallback, Next treated that as dynamic, so the CI pages were not static and the instant-navigation tests saw only the loading shell. The page-2 test also assumed more than 9 projects, and two tests clicked before hydration.
- **Fix applied:** `hasHygraphConfig()` makes the data helpers return the fallback content without fetching when the variables are missing, so CI builds static pages like production. The page-2 test skips when there is a single page; the resume-menu and Ctrl+K tests wait for the UI to be interactive. Reproduce CI locally with a clean copy, no `.env.local`, `CI=1 EXPOSE_TESTING_API=1`.

- **Issue (November 11, 2026):** CI failed on commit `302cf69` while installing the test browser (`playwright install --with-deps chromium`); lint, types, i18n and build had passed. GitHub was moving `ubuntu-latest` to Ubuntu 26.
- **Fix applied:** the CI job runs on `ubuntu-24.04`; move it up once Playwright supports Ubuntu 26.

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
- Contact form fixed; `Field`, `error.tsx`, `global-error.tsx`, styled 404 for any address, privacy page
- SEO: `metadataBase`, real project titles and descriptions, Open Graph image, `hreflang`, `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, app icons
- Theme init script (no flash), Ctrl+K quick search, share project (copy link, WhatsApp), reduced motion, print styles, skip link, labels in both languages
- Node 26 pinned in `.nvmrc` and `engines`; Vercel project also set to Node 26
- Privacy page rewritten as a full LGPD policy
- Not adopted because the portfolio has no use for them: Leaflet, QR Code, Stripe, push/service worker, Docker `standalone`, auth and admin screens; a third "automatic" theme option was left out (the site already follows the system until a choice is made)

### November 6, 2026
- Page titles and descriptions translated; `hreflang` generated from the locale list; dates and durations centralized in `src/lib/date-labels.ts`
- Spanish was added and then removed the same week: Hygraph's plan allows only 2 locales, so `/es` showed English content. `/es` links now redirect to `/en`; the translations remain in git history (commit `3e00323`)
- Search modal redesigned: Pages and Projects groups, page icons, project thumbnails and technologies, keyboard hints; axe covers the open modal
- `HighlighetdProjects` folder renamed to `HighlightedProjects`
- Project images no longer cropped in cards, highlights and the search modal (`object-contain` in 16:9 boxes)

### November 9, 2026
- All dependencies updated (Dependabot PRs #69-#71 included); Dependabot now groups updates into one weekly PR per ecosystem and also watches GitHub Actions
- Images optimized (`next/image` with `sizes` everywhere, AVIF/WebP, 30-day cache): projects page 2 from 2.5 MB to about 72 KB
- Security headers added; contact route rate limited (5 per IP every 10 minutes)
- Resume PDF generated from the site data, downloadable in Portuguese or English from the home
- Resume page with the PDF preview and both downloads (`/resume`), with a fallback for browsers without a PDF viewer
- Resume download in the header and mobile menu; one "Baixar currículo" button opens the language choice (`ResumeDownloadMenu`) everywhere
- Instant navigation tests (`@next/playwright`); they found that the projects page had no `h1` (fixed) and that page 2 opened on the skeleton (fixed with `prefetch` on pagination links)
- Loading texts translated (they were fixed in Portuguese, without accents, in both versions)
- Playwright uses port 4317 and never reuses a running server: another local project on port 3100 was answering instead

### November 11, 2026
- Resume in two styles: modern (sidebar with photo, like the owner's Canva resume) and simple (one-column CV), in both languages, on one page with the featured projects; age computed from the birth date
- Resume text (headline, summary, grouped skills, experience bullets) in `src/lib/resume/resume-content.ts`; certifications copied from LinkedIn into `src/lib/resume/courses.ts`, with credential links
- Download menu groups the files by style; the resume page switches the preview between the two
- Header: "Currículo" is a nav item that opens the resume page (view first, download there); "Contato" added; the download menu left the header
- Home "Certificações" section from `courses.ts`, with credential links; English resume text reviewed
- Each project has its own share preview image (Open Graph), with title, description, technologies and thumbnail
- Vercel Web Analytics (cookieless) with a resume download event; privacy policy updated in both languages (November 11, 2026)

### November 10, 2026
- Privacy policy sets a retention period for contact messages: up to 12 months after the last reply (both languages, date updated)
- `@hookform/resolvers` 7.0.5

### November 12, 2026
- Dependencies updated (Next 16.4.6, next-intl 4.14.10, nuqs 2.10.3, framer-motion 14.12.0, lucide-react 1.71.0)
- Playwright always headless and only in CI: Dia passed the tests but ignores `--headless` and opens windows, and Safari has no headless mode, so local e2e runs stopped; no Playwright browser on the Mac
- Playwright tests paused: kept in `e2e/`, removed from CI (`EXPOSE_TESTING_API`, browser install and `test:e2e` steps); docs updated (README, Contributing, AGENTS, `ui/` guides)
- Project made ESM only: `"type": "module"` in `package.json`, `postcss.config.js` (CommonJS) replaced by `postcss.config.mjs`

## Pending content fixes (Hygraph, not code)
None. Done: PostgreSQL icon path and single-color Spring Boot icon (October 31, 2026); Countdown English title (November 6, 2026).

## Pending checks
- The privacy policy follows the LGPD structure used in Marmitix and describes what the site really does, but it had no legal review. Contact messages are kept up to 12 months after the last reply (since November 10, 2026): delete older ones from the Discord channel.

## Suggested next steps
None pending.

## Maintenance rule
Whenever a major architectural or UX change is made, append a dated note here and mirror a concise version in `AGENTS.md`.
