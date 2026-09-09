# Design canvas — Grok Build unofficial

Visual HTML for Tutul’s review and Salim’s implementation. Not the shipped webview.

## Open

Open `index.html` in a browser, or any file under `screens/`. Each screen fills the window like a VS Code chat panel. Resize the browser to mimic dragging the split. Floor is 280px.

## Locked look

- Geist Sans 400 + JetBrains Mono
- Canvas `#1E1F22`
- Radius 8 / 12 / 16 (composer is 16)
- 8pt spacing, 4px half-step
- No drop shadows
- Task-type glyphs beside tool verbs; status icon changes while working

Tokens live in `design-system/tokens.css` only. Do not copy the token block into screens.

## Out of scope

Svelte, Marketplace ship, grok.com embed, Voice / Imagine / Bot, a fake editor or terminal inside the sidebar.

Salim ports approved visuals into `webview/` after review.
