# oh-my-codex 0.21.37

`0.21.37` is a patch release with fixes for npm-managed global-install detection and plugin-cache completion-marker diagnostics.

## Highlights

- **NPM GLOBAL INSTALLS (#3922):** Correctly recognize npm-managed global installs when npm uses a custom global prefix different from the Node runtime path. Ownership validation remains fail-closed; this fixes #3920.
- **PLUGIN-CACHE DIAGNOSTICS (#3923):** setup/doctor now distinguish malformed completion markers, marker-version mismatches, and claim-digest mismatches. This is diagnostic-only; provenance semantics do not change. Fixes #3921.

## Compatibility

- No breaking API changes.
- Update the MCP SDK runtime dependency to 1.32.2 (#3917) and Biome development dependency to 2.6.2 (#3916).

## Known issues

- #3898 (live-pin fix) remains blocked on an owner design decision; #3900 and #3907 are open drafts. On Codex 0.164.0, `.omx-live-pin` files in the plugin cache can invalidate hook approval. The workaround posted in #3898 disables the `oh-my-codex-local` plugin.
- #3924 (fix for #3918) is still in review and is not included in this release; it is planned for a later release.

## Validation

- Pinned dev candidate `18963b5604aa296d4fe8a019651d0ddef9584106` passed CI run [40535642484](https://github.com/Yeachan-Heo/oh-my-codex/actions/runs/40535642484): latest-per-name checks were 17 success, 8 skipped, and 0 failures.
- Both macOS Ralplan preflight security jobs passed: Node 20 (job 122300847593) and Node 26.5.1 (job 122300847597).
- Release-branch local gates and release-PR review/CI are recorded in `docs/qa/release-readiness-0.21.37.md`.

## Merged PR inventory

| PR | Author | Title | Impact |
|---|---|---|---|
| [#3923](https://github.com/Yeachan-Heo/oh-my-codex/pull/3923) | @Yeachan-Heo | fix(plugin-cache): distinguish claim-digest mismatch from malformed marker | Fixes #3921; reports distinct completion-marker diagnostics |
| [#3922](https://github.com/Yeachan-Heo/oh-my-codex/pull/3922) | @Yeachan-Heo | fix(update): detect npm ownership with a custom global prefix | Fixes #3920; correctly detects npm-managed global installs |
| [#3917](https://github.com/Yeachan-Heo/oh-my-codex/pull/3917) | @dependabot | chore(deps): bump @modelcontextprotocol/sdk from 1.32.1 to 1.32.2 | Runtime dependency update |
| [#3916](https://github.com/Yeachan-Heo/oh-my-codex/pull/3916) | @dependabot | chore(deps-dev): bump @biomejs/biome from 2.5.15 to 2.6.2 | Development dependency update |
| [#3914](https://github.com/Yeachan-Heo/oh-my-codex/pull/3914) | @Yeachan-Heo | chore(back-merge): v0.21.36 readiness evidence to dev | Internal back-merge; evidence only |
| [#3913](https://github.com/Yeachan-Heo/oh-my-codex/pull/3913) | @Yeachan-Heo | docs(release): record v0.21.36 publication evidence | Internal release evidence |
| [#3912](https://github.com/Yeachan-Heo/oh-my-codex/pull/3912) | @Yeachan-Heo | chore(dev): bump base version to 0.21.37 | Development version metadata |
| [#3911](https://github.com/Yeachan-Heo/oh-my-codex/pull/3911) | @Yeachan-Heo | chore(back-merge): v0.21.36 to dev | Internal back-merge; no content changes |

## Contributors

Thanks to @Yeachan-Heo for the npm ownership and plugin-cache diagnostics fixes, and @dependabot for dependency updates.

**Full Changelog**: [`v0.21.36...v0.21.37`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.21.36...v0.21.37)

—
*[repo owner's gaebal-gajae (clawdbot) 🦞]*
