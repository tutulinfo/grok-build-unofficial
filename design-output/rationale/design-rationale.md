# Design rationale — Grok Build unofficial sidebar

Internal. Share only if Tutul wants.

## Goal

Reskin the unofficial Grok Build VS Code sidebar so it speaks grok.com chat: Geist Sans, `#1E1F22`, quiet chrome, 16px composer. SuperGrok users should feel they are still in Grok, not a generic agent panel. Salim keeps every control in `docs/UI_INVENTORY.md`. File paths open the real editor. Diffs peek in chat, then the existing `diff` button opens VS Code side-by-side. Terminal output stays on the RUN row.

## Needs that shaped it

- After Send, the user must see *what* Grok is doing, not a generic spinner.
- A 400px rail cannot host a fake IDE.
- Unofficial product: color and type, not the grok.com wordmark or Universal Sans files.

## Decisions

- Geist Sans instead of Universal Sans, because the grok.com face is proprietary. JetBrains Mono stays for paths and commands.
- grok.com chat chrome, not x.ai marketing pills. Pills fight a 400px toolbar.
- Composer stays docked at the bottom. grok.com’s centered empty composer does not fit VS Code.
- Task-type glyph beside the uppercase verb, and the same glyph in the status line while that tool is live.
- Write and command approvals keep Apply / Accept all / Run / Always allow / Reject / Never. Named actions, not “Are you sure?”.
- Inline diff is a document slice. Full side-by-side stays in VS Code.

## Left out

- Voice, Imagine, grok.com Bot
- Sidebar file explorer, editor, or VS Code terminal clone
- Shipping this HTML as the product

## May change

- Light theme of the working screen, if Salim wants a pair
- Whether Always-allow prefixes persist past the session (product, not paint)
