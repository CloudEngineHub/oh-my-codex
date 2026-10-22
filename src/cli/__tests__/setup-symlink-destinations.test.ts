import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { setup } from '../setup.js';

function setMockHome(home: string): () => void {
  const previousHome = process.env.HOME;
  const previousCodexHome = process.env.CODEX_HOME;
  process.env.HOME = home;
  process.env.CODEX_HOME = join(home, '.codex');
  return () => {
    if (typeof previousHome === 'string') process.env.HOME = previousHome;
    else delete process.env.HOME;
    if (typeof previousCodexHome === 'string') process.env.CODEX_HOME = previousCodexHome;
    else delete process.env.CODEX_HOME;
  };
}

async function withRepo(run: (repo: string, parent: string) => Promise<void>): Promise<void> {
  const parent = await mkdtemp(join(tmpdir(), 'omx-setup-symlink-'));
  const repo = join(parent, 'repo');
  await mkdir(repo);
  const restoreHome = setMockHome(join(parent, 'home'));
  const previousCwd = process.cwd();
  try {
    process.chdir(repo);
    await run(repo, parent);
  } finally {
    process.chdir(previousCwd);
    restoreHome();
    await rm(parent, { recursive: true, force: true });
  }
}

describe('omx setup symlink destinations', () => {
  it('refuses a symlinked project .gitignore and leaves the target untouched', async () => {
    await withRepo(async (repo, parent) => {
      const victim = join(parent, 'victim.txt');
      await writeFile(victim, 'ORIGINAL-SECRET-CONTENT\n');
      await symlink('../victim.txt', join(repo, '.gitignore'));

      const gitignorePath = join(repo, '.gitignore');
      await assert.rejects(
        setup({ scope: 'project' }),
        (err: any) => {
          const msg = err?.message || '';
          return (
            msg.includes('Refusing to install through symlink') &&
            msg.includes(gitignorePath) &&
            msg.includes('Either remove the symlink')
          );
        },
      );
      assert.equal(await readFile(victim, 'utf8'), 'ORIGINAL-SECRET-CONTENT\n');
    });
  });

  it('refuses a symlinked prompt destination and leaves the target untouched', async () => {
    await withRepo(async (repo, parent) => {
      await mkdir(join(repo, '.codex', 'prompts'), { recursive: true });
      const victim = join(parent, 'victim-prompt.txt');
      await writeFile(victim, 'ORIGINAL-PROMPT-CONTENT\n');
      const analystPath = join(repo, '.codex', 'prompts', 'analyst.md');
      await symlink('../../../victim-prompt.txt', analystPath);

      await assert.rejects(
        setup({ scope: 'project' }),
        (err: any) => {
          const msg = err?.message || '';
          return (
            msg.includes('Refusing to install through symlink') &&
            msg.includes(analystPath) &&
            msg.includes('Either remove the symlink')
          );
        },
      );
      assert.equal(await readFile(victim, 'utf8'), 'ORIGINAL-PROMPT-CONTENT\n');
    });
  });

  it('rejects a symlinked ancestor directory (.codex)', async () => {
    await withRepo(async (repo, parent) => {
      const targetDir = join(parent, 'external-codex');
      await mkdir(targetDir);
      const victim = join(targetDir, 'secret.txt');
      await writeFile(victim, 'EXTERNAL-SECRET\n');
      
      // Create .codex as a symlink to external directory
      await symlink(targetDir, join(repo, '.codex'));

      await assert.rejects(
        setup({ scope: 'project' }),
        (err: any) => {
          const msg = err?.message || '';
          return (
            msg.includes('Refusing to install through symlink') &&
            msg.includes('.codex') &&
            msg.includes('Either remove the symlink')
          );
        },
      );
      assert.equal(await readFile(victim, 'utf8'), 'EXTERNAL-SECRET\n');
    });
  });

  it('rejects a symlinked auth directory', async () => {
    await withRepo(async (repo, parent) => {
      const targetDir = join(parent, 'external-auth');
      await mkdir(targetDir);
      const victim = join(targetDir, 'token.txt');
      await writeFile(victim, 'SECRET-TOKEN\n');
      
      // Create .omx as a symlink to external directory
      await symlink(targetDir, join(repo, '.omx'));

      await assert.rejects(
        setup({ scope: 'project' }),
        (err: any) => {
          const msg = err?.message || '';
          return (
            msg.includes('Refusing to install through symlink') &&
            msg.includes('.omx') &&
            msg.includes('Either remove the symlink')
          );
        },
      );
      assert.equal(await readFile(victim, 'utf8'), 'SECRET-TOKEN\n');
    });
  });

  it('rejects an interview artifact symlink that resolves outside the repository', async () => {
    await withRepo(async (repo, parent) => {
      const targetDir = join(parent, 'external-interview');
      await mkdir(targetDir);
      const victim = join(targetDir, 'artifact.json');
      await writeFile(victim, '{"secret": true}\n');
      
      // Create .omx/interview as a symlink to external directory
      await mkdir(join(repo, '.omx'), { recursive: true });
      await symlink(targetDir, join(repo, '.omx', 'interview'));

      await assert.rejects(
        setup({ scope: 'project' }),
        (err: any) => {
          const msg = err?.message || '';
          return (
            msg.includes('Refusing to install through symlink') &&
            (msg.includes('.omx') || msg.includes('interview')) &&
            msg.includes('Either remove the symlink')
          );
        },
      );
      assert.equal(await readFile(victim, 'utf8'), '{"secret": true}\n');
    });
  });

  it('succeeds when scope root is under a symlinked parent (like /tmp on macOS) while still rejecting symlinks inside the managed tree', async () => {
    // Regression test for issue #3887: On macOS, /tmp is a symlink to /private/tmp,
    // so the setup should not reject paths just because they're under /tmp,
    // but should still reject symlinks inside the managed scope (.codex, .omx, etc).
    await withRepo(async (repo, parent) => {
      // The repo is already under /tmp (symlinked parent), so this tests that
      // OS-level symlinks are not rejected.
      // Create a file to install
      const skillDir = join(repo, '.codex', 'skills', 'test-skill');
      await mkdir(skillDir, { recursive: true });
      await writeFile(join(skillDir, 'SKILL.md'), '# Test Skill\n\nA test skill');
      
      // Setup should succeed even though the scope root is under the /tmp symlink
      await assert.doesNotReject(
        setup({ scope: 'project' }),
        'Setup should succeed when scope root is under /tmp (symlinked OS directory)'
      );
      
      // Verify the setup actually completed
      assert(existsSync(join(repo, '.gitignore')), '.gitignore should be created');
      assert(existsSync(join(repo, '.codex', 'config.toml')), 'config.toml should be created');
    });
  });
});
