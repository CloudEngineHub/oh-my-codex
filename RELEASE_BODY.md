# oh-my-codex 0.21.41

`0.21.41` is a patch release that adds configurable custom quality gates to the deep-interview, Ralplan, and code-review stages.

## Highlights

- **CONFIGURABLE CUSTOM QUALITY GATES (#3956; requested in #3955 by @iqdoctor):** Add optional skill-based reviewers through `.omx-config.json` `qualityGates` entries for `deep-interview`, `ralplan`, and `code-review`. String entries default to blocking; objects may set `mode` (`blocking` or `advisory`) and an optional `model`. Gates supplement built-in review; advisory verdicts are retained without blocking, and blocking Ralplan `reject`/`iterate` verdicts feed the revise loop. An unavailable gate is surfaced as unavailable rather than represented as an approval. `omx quality-gates list --stage ...` reports normalized stage configuration.

## Fixes and compatibility

- No breaking API changes.
- Model-selection documentation now matches the implementation (#3951).
- Detect same-inode history-file content changes even when a writer restores the original size and modification time; the altered history artifact is not published (#3958).
- The development package, npm lockfile, Cargo workspace/lockfile, and plugin metadata are synchronized at `0.21.41` by the release-train changes (#3953).

## Known issues and exclusions

- #3898 remains held for the owner design decision. Related PRs #3939, #3900, #3907, #3915, and #3919 remain excluded.
- No other user-facing changes in the compare range are excluded.

## Merged PR inventory

| PR | Author | Title | Impact |
|---|---|---|---|
| [#3951](https://github.com/Yeachan-Heo/oh-my-codex/pull/3951) | @Yeachan-Heo | docs: fix model selection documentation to match implementation | Align model-selection guidance with implemented precedence |
| [#3952](https://github.com/Yeachan-Heo/oh-my-codex/pull/3952) | @Yeachan-Heo | docs: record v0.21.40 publication evidence | Preserve previous-release publication evidence on dev |
| [#3953](https://github.com/Yeachan-Heo/oh-my-codex/pull/3953) | @Yeachan-Heo | chore: back-merge main (v0.21.40) to dev and bump to 0.21.41 | Synchronize dev with shipped main and set the next development base version |
| [#3954](https://github.com/Yeachan-Heo/oh-my-codex/pull/3954) | @Yeachan-Heo | back-merge: main to dev for v0.21.40 | Internal follow-up merge aligning main and dev |
| [#3956](https://github.com/Yeachan-Heo/oh-my-codex/pull/3956) | @Yeachan-Heo | feat(#3955): Add configurable custom quality gates via .omx-config | Add validated stage-specific gates, listing CLI, Ralplan integration, and workflow guidance |
| [#3958](https://github.com/Yeachan-Heo/oh-my-codex/pull/3958) | @Yeachan-Heo | fix(history): detect same-mtime content mutations during publication | Include file change time in history version checks; prevent publishing mutated history when size and mtime are restored |

## Validation

- Pinned dev candidate `4a0f645b898e74d381ee7d4da1ced0bf26280896` passed CI run [40910124408](https://github.com/Yeachan-Heo/oh-my-codex/actions/runs/40910124408): 24 jobs succeeded, 1 publish job was skipped, 0 failed or pending, and all 25 job names were unique. The release follow-up also fixes the same-inode history mutation that failed Windows history materialization in main CI run [40924728006](https://github.com/Yeachan-Heo/oh-my-codex/actions/runs/40924728006); the focused regression passes locally, and the follow-up CI is the release gate.
- Both macOS Ralplan preflights passed: Node 20 (job [123575656924](https://github.com/Yeachan-Heo/oh-my-codex/actions/runs/40910124408/job/123575656924)) and Node 26.5.1 (job [123575656997](https://github.com/Yeachan-Heo/oh-my-codex/actions/runs/40910124408/job/123575656997)); CI Status passed (job [123586747505](https://github.com/Yeachan-Heo/oh-my-codex/actions/runs/40910124408/job/123586747505)).
- Local validation and release publication evidence are recorded in [release readiness](docs/qa/release-readiness-0.21.41.md).

## Contributors

Thanks to @iqdoctor for requesting configurable custom quality gates, and @Yeachan-Heo for implementation, documentation, and release-train maintenance.

**Full Changelog**: [`v0.21.40...v0.21.41`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.21.40...v0.21.41)

—
*[repo owner's gaebal-gajae (clawdbot) 🦞]*
