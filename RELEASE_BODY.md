# oh-my-codex 0.21.34

`0.21.34` is a patch release that preserves worker worktrees when shutdown cannot save work (PR #3896).

This release fixes an issue where worker worktrees could be deleted during shutdown even when checkpointing or merging failed, or when the working directory contained ignored files. The shutdown process no longer deletes worker worktrees in these failure cases, allowing recovery state to be preserved for retries. Submodules, report provenance, and partial pane/prompt teardown are still handled correctly.

## Highlights

- **PRESERVATION: Worker worktrees survive shutdown failure (#3896):** When shutdown could not save work (checkpointing failure, merge failure, or ignored files present), the process would still delete worker worktrees, losing recovery state. The fix preserves worktrees in these cases, allowing retries with full state intact. This also resolves issue #3897.
- **Recovery state retention:** Shutdown failures no longer erase the work that was being preserved; recovery can be attempted on the next run.
- **Selective teardown (#3896):** Submodules, report provenance, and partial pane/prompt cleanup proceed independently; a failure in one component no longer cascades to worktree deletion.

## Compatibility

- No breaking API changes; shutdown resilience improvement only.
- **Team runtime users:** If shutdown failed to save work in earlier versions, worker worktrees were lost. Upgrade to v0.21.34 to preserve recovery state in shutdown failure cases.
- Existing sessions remain unaffected unless they experienced shutdown failures with ignored files or checkpointing errors.
- The fix improves robustness without changing the shutdown API contract.

## Known issues

- #3898 (live-pin fix) is in progress (#3900); `Codex 0.164.0` hook validation was invalidated by `.omx-live-pin` files in the plugin cache. Workaround: manually clear `.omx-live-pin` from the cache if running Codex 0.164.0.

## Validation

- Pinned candidate `bc7efc1c1c504b84a28cd4b24c1f3d6af08e6217` passed CI run at 20:16Z on 2026-10-24: 17 checks succeeded, 8 conditional checks skipped, no failures.
- Both macOS Ralplan preflight security jobs PASSED (not cancelled or failed).
- All local gates pass: build, typecheck, lint, and team runtime shutdown preservation tests.
- All code review findings addressed.
- Ready for merge and release.

## Merged PR inventory

| PR | Author | Title |
|---|---|---|
| [#3896](https://github.com/Yeachan-Heo/oh-my-codex/pull/3896) | @shenyankm | fix(team): preserve worker worktrees when shutdown cannot save work |

## Contributors

Thanks to @shenyankm for the shutdown preservation fix, and @Claude Code for release validation.

**Full Changelog**: [`v0.21.33...v0.21.34`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.21.33...v0.21.34)

—
*[repo owner's gaebal-gajae (clawdbot) 🦞]*
