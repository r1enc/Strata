# Technical Specification

> **Status:** Phase 0 baseline
> **Last Updated:** 2026-10-30

---

## Stack

| Layer   | Technology                                       |
| ------- | ------------------------------------------------ |
| Runtime | Chrome Extension Manifest V3                     |
| UI      | React 18 + TypeScript 5                          |
| Build   | Vite 5, multi-entry build for extension surfaces |
| Styling | Tailwind CSS 3 + shadcn/ui component conventions |
| Tests   | Vitest 2 + Testing Library                       |
| Quality | ESLint 9 + Prettier 3                            |

The versions and package manager are pinned by `package.json` and `pnpm-lock.yaml`. Do not upgrade framework generations as part of routine work.

## Runtime and extension surfaces

- The popup is the short-lived user interface for invoking an agent and deciding whether to include active-page context.
- The options page owns provider and agent settings.
- The MV3 background service worker owns the AI Runtime, provider adapters, privileged extension operations, and message routing. It must tolerate worker suspension; persistent state belongs in extension storage, not process memory.
- A content script is a narrowly scoped page-context bridge. It may collect only the context requested for the current user action and may not access credentials, provider configuration, or arbitrary extension storage.
- Shared React UI and pure utilities are separate from browser API wrappers and runtime code.

These are target boundaries for Phase 1 and later; Phase 0 has only a temporary Vite page and no extension manifest.

## Agent model and shared AI Runtime

Built-in agents and custom agents are data definitions consumed by the same runtime. Built-ins are shipped and versioned with Strata. Custom agents are user-owned definitions stored as data; they may supply instructions and configuration but not JavaScript, scripts, or permission declarations. The runtime validates either definition, resolves the chosen provider, assembles the request, and returns a normalized result. Agents do not implement provider transports themselves.

The AI Runtime is the single boundary between extension UI/agent definitions and provider adapters. It owns request validation, credential access, provider selection, error normalization, and redaction. Provider adapters own provider-specific request/response translation. The supported provider list and API details must be established in the provider implementation phase; no vendor is selected here.

## BYOK and data flow

The user enters a provider key in the options page. The extension stores it locally in `chrome.storage.local`, never in `chrome.storage.sync`, source control, URLs, logs, or agent definitions. Local extension storage is not a secure enclave; the product must not claim encryption at rest. A key is read only by the background runtime and sent only to the configured provider endpoint over HTTPS for the user's request. The user can replace or remove it.

For a task without page context, the UI sends the selected agent and task to the background runtime. For a task with page context, the user explicitly invokes the active-tab context action; the extension obtains only the minimum context defined for that action, then sends it through the same runtime. Provider responses return to the initiating UI. Secrets and page content are excluded from diagnostic logging.

## Browser-context permission boundary

The extension must not request broad `<all_urls>` access or enumerate tabs for the MVP. For explicit active-page extraction, use `activeTab` plus `scripting` to inject only a packaged, narrow context collector after a user gesture. Do not inject scripts into page DOM. Request additional host access only if a documented provider or feature requires it and after explaining that need to the user. No page is read on installation, navigation, or a timer. Context collection is limited to the active tab and invocation, is not retained as browsing history, and is not implicitly included in later requests. The popup can complete a task without page access.

## Configuration and validation

Vite currently builds the Phase 0 web stub. Phase 1 must configure explicit MV3 entries for the popup, options page, service worker, and any required content script; emit a valid manifest and keep service-worker bundles free of DOM dependencies. TypeScript strictness remains enabled. Vitest uses jsdom for UI/unit tests; browser permission and extension lifecycle behavior requires later integration testing in Chrome.
