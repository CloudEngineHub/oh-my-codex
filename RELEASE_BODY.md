# oh-my-codex 0.21.28

`0.21.28` is a patch release for JetBrains terminal trackpad scrolling diagnostic (1 commit, 3 files, +167/−0; PR #3873).

## Highlights

- **JetBrains trackpad scrolling diagnostic (#3873):** On macOS WebStorm and other JetBrains IDE terminals, trackpad scrolling is translated to Up/Down arrow keys by the terminal emulator. When alternate screen mode is enabled, this causes the input field to be populated with previous prompts instead of scrolling the output. This release adds a startup diagnostic that detects JetBrains terminal environments and suggests the `omx --no-alt-screen` workaround to users on direct (non-tmux) and hotswap launches. The diagnostic is only emitted if `--no-alt-screen` is not already specified. Detection works by checking `TERM_PROGRAM` and `TERMINAL_EMULATOR` environment variables for JetBrains IDE indicators. Fixes #3872 (reported by @BohdanLavrinenko).

## Compatibility

- The diagnostic is informational only; no behavior changes affect existing workflows.
- No breaking API changes; new diagnostic message is a pure UX improvement.
- Existing sessions remain unaffected.

## Validation

- Pinned candidate `60ae8e90090f41bb52487c13cc3152c1baf05428` passed latest-per-name dev CI: 17 checks succeeded and 8 conditional checks were skipped, with no failures.
- Release branch CI passed with all required checks green.
- All code review findings addressed.

## Merged PR inventory

| PR | Author | Title |
|---|---|---|
| [#3873](https://github.com/Yeachan-Heo/oh-my-codex/pull/3873) | @Yeachan-Heo | fix(cli): emit diagnostic for JetBrains trackpad scrolling issue (Fixes #3872) |

## Contributors

Thanks to @Yeachan-Heo for the JetBrains terminal diagnostic. Credit to @BohdanLavrinenko for reporting issue #3872.

**Full Changelog**: [`v0.21.27...v0.21.28`](https://github.com/Yeachan-Heo/oh-my-codex/compare/v0.21.27...v0.21.28)

—
*[repo owner's gaebal-gajae (clawdbot) 🦞]*
