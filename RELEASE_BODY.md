# oh-my-codex 0.21.31

`0.21.31` is a patch release for setup symlink safety (2 commits, 7 files, +120/−11; PR #3881).

## Highlights

- **Setup symlink destination refusal (#3881):** The `omx setup` command now detects and rejects symlinked managed destinations (including dangling links) before reading, backing up, or writing. This prevents scenarios where a committed `.gitignore` or prompt path symlink could cause `ensureBackup` to overwrite files outside the repository. The check validates every path component without following symlinks, not just the leaf destination, preventing writes through symlinked ancestor directories. The check is applied to all write paths: `.gitignore`, native agent TOMLs and manifest, HUD config, and skill receipt. This is a behavioral change: setup now fails closed on symlinked managed destinations.

## Compatibility

- No breaking API changes; setup security improvement only.
- Existing sessions remain unaffected unless they have symlinked managed destinations (which will now be rejected with a clear error message and workarounds).
- Setup now fails fast on symlinked destinations instead of silently writing through them.

## Validation

- Pinned candidate `e37177bb8d5aa2c4dfb4644aeb0040fbddc953da` passed latest-per-name release CI: 23 checks succeeded and 1 conditional check was skipped, with no failures (verified at 15:17Z on 2026-10-22).
- Release branch CI passed with all required checks green.
- All code review findings addressed.
- Local gates pass: build, typecheck, and lint.

## Merged PR inventory

| PR | Author | Title |
|---|---|---|
| [#3881](https://github.com/Yeachan-Heo/oh-my-codex/pull/3881) | @shenyankm | fix(setup): refuse symlinked managed destinations |

## Contributors

Thanks to @shenyankm for the setup symlink safety improvements, and @Claude Code for co-authorship.

**Full Changelog**: [`v0.21.30...v0.21.31`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.21.30...v0.21.31)

—
*[repo owner's gaebal-gajae (clawdbot) 🦞]*
