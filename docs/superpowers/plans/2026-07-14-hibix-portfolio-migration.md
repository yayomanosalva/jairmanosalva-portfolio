# Hibix Portfolio Migration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate the Hibix Personal Portfolio design from Next.js to Rsbuild, replacing the current purple-themed multi-page layout with a dark orange-accented one-page portfolio.

**Architecture:** Single-page Rsbuild app with React Router (one root route), 12 portfolio sections composed on the home page, 11 `@base-ui/react` primitives for UI, Tailwind v4 with oklch CSS custom properties.

**Tech Stack:** Rsbuild 2, React 19, TypeScript, Tailwind v4 (`@rsbuild/plugin-tailwindcss`), `@base-ui/react`, React Router 7, `@tanstack/react-query`, `react-helmet-async`, `lucide-react`, `framer-motion`.

## Global Constraints

- All work is local — no `git push` until the full migration is approved
- Each phase lives on its own branch: `phase/01-foundation` through `phase/05-cleanup`
- Each phase merges into `develop` locally via `git merge --no-ff`
- Path alias `@/` maps to `./src/`, `@components/` to `./src/shared/components/`, `@lib/` to `./src/shared/lib/`
- Next.js-specific patterns (`next/image`, `next/font`) are replaced with native equivalents
- All images live under `public/portfolio/`
- Source portfolio components live in `plantilla-de-portafolio-react/components/portfolio/`
- Source UI components live in `plantilla-de-portafolio-react/components/ui/`
- Source utils live in `plantilla-de-portafolio-react/lib/utils.ts`

---

## Phase 1: Foundation

**Branch:** `phase/01-foundation`
**Goal:** Install dependencies, set up theme CSS, add assets directory.

### Task 1.1: Install dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install @base-ui/react and font packages**

```bash
bun add @base-ui/react
bun add @fontsource-variable/inter @fontsource-variable/space-grotesk
```

- [ ] **Step 2: Verify installation**

```bash
bun list @base-ui/react @fontsource-variable/inter @fontsource-variable/space-grotesk
```

Expected: all three packages listed in dependencies.

- [ ] **Step 3: Commit**

```bash
git add package.json bun.lock
git commit -m "chore: add @base-ui/react and fontsource dependencies"
```

### Task 1.2: Update globals.css with Hibix dark theme

**Files:**
- Modify: `src/shared/styles/globals.css`

Source: `plantilla-de-portafolio-react/app/globals.css`

- [ ] **Step 1: Replace globals.css content**

Replace the current content with the Hibix dark theme. Key changes:
- Remove `@import 'tailwindcss'` (keep it — Rsbuild uses plugin)
- Remove `@import 'tw-animate-css'` and `@import 'shadcn/tailwind.css'` (not available in Rsbuild)
- Keep `@custom-variant dark (&:is(.dark *))`
- Keep all oklch CSS variables from the source
- Replace `--font-sans` and `--font-display` to reference local fontsource packages instead of `next/font` variables

```css
@import 'tailwindcss';
@import '@fontsource-variable/inter';
@import '@fontsource-variable/space-grotesk';

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --color-foreground: var(--foreground);
  --color-background: var(--background);
  --font-sans: 'Inter Variable', ui-sans-serif, system-ui, sans-serif;
  --font-display: 'Space Grotesk Variable', ui-sans-serif, system-ui, sans-serif;
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

:root {
  color-scheme: dark;
  --background: oklch(0.17 0.006 60);
  --foreground: oklch(0.97 0.003 60);
  --card: oklch(0.21 0.007 60);
  --card-foreground: oklch(0.97 0.003 60);
  --popover: oklch(0.21 0.007 60);
  --popover-foreground: oklch(0.97 0.003 60);
  --primary: oklch(0.66 0.2 37);
  --primary-foreground: oklch(0.99 0.005 60);
  --secondary: oklch(0.26 0.007 60);
  --secondary-foreground: oklch(0.97 0.003 60);
  --muted: oklch(0.26 0.007 60);
  --muted-foreground: oklch(0.72 0.012 60);
  --accent: oklch(0.66 0.2 37);
  --accent-foreground: oklch(0.99 0.005 60);
  --destructive: oklch(0.62 0.22 25);
  --border: oklch(1 0 0 / 8%);
  --input: oklch(1 0 0 / 12%);
  --ring: oklch(0.66 0.2 37);
  --chart-1: oklch(0.66 0.2 37);
  --chart-2: oklch(0.72 0.16 55);
  --chart-3: oklch(0.7 0.15 160);
  --chart-4: oklch(0.55 0.14 37);
  --chart-5: oklch(0.4 0.1 37);
  --radius: 0.5rem;
  --sidebar: oklch(0.21 0.007 60);
  --sidebar-foreground: oklch(0.97 0.003 60);
  --sidebar-primary: oklch(0.66 0.2 37);
  --sidebar-primary-foreground: oklch(0.99 0.005 60);
  --sidebar-accent: oklch(0.26 0.007 60);
  --sidebar-accent-foreground: oklch(0.97 0.003 60);
  --sidebar-border: oklch(1 0 0 / 8%);
  --sidebar-ring: oklch(0.66 0.2 37);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

html {
  scroll-behavior: smooth;
}
```

- [ ] **Step 2: Verify build**

```bash
bun run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/shared/styles/globals.css
git commit -m "feat: replace theme with Hibix dark oklch palette"
```

### Task 1.3: Create public/portfolio assets directory

**Files:**
- Create: `public/portfolio/.gitkeep`

- [ ] **Step 1: Create directory**

```bash
mkdir -p public/portfolio
touch public/portfolio/.gitkeep
```

- [ ] **Step 2: Commit**

```bash
git add public/portfolio/
git commit -m "chore: add portfolio assets directory"
```

### Task 1.4: Merge phase/01-foundation into develop

- [ ] **Step 1: Merge**

```bash
git checkout develop
git merge --no-ff phase/01-foundation -m "phase: foundation - deps, theme, assets"
```

---

## Phase 2: UI Primitives

**Branch:** `phase/02-ui-primitives`
**Goal:** Copy and adapt all 11 `@base-ui/react` UI components from the plantilla.

### Task 2.1: Create cn() utility (already exists)

**Files:**
- Check: `src/shared/lib/utils.ts`

The file already has `cn()` with `clsx` + `tailwind-merge`. No changes needed.

- [ ] **Step 1: Verify utils.ts exists**

```bash
cat src/shared/lib/utils.ts
```

Expected: file exists with `cn()` function.

### Task 2.2: Create ui/button.tsx

**Files:**
- Create: `src/shared/components/ui/button.tsx`

Source: `plantilla-de-portafolio-react/components/ui/button.tsx`

Adaptation: Replace `@/lib/utils` → `@lib/utils` (alias maps to `./src/shared/lib`).

- [ ] **Step 1: Create button.tsx**

```tsx
import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@lib/utils';

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground [a]:hover:bg-primary/80',
        outline:
          'border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
        ghost:
          'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default:
          'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        icon: 'size-8',
        'icon-xs':
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        'icon-sm':
          'size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg',
        'icon-lg': 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
```

### Task 2.3: Create ui/card.tsx

**Files:**
- Create: `src/shared/components/ui/card.tsx`

Source: `plantilla-de-portafolio-react/components/ui/card.tsx`

Adaptation: Replace `@/lib/utils` → `@lib/utils`.

```tsx
import * as React from 'react';
import { cn } from '@lib/utils';

function Card({ className, size = 'default', ...props }: React.ComponentProps<'div'> & { size?: 'default' | 'sm' }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        'group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl',
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        'group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)',
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('text-base leading-snug font-medium group-data-[size=sm]/card:text-sm', className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="card-description" className={cn('text-sm text-muted-foreground', className)} {...props} />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn('px-(--card-spacing)', className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)', className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
```

### Task 2.4: Create ui/badge.tsx

**Files:**
- Create: `src/shared/components/ui/badge.tsx`

Source: `plantilla-de-portafolio-react/components/ui/badge.tsx`

```tsx
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@lib/utils';

const badgeVariants = cva(
  'group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground [a]:hover:bg-primary/80',
        secondary: 'bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80',
        destructive:
          'bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20',
        outline: 'border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground',
        ghost: 'hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Badge({
  className,
  variant = 'default',
  render,
  ...props
}: useRender.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>({ className: cn(badgeVariants({ variant }), className) }, props),
    render,
    state: { slot: 'badge', variant },
  });
}

export { Badge, badgeVariants };
```

### Task 2.5: Create ui/accordion.tsx

**Files:**
- Create: `src/shared/components/ui/accordion.tsx`

Source: `plantilla-de-portafolio-react/components/ui/accordion.tsx`

```tsx
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';
import { cn } from '@lib/utils';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return <AccordionPrimitive.Root data-slot="accordion" className={cn('flex w-full flex-col', className)} {...props} />;
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn('not-last:border-b', className)}
      {...props}
    />
  );
}

function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground',
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
        />
        <ChevronUpIcon
          data-slot="accordion-trigger-icon"
          className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ className, children, ...props }: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          'h-(--accordion-panel-height) pt-0 pb-2.5 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4',
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
```

### Task 2.6: Create ui/input.tsx

**Files:**
- Create: `src/shared/components/ui/input.tsx`

Source: `plantilla-de-portafolio-react/components/ui/input.tsx`

```tsx
import * as React from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';
import { cn } from '@lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        'h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
```

### Task 2.7: Create ui/textarea.tsx

**Files:**
- Create: `src/shared/components/ui/textarea.tsx`

Source: `plantilla-de-portafolio-react/components/ui/textarea.tsx`

```tsx
import * as React from 'react';
import { cn } from '@lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
```

### Task 2.8: Create ui/label.tsx

**Files:**
- Create: `src/shared/components/ui/label.tsx`

Source: `plantilla-de-portafolio-react/components/ui/label.tsx`

```tsx
import * as React from 'react';
import { cn } from '@lib/utils';

function Label({ className, ...props }: React.ComponentProps<'label'>) {
  return (
    <label
      data-slot="label"
      className={cn(
        'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export { Label };
```

### Task 2.9: Create ui/field.tsx

**Files:**
- Create: `src/shared/components/ui/field.tsx`

Source: `plantilla-de-portafolio-react/components/ui/field.tsx`

Adaptation: Replace `@/components/ui/label` → `@components/ui/label`, `@/components/ui/separator` → `@components/ui/separator`, `@/lib/utils` → `@lib/utils`.

```tsx
'use client';

import { useMemo } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@lib/utils';
import { Label } from '@components/ui/label';
import { Separator } from '@components/ui/separator';

function FieldSet({ className, ...props }: React.ComponentProps<'fieldset'>) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        'flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3',
        className,
      )}
      {...props}
    />
  );
}

function FieldLegend({ className, variant = 'legend', ...props }: React.ComponentProps<'legend'> & { variant?: 'legend' | 'label' }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn('mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base', className)}
      {...props}
    />
  );
}

function FieldGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        'group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4',
        className,
      )}
      {...props}
    />
  );
}

const fieldVariants = cva('group/field flex w-full gap-2 data-[invalid=true]:text-destructive', {
  variants: {
    orientation: {
      vertical: 'flex-col *:w-full [&>.sr-only]:w-auto',
      horizontal:
        'flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
      responsive:
        'flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
    },
  },
  defaultVariants: { orientation: 'vertical' },
});

function Field({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  );
}

function FieldContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-content"
      className={cn('group/field-content flex flex-1 flex-col gap-0.5 leading-snug', className)}
      {...props}
    />
  );
}

function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        'group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-data-checked:border-primary/30 has-data-checked:bg-primary/5 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border *:data-[slot=field]:p-2.5 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10',
        'has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col',
        className,
      )}
      {...props}
    />
  );
}

function FieldTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        'flex w-fit items-center gap-2 text-sm font-medium group-data-[disabled=true]/field:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

function FieldDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        'text-left text-sm leading-normal font-normal text-muted-foreground group-has-data-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-1.5',
        'last:mt-0 nth-last-2:-mt-1',
        '[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary',
        className,
      )}
      {...props}
    />
  );
}

function FieldSeparator({ children, className, ...props }: React.ComponentProps<'div'> & { children?: React.ReactNode }) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn('relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2', className)}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span className="relative mx-auto block w-fit bg-background px-2 text-muted-foreground" data-slot="field-separator-content">
          {children}
        </span>
      )}
    </div>
  );
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<'div'> & { errors?: Array<{ message?: string } | undefined> }) {
  const content = useMemo(() => {
    if (children) return children;
    if (!errors?.length) return null;
    const uniqueErrors = [...new Map(errors.map((error) => [error?.message, error])).values()];
    if (uniqueErrors?.length === 1) return uniqueErrors[0]?.message;
    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map((error, index) => error?.message && <li key={index}>{error.message}</li>)}
      </ul>
    );
  }, [children, errors]);

  if (!content) return null;

  return (
    <div role="alert" data-slot="field-error" className={cn('text-sm font-normal text-destructive', className)} {...props}>
      {content}
    </div>
  );
}

export { Field, FieldLabel, FieldDescription, FieldError, FieldGroup, FieldLegend, FieldSeparator, FieldSet, FieldContent, FieldTitle };
```

### Task 2.10: Create ui/separator.tsx

**Files:**
- Create: `src/shared/components/ui/separator.tsx`

Source: `plantilla-de-portafolio-react/components/ui/separator.tsx`

```tsx
'use client';

import { Separator as SeparatorPrimitive } from '@base-ui/react/separator';
import { cn } from '@lib/utils';

function Separator({ className, orientation = 'horizontal', ...props }: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn('shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch', className)}
      {...props}
    />
  );
}

export { Separator };
```

### Task 2.11: Create ui/progress.tsx

**Files:**
- Create: `src/shared/components/ui/progress.tsx`

Source: `plantilla-de-portafolio-react/components/ui/progress.tsx`

```tsx
'use client';

import { Progress as ProgressPrimitive } from '@base-ui/react/progress';
import { cn } from '@lib/utils';

function Progress({ className, children, value, ...props }: ProgressPrimitive.Root.Props) {
  return (
    <ProgressPrimitive.Root
      value={value}
      data-slot="progress"
      className={cn('flex flex-wrap gap-3', className)}
      {...props}
    >
      {children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressPrimitive.Root>
  );
}

function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
  return (
    <ProgressPrimitive.Track
      className={cn('relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted', className)}
      data-slot="progress-track"
      {...props}
    />
  );
}

function ProgressIndicator({ className, ...props }: ProgressPrimitive.Indicator.Props) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn('h-full bg-primary transition-all', className)}
      {...props}
    />
  );
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return <div className={cn('text-sm font-medium', className)} data-slot="progress-label" {...props} />;
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return <div className={cn('ml-auto text-sm text-muted-foreground tabular-nums', className)} data-slot="progress-value" {...props} />;
}

export { Progress, ProgressTrack, ProgressIndicator, ProgressLabel, ProgressValue };
```

### Task 2.12: Create ui/avatar.tsx

**Files:**
- Create: `src/shared/components/ui/avatar.tsx`

Source: `plantilla-de-portafolio-react/components/ui/avatar.tsx`

```tsx
'use client';

import * as React from 'react';
import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';
import { cn } from '@lib/utils';

function Avatar({ className, size = 'default', ...props }: AvatarPrimitive.Root.Props & { size?: 'default' | 'sm' | 'lg' }) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        'group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten',
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn('aspect-square size-full rounded-full object-cover', className)}
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs',
        className,
      )}
      {...props}
    />
  );
}

function AvatarBadge({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        'absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none',
        'group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden',
        'group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2',
        'group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2',
        className,
      )}
      {...props}
    />
  );
}

function AvatarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="avatar-group"
      className={cn('group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background', className)}
      {...props}
    />
  );
}

function AvatarGroupCount({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        'relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3',
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarBadge };
```

### Task 2.13: Verify build and commit

- [ ] **Step 1: Build check**

```bash
bun run build
```

Expected: build succeeds with no errors.

- [ ] **Step 2: Commit all UI components**

```bash
git add src/shared/components/ui/
git commit -m "feat: add UI primitives (accordion, badge, button, card, field, input, label, progress, separator, textarea, avatar)"
```

### Task 2.14: Merge phase/02-ui-primitives into develop

- [ ] **Step 1: Merge**

```bash
git checkout develop
git merge --no-ff phase/02-ui-primitives -m "phase: UI primitives - @base-ui wrappers"
```

---

## Phase 3: Portfolio Sections

**Branch:** `phase/03-portfolio-sections`
**Goal:** Copy all 12 portfolio section components with adaptations.

### Task 3.1: Create features/home/ directory

**Files:**
- Create: `src/features/home/` (already exists)

```bash
mkdir -p src/features/home
```

### Task 3.2: Create home/section-label.tsx

**Files:**
- Create: `src/features/home/section-label.tsx`

Source: `plantilla-de-portafolio-react/components/portfolio/section-label.tsx`

Adaptation: `@/lib/utils` → `@lib/utils`

```tsx
import { cn } from '@lib/utils';

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary',
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-6 bg-primary" />
      {children}
    </span>
  );
}
```

### Task 3.3: Create home/site-header.tsx

**Files:**
- Create: `src/features/home/site-header.tsx`

Source: `plantilla-de-portafolio-react/components/portfolio/site-header.tsx`

Adaptation: `@/components/ui/button` → `@components/ui/button`, `@/lib/utils` → `@lib/utils`

```tsx
'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@components/ui/button';
import { cn } from '@lib/utils';

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contacto', href: '#contacto' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <a
          href="#inicio"
          className="flex size-10 items-center justify-center rounded-md bg-primary font-display text-lg font-bold text-primary-foreground"
          aria-label="Ir al inicio"
        >
          J.
        </a>

        <nav aria-label="Navegación principal" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button nativeButton={false} render={<a href="#contacto">Hablemos</a>} />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      <div className={cn('overflow-hidden border-t border-border/60 md:hidden', open ? 'max-h-96' : 'max-h-0 border-t-0')}>
        <nav aria-label="Navegación móvil" className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Button className="mt-2" nativeButton={false} render={<a href="#contacto">Hablemos</a>} />
        </nav>
      </div>
    </header>
  );
}
```

### Task 3.4: Create home/hero.tsx

**Files:**
- Create: `src/features/home/hero.tsx`

Source: `plantilla-de-portafolio-react/components/portfolio/hero.tsx`

Adaptation: Replace `next/image` → `<img>`, remove `next/image` import.

```tsx
import { Phone, Mail } from 'lucide-react';

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-12 md:pt-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid items-end gap-8 md:grid-cols-2">
          <div className="relative z-10 pb-8">
            <p className="mb-4 font-mono text-sm uppercase tracking-[0.2em] text-primary">
              Senior Frontend Developer
            </p>
            <h1 className="font-display text-5xl font-bold leading-[0.95] text-balance md:text-7xl">
              Jair
              <br />
              <span className="text-primary">Manosalva</span>
            </h1>
            <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground">
              Radicado en Colombia, con más de 10 años construyendo aplicaciones
              web escalables con React, Angular y TypeScript. Transformo ideas
              en productos digitales con código limpio y arquitecturas
              mantenibles.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-6">
              <a
                href="tel:+573008288485"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Phone className="size-4 text-primary" />
                +57 300 828 8485
              </a>
              <a
                href="mailto:yayomanosalva@gmail.com"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="size-4 text-primary" />
                yayomanosalva@gmail.com
              </a>
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -right-6 top-1/2 size-64 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl md:size-80"
            />
            <span
              aria-hidden="true"
              className="absolute right-4 top-8 z-10 size-5 rounded-full bg-emerald-400"
            />
            <div className="relative mx-auto flex aspect-[4/5] max-w-sm items-end justify-center overflow-hidden rounded-t-[2rem] bg-gradient-to-b from-secondary to-card">
              <img
                src="/portfolio/hero-portrait.png"
                alt="Retrato de Jair Manosalva"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Task 3.5: Create home/about.tsx

**Files:**
- Create: `src/features/home/about.tsx`

Source: `plantilla-de-portafolio-react/components/portfolio/about.tsx`

Adaptation: `@/components/portfolio/section-label` → local import.

```tsx
import { ArrowRight } from 'lucide-react';
import { SectionLabel } from './section-label';

export function About() {
  return (
    <section className="border-t border-border/60 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <SectionLabel>Sobre mí</SectionLabel>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-balance md:text-4xl">
              Código limpio, arquitecturas escalables y productos listos para crecer.
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Soy Ingeniero de Sistemas y desarrollador frontend senior
              especializado en arquitectura de frontend, componentes
              reutilizables, optimización de rendimiento e integración de APIs
              REST. Me enfoco en entregar productos digitales con buenas
              prácticas y estructuras mantenibles.
            </p>

            <div className="mt-8 flex items-center gap-5">
              <span className="font-display text-6xl font-bold text-primary">10+</span>
              <span className="text-sm leading-snug text-muted-foreground">
                Años de
                <br />
                experiencia
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-primary">
              ¿Tienes un proyecto?
            </p>
            <h3 className="mt-4 font-display text-2xl font-bold text-balance md:text-3xl">
              Cualquier tipo de consulta y colaboración.
            </h3>
            <p className="mt-4 text-muted-foreground">Hablemos.</p>
            <a
              href="mailto:yayomanosalva@gmail.com"
              className="group mt-8 inline-flex items-center gap-3 text-lg font-medium text-primary"
            >
              yayomanosalva@gmail.com
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Task 3.6: Create home/services.tsx

**Files:**
- Create: `src/features/home/services.tsx`

Source: `plantilla-de-portafolio-react/components/portfolio/services.tsx`

Adaptation: Replace `@/components/ui/card` → `@components/ui/card`, `@/components/portfolio/section-label` → local import.

```tsx
import { Code2, Layers, Gauge, Smartphone, ArrowUpRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@components/ui/card';
import { SectionLabel } from './section-label';

const services = [
  {
    icon: Code2,
    title: 'Desarrollo Frontend',
    description: 'Aplicaciones web con React, Angular y TypeScript, con componentes reutilizables y código limpio.',
  },
  {
    icon: Layers,
    title: 'Arquitectura Frontend',
    description: 'Diseño de arquitecturas modulares y escalables basadas en Atomic Design y design systems.',
    featured: true,
  },
  {
    icon: Gauge,
    title: 'Optimización de Rendimiento',
    description: 'Lazy loading, code splitting y buenas prácticas de SEO y accesibilidad para tiempos de carga óptimos.',
  },
  {
    icon: Smartphone,
    title: 'Integración de APIs',
    description: 'Consumo de APIs REST y comunicación con microservicios para conectar el frontend con tu backend.',
  },
];

export function Services() {
  return (
    <section id="servicios" className="border-t border-border/60 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel className="justify-center">Servicios</SectionLabel>
          <h2 className="mt-4 font-display text-3xl font-bold text-balance md:text-4xl">
            ¿Qué puedo hacer por ti?
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Un conjunto de servicios pensados para acompañar tu producto desde la idea hasta el lanzamiento.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.title}
                className="group relative transition-colors hover:border-primary/50 data-[featured=true]:border-primary/60 data-[featured=true]:bg-primary/5"
                data-featured={service.featured}
              >
                <CardHeader>
                  <span className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </span>
                  <CardTitle className="mt-4 font-display text-lg">{service.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Saber más
                    <ArrowUpRight className="size-4" />
                  </span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

### Task 3.7: Create home/circular-progress.tsx

**Files:**
- Create: `src/features/home/circular-progress.tsx`

Source: `plantilla-de-portafolio-react/components/portfolio/circular-progress.tsx`

```tsx
export function CircularProgress({ value, label }: { value: number; label: string }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative size-32" role="img" aria-label={`${label}: ${value}%`}>
        <svg className="size-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="var(--secondary)" strokeWidth="8" />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-display text-2xl font-bold">
          {value}%
        </span>
      </div>
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
    </div>
  );
}
```

### Task 3.8: Create home/skills.tsx

**Files:**
- Create: `src/features/home/skills.tsx`

Source: `plantilla-de-portafolio-react/components/portfolio/skills.tsx`

Adaptation: `@/components/portfolio/section-label` → local, `@/components/portfolio/circular-progress` → local.

```tsx
import { CircularProgress } from './circular-progress';
import { SectionLabel } from './section-label';

const skills = [
  { label: 'React', value: 96 },
  { label: 'Angular', value: 88 },
  { label: 'TypeScript', value: 94 },
  { label: 'Arquitectura', value: 92 },
];

export function Skills() {
  return (
    <section className="border-t border-border/60 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel className="justify-center">Skills</SectionLabel>
          <h2 className="mt-4 font-display text-3xl font-bold text-balance md:text-4xl">Lo que domino</h2>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-10 md:grid-cols-4">
          {skills.map((skill) => (
            <CircularProgress key={skill.label} value={skill.value} label={skill.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Task 3.9: Create home/projects.tsx

**Files:**
- Create: `src/features/home/projects.tsx`

Source: `plantilla-de-portafolio-react/components/portfolio/projects.tsx`

Adaptation: `next/image` → `<img>`, `@/components/ui/badge` → `@components/ui/badge`, `@/components/portfolio/section-label` → local.

```tsx
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@components/ui/badge';
import { SectionLabel } from './section-label';

const projects = [
  {
    title: 'Bidilink SaaS Platform',
    category: 'React · TypeScript · Docker',
    image: '/portfolio/project-2.png',
    href: '#',
  },
  {
    title: 'Vumi Travels',
    category: 'React · REST APIs',
    image: '/portfolio/project-1.png',
    href: '#',
  },
  {
    title: 'Prodesa Web/App',
    category: 'Angular · Ionic',
    image: '/portfolio/project-3.png',
    href: '#',
  },
  {
    title: 'Copidrogas Front',
    category: 'React · E-commerce',
    image: '/portfolio/project-4.png',
    href: '#',
  },
];

export function Projects() {
  return (
    <section id="proyectos" className="border-t border-border/60 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel>Portafolio</SectionLabel>
            <h2 className="mt-4 font-display text-3xl font-bold text-balance md:text-4xl">Proyectos destacados</h2>
          </div>
          <p className="max-w-sm text-pretty text-muted-foreground">
            Una selección de plataformas y aplicaciones web construidas con React, Angular y TypeScript.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              className="group relative overflow-hidden rounded-xl border border-border bg-card"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={project.image || '/placeholder.svg'}
                  alt={`Vista previa del proyecto ${project.title}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between gap-4 p-5">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {project.category}
                  </Badge>
                  <h3 className="font-display text-lg font-semibold">{project.title}</h3>
                </div>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <ArrowUpRight className="size-5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Task 3.10: Create home/faq.tsx

**Files:**
- Create: `src/features/home/faq.tsx`

Source: `plantilla-de-portafolio-react/components/portfolio/faq.tsx`

Adaptation: `@/components/ui/accordion` → `@components/ui/accordion`, `@/components/portfolio/section-label` → local.

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@components/ui/accordion';
import { SectionLabel } from './section-label';

const faqs = [
  {
    q: '¿Qué tecnologías dominas?',
    a: 'Mi stack principal es React, Angular, TypeScript y JavaScript, con gestión de estado usando Redux Toolkit, Zustand y TanStack Query. También trabajo con SASS, Docker, GitHub Actions y CI/CD.',
  },
  {
    q: '¿Cómo abordas la arquitectura de un proyecto?',
    a: 'Aplico Atomic Design, design systems y patrones de arquitectura de componentes para crear estructuras modulares, escalables y mantenibles, con código limpio y listo para crecer.',
  },
  {
    q: '¿Trabajas también con el backend?',
    a: 'Mi foco es el frontend, pero integro APIs REST y comunicación con microservicios. Tengo experiencia con Spring Boot y PostgreSQL para soluciones full-stack cuando el proyecto lo requiere.',
  },
  {
    q: '¿Cómo optimizas el rendimiento?',
    a: 'Uso lazy loading, code splitting y buenas prácticas de SEO y accesibilidad. En proyectos anteriores logré mejorar los tiempos de carga en aproximadamente un 40%.',
  },
  {
    q: '¿Trabajas con metodologías ágiles?',
    a: 'Sí. Trabajo con Scrum, Kanban y Git Flow, integrado en equipos que usan herramientas como Jira y Figma para mantener un flujo colaborativo y transparente.',
  },
];

export function Faq() {
  return (
    <section id="faq" className="border-t border-border/60 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="text-center">
          <SectionLabel className="justify-center">FAQ</SectionLabel>
          <h2 className="mt-4 font-display text-3xl font-bold text-balance md:text-4xl">Preguntas frecuentes</h2>
        </div>

        <Accordion className="mt-12" defaultValue={['item-0']}>
          {faqs.map((faq, i) => (
            <AccordionItem
              key={faq.q}
              value={`item-${i}`}
              className="rounded-lg border border-border bg-card px-4 not-last:mb-3 not-last:border-b"
            >
              <AccordionTrigger className="font-display text-base hover:no-underline">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
```

### Task 3.11: Create home/blog.tsx

**Files:**
- Create: `src/features/home/blog.tsx`

Source: `plantilla-de-portafolio-react/components/portfolio/blog.tsx`

Adaptation: `next/image` → `<img>`, `@/components/ui/card` → `@components/ui/card`, `@/components/portfolio/section-label` → local.

```tsx
import { ArrowUpRight } from 'lucide-react';
import { Card, CardContent } from '@components/ui/card';
import { SectionLabel } from './section-label';

const posts = [
  {
    title: 'Arquitectura de frontend escalable con Atomic Design',
    date: '02 Jun 2026',
    category: 'Arquitectura',
    image: '/portfolio/blog-2.png',
    href: '#',
  },
  {
    title: 'Optimizar React: lazy loading y code splitting en la práctica',
    date: '02 Jun 2026',
    category: 'Rendimiento',
    image: '/portfolio/blog-3.png',
    href: '#',
  },
  {
    title: 'Componentes reutilizables y design systems mantenibles',
    date: '02 Jun 2026',
    category: 'React',
    image: '/portfolio/blog-1.png',
    href: '#',
  },
];

export function Blog() {
  return (
    <section id="blog" className="border-t border-border/60 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel className="justify-center">Blog</SectionLabel>
          <h2 className="mt-4 font-display text-3xl font-bold text-balance md:text-4xl">Últimas publicaciones</h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.title} className="group overflow-hidden pt-0">
              <a href={post.href} className="block">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image || '/placeholder.svg'}
                    alt={`Imagen del artículo: ${post.title}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="pt-5">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
                    <span>{post.date}</span>
                    <span aria-hidden="true" className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground">{post.category}</span>
                  </div>
                  <h3 className="mt-3 flex items-start justify-between gap-3 font-display text-lg font-semibold leading-snug text-balance">
                    {post.title}
                    <ArrowUpRight className="mt-1 size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                  </h3>
                </CardContent>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Task 3.12: Create home/contact.tsx

**Files:**
- Create: `src/features/home/contact.tsx`

Source: `plantilla-de-portafolio-react/components/portfolio/contact.tsx`

Adaptation: `@/components/ui/button` → `@components/ui/button`, `@/components/ui/input` → `@components/ui/input`, `@/components/ui/textarea` → `@components/ui/textarea`, `@/components/ui/field` → `@components/ui/field`, `@/components/portfolio/section-label` → local.

```tsx
'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Check } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';
import { Field, FieldGroup, FieldLabel, FieldError } from '@components/ui/field';
import { SectionLabel } from './section-label';

type FormState = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof FormState, string>>;

const contactInfo = [
  { icon: Phone, label: 'Llámame', value: '+57 300 828 8485', href: 'tel:+573008288485' },
  { icon: Mail, label: 'Escríbeme', value: 'yayomanosalva@gmail.com', href: 'mailto:yayomanosalva@gmail.com' },
  { icon: MessageCircle, label: 'LinkedIn', value: 'in/jair-manosalva', href: 'https://www.linkedin.com/' },
  { icon: MapPin, label: 'Encuéntrame', value: 'Colombia', href: '#' },
];

export function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(values: FormState): Errors {
    const next: Errors = {};
    if (!values.name.trim()) next.name = 'Ingresa tu nombre.';
    if (!values.email.trim()) {
      next.email = 'Ingresa tu correo.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = 'Ingresa un correo válido.';
    }
    if (!values.message.trim()) {
      next.message = 'Cuéntame sobre tu proyecto.';
    } else if (values.message.trim().length < 10) {
      next.message = 'El mensaje debe tener al menos 10 caracteres.';
    }
    return next;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  }

  function update(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  return (
    <section id="contacto" className="border-t border-border/60 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <SectionLabel>Contacto</SectionLabel>
            <h2 className="mt-4 font-display text-3xl font-bold text-balance md:text-4xl">
              Hablemos o tomemos un café
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              ¿Tienes una idea en mente? Rellena el formulario o usa cualquiera de estos canales. Respondo en menos de 24 horas.
            </p>

            <ul className="mt-10 flex flex-col gap-5">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <a href={item.href} className="group flex items-center gap-4">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="size-5" />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-xs uppercase tracking-wider text-muted-foreground">{item.label}</span>
                        <span className="font-medium text-foreground">{item.value}</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 md:p-8">
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 py-10 text-center">
                <span className="flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check className="size-7" />
                </span>
                <h3 className="font-display text-xl font-bold">¡Mensaje enviado!</h3>
                <p className="max-w-xs text-muted-foreground">
                  Gracias por escribirme, {form.name.split(' ')[0]}. Te responderé muy pronto.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setForm({ name: '', email: '', message: '' });
                    setSubmitted(false);
                  }}
                >
                  Enviar otro mensaje
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <FieldGroup>
                  <Field data-invalid={!!errors.name}>
                    <FieldLabel htmlFor="name">Nombre</FieldLabel>
                    <Input
                      id="name"
                      placeholder="Tu nombre completo"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      aria-invalid={!!errors.name}
                    />
                    <FieldError>{errors.name}</FieldError>
                  </Field>

                  <Field data-invalid={!!errors.email}>
                    <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tucorreo@ejemplo.com"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      aria-invalid={!!errors.email}
                    />
                    <FieldError>{errors.email}</FieldError>
                  </Field>

                  <Field data-invalid={!!errors.message}>
                    <FieldLabel htmlFor="message">Mensaje</FieldLabel>
                    <Textarea
                      id="message"
                      rows={5}
                      placeholder="Cuéntame sobre tu proyecto..."
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      aria-invalid={!!errors.message}
                    />
                    <FieldError>{errors.message}</FieldError>
                  </Field>

                  <Button type="submit" size="lg" className="w-full">
                    Enviar mensaje
                  </Button>
                </FieldGroup>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Task 3.13: Create home/site-footer.tsx

**Files:**
- Create: `src/features/home/site-footer.tsx`

Source: `plantilla-de-portafolio-react/components/portfolio/site-footer.tsx`

```tsx
const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { label: 'GitHub', href: 'https://github.com/' },
  { label: 'Email', href: 'mailto:yayomanosalva@gmail.com' },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-6">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-md bg-primary font-display text-base font-bold text-primary-foreground">
            J.
          </span>
          <span className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Jair Manosalva. Todos los derechos reservados.
          </span>
        </div>

        <nav aria-label="Redes sociales" className="flex items-center gap-5">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {social.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
```

### Task 3.14: Verify build and commit

- [ ] **Step 1: Build check**

```bash
bun run build
```

Expected: build succeeds with no errors.

- [ ] **Step 2: Commit**

```bash
git add src/features/home/
git commit -m "feat: add portfolio section components (hero, about, services, skills, projects, faq, blog, contact, header, footer)"
```

### Task 3.15: Merge phase/03-portfolio-sections into develop

- [ ] **Step 1: Merge**

```bash
git checkout develop
git merge --no-ff phase/03-portfolio-sections -m "phase: portfolio sections - all 12 components"
```

---

## Phase 4: Layout & Routing

**Branch:** `phase/04-layout-routing`
**Goal:** Simplify layout to one-page, compose all sections on home page.

### Task 4.1: Simplify appRoutes.tsx

**Files:**
- Modify: `src/config/appRoutes.tsx`

Change from multi-route setup to single root route loading the full one-page.

```tsx
import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';

const PortfolioPage = lazy(() => import('@app/page'));

function LazyLoad({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-background text-foreground">Cargando...</div>}>{children}</Suspense>;
}

export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <LazyLoad>
        <PortfolioPage />
      </LazyLoad>
    ),
  },
];
```

### Task 4.2: Simplify layout.tsx

**Files:**
- Modify: `src/app/layout.tsx`

Remove NavBar/Footer/Outlet pattern. The layout is just a wrapper — all sections (including header and footer) are composed in `page.tsx`.

```tsx
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Outlet />
    </div>
  );
}
```

### Task 4.3: Compose page.tsx with all sections

**Files:**
- Modify: `src/app/page.tsx`

Replace the current homepage with the full one-page composition.

```tsx
import { SiteHeader } from '@features/home/site-header';
import { Hero } from '@features/home/hero';
import { About } from '@features/home/about';
import { Services } from '@features/home/services';
import { Skills } from '@features/home/skills';
import { Projects } from '@features/home/projects';
import { Faq } from '@features/home/faq';
import { Blog } from '@features/home/blog';
import { Contact } from '@features/home/contact';
import { SiteFooter } from '@features/home/site-footer';
import { Seo } from '@components/common/Seo';

export default function HomePage() {
  return (
    <>
      <Seo
        title="Jair Manosalva — Senior Frontend Developer"
        description="Portafolio de Jair Manosalva, Senior Frontend Developer con más de 10 años de experiencia en React, Angular y TypeScript."
      />
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Faq />
        <Blog />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
```

### Task 4.4: Verify build

- [ ] **Step 1: Build check**

```bash
bun run build
```

Expected: build succeeds with no errors.

- [ ] **Step 2: Verify dev server starts**

```bash
bun run dev &
sleep 3
curl -s http://localhost:3000 | head -20
kill %1 2>/dev/null
```

Expected: page loads with the one-page portfolio.

- [ ] **Step 3: Commit**

```bash
git add src/app/ src/config/
git commit -m "feat: convert to one-page layout with all portfolio sections"
```

### Task 4.5: Merge phase/04-layout-routing into develop

- [ ] **Step 1: Merge**

```bash
git checkout develop
git merge --no-ff phase/04-layout-routing -m "phase: layout and routing - one-page composition"
```

---

## Phase 5: Cleanup

**Branch:** `phase/05-cleanup`
**Goal:** Remove old unused components, verify everything works.

### Task 5.1: Remove old NavBar

- [ ] **Step 1: Check if NavBar.tsx exists**

```bash
ls src/shared/components/common/NavBar.tsx 2>/dev/null && echo "exists" || echo "not found"
```

If it exists, delete it:

```bash
rm src/shared/components/common/NavBar.tsx
```

### Task 5.2: Remove old Footer

- [ ] **Step 1: Check and remove**

```bash
ls src/shared/components/common/Footer.tsx 2>/dev/null && rm src/shared/components/common/Footer.tsx && echo "removed" || echo "not found"
```

### Task 5.3: Check for unused feature directories

- [ ] **Step 1: List feature directories**

```bash
ls src/features/
```

If `about/`, `projects/`, `contact/` exist and have index files, check if they're imported anywhere. If not referenced, they can stay (future use) but verify they don't cause build issues.

### Task 5.4: Final full build check

- [ ] **Step 1: Clean build**

```bash
rm -rf dist && bun run build
```

Expected: clean build with no errors.

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "chore: cleanup old components, finalize migration"
```

### Task 5.5: Merge phase/05-cleanup into develop

- [ ] **Step 1: Final merge**

```bash
git checkout develop
git merge --no-ff phase/05-cleanup -m "phase: cleanup - remove old components"
```

---

## Verification

After all phases are merged into develop, run:

```bash
git checkout develop
bun run build
bun run dev
```

Expected:
- Build succeeds with zero errors
- Dev server starts on `http://localhost:3000`
- Full one-page portfolio renders with dark theme, orange accents
- All sections visible: Header, Hero, About, Services, Skills, Projects, FAQ, Blog, Contact, Footer
- Navigation hash links scroll to correct sections
- Mobile menu works
- Contact form validation works
- Accordion FAQ expands/collapses
