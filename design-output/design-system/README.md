# Design system — Grok Build sidebar reskin

Single source of truth: `tokens.css`. Dark-first tokens for the ~400px chat sidebar, speaking grok.com **chat** language — not x.ai marketing, not a 1:1 TUI port. Foundations are locked; values change only by decision, never per screen.

## Principles

- Chat voice: quiet surfaces, hairline borders, one blue accent. Weight 400 is the voice; 500 only for compact labels (toolbar, status, verbs). No 600+.
- The 400px rail is the primary canvas — every default must survive it.
- Flat: no drop shadows anywhere (`--elevation: none`). The composer "raises" with `--radius-lg` + `--border`, not shadow.
- Coding-agent honesty: JetBrains Mono for paths, commands, diffs, code; TUI-leaning diff colors, not GitHub-bright.
- Inventory stays visible: permission mode, session, worktree, history, rewind are part of the design, never hidden.

## Import

Every screen loads this one file before its own CSS and never redeclares tokens:

```html
<link rel="stylesheet" href="./design-system/tokens.css" />
```

Theme: dark is default (`:root`); set `data-theme="light"` on a wrapper for light. `color-scheme` is set per theme.

Tailwind v4: a small `@theme inline` alias at the bottom of `tokens.css` maps color roles and font families (plain browsers ignore it). Tailwind's 4px spacing base already lands on the grid (`p-2`=8, `p-3`=12, `p-4`=16, `p-6`=24, `p-8`=32, `p-12`=48). Radius is deliberately not mapped into Tailwind's `--radius` scale — use `rounded-[var(--radius-md)]` or plain CSS.

## Fonts

- Geist Sans 400/500 (SIL OFL 1.1) for UI, JetBrains Mono 400/500 (SIL OFL 1.1) for code.
- Design canvas loads both via Fontsource on jsDelivr (`@import` at the top of `tokens.css`).
- Production must bundle the woff2 files, same as today's Inter under `media/fonts/` — no runtime CDN.
- Never hotlink Universal Sans / `cdn.grok.com`; it is not licensed. Geist Sans is the OFL stand-in.

## Grid

8pt grid, 4px half-step: `--space-1…7` = 4 / 8 / 12 / 16 / 24 / 32 / 48.

| Band | Values |
|---|---|
| Header + status rows | `--space-1`–`--space-2` (4–8) |
| Tool rows | `--space-2`–`--space-3` (8–12) |
| Composer | `--space-3`–`--space-4` (12–16) |
| Empty state | `--space-6`–`--space-7` (32–48) |

Do not make every gap 8px.

## Radius

- `--radius-sm` 8px — icon buttons, small chips inside tool rows
- `--radius-md` 12px — menus, code fences, clip boxes
- `--radius-lg` 28px — composer shell and raised cards (grok.com pill)
- `--radius-pill` 999px — Ask/model/Fast chips, `.gb-btn*` pills, Send/Stop circles, unofficial tag

## Icons

`--icon-size` 16px, `--icon-stroke` 1.5. Task-type glyphs sit beside uppercase verbs (SEARCH / READ / EDIT / RUN / THINK) set at 11px, weight 500.

## Motion

`--ease` = cubic-bezier(0.22, 1, 0.36, 1). Hover `--duration-fast` 120ms, enter `--duration` 200ms, exit/expand `--duration-slow` 280ms. Only opacity and transform animate. `prefers-reduced-motion: reduce` zeroes all durations and kills keyframes.

## Buttons (tokens only, no component HTML here)

- Primary (Send): 36px circle, filled `--accent`. Word pills (Approve, Retry) use `--radius-pill` and `--btn-primary-*`.
- Secondary: inset pill `--bg-inset`, not an outline rectangle — `--btn-secondary-*`.
- Danger: text `--danger` on a pill, no fill until hover — `--btn-danger-*`.
- Sticky gate actions must still meet `--btn-min-tap` 32px.
- Focus: 2px accent ring as outline — `outline: var(--focus-ring-width) solid var(--focus); outline-offset: var(--focus-ring-offset);` never the browser default, never a shadow.
- Disabled: `opacity: var(--btn-disabled-opacity)` + `pointer-events: none` + `cursor: var(--btn-disabled-cursor)` — must remain visible.
- Icon buttons in the rail: 32px minimum tap target (`--btn-min-tap`).

## Accessibility

- `--text-muted` reads 7.0:1 on the dark canvas and 6.2:1 on light — AA everywhere it is used.
- Caveats accepted under the locked direction: white on `--accent` is 3.0:1 (passes UI-component contrast; keep the Send label short at 13px/500); `--text-faint` is ~3.2–3.3:1 — decorative meta only, never body copy; light `--accent` as text is 3.96:1 — pair with weight 500 or an underline and keep it out of paragraphs.
- Focus must always be the 2px accent outline, visible on every interactive element.
- 32px minimum tap target for icon buttons in the 400px rail.

## What not to do

- No Universal Sans, no `cdn.grok.com` font URLs, no Inter / Poppins / Manrope / Satoshi / DM Sans / Space Grotesk.
- No x.ai marketing pills, gradient chips, glow, or shadows.
- No fake IDE in the sidebar: no tab bars, file explorers, or embedded terminals; no unrelated grok.com product furniture (Voice, Imagine).
- No x.ai marketing gradient pills. Composer/chip pills are the locked grok.com chat shape, not a marketing treatment.
- No 600+ weights, no colors or fonts outside the token layers.
- Do not hide inventory controls.
