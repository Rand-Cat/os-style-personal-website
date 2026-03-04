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
- `npm run import:jike -- "/absolute/path/to/export.csv"`

## First Places To Read

If you are new to the repo, start here:

1. `src/pages/index.astro`
   The main desktop-style home page. This is the integration point for the OS UI.
2. `src/data/desktop.ts`
   Desktop app metadata, icon labels, group previews, window sizes, desktop icon positions, and external links.
3. `src/components/desktop/WindowFrame.astro`
   Shared shell for both standard desktop windows and special group-style overlays.
4. `src/components/desktop/DesktopBlogWindow.astro`
   The main blog application shown inside the desktop.
5. `src/lib/blog.ts`
   Shared blog helpers: locale logic, paths, formatting, and post lookup.

Useful desktop-specific components to inspect immediately:

- `src/components/desktop/DesktopIcons.astro`
- `src/components/desktop/DesktopDock.astro`
- `src/components/desktop/VibaryWindow.astro`
- `src/components/desktop/ProductPlaceholderWindow.astro`
- `src/components/desktop/SocialFolderWindow.astro`
- `src/components/desktop/JikeIdeasWindow.astro`

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

Desktop CSS and JS are intentionally split into modules now. Keep them split by concern instead of pushing everything back into one file.
If a window/app has custom UI that is not clearly reusable, give it its own CSS file instead of growing `panes.css`.

CSS entry:

- `public/styles/desktop-os.css`

CSS modules:

- `public/styles/desktop/shell.css`
  Page shell, desktop icons, top bar, wallpaper/background treatment, and global desktop states.
- `public/styles/desktop/windows.css`
  Standard window shell, focus states, controls, maximize/fullscreen behavior, and group overlay shells.
- `public/styles/desktop/panes.css`
  Shared pane styles only. Do not keep app-specific window styling here unless it is genuinely reused.
- `public/styles/desktop/dock.css`
  Dock tray, magnification styling, active dots, hover labels, and show/hide behavior.
- `public/styles/desktop/responsive.css`
  Responsive adjustments and small-screen fallbacks.
- `public/styles/desktop/*.css`
  App-specific window styling such as `jike.css`, `studio.css`, `settings.css`, `read-easy.css`, `vibary.css`, and related per-window files.

JS entry:

- `public/scripts/desktop-os.js`

JS modules:

- `public/scripts/desktop/window-manager.js`
  Open/close/focus/minimize/maximize, initial window placement, group overlay open/close, drag, and 8-direction resize.
- `public/scripts/desktop/dock.js`
  Dock magnification and slot-width behavior.
- `public/scripts/desktop/blog-browser.js`
  Blog locale switching, embedded article routing, and sidebar behavior.
- `public/scripts/desktop/clock.js`
  Top bar and desktop clock/date.
- `public/scripts/desktop/jike-archive.js`
  Jike window interactions such as text expand/collapse and image lightbox behavior.

## Jike Archive Architecture

The `jike` desktop app is a content app backed by generated data from an exported CSV.

Important files:

- `src/components/desktop/JikeIdeasWindow.astro`
- `src/data/jike.ts`
- `src/data/jike-posts.generated.ts`
- `public/styles/desktop/jike.css`
- `public/scripts/desktop/jike-archive.js`
- `scripts/import-jike-csv.py`

Notes:

- The generated data file should be treated as derived output, not hand-edited content.
- When the CSV export changes, regenerate the data via `npm run import:jike -- "/absolute/path/to/export.csv"`.
- If the Jike UI changes, keep its structure, styles, and interactions isolated to the Jike-specific files instead of leaking logic into shared pane files.

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
5. If the window has bespoke styling or interaction logic, create app-specific files under `public/styles/desktop/` and `public/scripts/desktop/` instead of extending shared files by default

Current app categories:

- standard product / content apps
- pinned dock apps (`dockPinned: true`)
- placeholder product apps that open a generic intro pane
- grouped / folder-like apps such as `social`, which use a special overlay variant instead of a normal titlebar window

### Add a desktop group

The `social` app is the reference implementation.

What makes it different:

- the desktop icon can preview multiple items via `groupMembers`
- it uses `WindowFrame` with `variant="group"`
- opening it creates a full-screen overlay
- clicking outside the inner content closes it
- it is not meant to behave like a draggable/resizable normal window

### Update blog content

1. Edit or add files in `src/content/blog`
2. Check locale pairing and slugs
3. Verify both `/blog` and the embedded desktop blog window still work

### Change interactions

If the change affects:

- window focus / drag / resize / minimize / maximize: start with the desktop script layer and `WindowFrame.astro`
- group / folder-like overlay behavior: start with `WindowFrame.astro`, `window-manager.js`, and the relevant pane component
- dock content rules or magnification: inspect both `DesktopDock.astro` and `public/scripts/desktop/dock.js`
- blog selection or locale switching: inspect both `DesktopBlogWindow.astro` and blog page helpers
- global look and spacing: start from `public/styles/desktop-os.css`

## Current Desktop Rules

These are easy to accidentally break:

- Desktop icon images should fill the rounded rectangle shape with `object-fit: cover`; do not leave inner white padding around provided image icons.
- Favicon assets are PNG/ICO-based now and are generated from `public/icons/pfp.png` into:
  - `public/favicon.png`
  - `public/favicon.ico`
  - `public/apple-touch-icon.png`
  - `public/favicon-32x32.png`
  - `public/favicon-16x16.png`
- The dock should show:
  - pinned apps
  - currently open non-pinned apps
  It should not list every desktop app all the time.
- Standard windows open centered by default, with small offsets if other windows are already open.
- Standard windows support:
  - focus states
  - minimize
  - maximize into a real full-screen-like state
  - resize from 4 edges and 4 corners
- Maximize should hide menu bar and dock, and maximized windows should use an opaque background.
- Group overlays such as `social` should:
  - cover the whole desktop
  - hide or heavily suppress dock/menu/desktop noise behind them
  - open from the icon position with animation
  - close on outside click
- avoid unnecessary extra container layers
- Avoid using opaque color-gradient overlays to fade content in scrollable panes. Prefer `mask-image`-based fades so high-contrast background elements (like the cat illustration) do not show a visible white haze when content aligns with anchors.

## Guardrails

- Keep desktop behavior coherent across apps; do not special-case one window unless necessary.
- Prefer data-driven additions in `src/data/desktop.ts` over hardcoded duplicated markup.
- Preserve the editorial OS feeling unless the request clearly changes the art direction.
- If the user asks for UI refinement, check the actual rendered interaction, not just static markup.
- Prefer app-level decoupling for window interiors. Shared files should stay shared; they should not become catch-all buckets for unrelated app code.

## Verification

At minimum, run:

- `npm run build`

For meaningful desktop UI changes, also manually verify:

- opening and closing windows
- focus state changes
- dragging and resizing
- edge/corner resize behavior
- maximize / restore behavior
- dock behavior if present
- dock icon image cropping
- dock pinned/open visibility rules
- group overlay open / outside-click close
- blog article switching
- locale switching

## Current Intent

This repo is trying to make a personal website feel like a carefully designed desktop environment while still keeping the writing system maintainable.

Optimize for:

- visual consistency
- clear structure
- smooth interaction behavior
- easy handoff for the next agent
