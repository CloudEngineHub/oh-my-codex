# oh-my-codex 0.21.42

`0.21.42` is a patch release that makes Team and tmux status inspection read-only and improves native Codex goal reconciliation.

## Highlights

- **READ-ONLY TEAM AND TMUX STATUS (#3963):** `omx team status` no longer runs monitor maintenance, writes state, or recovers claims, so inspection remains safe with a read-only OMX root. An omitted team name resolves only from a unique current-leader match. `omx tmux-hook status` reports missing configuration without initializing it.
- **NATIVE CODEX GOAL RECONCILIATION (#3964):** Normalize structured and serialized `get_goal` response envelopes, distinguish a missing native goal tool from database/schema/context errors, and allow truthful non-terminal blocked checkpoints while verification is unavailable without fabricating goal completion.

## Fixes and compatibility

- Detect same-inode history content changes even when size and modification time are restored; do not publish the altered history artifact (#3959).
- Stabilize detached-launch and Windows platform test fixtures, including per-fixture sidecar isolation (#3963).
- No breaking API changes. Package, npm lockfile, Cargo workspace/lockfile, and plugin metadata were already synchronized to `0.21.42` by #3962; the release does not double-bump them.

## Known issues and exclusions

- #3898 remains held for the owner design decision; related PRs #3939, #3900, #3907, #3915, and #3919 remain excluded.
- #3965 is not included; its changes are requested and the work is split pending.
- No other user-facing changes in the compare range are excluded.

## Merged PR inventory

| PR | Author | Title | Impact |
|---|---|---|---|
| [#3959](https://github.com/Yeachan-Heo/oh-my-codex/pull/3959) | @Yeachan-Heo | fix(history): detect same-mtime content mutations | Reject altered history artifacts when content changes despite restored size and modification time |
| [#3960](https://github.com/Yeachan-Heo/oh-my-codex/pull/3960) | @Yeachan-Heo | docs: record v0.21.41 publication evidence | Preserve prior-release publication evidence on dev |
| [#3961](https://github.com/Yeachan-Heo/oh-my-codex/pull/3961) | @Yeachan-Heo | back-merge: main to dev for v0.21.41 | Synchronize dev with the previous shipped main |
| [#3962](https://github.com/Yeachan-Heo/oh-my-codex/pull/3962) | @Yeachan-Heo | chore(dev): bump version to 0.21.42 | Synchronize package/plugin/Cargo version surfaces for development |
| [#3963](https://github.com/Yeachan-Heo/oh-my-codex/pull/3963) | @nascyimento | fix: keep Team and tmux status commands read-only | Make status observational, resolve an omitted team name from the current leader, and avoid initializing missing tmux-hook config |
| [#3964](https://github.com/Yeachan-Heo/oh-my-codex/pull/3964) | @nascyimento | fix: handle native goal responses and unavailable tools | Normalize native goal responses and preserve non-terminal blocked status when verification is unavailable |

## Validation

- Pinned dev candidate `815f2a26d140cbd157e88569b8fcdc8dc7e27f44` passed CI run [41006632881](https://github.com/Yeachan-Heo/oh-my-codex/actions/runs/41006632881): 18 jobs succeeded, 7 were skipped, and 0 failed across 25 unique job names. Both macOS Ralplan preflights passed (Node 20 job [123902962229](https://github.com/Yeachan-Heo/oh-my-codex/actions/runs/41006632881/job/123902962229), Node 26.5.1 job [123902962178](https://github.com/Yeachan-Heo/oh-my-codex/actions/runs/41006632881/job/123902962178)); CI Status passed (job [123908685619](https://github.com/Yeachan-Heo/oh-my-codex/actions/runs/41006632881/job/123908685619)).
- Release-branch build, typecheck, lint, generated checks, focused tests, version synchronization, release review, and publication evidence are recorded in [release readiness](docs/qa/release-readiness-0.21.42.md).

## Contributors

Thanks to @nascyimento for the Team/tmux status and native goal handling fixes, and @Yeachan-Heo for history mutation handling, prior-release evidence, and release-train maintenance.

**Full Changelog**: [`v0.21.41...v0.21.42`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.21.41...v0.21.42)

—
*[repo owner's gaebal-gajae (clawdbot) 🦞]*
