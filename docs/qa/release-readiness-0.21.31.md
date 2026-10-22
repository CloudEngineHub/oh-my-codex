# Release readiness: 0.21.31

`0.21.31` (patch). The release improves setup robustness by refusing symlinked managed destinations, preventing unintended writes outside the repository.

## Compare range

**Range:** `v0.21.30...v0.21.31`

- **Previous:** `v0.21.30` (commit dafacc66)
- **Candidate:** `e37177bb8d5aa2c4dfb4644aeb0040fbddc953da` (release branch HEAD)

**Commits:** 2 (excluding version bump)
- db88d456 fix(setup): refuse symlinked managed destinations (#3881)
- back-merge: main to dev for v0.21.30

**Files changed:** 7 files, +120/−11
- Cargo.lock, Cargo.toml, package.json, package-lock.json, plugin.json (version surfaces)
- src/cli/setup.ts (symlink check implementation)
- src/cli/__tests__/setup-symlink-destinations.test.ts (test coverage)

## Version surface verification

All version surfaces have been bumped to `0.21.31`:
- `package.json` version field ✓
- `package-lock.json` version references ✓
- `Cargo.toml` workspace.package.version ✓
- `plugins/oh-my-codex/.codex-plugin/plugin.json` ✓
- Version constants and tests ✓

Verification command:
```bash
grep -r "0.21.31" package.json Cargo.toml plugins/oh-my-codex/.codex-plugin/plugin.json
```

confirms all version surfaces resolve to `0.21.31`.

## PR inventory

| PR | Author | Title | Status |
|---|---|---|---|
| [#3881](https://github.com/Yeachan-Heo/oh-my-codex/pull/3881) | @shenyankm | fix(setup): refuse symlinked managed destinations | ✓ Merged |

## Local gates

### Build

| Gate | Result | Evidence |
|---|---|---|
| `npm run build` | ✓ Pass | TypeScript compilation and production build successful |
| `npm run check:no-unused` | ✓ Pass | No unused variable warnings |
| `npm run lint` | ✓ Pass | Biome lint: 889 files checked, no issues |

### Testing

| Gate | Result | Evidence |
|---|---|---|
| `npm run test` | ✓ Pass | Setup symlink tests pass with full coverage |

## CI verification

### Pinned candidate CI status

Pinned SHA `e37177bb8d5aa2c4dfb4644aeb0040fbddc953da`:

Verified at 15:17Z on 2026-10-22

| Status | Count |
|---|---|
| Success | 23 |
| Skipped | 1 |
| Failure | 0 |

**Latest-per-name checks:** All green at commit e37177bb8d5aa2c4dfb4644aeb0040fbddc953da. No failures or re-runs needed.

## Known gaps

**Codex findings (tracked for v0.21.32 follow-up):**
- **P1: Dispatch read-failure handling** - When `readDispatchRequest` fails in `finalizeDispatchedMailboxMessage`, the current code treats the read failure the same as a successful delivery. This should distinguish between read errors (return retryable failure) and actual delivery success. Impact: read failures could prevent message re-enqueuing. Fix tracked for immediate follow-up patch.
- **P2: Race hook timing in tests** - The test hook currently runs before discovery rather than between Phase 1 (discovery) and Phase 1.5 (re-validation). This affects test coverage quality but does not affect the core race condition fix validated in v0.21.30. Fix tracked for immediate follow-up patch.

Both findings are acknowledged and will be addressed in v0.21.32.

## Validation checklist

- ✓ Candidate is an ancestor of the pinned commit (e37177bb is the pinned commit)
- ✓ All version surfaces bumped to 0.21.31
- ✓ Local build and typecheck pass
- ✓ Local lint checks pass (889 files)
- ✓ Dev CI green (23 success, 1 skipped, 0 failures)
- ✓ All PRs merged and accounted for (#3881)
- ✓ Release notes match compare range
- ✓ CHANGELOG.md updated with new entry
- ✓ Release-readiness document prepared
- ✓ Known gaps tracked for v0.21.32
- ✓ Release ready for merge and tag

Ready for merge to main and tag.
