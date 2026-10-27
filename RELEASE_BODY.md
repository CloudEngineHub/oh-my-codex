# oh-my-codex 0.21.38

`0.21.38` is a patch release that makes setup refresh self-heal stale trust records for OMX-owned plugin hooks after a plugin cache rebuild.

## Highlights

- **PLUGIN HOOK TRUST REFRESH (#3924):** After a plugin cache rebuild, setup refresh retires stale trusted hashes from canonical OMX plugin-scoped Codex hook trust records rather than failing with `managed_trust_key_conflict`. Third-party and malformed trust state still fails closed. Fixes #3918.

## Compatibility

- No breaking API changes.

## Known issues

- #3898 (live-pin fix) remains blocked on an owner design decision; #3900 and #3907 are open drafts. On Codex 0.164.0, `.omx-live-pin` files in the plugin cache can invalidate hook approval. The workaround posted in #3898 disables the `oh-my-codex-local` plugin.

## Validation

- Pinned dev candidate `b58d0ff78a9bef6f39f063fa6e40873643b2c0c2` passed CI run [40581639661](https://github.com/Yeachan-Heo/oh-my-codex/actions/runs/40581639661): latest-per-name checks were 24 success, 1 skipped, and 0 failures.
- Both macOS Ralplan preflight security jobs passed: Node 20 (job 122462383482) and Node 26.5.1 (job 122462383670); CI Status passed (job 122471807456).
- Release-branch local gates and release-PR review/CI are recorded in `docs/qa/release-readiness-0.21.38.md`.

## Merged PR inventory

| PR | Author | Title | Impact |
|---|---|---|---|
| [#3924](https://github.com/Yeachan-Heo/oh-my-codex/pull/3924) | @Yeachan-Heo | fix(setup): self-heal stale OMX-owned plugin hook trust keys (#3918) | Fixes #3918; refreshes stale trust keys only for canonical OMX-owned plugin hook entries |
| [#3929](https://github.com/Yeachan-Heo/oh-my-codex/pull/3929) | @Yeachan-Heo | chore(dev): bump base version to 0.21.38 | Development version metadata |
| [#3928](https://github.com/Yeachan-Heo/oh-my-codex/pull/3928) | @Yeachan-Heo | back-merge: main to dev for v0.21.37 | Internal back-merge; aligns dev with shipped main |
| [#3927](https://github.com/Yeachan-Heo/oh-my-codex/pull/3927) | @Yeachan-Heo | docs(release): record v0.21.37 publication evidence | Internal release evidence |
| [#3926](https://github.com/Yeachan-Heo/oh-my-codex/pull/3926) | @Yeachan-Heo | back-merge: main to dev for v0.21.37 | Internal back-merge; release-train history |

## Contributors

Thanks to @Yeachan-Heo for the plugin hook trust refresh and release preparation.

**Full Changelog**: [`v0.21.37...v0.21.38`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.21.37...v0.21.38)

—
*[repo owner's gaebal-gajae (clawdbot) 🦞]*
