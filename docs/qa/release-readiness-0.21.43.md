# Release Readiness: v0.21.43

**Release Date:** 2026-10-30<br>
**Released By:** gaebal-gajae (autonomous release)<br>
**Pinned dev candidate:** `43d2d21f833ba6ff62d10807127b76eca8f0aea4`<br>
**Range:** [`v0.21.42...v0.21.43`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.21.42...v0.21.43)

## Summary

This patch release removes `omx setup` from the Process identity doctor hint because setup does not repair the native runtime cache. `omx update` hydrates that cache, and the message continues to explain that session pointer recovery works without the native runtime. The separate provider-unavailable report in #3968 is unconfirmed; this release does not claim to fix its underlying cause.

## Compare-range metrics

At the release branch head, `v0.21.42..HEAD` comprises **7 commits, 12 files changed, 173 insertions(+), and 37 deletions(-)**, measured with `git log` and `git diff --shortstat`. The five merged PRs in the compare range are #3967, #3969, #3970, #3971, and #3972; the seventh commit is release preparation.

## Merged PR inventory

| PR | Author | Title | Impact |
|---|---|---|---|
| [#3967](https://github.com/Yeachan-Heo/oh-my-codex/pull/3967) | @Yeachan-Heo | docs(release): record v0.21.42 publication evidence | Carry previous-release publication evidence onto dev |
| [#3969](https://github.com/Yeachan-Heo/oh-my-codex/pull/3969) | @Yeachan-Heo | back-merge: main to dev for v0.21.42 | Synchronize dev with the previously shipped main |
| [#3970](https://github.com/Yeachan-Heo/oh-my-codex/pull/3970) | @Yeachan-Heo | chore(dev): bump version to 0.21.43 | Align release-coupled development metadata |
| [#3971](https://github.com/Yeachan-Heo/oh-my-codex/pull/3971) | @Yeachan-Heo | Fix misleading process identity doctor repair guidance | Remove the ineffective setup suggestion; preserve the runtime-cache update and session-pointer guidance |
| [#3972](https://github.com/Yeachan-Heo/oh-my-codex/pull/3972) | @Yeachan-Heo | docs(release): finalize v0.21.42 readiness evidence | Finalize evidence for the previous release |

## Version synchronization

Release-coupled version surfaces already read `0.21.43` on the pinned dev candidate, from #3970. This release branch must not bump them again.

| Surface | Verified value |
|---|---|
| `package.json` | `0.21.43` |
| `package-lock.json` root and root package entry | `0.21.43` |
| `Cargo.toml` workspace package | `0.21.43` |
| `Cargo.lock` six OMX workspace crates | `0.21.43` |
| `plugins/oh-my-codex/.codex-plugin/plugin.json` | `0.21.43` |
| `omx-capabilities.lock.json` | Does not embed a package version |
| Version constants/tests | No hard-coded `0.21.42`/`0.21.43` version constant; `src/cli/__tests__/version-sync-contract.test.ts` checks metadata alignment |

## CI evidence available before release-PR gates

- Pinned dev candidate `43d2d21f833ba6ff62d10807127b76eca8f0aea4` CI run [41032241638](https://github.com/Yeachan-Heo/oh-my-codex/actions/runs/41032241638) completed successfully: CI Status and Docs Check passed; source lanes and both macOS Ralplan preflights were skipped by docs-only change detection.
- On the source fix commit `72340934a318b9b3f0ca7c8e63d415bcc831d082`, dev CI run [41029069165](https://github.com/Yeachan-Heo/oh-my-codex/actions/runs/41029069165) completed with 17 success, 8 skipped, and 0 failed jobs. CI Status passed (job [123981741521](https://github.com/Yeachan-Heo/oh-my-codex/actions/runs/41029069165/job/123981741521)); both macOS Ralplan preflights passed: Node 20 (job [123974337084](https://github.com/Yeachan-Heo/oh-my-codex/actions/runs/41029069165/job/123974337084)) and Node 26.5.1 (job [123974337061](https://github.com/Yeachan-Heo/oh-my-codex/actions/runs/41029069165/job/123974337061)).
- The prior fix-commit preflights are not release-PR, main, or back-merge evidence. Those gates must run and pass separately; a skipped preflight does not count.

## Known issues and exclusions

- #3968 is a separate report by Kevin-wenyu about `provider unavailable`; its underlying cause remains unconfirmed and evidence was requested. #3971 corrects the doctor's remedy text only.
- #3898 remains held for the owner design decision. Related PRs #3939, #3900, #3907, #3915, and #3919 remain excluded.
- #3965 is not included; changes were requested and the work is split pending.

## Local gates

- `npm ci` completed (172 packages; its prepare hook built the TypeScript source).
- `npm run build` passed.
- `npm run check:no-unused` passed.
- `npm run lint` passed across 898 files; Biome emitted the existing `linter.rules.recommended` deprecation notice from `biome.json`.
- Focused `doctor-process-identity-readiness` regression test passed: 6 tests, 0 failures.
- `node dist/scripts/check-version-sync.js --tag v0.21.43` passed.
- `cargo metadata --locked --format-version 1 --no-deps` reports all six OMX workspace crates at `0.21.43`.
- The complete repository test suite was not run; the local test gate covered the changed doctor behavior.

—
*[repo owner's gaebal-gajae (clawdbot) 🦞]*
