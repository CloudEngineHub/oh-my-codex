# oh-my-codex 0.21.36

`0.21.36` is a patch release that routes native-hook CLI error diagnostics through the configured OMX logs directory.

Native-hook CLI error logs now follow `omxLogsDir`: `OMX_ROOT` takes precedence over `OMX_STATE_ROOT`, and the project `.omx/logs` behavior is unchanged when neither is configured. This fixes #3908.

## Highlights

- **NATIVE HOOK LOGGING (#3909):** CLI error diagnostics use the configured `omxLogsDir`, honoring `OMX_ROOT` and `OMX_STATE_ROOT` instead of always writing beneath the project working directory.

## Compatibility

- No breaking API changes.
- `OMX_ROOT` takes precedence over `OMX_STATE_ROOT` for native-hook CLI error logs; with neither configured, logs continue to use the project `.omx/logs` directory.

## Known issues

- #3898 (live-pin fix) remains blocked on an owner design decision; #3900 and #3907 are open drafts. On Codex 0.164.0, `.omx-live-pin` files in the plugin cache can invalidate hook approval. The workaround posted in #3898 disables the `oh-my-codex-local` plugin.

## Validation

- Pinned dev candidate `4932ef923a15a5bf818f5b4fa2625d3259486275` passed CI run [40160210335](https://github.com/Yeachan-Heo/oh-my-codex/actions/runs/40160210335): latest-per-name checks were 17 success, 8 skipped, and 0 failures.
- Both macOS Ralplan preflight security jobs passed: Node 20 (job 121070025433) and Node 26.5.1 (job 121070025331).
- Release-branch local gates and release-PR review/CI are recorded in `docs/qa/release-readiness-0.21.36.md`.

## Merged PR inventory

| PR | Author | Title |
|---|---|---|
| [#3909](https://github.com/Yeachan-Heo/oh-my-codex/pull/3909) | @Yeachan-Heo | fix(native-hook): route CLI error logs through omxLogsDir |
| [#3906](https://github.com/Yeachan-Heo/oh-my-codex/pull/3906) | @Yeachan-Heo | chore(back-merge): v0.21.35 to dev (internal back-merge; no content changes) |

## Contributors

Thanks to @Yeachan-Heo for the native-hook logging fix and release back-merge.

**Full Changelog**: [`v0.21.35...v0.21.36`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.21.35...v0.21.36)

—
*[repo owner's gaebal-gajae (clawdbot) 🦞]*
