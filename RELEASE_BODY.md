# oh-my-codex 0.21.22

`0.21.22` is a patch release for fail-closed cache recovery guidance in setup repair (1 commit, 5 files, +66/−6; PR #3842).

## Highlights

- **Fail-closed cache recovery guidance (#3842):** Fix `omx setup --repair-plugin-cache` to avoid recommending users delete plugin snapshots pinned by live Codex sessions or entries that are not directories. The repair command now emits fail-closed guidance directing users to safe recovery options instead of potentially destructive removal suggestions.

## Compatibility

- `omx setup --repair-plugin-cache` behavior is unchanged for valid recovery scenarios; only the guidance for unsafe snapshots is improved.
- Existing configurations remain compatible; no changes required.

## Validation

- Pinned candidate `012672fa9d4995319d424c2ba9286e593d169047` passed latest-per-name dev CI: 17 checks succeeded and 8 conditional checks were skipped, with no failures.
- Release branch CI passed with all required checks green.
- All code review findings resolved.

## Merged PR inventory

| PR | Author | Title |
|---|---|---|
| [#3842](https://github.com/Yeachan-Heo/oh-my-codex/pull/3842) | @gajae-gajae | test: add failing tests for fail-closed cache recovery guidance |

## Documentation corrections

- Corrected v0.21.21 release range stats from (10 files, +190/−128) to accurate (7 files, +174/−104).

## Contributors

Thanks to @gajae-gajae for the cache recovery guidance improvements.

**Full Changelog**: [`v0.21.21...v0.21.22`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.21.21...v0.21.22)

—
*[repo owner's gaebal-gajae (clawdbot) 🦞]*
