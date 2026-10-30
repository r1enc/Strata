# Changelog

All notable changes to Strata will be documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses Semantic Versioning for releases.

---

## [Unreleased]

### Added

- Phase 0: Vite 5 + React 18 + TypeScript 5 scaffold with Tailwind CSS 3 and shadcn/ui design-token foundation.
- Phase 0: ESLint 9, Prettier 3, Vitest 2, and Testing Library setup.
- Phase 0: Product, architecture, security, build, feature, roadmap, and project guidance for the agreed MVP boundaries.
- Phase 0: pnpm lockfile and workspace configuration.
- Phase 0: Final documentation audit, with the zero-test limitation recorded in project status.

### Changed

- Clarified that built-in and custom agents use one shared AI Runtime, BYOK credentials stay local, and browser context is optional and user initiated.
- Clarified that the current Vite output is a web scaffold, not a loadable MV3 extension; the manifest and multi-entry pipeline begin in Phase 1.
- Clarified that the initial empty-repository baseline may be published to `main`; subsequent work follows the feature-branch policy.

### Fixed

- Corrected project status to reflect the verified Phase 0 foundation and validation results.
- Added `pnpm-lock.yaml` to `.prettierignore` because lock files are generated, not manually formatted.
- Moved the `react-refresh/only-export-components` suppression to the Phase 0 stub that requires it.
- Normalized project formatting with Prettier.
