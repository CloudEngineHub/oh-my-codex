# oh-my-codex 0.21.31

`0.21.31` is a patch release for setup symlink safety (2 commits, 7 files, +120/−11; PR #3881).

Versioning continues the 0.21.x patch train. This release improves setup robustness by refusing symlinked managed destinations, preventing unintended writes outside the repository.

## Highlights

- **Setup symlink destination refusal (#3881):** The `omx setup` command now detects and rejects symlinked managed destinations (including dangling links) before reading, backing up, or writing. This prevents scenarios where a committed `.gitignore` or prompt path symlink could cause `ensureBackup` to overwrite files outside the repository. The check validates every path component without following symlinks, not just the leaf destination, preventing writes through symlinked ancestor directories. The check is applied to all write paths: `.gitignore`, native agent TOMLs and manifest, HUD config, and skill receipt. This is a behavioral change: setup now fails closed on symlinked managed destinations.

## Compatibility

- No breaking API changes; setup security improvement only.
- Existing sessions remain unaffected unless they have symlinked managed destinations (which will now be rejected with a clear error message and workarounds).
- Setup now fails fast on symlinked destinations instead of silently writing through them.

## Known gaps

**Tracked for v0.21.32 follow-up:**
- **P1: Dispatch read-failure handling** - When `readDispatchRequest` fails in `finalizeDispatchedMailboxMessage`, the current code treats the read failure the same as a successful delivery. This should distinguish between read errors (return retryable failure) and actual delivery success. Fix tracked for immediate follow-up patch.
- **P2: Race hook timing in tests** - The test hook currently runs before discovery rather than between Phase 1 (discovery) and Phase 1.5 (re-validation). This affects test coverage quality but does not affect the core race condition fix validated in v0.21.30. Fix tracked for immediate follow-up patch.

Both findings are acknowledged and will be addressed in v0.21.32.

## Validation evidence

The pinned candidate `e37177bb8d5aa2c4dfb4644aeb0040fbddc953da` (release branch HEAD after version bump) passed latest-per-name CI: 23 checks succeeded with 1 conditional check skipped, and no failures (run verified at 15:17Z on 2026-10-22).

## Merged PR inventory

| PR | Author | Title |
|---|---|---|
| [#3881](https://github.com/Yeachan-Heo/oh-my-codex/pull/3881) | @shenyankm | fix(setup): refuse symlinked managed destinations |

## Contributors

Thanks to @shenyankm for the setup symlink safety improvements, and @Claude Code for co-authorship.

**Full Changelog**: [`v0.21.30...v0.21.31`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.21.30...v0.21.31)
