# Project Rules

> Rules for AI assistants working on Strata.
>
> **Last Updated:** 2026-10-30

---

## General

- Always work within the Strata repository at `d:\Strata`.
- Never modify files outside the repository root without explicit user approval.
- Prefer pnpm over npm or yarn for all package operations.
- Keep `planning/CHANGELOG.md` updated after every meaningful change.
- Keep `project/STATUS.md` accurate at the end of each phase.
- Treat `docs/PRD.md`, `docs/TECHNICAL_SPECIFICATION.md`, and `planning/FEATURES.md` as the source of approved product scope; do not add features by inference.

## Communication

- Summarise every non-trivial change in a concise bullet list.
- Flag breaking changes with a ⚠️ warning before applying them.
- Ask for clarification rather than making assumptions on ambiguous requirements.

## Workflow

- Follow the phase sequence defined in `planning/IMPLEMENTATION_PLAN.md`.
- Open a new phase only after the previous phase's tasks are complete.
- Run `pnpm lint` and `pnpm type-check` before declaring any phase done.
- Do not mark a validation as passing when a command did not execute or when Vitest reports zero test files.
