# AGENTS.md

## What This Project Is

This repo is an Astro-based personal website. The home page is not a standard landing page; it behaves like a small desktop OS with draggable windows, desktop icons, a blog app, and supporting app-like panels.

The project has two equally important parts:

- a desktop-style shell on `/`
- a conventional content-backed blog system under `/blog`

When making changes, treat the desktop interactions as product behavior, not decorative chrome.

## Stack

- Framework: Astro
- Content: Astro Content Collections
- Main content source: `src/content/blog`
- Client behavior: browser JavaScript loaded from `public/scripts`
- Styling: CSS loaded from `public/styles`

Useful commands:

- `npm run dev`
- `npm run build`
- `npm run preview`

## First Places To Read

If you are new to the repo, start here:

1. `src/pages/index.astro`
   The main desktop-style home page. This is the integration point for the OS UI.
2. `src/data/desktop.ts`
   Desktop app metadata, icon labels, window sizes, and positioning data.
3. `src/components/desktop/WindowFrame.astro`
   Shared window shell and window controls.
4. `src/components/desktop/DesktopBlogWindow.astro`
   The main blog application shown inside the desktop.
5. `src/lib/blog.ts`
   Shared blog helpers: locale logic, paths, formatting, and post lookup.

## Blog Architecture

The blog exists in two forms:

- standard pages under `src/pages/blog/**`
- an embedded reader used inside the desktop window

Important files:

- `src/components/blog/BlogIndexPage.astro`
- `src/components/blog/BlogArticlePage.astro`
- `src/components/blog/BlogEmbedPage.astro`
- `src/content/blog/*`

If blog typography, locale switching, or article selection feels wrong, inspect both the desktop blog window and the underlying blog page components.

## Desktop Architecture

The home page is assembled from desktop-specific components plus shared window behavior.

Core ideas:

- each app has an id defined in `src/data/desktop.ts`
- the page uses that metadata to render icons and windows
- shared window behavior should stay in the window shell / desktop script layer instead of being duplicated per app

Desktop-related files are mainly under:

- `src/components/desktop/`
- `src/data/desktop.ts`
- `public/styles/desktop-os.css`
- `public/scripts/desktop-os.js`

In some working states, desktop CSS or JS may be further split into subfiles under `public/styles/desktop/` or `public/scripts/desktop/`. If those folders exist, keep concerns separated there instead of pushing everything back into one large file.

## Design Direction

The current visual language is deliberately restrained:

- warm off-white / paper-like surfaces
- serif-led editorial typography
- minimal chrome
- subtle focus states instead of loud color

Avoid introducing glossy consumer-app styling unless the user explicitly asks for a different direction.

## How To Add Or Change Things

### Add a new desktop app

1. Add app metadata to `src/data/desktop.ts`
2. Render the app window from `src/pages/index.astro`
3. Put app-specific UI in `src/components/desktop/`
4. Reuse `WindowFrame.astro` instead of inventing a new shell

### Update blog content

1. Edit or add files in `src/content/blog`
2. Check locale pairing and slugs
3. Verify both `/blog` and the embedded desktop blog window still work

### Change interactions

If the change affects:

- window focus / drag / resize / minimize / maximize: start with the desktop script layer and `WindowFrame.astro`
- blog selection or locale switching: inspect both `DesktopBlogWindow.astro` and blog page helpers
- global look and spacing: start from `public/styles/desktop-os.css`

## Guardrails

- Keep desktop behavior coherent across apps; do not special-case one window unless necessary.
- Prefer data-driven additions in `src/data/desktop.ts` over hardcoded duplicated markup.
- Preserve the editorial OS feeling unless the request clearly changes the art direction.
- If the user asks for UI refinement, check the actual rendered interaction, not just static markup.

## Verification

At minimum, run:

- `npm run build`

For meaningful desktop UI changes, also manually verify:

- opening and closing windows
- focus state changes
- dragging and resizing
- dock behavior if present
- blog article switching
- locale switching

## Current Intent

This repo is trying to make a personal website feel like a carefully designed desktop environment while still keeping the writing system maintainable.

Optimize for:

- visual consistency
- clear structure
- smooth interaction behavior
- easy handoff for the next agent
