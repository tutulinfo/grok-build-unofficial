# Handoff — do this

Rebuild in the existing **Svelte 5 webview**. Do not ship this HTML. Do not copy `index.html` or `present.html`.

Flagship to match: `design-output/screens/working-busy.html`

## Do, in order

1. Open `working-busy.html` at 400px. That is the look.
2. Copy tokens from `design-output/design-system/tokens.css` into `webview/styles/tokens.css`. One file. No extra palettes.
3. Port `design-output/components/chrome.css` classes (names can stay `.gb-*`).
4. Rebuild **by flow** in `flows.md`. One flow per PR if you split.
5. Keep every control in `docs/UI_INVENTORY.md`. Hide nothing in a gear.

## Map

| You build | Match this screen | Existing Svelte |
|---|---|---|
| Setup / empty | `empty.html` `empty-auth.html` `empty-failed.html` `empty-starting.html` `empty-ready.html` | `SetupCard.svelte` `Transcript.svelte` |
| Tools + prose | `working.html` `working-busy.html` `thinking.html` `thinking-done.html` | `ToolCard` `Thinking` `Markdown` `TurnFooter` |
| Sticky write/run gate | `approval.html` | `Approval.svelte` — **move to sticky bar**, not a chat card |
| Agent permission | `approval-agent.html` | `Approval.svelte` kind `agentPermission` |
| Diff / terminal | `diff-peek.html` `terminal.html` | `DiffView` `ToolCard` |
| Composer | `composer.html` `composer-effort.html` `composer-model.html` `composer-slash.html` `composer-attach.html` `composer-stopped.html` | `Composer.svelte` `Header.svelte` |
| Slash modal | `slash-result.html` `slash-result-error.html` | `CommandResult.svelte` |
| Question + plan | `question-plan.html` `question-multi.html` `question-answered.html` `question-skipped.html` `proposed-plan.html` `proposed-plan-feedback.html` | `Question` `PlanProposal` `PlanDock` |
| Notices / HUD | `notice.html` `status-hot.html` `latest.html` | `Notice` `StatusLine` `Transcript` |
| History / rewind / worktree | `history*.html` `rewind*.html` `worktree*.html` | `App.svelte` panels — **three separate screens**, do not merge |
| Restart / about | `restart.html` `composer-stopped.html` `about.html` | Header overflow + `.gb-restart` 36px slot |

## Do not

- Fake IDE, Voice, Imagine, grok.com logo, Universal Sans
- Send and Stop on screen at once
- Always-allow on the Ask chip (it lives on the **command** gate)
- Invent Fast/effort labels the CLI did not send — persist `modeId`
- Put live permission cards back into the transcript scroll
- Mix History + Rewind + Worktree in one popover

## Right-slot rule

Idle = `.gb-send`. Busy = `.gb-stop`. Stopped = `.gb-restart`. Same 36px circle.

## Theme

Sun/moon in the canvas. Product: existing `grokBuild.theme`. Same HTML, `[data-theme=light]`.

Then `thinking.md` only if you are about to “fix” a weird choice.
