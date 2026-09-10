# Handoff — Grok Build unofficial sidebar

Visual language for Salim. Rebuild in the existing Svelte webview. Do not ship this HTML.

## Open the canvas

1. `design-output/index.html` in a browser.
2. Sun/moon toggles light and dark. Choice persists in `localStorage`.
3. Resize the window. The rail is fluid from 280px, like dragging the VS Code chat split.

Tokens: `design-output/design-system/tokens.css`  
Chrome: `design-output/components/chrome.css`  
Theme toggle: `design-output/components/theme.js` (canvas only; production already has a theme setting)

## What this is

Unofficial Grok Build sidebar, grok.com *chat* feel. Keep every control in `docs/UI_INVENTORY.md`. Do not copy grok.com’s wordmark, logo, or Universal Sans. UI face is Geist Sans; mono is JetBrains Mono (already bundled as Inter today — swap family, keep bundling woff2).

## Product rules that are not paint

- File path click → real VS Code editor (`title`: Opens in VS Code editor).
- `diff` → VS Code side-by-side. Inline peek is a document slice, not Monaco in the rail.
- Terminal output stays on the RUN row in chat. Do not embed a VS Code terminal.
- Voice, Imagine, grok.com Bot stay out.
- Do not hide Ask / Accept / Plan / Bypass, model, effort, attach, Send/Stop/queue.

## Map grok.com labels to ACP

Effort chips read **Auto / Fast / Expert / Build / Heavy** in the canvas. Persist the ACP `modeId` the CLI advertises. Do not invent modes the agent does not send.

## Next

Read `flows.md`, then `thinking.md`. Rebuild screen by flow, not by copying markup.