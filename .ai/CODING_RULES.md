# Coding Rules

> Code quality standards for Strata.
>
> **Last Updated:** 2026-10-30

---

## TypeScript

- Strict mode is **always on** — never disable `strict`, `noUncheckedIndexedAccess`, or `exactOptionalPropertyTypes`.
- Prefer `type` over `interface` unless declaration merging is needed.
- Use `satisfies` to validate object literals against a type without widening.
- Never use `any`; use `unknown` and narrow at boundaries.
- Always use `type` imports: `import type { Foo } from './foo'`.

## React

- Functional components only — no class components.
- Extract logic into custom hooks (`src/hooks/`) rather than co-locating in components.
- Avoid `useEffect` for data that can be derived from state/props.
- Memoize sparingly and only with profiling evidence.

## Styling

- Use Tailwind utility classes exclusively — no inline `style` props or CSS modules except for edge cases (document reason in a comment).
- Use the `cn()` utility (`src/lib/utils.ts`) for conditional class merging.
- Follow the shadcn/ui component patterns when adding UI primitives.

## Testing

- Co-locate unit tests next to the file being tested: `foo.test.ts` beside `foo.ts`.
- Integration / E2E tests go in `src/test/`.
- Every exported function must have at least one test.
- Use Testing Library queries in the order: `ByRole` → `ByLabelText` → `ByText` → `ByTestId`.
- A test command that reports zero test files is not evidence of functional correctness.
- Do not include credentials, full prompts, page content, or provider response bodies in logs or fixtures.

## Git

- Commit messages use Conventional Commit style; a scope is optional.
- After the initial empty-repository baseline is published, do not commit directly to `main`; use feature branches and PRs. The bootstrap baseline may be pushed to `main` only when the remote has no existing refs.
- Squash merge PRs to keep history linear.
