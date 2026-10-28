# oh-my-codex 0.21.39

`0.21.39` is a patch release that recognizes GPT-6.1 Terra in the known Codex model catalog and fixes canonical state-root publication for detached session leaders.

## Highlights

- **GPT-6.1 TERRA MODEL RECOGNITION (#3933):** Add `gpt-6.1-terra` to the known Codex model catalog and routing reference; explicit model strings and existing model defaults remain unchanged.
- **CANONICAL DETACHED-SESSION ROOTS (#3935):** Record the canonical state root held by the leader's binding so the strict reuse guard recognizes sessions started through an aliased or symlinked root.

## Fixes and compatibility

- No breaking API changes.
- Test harness reliability improved: per-file HOME isolation (#3936), VSCode log-write completion synchronization (#3937), and deterministic tmux/team fixture boundaries (#3938).

## Known issues and exclusions

- #3898 (live-pin fix) remains held for the owner design decision. On Codex 0.164.0, `.omx-live-pin` files in the plugin cache can invalidate hook approval; the workaround posted in #3898 disables the `oh-my-codex-local` plugin. Related PRs #3900 and #3907 remain open and are not included in this release.

## Validation

- Pinned dev candidate `4c98c4775b0d33f78bdee02bb15ce43aa0505470` passed CI run [40715501337](https://github.com/Yeachan-Heo/oh-my-codex/actions/runs/40715501337): latest-per-name checks were 18 success, 7 skipped, and 0 failures.
- macOS Ralplan preflight security passed on Node 20 (job [122912178834](https://github.com/Yeachan-Heo/oh-my-codex/actions/runs/40715501337/job/122912178834)) and Node 26.5.1 (job [122912178801](https://github.com/Yeachan-Heo/oh-my-codex/actions/runs/40715501337/job/122912178801)); CI Status passed (job [122922743319](https://github.com/Yeachan-Heo/oh-my-codex/actions/runs/40715501337/job/122922743319)).
- Release-branch local gates and review/publication evidence are recorded in `docs/qa/release-readiness-0.21.39.md`.

## Merged PR inventory

| PR | Author | Title | Impact |
|---|---|---|---|
| [#3933](https://github.com/Yeachan-Heo/oh-my-codex/pull/3933) | @ev78394 | feat(models): recognize GPT-6.1 Terra | Recognize `gpt-6.1-terra` in the known Codex model catalog |
| [#3935](https://github.com/Yeachan-Heo/oh-my-codex/pull/3935) | @ev78394 | fix: publish canonical detached-session state roots | Store canonical binding root in detached leader state |
| [#3936](https://github.com/Yeachan-Heo/oh-my-codex/pull/3936) | @ev78394 | test: isolate caller homes for each test file | Prevent caller HOME/USERPROFILE from contaminating tests |
| [#3937](https://github.com/Yeachan-Heo/oh-my-codex/pull/3937) | @ev78394 | test: wait for VSCode log stream completion | Assert VSCode output only after log writes finish |
| [#3938](https://github.com/Yeachan-Heo/oh-my-codex/pull/3938) | @ev78394 | test: synchronize tmux logs and team event fixtures | Make fixture event/log boundaries deterministic |
| [#3931](https://github.com/Yeachan-Heo/oh-my-codex/pull/3931) | @Yeachan-Heo | back-merge: main to dev for v0.21.38 | Internal back-merge; aligns dev with shipped main |

## Contributors

Thanks to @ev78394 for the release changes and @Yeachan-Heo for release-train maintenance.

**Full Changelog**: [`v0.21.38...v0.21.39`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.21.38...v0.21.39)

—
*[repo owner's gaebal-gajae (clawdbot) 🦞]*
