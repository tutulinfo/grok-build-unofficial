# Flows

Screens: `design-output/screens/`.

## 1. First run

| Step | Screen | User |
|---|---|---|
| CLI missing | `empty.html` | Retry / View log / Open grok.x.ai. Composer disabled. |
| Not signed in | `empty-auth.html` | Same actions. Card only — do not stack the invitation headline. |
| Start failed | `empty-failed.html` | Retry primary, View log. Composer disabled. |
| Starting | `empty-starting.html` | Status `starting…`. Composer disabled until idle. |
| CLI ready | `empty-ready.html` | Empty field only. Send live. Enter / Shift+Enter. |

Do not stack the invitation headline and the setup card on the same state.

## 2. Prompt → work

| Step | Screen | User |
|---|---|---|
| First tools | `working.html` | Live line Thinking → Searching → Using tools → Working for Ns. Tools: Read (opens editor), Edited (accordion + diff), Run (accordion). Queue + Stop. |
| Thinking open | `thinking.html` | Expanded Thought with streaming copy. Collapsed read. Queue + Stop. |
| Thinking done | `thinking-done.html` | Collapsed “Thought · 4.2s · 86 words”. Turn footer tokens. |
| Long turn | `working-busy.html` | Prose first. Collapsed explore. Open typecheck + failed smoke. Inline diff. Write + run approval cards. Path badges. Code fence with Copy / Apply. |
| Notices | `notice.html` | Info load, context 78% warn + Compact, grok exited error + View log. |
| Scrolled up | `latest.html` | Sticky user prompt. Latest pill. |
| Context hot | `status-hot.html` | ctx 91% danger + Compact on the status line. |

Tool default = one icon row + chevron. Click row to expand. Click **filename** to open VS Code. No “ok” labels, no fat Open pills.

## 3. Permissions

| Step | Screen | User |
|---|---|---|
| Write | `approval.html` | Apply, Accept all edits, Reject |
| Command | `approval.html` | Run, Always allow, Reject, Never |
| Agent tool | `approval-agent.html` | Allow once, Allow for session, Reject |

Hairline cards. Named actions. Pending gate is a sticky bar above the composer.

## 4. Inspect

| Step | Screen | User |
|---|---|---|
| Diff | `diff-peek.html` | Accordion edit + collapsed second file |
| Terminal | `terminal.html` | Typecheck open, git collapsed, smoke failed |

Output boxes: `.gb-clip` so scrollbars stay inside the radius. No extra left indent.

## 5. Composer

| Step | Screen | User |
|---|---|---|
| Modes | `composer.html` | Ask chip open: Ask / Accept / Plan / Bypass. Fast + Grok 4.6 closed. Queue banner. Header overflow. |
| Effort | `composer-effort.html` | Fast open: Auto / Fast / Expert / Build / Heavy. Persist ACP modeId. |
| Model | `composer-model.html` | Grok 4.6 open. Other ids stay as CLI sends them. |
| Slash | `composer-slash.html` | `/` autocomplete above composer. Do not stack on the Ask menu. |
| Slash result | `slash-result.html` | `/context` modal. |
| Slash error | `slash-result-error.html` | `/compact` failed. |
| Attach | `composer-attach.html` | Thumbs, remove, +N. |
| Stopped | `composer-stopped.html` | Restart on the right. No Send. |

One toolbar row, `nowrap`. Attach `+` left. Send/Stop/Restart right.

## 6. Question + plan

| Step | Screen | User |
|---|---|---|
| Q1 radio | `question-plan.html` | Other…, Back/Next/Skip. Plan dock 3/7. Chip reads Plan. |
| Q2 multi | `question-multi.html` | Checkboxes. Send. |
| Answered | `question-answered.html` | Picks as text. |
| Skipped | `question-skipped.html` | Let Grok continue without answers. |
| Proposal | `proposed-plan.html` | Approve & start, Request changes, Reject. |
| Feedback | `proposed-plan-feedback.html` | Send feedback. |

## 7. History, rewind, worktree

Clock → `history.html` (sessions only). Loading `history-loading.html`. Empty `history-empty.html`. Miss `history-nomatch.html`. Rename / saved / delete as before.

Rewind icon → `rewind.html`. Empty `rewind-empty.html`. Confirm `rewind-confirm.html`.

More → Worktree… → `worktree.html`. No git `worktree-no-git.html`. Remove confirm `worktree-remove.html`.

## Light / dark

Same HTML. `[data-theme=light]`. Wire sun/moon to existing settings.
