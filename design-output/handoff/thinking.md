# Thinking — do not “normalize”

- **Feel:** grok.com chat in a VS Code rail — hairline pill composer, circular Send/Stop, quiet type (Geist 400, body `--text-muted`). Not a pixel copy of grok.com or of the official Grok VS Code tab.
- **Tools:** Claude-style accordion. Default one line. Chevron means it opens. Filename is the open-in-editor target.
- **Features stay.** Approvals, Queue (busy only), Bypass, Always allow, rewind, worktree — restyle, don’t delete. Don’t hide chips in a gear.
- **After Apply/Run/Reject/Never** the fat card collapses to one line (`Applied permissions.ts`, `Always allow npm test:*`). Ask-mode users will see many gates; only the current prompt stays open. History is the one-liner, chevron to peek. Accept all edits also flips the composer chip to Accept so later writes skip the card.
- **History** is a full-width panel. A 260px drawer beside chat **breaks at ~400px**.
- **Gutter:** transcript, status, composer all **16px**.
- **Composer padding:** 12×14px, toolbar gap 10px. Do not return to a dense 4px bar.
- **Dropdown chips:** `.gb-dd` chevron on Ask, Grok 4.6, Fast. Queue has no chevron (it’s an action).
- **Tooltips:** hairline pill, header `z-index` above transcript. No native `title` on those icons.
- **No page overscroll:** only `.gb-scroll` inside the rail scrolls. `overscroll-behavior: contain`.
- **Code:** path on its own bar (`.gb-fence`), never `file.tsconst`. Clip scrollbars inside radius (`.gb-clip`).
- **Fonts:** Geist Sans + JetBrains Mono, bundled woff2. Not Universal Sans from grok.com.
- **Unofficial:** diamond + GROK BUILD + unofficial. Never the grok.com logo.
- **Motion:** opacity + translate, 120/200ms. Reduced-motion kills live cycle and tooltip slide.
- **present.html** is Tutul’s walkthrough only. Not product.

## Components

| Class | Notes |
|---|---|
| `.gb-chip` + `.gb-dd` | Menu chips + chevron |
| `.gb-send` / `.gb-stop` | 36px circles |
| `.gb-acc` | `<details>` tool row |
| `.gb-clip` | Rounded output, overflow hidden, inner scroll |
| `.gb-fence` | Code path bar + Copy / Apply |
| `.gb-path` | Clickable file badge |
| `.gb-tooltip` | Hover/focus; `.is-end` for the last header icon |
| `.gb-menu` / `.gb-menu-item` | Ask modes and Fast modes |

## Open in Svelte

Slash autocomplete. Fast menu (canvas currently shows Ask menu on `composer.html`; Fast still needs the Auto…Heavy list). Light theme is the same screens, not duplicates.
