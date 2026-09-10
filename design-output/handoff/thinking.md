# Thinking — do not “normalize”

- **Signature:** grok.com chat chrome in a VS Code rail. Black/warm-light field, 28px pill composer, 1px `--hairline`, circular Send (accent) and Stop (ink circle, square inside). Not x.ai marketing pills. Not a TUI screenshot.
- **Features stay.** If grok.com has no Write-file card, still ship Apply / Accept all / Reject and Run / Always allow / Reject / Never. Restyle to `.gb-card`, do not delete.
- **Live line ≠ tool rows.** The morphing Thinking / Searching / Using tools / Working for Ns is the grok.com status. SEARCH/READ/EDIT/RUN rows underneath are the coding-agent document. Both exist.
- **Spacing break:** composer padding 18×20px and a tall empty “Ask anything” field. Do not crush it back to a 4px toolbar.
- **Tooltips:** same hairline shell as the composer. Header `z-index` above the transcript so labels are not covered. No native `title` on those icons (double tooltip).
- **Left history** is a drawer from the clock, not a permanent +/menu rail beside the chat.
- **Type:** Geist Sans 400. Do not ship Universal Sans from cdn.grok.com. JetBrains Mono for paths and diffs.
- **Motion:** opacity + translate only, 120/200ms, `--ease`. Reduced-motion kills the live cycle and tooltip slide.
- **Unofficial:** diamond + “GROK BUILD” + unofficial tag. Never the grok.com logo.

## Components (states)

| Class | States |
|---|---|
| `.gb-btn-primary` | default, hover, disabled |
| `.gb-btn` | default, hover, disabled |
| `.gb-btn-danger` | default, hover |
| `.gb-chip` | default, hover, `.is-open`, disabled; hairline |
| `.gb-icon` | default, hover, `.is-active`, disabled; 32×32 |
| `.gb-send` / `.gb-stop` | default, hover, disabled |
| `.gb-field` | default, hover, focus |
| `.gb-tooltip` | hidden, hover/focus, `.is-end`, `.is-right` |
| `.gb-menu-item` | default, hover, `.is-active`, `.is-checked` |
| `.gb-option` | default, hover, `.is-on` |

Focus: 2px `--focus` ring, offset. Do not rely on color alone for error (`exit 1` also has the word).

## A11y / open

- `--text-faint` is decorative. Body and commands use `--text-muted` or `--text`.
- White on accent is ~3:1. Keep Send as an icon-only circle, not long text on blue.
- Light theme of dense approval/diff was not a separate HTML file; toggle the same screens.
- Slash autocomplete must return in Svelte even though the canvas does not stack it on the Fast menu.
