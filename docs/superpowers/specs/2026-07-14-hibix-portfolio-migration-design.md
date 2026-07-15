# Hibix Portfolio Migration: Next.js → Rsbuild

## Objective
Migrate the Hibix Personal Portfolio design (built in Next.js at `plantilla-de-portafolio-react`) into the Rsbuild + React Router project (`jairmanosalva-portfolio`), replacing the existing purple-themed multi-page layout with a dark orange-accented one-page portfolio.

## Source & Target

| Aspect | Source (Next.js) | Target (Rsbuild) |
|---|---|---|
| Framework | Next.js 16 + App Router | Rsbuild 2 + React Router 7 |
| Styling | Tailwind v4 + CSS oklch vars | Tailwind v4 (via `@rsbuild/plugin-tailwindcss`) |
| UI primitives | `@base-ui/react` | Same (add dependency) |
| Fonts | `next/font` (Inter + Space Grotesk) | `@fontsource-variable/inter`, `@fontsource-variable/space-grotesk` |
| Images | `next/image` | Native `<img>` |
| Path aliases | `@/` → `./` | `@/` → `./src/` |

## Color Palette (oklch)

| Token | Value |
|---|---|
| `--background` | `oklch(0.17 0.006 60)` |
| `--foreground` | `oklch(0.97 0.003 60)` |
| `--primary` | `oklch(0.66 0.2 37)` — naranja |
| `--card` | `oklch(0.21 0.007 60)` |
| `--secondary` | `oklch(0.26 0.007 60)` |
| `--border` | `oklch(1 0 0 / 8%)` |
| `--muted` | `oklch(0.26 0.007 60)` |

## Sections (in order)

1. **SiteHeader** — sticky nav with hash links (Inicio, Servicios, Proyectos, FAQ, Blog, Contacto) + CTA button
2. **Hero** — split layout: text col (name, title, description, phone/email) + image col (portrait with gradient bg and blur)
3. **About** — two cols: left (section label, headline, bio, years badge) + right (CTA with email link)
4. **Services** — grid of 4 cards (Frontend, Architecture, Performance, API Integration) with hover effects
5. **Skills** — 4 circular SVG progress indicators (React 96%, Angular 88%, TypeScript 94%, Architecture 92%)
6. **Projects** — 2-col grid of project cards with image, badge, title, arrow-up-right icon
7. **FAQ** — accordion with 5 questions/answers
8. **Blog** — 3-col grid of blog post cards with image, date, category, title
9. **Contact** — two cols: left (contact info with icons: phone, email, LinkedIn, location) + right (form with name/email/message + validation)
10. **SiteFooter** — logo + copyright + social links (LinkedIn, GitHub, Email)

## Navigation Strategy

- Single-page with hash anchors (`#inicio`, `#servicios`, `#proyectos`, `#faq`, `#blog`, `#contacto`)
- React Router retains only the root route (`/`) rendering the full one-page layout
- Scroll behavior: `scroll-behavior: smooth` on `html`

## Component Architecture

```
src/
├── index.tsx                        # entry: AppProviders + RouterProvider
├── app/
│   ├── layout.tsx                   # simple wrapper (no NavBar/Outlet/Footer — those are in sections)
│   └── page.tsx                     # composes all sections in order
├── config/
│   └── appRoutes.tsx                # single root route, lazy-loads HomePage
├── shared/
│   ├── styles/globals.css           # Tailwind v4 + oklch theme
│   ├── lib/utils.ts                 # cn() with tailwind-merge + clsx (exists already)
│   └── components/
│       ├── ui/                      # shadcn-style primitives (copied from plantilla, adapted)
│       │   ├── accordion.tsx        # @base-ui/react/accordion
│       │   ├── avatar.tsx           # @base-ui/react/avatar
│       │   ├── badge.tsx            # @base-ui/react + cva
│       │   ├── button.tsx           # @base-ui/react/button + cva
│       │   ├── card.tsx             # plain div with slots
│       │   ├── field.tsx            # @base-ui + cva
│       │   ├── input.tsx            # @base-ui/react/input
│       │   ├── label.tsx            # plain label
│       │   ├── progress.tsx         # @base-ui/react/progress
│       │   ├── separator.tsx        # @base-ui/react/separator
│       │   └── textarea.tsx         # plain textarea
│       └── common/                  # kept but may be unused after migration
├── features/
│   └── home/                        # portfolio section components
│       ├── site-header.tsx
│       ├── hero.tsx
│       ├── about.tsx
│       ├── services.tsx
│       ├── circular-progress.tsx
│       ├── skills.tsx
│       ├── projects.tsx
│       ├── faq.tsx
│       ├── blog.tsx
│       ├── contact.tsx
│       ├── site-footer.tsx
│       └── section-label.tsx
```

## Adaptations from Next.js

| Next.js pattern | Rsbuild replacement |
|---|---|
| `import Image from 'next/image'` | Native `<img src="..." alt="..." />` |
| `import { Inter, Space_Grotesk } from 'next/font/google'` | CSS `@import` from Google Fonts or `@fontsource` |
| `import * from '@/components/...'` | `import * from '@components/...'` (alias maps to `./src/shared/components`) |
| `export const metadata` | `react-helmet-async` via `<Seo />` component |
| `<html className="dark">` | Tailwind `@custom-variant dark` + `.dark` class |

## Images

- Portrait: `public/portfolio/hero-portrait.png`
- Project screenshots: `public/portfolio/project-{1..4}.png`
- Blog images: `public/portfolio/blog-{1..3}.png`
- All images are static and should be placed under `public/portfolio/`

## Form Behavior

- Client-side validation only (name required, email format, message ≥10 chars)
- On success: show success state with "send another" button
- No backend — form data is not actually sent (enhancement for future)

## Dependencies to Add

- `@base-ui/react` (primitives)
- `@fontsource-variable/inter` and `@fontsource-variable/space-grotesk` OR Google Fonts CSS import

## Files to Modify

- `src/index.tsx` — keep as-is (RouterProvider pattern works)
- `src/app/page.tsx` — replace with full one-page composition
- `src/app/layout.tsx` — simplify (remove NavBar/Footer, keep min-height)
- `src/config/appRoutes.tsx` — simplify to single root route
- `src/shared/styles/globals.css` — replace theme with Hibix oklch values

## Files to Create

- All 11 UI components under `src/shared/components/ui/`
- All 12 portfolio sections under `src/features/home/`
- Update `src/shared/lib/utils.ts` if needed (already has `cn()`)

## Files to Delete/Keep

- `src/features/about/`, `src/features/projects/`, `src/features/contact/` — keep but they become unused (future pages)
- `src/shared/components/common/Footer.tsx` — replaced by `site-footer.tsx`
- `src/shared/components/common/NavBar.tsx` — replaced by `site-header.tsx`
- Other `common/` components — keep if used by stories or elsewhere
