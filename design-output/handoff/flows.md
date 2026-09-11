# Flows

Screens: `design-output/screens/`.

## 1. First run

| Step | Screen | User |
|---|---|---|
| CLI missing | `empty.html` | Retry / View log / Open grok.x.ai. Composer disabled. |
| CLI ready | `empty-ready.html` | Empty field only. Send live. Enter / Shift+Enter. |

Do not stack the invitation headline and the setup card on the same state.

## 2. Prompt → work

| Step | Screen | User |
|---|---|---|
| First tools | `working.html` | Live line Thinking → Searching → Using tools → Working for Ns. Tools: Read (opens editor), Edited (accordion + diff), Run (accordion). Queue + Stop. |
| Long turn | `working-busy.html` | Prose first. Collapsed explore. Open typecheck + failed smoke. Inline diff. Write + run approval cards. Path badges. Code fence with Copy / Apply. |

Tool default = one icon row + chevron. Click row to expand. Click **filename** to open VS Code. No “ok” labels, no fat Open pills.

## 3. Permissions

| Step | Screen | User |
|---|---|---|
| Write | `approval.html` | Apply, Accept all edits, Reject |
| Command | `approval.html` | Run, Always allow, Reject, Never |

Hairline cards. Named actions.

## 4. Inspect

| Step | Screen | User |
|---|---|---|
| Diff | `diff-peek.html` | Accordion edit + collapsed second file |
| Terminal | `terminal.html` | Typecheck open, git collapsed, smoke failed |

Output boxes: `.gb-clip` so scrollbars stay inside the radius. No extra left indent.

## 5. Composer

| Step | Screen | User |
|---|---|---|
| Modes | `composer.html` | Ask chip open: Ask / Accept / Plan / Bypass. Fast + Grok 4.6 closed, still chevrons. Queue banner. Header overflow: config, log, Restart, About. MCP/skills disabled with why. |
| Slash | product only | `/` autocomplete. Do not stack on the Ask menu. |

One toolbar row, `nowrap`. Attach `+` left. Send/Stop right.

## 6. Question + plan

`question-plan.html` — Question 1 of 2, Other…, Back/Next/Skip. Plan dock 3/7. Chip reads Plan.

## 7. History

`history.html` — **full-rail panel**, not a split drawer. Back, Chats, New chat, search, list, armed delete, rewind (does not undo disk writes), worktree Create / Move / Open / Apply / Remove. Clock in the chat header opens this panel.

## Light / dark

Same HTML. `[data-theme=light]`. Wire sun/moon to existing settings.
