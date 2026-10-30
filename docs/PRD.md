# Product Requirements Document

> **Status:** Phase 0 baseline
> **Last Updated:** 2026-10-30

---

## Product vision

Strata is a Chrome extension that lets a user run AI agents from the browser using provider credentials the user supplies. The product provides built-in agents and user-defined custom agents through one shared AI Runtime. A user may explicitly include context from the active page when starting a task.

## Problem and audience

People who use AI assistance while working in a browser should be able to choose an agent for a task, use their own provider account, and deliberately provide relevant page context without granting Strata general access to every site or tab.

## MVP scope

- Provide built-in agent definitions maintained by Strata.
- Let a user create, edit, select, and remove custom agent definitions. A custom agent is configuration and instructions, not executable code.
- Route both kinds of agent through the same AI Runtime and provider adapter boundary.
- Let a user configure a supported AI provider with a key they supply (BYOK). Provider names and the supported provider list are implementation decisions to record before provider work begins; this baseline does not select vendors.
- Let a user invoke an agent without browser context. Browser context is optional and must be explicitly requested for an invocation.
- Provide extension surfaces for invoking agents and managing settings. The Phase 1 plan creates the MV3 shell before feature implementation.

## User outcomes

- The user can distinguish Strata-maintained agents from their own definitions while using the same execution path.
- The user can choose which configured provider is used and can remove or replace their own credential.
- The user can use an agent without granting page access, and can explicitly supply context from the active tab when needed.

## Product requirements

1. Built-in and custom agents use a common, versionable agent definition and the shared runtime; neither agent type calls a provider directly.
2. Custom agent definitions cannot contain executable extension code or grant browser permissions.
3. Provider credentials are user supplied, scoped to provider requests, and never sent to a content script or included in agent instructions, prompts, logs, URLs, or error messages.
4. The extension requests only permissions required for a user-selected action. Page context is off unless requested for that invocation.
5. The extension remains useful for a task that does not require reading the current page.
6. Provider, agent, and browser-context failures are surfaced without silently changing providers, agents, or permission scope.

## Non-goals for the MVP

- A Strata-hosted inference service or Strata-managed provider credentials.
- Arbitrary code execution by custom agents.
- Automatic browsing, background page collection, access to all tabs, or autonomous page actions.
- Provider selection, agent templates, or other features not recorded in the approved backlog.

## Details to settle before implementation

The approved scope establishes agent categories, BYOK, the shared runtime, and optional active-tab context, but it does not identify the initial built-in agent catalog or supported provider vendors. Record those choices in the feature backlog before Phases 2–3 implement them. Keep custom-agent fields limited to the approved data model; they cannot add executable code or permissions.

## Success criteria

The MVP is ready for release when a user can configure a supported BYOK provider, select either kind of agent, complete a task through the shared runtime, and verify that page context is used only after an explicit request. The release must pass the build, static checks, and tests for the implemented flows.
