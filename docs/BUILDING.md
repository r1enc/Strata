# Building and Validation

> **Status:** Phase 0 baseline
> **Last Updated:** 2026-10-30

---

## Prerequisites

- Node.js 22 or later.
- pnpm 11.9.0, as pinned by `package.json`'s `packageManager` field.
- Windows, macOS, or Linux with the package registry reachable for initial dependency installation.

## Install and run the Phase 0 scaffold

```sh
pnpm install --frozen-lockfile
pnpm dev
```

The current Vite page is a Phase 0 tooling stub. It verifies the React/Tailwind build foundation; it is not a loadable browser extension.

## Validation commands

```sh
pnpm build
pnpm type-check
pnpm lint
pnpm format:check
pnpm test
```

Vitest is configured with `passWithNoTests`; a successful run that reports no test files is not functional test coverage. Add tests with the feature they verify. Use `pnpm test:coverage` when coverage instrumentation is installed and configured.

## Phase 1 extension package

Phase 1 adds the MV3 manifest and explicit Vite inputs for the popup, options page, service worker, and any required content script. Until then, do not select `dist/` in Chrome's **Load unpacked** flow: it has no extension manifest. After the MV3 build exists, the build output can be loaded from `dist/` for local extension testing.

## Windows command shell

If PowerShell blocks the `pnpm` script shim, run `pnpm.cmd <command>` from Command Prompt or PowerShell. If Corepack cannot resolve the pinned pnpm version, fix package-manager/network setup rather than changing the project dependency versions. Do not treat a failed command launch as a project validation result.

## Release checks

Before packaging, confirm the manifest permissions are justified in `docs/SECURITY.md`, run the full validation commands, inspect the generated extension entries, verify no local credentials or environment files are included, and test permission prompts and active-tab behavior in Chrome. Phase 0 does not produce a releasable extension.
