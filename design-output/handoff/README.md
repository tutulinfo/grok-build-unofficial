# Handoff — Grok Build unofficial sidebar

Rebuild in the existing **Svelte 5 webview**. Do not ship this HTML. Do not copy `present.html` or the deck bar into the product.

**Flagship:** `design-output/screens/working-busy.html`

**Walkthrough (Tutul only):** `design-output/index.html` → Presentation → `present.html`. Screen files themselves have no presentation chrome.

## Open

1. `design-output/index.html`
2. Sun/moon = light/dark (`localStorage` in the canvas; production uses the existing `grokBuild` theme setting)
3. Resize like the VS Code chat split (floor 280px)

| File | Role |
|---|---|
| `design-output/design-system/tokens.css` | Color, type, space, radius, motion |
| `design-output/components/chrome.css` | Composer, chips, tools, cards, tooltips |
| `docs/UI_INVENTORY.md` | Every control that must survive |

## Non-negotiables

- Keep every inventory control. Hide nothing in a gear.
- Path click → VS Code editor. `diff` → VS Code side-by-side.
- Terminal output lives in the tool accordion, not a fake VS Code terminal.
- Voice / Imagine / grok.com logo / Universal Sans: out.
- Ask / Accept / Plan / Bypass, Grok 4.6, Fast: chips with chevron (`.gb-dd`). Queue only while a turn is running. Send or Stop on the right, never both.
- Always allow lives on the **command approval card**, not on the Ask chip.

## Effort labels

Canvas shows Auto / Fast / Expert / Build / Heavy. Persist the ACP `modeId`. Do not invent modes the CLI does not send.

## Next

`flows.md` then `thinking.md`. Rebuild by flow.
