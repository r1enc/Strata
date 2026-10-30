# Architecture

> **Status:** Phase 0 baseline
> **Last Updated:** 2026-10-30

---

## Target context map

```text
Popup / Options UI
       │ chrome.runtime messages
       ▼
MV3 Background Service Worker
  ├── AI Runtime ── Provider adapters ── HTTPS provider API
  ├── Agent definitions (built-in + custom data)
  └── Storage and permission-aware browser API wrappers
       ▲
       │ one invocation-scoped context response
Content script / active-tab bridge
```

The diagram describes the planned boundary, not Phase 0 implementation. The current repository contains a temporary Vite/React page, shared style tokens, and `cn()` utility only.

## Directory responsibilities

| Path              | Responsibility                                                                                                          |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `src/background/` | MV3 service worker entry, message routing, AI Runtime, provider adapters, and privileged API wrappers. No DOM or React. |
| `src/content/`    | Minimal active-page context bridge. No provider requests, credentials, or general extension storage.                    |
| `src/popup/`      | Invocation UI and explicit per-task browser-context choice.                                                             |
| `src/options/`    | BYOK provider settings and built-in/custom agent management.                                                            |
| `src/components/` | Reusable presentation components following shadcn/ui conventions.                                                       |
| `src/hooks/`      | React hooks; use library wrappers rather than direct Chrome API calls.                                                  |
| `src/lib/`        | Pure utilities, shared types, validation, and narrow storage/browser API wrappers.                                      |
| `src/types/`      | Runtime and message contracts; keep shared contracts free of browser-only implementation details.                       |
| `src/test/`       | Test setup and integration fixtures. Unit tests sit beside their subject.                                               |

## Request and trust boundaries

The UI sends a typed invocation to the background service worker. The AI Runtime resolves one agent definition and one configured provider, validates the request, and calls that provider's adapter. Built-in and custom agents use this same path. A content script can return only the context requested for the current active-tab invocation. The background runtime adds that context to the request only for that invocation and returns a normalized result to the UI.

Custom agent data cannot execute code, choose arbitrary endpoints, access browser APIs, or widen permissions. Provider keys are available only to the background runtime and provider adapter. Provider response text and page content are untrusted data and must be rendered as text, never interpreted as HTML or code.

## State ownership

Provider configuration, local credentials, and user custom-agent definitions are user settings in local extension storage. Built-in agent definitions ship with the extension. Invocation inputs/results remain transient unless a separately approved product decision defines persistence. The Phase 0 scaffold has no extension storage implementation.

## Key decisions

- Manifest V3 with a service worker; do not assume the worker remains alive between events.
- One shared AI Runtime for built-in and custom agents; provider-specific code stays behind adapters.
- BYOK credentials stay in local extension storage and are sent only to the selected provider over HTTPS.
- Browser context is optional and invocation-scoped; no broad host access or passive collection.
- Messages between extension contexts are validated at the receiving boundary.
- Phase 0's single Vite HTML entry is temporary; Phase 1 owns the extension multi-entry build and manifest.
