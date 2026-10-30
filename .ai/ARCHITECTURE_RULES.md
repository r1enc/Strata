# Architecture Rules

> Architectural constraints and patterns for Strata.
>
> **Last Updated:** 2026-10-30

---

## Manifest V3 Constraints

- The **background service worker** (`src/background/`) has no DOM access — never import React or DOM APIs there.
- **Content scripts** (`src/content/`) run in the page's context — isolate them from extension-privileged APIs; use message passing.
- Use `chrome.runtime.sendMessage` / `chrome.runtime.onMessage` for all cross-context communication.
- Route built-in and custom agent definitions through the same background AI Runtime; only provider adapters call provider APIs.
- Keep BYOK credentials in local extension storage and accessible only to the background runtime/provider adapter; never expose them to page scripts or content scripts.
- Browser context is optional and invocation-scoped. Use only user-gesture active-tab access for the MVP; do not add broad host permissions or passive collection.
- Custom agents are data, not executable code, and cannot grant permissions or select arbitrary provider endpoints.
- Never use `eval`, `innerHTML` with untrusted content, or inject scripts into page DOM. If active-tab context is implemented, use only a packaged narrow collector through `chrome.scripting` after explicit user action and under `activeTab` permission.

## Module Boundaries

- `src/components/` — pure, stateless UI components only (no side-effects, no chrome.* calls).
- `src/hooks/` — React hooks; may call `src/lib/` utilities but not `chrome.*` directly (wrap chrome APIs in `src/lib/`).
- `src/lib/` — pure utility functions and chrome API wrappers; no React dependencies.
- `src/types/` — TypeScript interfaces and type aliases only; zero runtime code.

## Naming Conventions

- Files: `kebab-case` for components and utilities.
- React components: `PascalCase`.
- Hooks: `useCamelCase`.
- Types/Interfaces: `PascalCase` prefixed with `I` for interfaces where ambiguous.

## Import Order

1. Node built-ins
2. External packages
3. Internal aliases (`@/…`)
4. Relative imports
