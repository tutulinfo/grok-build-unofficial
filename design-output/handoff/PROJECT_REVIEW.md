# Project review — Grok Build (unofficial)

Full-source review of the VS Code extension at `d:\projects\grok-build-unofficial` (host ACP client, permission/fs/terminal bridges, Svelte 5 webview). No source was modified except this file.

## Summary

This is a well-structured unofficial ACP client: the host owns the transcript and gates mutations at the only callbacks the CLI actually uses (`fs/write_text_file`, `terminal/create`), the webview is a typed renderer, and the protocol quirks are documented and handled defensively. The main safety boundary is real, but it is not as tight as the UI copy implies — learned command prefixes can be widened with newlines or Windows `cmd` `&`, and neither writes nor commands are confined to the workspace. Process lifecycle around restart/crash is racy, and there are almost no automated tests for the gate, session machine, or webview behaviour.

## Architecture

**Strengths of the split.** `GrokSession` is the single state machine; `AcpClient` is a thin line-delimited JSON-RPC transport; `PermissionGate` / `FsBridge` / `TerminalBridge` sit on the agent→client request path. The webview never talks to grok. That matches how v0.2.112 actually works: grok does not raise `session/request_permission` over ACP, so client-side gating on `fs/*` and `terminal/*` is the correct lever (see `docs/acp-findings.md` §4–5). History replay is muted until a single `state` flush; streaming tokens are coalesced; images are staged to avoid VS Code dropping large `postMessage` payloads.

**Structural risks.**

- The agent is spawned with `--permission-mode bypassPermissions` so *this* extension is the only gate. That is coherent today because file mutations and shells are callback-routed. If a future CLI writes on its own (or a tool stops using `fs/write_text_file`), Bypass becomes literal.
- Shared leader is on by default (`grokBuild.useSharedLeader`). The TUI and this UI can share session store/process; the gate only covers *this* client's callbacks.
- Reads are intentionally ungated and unrestricted. The agent can `fs/read_text_file` any path the OS user can read (open buffers, `~/.ssh`, `.env`, `~/.grok`). That matches Claude-style agents but is not a sandbox.
- Multi-root workspaces use only `workspaceFolders[0]`. No-folder windows fall back to `%USERPROFILE%` / `process.cwd()`.
- Plan mode is a preamble plus the gate. Grok will still *attempt* writes/commands; the client fails them. That works, but it is not the CLI's real plan mode (`_x.ai/toggle_plan_mode` is unreachable).

## Strengths

- Permission UX is enforced where the process actually mutates the machine, with bypass re-checked inside `askApproval` so a forgotten caller cannot prompt in Bypass.
- CSP is strict (`default-src 'none'`, nonce scripts, no `connect-src`). Markdown escapes before `{@html}`; links are http(s)-only.
- Protocol logging redacts common token shapes; spawn/stderr logging goes through the same helper.
- Session delete is confined to `~/.grok/sessions/<cwd>/<id>` with an id charset check.
- External URLs from the UI (`openExternal`) require `https?://`.
- Worktree remove uses a modal confirm; rewind truncates local transcript by `promptIndex`.
- `esbuild.mjs` fails the build if a Svelte component is dropped from the bundle (TS eliding markup-only imports).
- Live protocol notes in `docs/acp-findings.md` plus `tools/probe-methods.mjs` / `verify-live.mjs` are unusually honest about what the binary actually implements.

## Issues

### Issue 1 -- Severity: bug
- File: src/host/permissions.ts:113
- Description: Session-scoped “Always allow” for commands is the main safety memory, but `commandPrefixes` only splits on `&&`, `||`, `;`, and `|`. Newlines (and Windows `cmd` `&`) are not treated as chain operators. `commandPrefix` then collapses `git status\nrm -rf /` (or `git status & del /s /q C:\foo`) to prefix `git status` because `\s+` eats the break and `git` is a subcommand host. After the user allows a harmless `git status`, a later chained payload with the same learned prefix is auto-allowed. Substitutions (`$()`, backticks, redirects) *are* handled conservatively; this hole is specifically chaining that the splitter does not see.
- Suggestion: Treat `\n`, `\r`, and (on Windows) lone `&` as chain breaks, or refuse to learn a prefix when the original line contains any of those. Prefer remembering the exact command line for `once`/`always` unless the line is a single simple argv. Add unit tests for newline, `&`, and `git status && curl | sh`.
- Status: open

### Issue 2 -- Severity: bug
- File: src/host/session.ts:658
- Description: `onAgentExit` always clears `sessionId`, forces `agentState: 'stopped'`, and inserts an error notice. It does not check that the exiting process is still `this.client`. `restart()` disposes the old `AcpClient` (Windows `taskkill`, async) then `ensureStarted()` builds a new session. When the old process’s `exit` fires, it can wipe the *new* session: idle UI becomes “grok exited”, `sessionId` is cleared while the new process is still running, and the next `ensureStarted()` spawns a second grok because `running && sessionId` is now false. The same handler also fires after a failed `start()` `dispose()`, stacking a “grok exited” notice on the setup card.
- Suggestion: Keep a generation counter or client identity; ignore `onExit` unless it belongs to the current client. On intentional `dispose()`/`restart()`, detach `onExit` or treat SIG/taskkill as quiet. Only then start the replacement process.
- Status: open

### Issue 3 -- Severity: bug
- File: tools/vscode-smoke.cjs:22
- Description: Smoke looks up `srwebstudio.grok-build-unofficial`. `package.json` publisher is `sr-web-studio` (Marketplace id `sr-web-studio.grok-build-unofficial`). `vscode.extensions.getExtension` will not find the extension, so `npm run smoke` fails before activation, commands, or spawn are tested.
- Suggestion: Use `sr-web-studio.grok-build-unofficial` (or read `publisher` + `name` from `package.json`).
- Status: open

### Issue 4 -- Severity: bug
- File: webview/components/Markdown.svelte:70
- Description: Agent markdown is rendered as real `<a href="https://…">` tags (`webview/markdown.ts:315`). The webview only intercepts `[data-md-copy]` clicks. A click on a transcript link navigates the webview document itself, replacing the chat with the remote page (scripts still blocked by CSP, but the UI is gone until the view is recreated). Setup/About correctly use `openExternal`.
- Suggestion: Delegate clicks on `a[href]` in `.md`: `preventDefault`, `send({ type: 'openExternal', url })` after the same `https?://` check the host already applies.
- Status: open

### Issue 5 -- Severity: bug
- File: src/host/panel.ts:175
- Description: `post()` rewrites attachment `path` values to `webview.asWebviewUri` so thumbnails work after base64 is stripped. The `ready` handler posts `state` and the backlog with raw `postMessage`, skipping `withWebviewImageUris`. After a webview recreate (or first paint racing attachments), user-message images that only have `path` render broken. `retainContextWhenHidden` hides this on tab switch but not on view rebuild.
- Suggestion: Route `ready` snapshots and flushed `queued` messages through `withWebviewImageUris` (same helper as `post()`).
- Status: open

### Issue 6 -- Severity: suggestion
- File: src/host/fsBridge.ts:138
- Description: `fs/write_text_file` and `terminal/create` accept any path/cwd the OS user can access. In `acceptEdits` / Bypass (and after “Always” on a write, which flips the gate to `acceptEdits` for the whole session — `permissions.ts:84`), the agent can write outside the workspace (`authorized_keys`, user config, other repos). Terminal `cwd` is `params.cwd` verbatim (`terminalBridge.ts:45`) and `env` from the agent overlays `process.env`. The gate comment that “nothing can touch the workspace without passing through here” is true and incomplete: the gate does not *restrict* to the workspace. Reads are also ungated (by design).
- Suggestion: Default-deny writes and command `cwd` outside workspace folders (and the configured extra roots). Show a distinct approval when the agent asks to leave the workspace. Do not pass through arbitrary `env` keys (`PATH`, `NODE_OPTIONS`, `LD_PRELOAD`) without review. Document the read policy in SECURITY.md.
- Status: open

### Issue 7 -- Severity: suggestion
- File: src/host/session.ts:2671
- Description: `newSession()` calls `gate.reset()`. `loadSession()` does not. Learned command allows / deny prefixes and an in-session `acceptEdits` promotion therefore survive switching conversations in the same agent process. The gate is described as session-scoped memory.
- Suggestion: Reset the gate (and `readPaths`) whenever `sessionId` changes, including load/resume/rewind if those are meant to be a new trust context.
- Status: open

### Issue 8 -- Severity: suggestion
- File: src/extension.ts:18
- Description: With no folder open, `cwd` is `process.env.USERPROFILE` (Windows) or `process.cwd()`. The agent then indexes and can read/write the user home directory under the same permission modes as a project. Easy to miss in the status line.
- Suggestion: Refuse `ensureStarted()` until a workspace folder exists, or use a dedicated empty temp directory and disable writes until a folder is opened.
- Status: open

### Issue 9 -- Severity: suggestion
- File: src/acp/client.ts:173
- Description: `stdin.write(JSON.stringify(frame) + '\n')` ignores backpressure and write errors. Large `fs/write_text_file` contents travel as a single JSON-RPC line; if write returns `false` or stdin is already closing, requests stay in `pending` forever (no timeouts anywhere on `initialize` / `session/prompt` / `_x.ai/*`). `stdoutBuf` is also unbounded if the child ever stops emitting newlines.
- Suggestion: Queue frames until `drain`; reject `pending` on write failure; add a handshake timeout; cap/stall `stdoutBuf`.
- Status: open

### Issue 10 -- Severity: suggestion
- File: src/host/session.ts:408
- Description: `initialize` advertises `clientInfo: { name: 'grok-build-unofficial', version: '0.1.0' }` while `package.json` is `0.2.2`. Support logs and any agent-side client telemetry will disagree with the installed extension.
- Suggestion: Import version from `package.json` (or a generated constant) at build time.
- Status: open

### Issue 11 -- Severity: suggestion
- File: src/acp/redact.ts:6
- Description: Redaction covers `sk_`/`xai_`/`ghp_`-style tokens, JWTs, and `Bearer`. It does not catch `AKIA…`, `xai-` without underscore, `api_key=`, `GROK_API_KEY=`, or JSON `"apiKey":"…"`. `logProtocol` dumps full frames; initialize echoes MCP config. SECURITY.md already warns logs are sensitive, but `grokBuild.logProtocol` is one toggle away from a key in the Output channel.
- Suggestion: Broaden patterns (assignment forms, AWS, PEM blocks). When `logProtocol` is on, show a one-time warning. Never log image base64 (already avoided) or full write contents.
- Status: open

### Issue 12 -- Severity: suggestion
- File: src/host/fsBridge.ts:156
- Description: When `currentContent` returns `null` (missing *or* binary/NUL file), the write path uses `createFile(..., { overwrite: false, ignoreIfExists: true })`. If the file already exists, `applyEdit` can succeed without replacing contents, and the function returns `null` (success) without falling through to `writeBytesWithRetry`. Agent believes the write landed.
- Suggestion: Use `overwrite: true` for replace-or-create, or treat `ignoreIfExists` success as failure and always fall back to a real write. Distinguish ENOENT from “exists but not text”.
- Status: open

### Issue 13 -- Severity: suggestion
- File: src/host/session.ts:1362
- Description: Pasted images are written to `<workspace>/.grok-attachments/` with no project `.gitignore` entry (the *repo* gitignores that folder for itself). Agents in git repos will see untracked binaries; a later commit can leak screenshots.
- Suggestion: Write under the extension globalStorage path, or add/merge a `.gitignore` line when creating the folder, and tell the user once.
- Status: open

### Issue 14 -- Severity: nit
- File: src/host/permissions.ts:19
- Description: `allowedWritePaths` / `dirScope` are checked in `checkWrite` but `remember()` never inserts paths; “Always” on a write sets mode `acceptEdits` instead. Dead state. `resetPermissions()` on `GrokSession` is also unreferenced (no webview/host command).
- Suggestion: Delete the unused set, or implement per-path/dir always-allow to match `describeAlwaysScope` if you want finer memory than “all edits”.
- Status: open

### Issue 15 -- Severity: nit
- File: webview/App.svelte:46
- Description: Local default `autoExpandThinking = true` disagrees with `grokBuild.autoExpandThinking` default `false` in `package.json`. Until the host `state` message arrives, thinking blocks expand.
- Suggestion: Default the rune to `false` to match settings.
- Status: open

### Issue 16 -- Severity: nit
- File: tools/vscode-smoke.cjs:142
- Description: `grokChildPids()` shells out to PowerShell `Get-CimInstance Win32_Process`. `findCodeExe()` has macOS/Linux paths, so a non-Windows smoke run dies even after the extension-id fix. The test also uses `--disable-workspace-trust`, which skips a class of real-world activation issues.
- Suggestion: Use `process.pid` tree via `ps`/`wmic` abstractions, or skip the pid assertion off Windows. Consider a trusted-workspace variant.
- Status: open

## Testing gaps

There is **no unit test tree** (no `tests/`, no `node:test`/`vitest` scripts). Critical logic is only exercised by:

| Surface | What exists | What is missing |
| --- | --- | --- |
| Permission gate | none | `commandPrefixes` / `commandPrefix` cases (chains, newlines, `&`, substitutions, `npm run`, `python -c`); write always → `acceptEdits`; plan deny |
| `FsBridge` | none | workspace vs absolute path, binary/NUL `currentContent`, `createFile` ignoreIfExists, unsaved-buffer reads, cloud retry |
| `TerminalBridge` | none | cwd/env, output byte tail, Windows `taskkill` tree, reject-without-spawn |
| `GrokSession` | none | start/resume/restart/exit races, turn queue vs cancel, image fallback, load vs gate reset, rewind truncation |
| ACP client | `tools/acp-probe.mjs`, `probe-methods.mjs`, `verify-live.mjs` (need a live authenticated CLI) | frame parse errors, string ids, stdin backpressure, overlapping requests |
| Webview | `tools/webview-harness/` (manual) | markdown XSS/link clicks, `insertionIndex` vs host, image URI mapping, composer staging |
| Integration | `tools/vscode-smoke.mjs` → `vscode-smoke.cjs` | currently broken extension id; no prompt/approval/write/command path (explicitly out of scope) |

Highest value additions, in order: (1) pure tests for `permissions.ts`, `markdown.ts`, `diff.ts`, `insertionIndex`; (2) a fake ACP child process to drive `GrokSession` without grok; (3) fix smoke id and assert webview CSP + command registration on all platforms.

## Residual notes (not defects)

- Client-side plan mode and interject queue are the right workarounds for unreachable `_x.ai` methods; the comments match the recordings.
- `shell: true` for the Windows `grok` shim is required; keep untrusted strings out of `cliPath` / `--model` if that spawn stays shell-backed.
- Treating every `G:\` path as Google Drive (`isCloudPath`) is a heuristic false-positive, not a security hole.
- Cost/token HUD and session history (disk + `_x.ai/sessions/list`) are implemented with the documented double-`result` unwrap; that is ugly and correct.
