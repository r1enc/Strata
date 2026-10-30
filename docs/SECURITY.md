# Security

> **Status:** Phase 0 baseline
> **Last Updated:** 2026-10-30

---

## Security objectives

Protect user-supplied provider keys, keep page access under the user's control, and prevent untrusted agent instructions, page content, and provider responses from becoming extension code or gaining additional privileges.

## Credentials and BYOK

- Accept keys only through the extension's settings UI. Store them in `chrome.storage.local`; do not sync them, check them into source control, place them in URLs, or copy them into agent definitions.
- Treat local extension storage as accessible to the installed extension, not as an encrypted vault. Do not promise encryption at rest.
- Expose credentials only to the background AI Runtime/provider adapter. Never send them to a content script or include them in prompts, logs, telemetry, errors, or UI state beyond masked display.
- Send a key only over HTTPS to the configured provider for the user's request. Validate provider endpoint configuration against the supported provider adapter; custom agents cannot choose endpoints.
- Provide a way to replace and delete stored credentials. Avoid retaining request bodies or provider responses beyond the invocation unless a separately approved requirement defines retention.

## Manifest V3 and permissions

Start with the smallest permission set. Do not request `<all_urls>`, `tabs`, or persistent host access for an unneeded feature. Active-page extraction requires an explicit user action and the `activeTab` and `scripting` permissions; inject only a packaged, narrow collector, and do not inject scripts into page DOM. Add provider host permissions only when required by the selected supported provider, and document each permission before adding it. No page reading occurs on install, navigation, or a schedule.

The service worker has no DOM. Content scripts collect only the specific context requested for the active invocation and have no access to credentials or provider configuration. All cross-context messages are schema-validated and reject unknown or malformed requests.

## Content security and untrusted data

Use the Manifest V3 extension CSP defaults; do not enable `unsafe-eval`, remote executable scripts, dynamic script injection, or inline executable code. Render page text, agent output, and provider responses as text. Never put untrusted values into `innerHTML`, evaluate them, or treat agent instructions as permission grants or executable plans.

## Data handling

Page context is optional, active-tab-only, and sent to the selected provider only as part of the user-requested invocation. Do not collect browser history, enumerate unrelated tabs, or retain page content as a background activity. Invocation data and results are transient in the MVP unless a later approved requirement changes this rule. Do not log secrets, page text, full prompts, or provider response bodies.

## Threats and controls

| Threat                           | Required control                                                                                                 |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Credential disclosure            | Local-only storage; background-only access; HTTPS provider requests; redacted diagnostics.                       |
| Prompt injection in page content | Treat page text as untrusted input; it cannot grant permissions, select endpoints, or execute extension actions. |
| Malicious custom agent           | Store instructions as data; prohibit executable code and permission declarations.                                |
| Overbroad page access            | User-gesture active-tab permission; no broad host access or passive collection.                                  |
| Malformed cross-context message  | Validate sender, message type, and payload at each receiving boundary.                                           |
| Compromised dependency           | Keep lockfile; review dependency changes and advisories before upgrades; minimize runtime dependencies.          |

## Dependency and release checks

Review dependency changes, run the lockfile-based install and static checks, and inspect the production extension package before release. Run dependency vulnerability checks in CI/release review and resolve or document material findings. Never include local environment files, keys, generated build output, or test credentials in a release commit.
