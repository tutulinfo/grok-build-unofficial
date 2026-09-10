# Flows

Jobs in order. Screen files are under `design-output/screens/`.

## 1. First run

| Step | Screen | User is doing | Extra state |
|---|---|---|---|
| Open sidebar, CLI missing | `empty.html` | Read setup, Retry / View log / Open grok.x.ai | Composer disabled |
| CLI ready, no messages | `empty.html` | Type in “Ask anything” | kbd: Enter, Shift+Enter, Ctrl+Shift+G |

Header: theme, New chat, Chat history, Rewind, thinking, More. Hover tooltips sit above page text (`z-index` on header).

## 2. Prompt → work

| Step | Screen | User is doing | Extra state |
|---|---|---|---|
| Submit | `working.html` | Watch live line | Thinking → Searching → Using tools → Working for Ns. `prefers-reduced-motion`: last line only |
| Tools | `working.html` | Click path / diff / open | SEARCH, READ, EDIT, RUN rows stay. Stop is the white circle with square |

## 3. Permission gate

| Step | Screen | User is doing | Extra state |
|---|---|---|---|
| Write | `approval.html` | Apply, Accept all edits, Reject | Path opens editor. Named actions, not “Are you sure?” |
| Command | `approval.html` | Run, Always allow, Reject, Never | Always allow tooltip shows learned prefix, e.g. `Bash(npm test:*)` |

Cards use the same hairline shell as the composer. No yellow rail, no full-width GitHub bars. Diff is colored `+` / `-` text inside `.gb-code`.

## 4. Inspect edits and commands

| Step | Screen | User is doing | Extra state |
|---|---|---|---|
| Peek | `diff-peek.html` | Read inline hunk, press diff or open | Second collapsed EDIT row |
| RUN live | `terminal.html` | Read streaming output, show all | Collapsed success + failed `exit 1` |

## 5. Composer extras

| Step | Screen | User is doing | Extra state |
|---|---|---|---|
| Effort | `composer.html` | Open Fast menu | Auto / Fast (check) / Expert / Build (hover + side tip) / Heavy |
| Queue | `composer.html` | Send all now / Clear / Send one | Banner above composer |
| Overflow | `composer.html` | Config, log, Restart, About | MCP and skills disabled, labeled why |
| Slash | not a separate file | Type `/` | Restore autocomplete in product: name + description, ↑↓ Enter. Canvas dropped the overlay so it did not stack on the effort menu |

Attach stays the `+` on the left. Ask (permission) and grok-4.6 stay as chips. Only Send/Stop sit on the right.

## 6. History and rewind

| Step | Screen | User is doing | Extra state |
|---|---|---|---|
| List | `history.html` | Search, open a chat, rename, delete | Armed delete confirm. Left drawer, grok.com analogue |
| Rewind | `history.html` | Pick a checkpoint | Warning: does not undo disk writes. Confirm with the prompt name |
| Worktree | `history.html` | Create / Move / Open / Apply / Remove | Same drawer, below rewind |

Clock in the header opens this drawer. Do not add a second left rail of + and menu on the chat column.

## 7. Questions and plan

| Step | Screen | User is doing | Extra state |
|---|---|---|---|
| Question | `question-plan.html` | Pick an option, Other…, Next / Skip | Back disabled on step 1 |
| Plan dock | `question-plan.html` | Read 3/7, dismiss | Permission chip reads Plan |

## Light / dark

Same screens. `[data-theme=light]` on `<html>`. Production already has `grokBuild` theme; wire the sun/moon to that setting.