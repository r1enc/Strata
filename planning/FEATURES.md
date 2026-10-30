# Feature Scope

> **Status:** MVP baseline
> **Last Updated:** 2026-10-30

---

## MVP feature set

| Feature                     | Priority                 | Scope                                                                                                                                                                                  | Phase |
| --------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| Built-in agents             | Required                 | Strata-maintained agent definitions executed through the shared AI Runtime.                                                                                                            | 3     |
| Custom agents               | Required                 | User-created/editable data definitions and instructions; no executable code or permission grants. Same runtime as built-ins.                                                           | 3     |
| Shared AI Runtime           | Required                 | One background execution path validates invocations and routes through a provider adapter.                                                                                             | 2     |
| BYOK provider configuration | Required                 | User supplies, replaces, and removes provider credentials; credentials stay local and are available only to the runtime. Vendor list is to be recorded before provider implementation. | 3     |
| Agent invocation UI         | Required                 | Popup selects an agent and submits a task through the runtime.                                                                                                                         | 5     |
| Optional browser context    | Required, user initiated | Active-tab context may be included for the current invocation after an explicit user action; no passive or broad browsing access.                                                      | 4     |
| Settings UI                 | Required                 | Options surface manages provider and agent settings.                                                                                                                                   | 5     |

## Explicit exclusions

- Strata-hosted inference or Strata-issued provider credentials.
- Custom agent executable code, arbitrary endpoint selection, or permission control.
- Passive page collection, general browsing history, access to unrelated tabs, or autonomous page actions.
- Unlisted providers or additional product capabilities; those require an approved scope update.

## Shared execution rule

Built-in and custom agents are two sources of agent definitions, not two execution systems. Both are validated and run by the same AI Runtime. Only provider adapters speak provider APIs. Agent definitions cannot bypass BYOK handling, validation, or browser permission checks.
