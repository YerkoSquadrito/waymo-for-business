# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 1. Overview

**Waymo for Business** is a productivity-focused product within the Waymo ecosystem. This document is the engineering contract every contributor — human and agent — operates against. When a casual request conflicts with the directives below, surface the conflict before acting.

### 1.1 Goals

1. **Reduce correction loops.** The agent should behave predictably enough that the same feedback is never given twice.
2. **Protect the main context window.** Heavy exploration, long file reads, and parallelizable research happen in subagents; the main thread orchestrates.
3. **Verify before "done."** No task is complete on the strength of intent alone. Evidence is required.
4. **Preserve reversibility.** Local, reversible actions are preferred; destructive or shared-state actions require confirmation.
5. **Compound learning.** Every correction becomes a rule. The agent improves within a project, not just within a session.

---

## 2. Agent System Prompts

These are primary directives. When they conflict with a casual user request, surface the conflict before acting.

### 2.1 Plan before non-trivial work

- Enter plan mode for anything with 3+ steps, cross-file impact, or an architectural decision.
- Plans are written, not implied. If there is no written plan, you have not planned.
- Re-plan when a plan fails. Do not push through a broken plan with incremental patches.
- Skip plan mode only for truly trivial edits (typos, renames, single-line fixes).

### 2.2 Delegate to subagents liberally

- One task per subagent. Focused scope beats broad sweeps.
- Use subagents for: codebase exploration, independent research tracks, parallel analysis, and any task that would otherwise dump thousands of lines into the main context.
- The main thread is an orchestrator, not a worker. Synthesis stays in the main thread; gathering goes to subagents.

### 2.3 Verify before marking done

- A task is complete when it is proven to work, not when the code compiles.
- For backend changes: tests pass, typecheck clean, relevant integration path exercised.
- For UI changes: the feature is used in a browser, golden path and edge cases covered, regressions checked in adjacent features.
- If you cannot test a change, say so explicitly. Do not claim success on faith.

### 2.4 Demand elegance — balanced

- For non-trivial changes, pause before presenting: "Is there a simpler way?"
- If a fix feels hacky, reimplement it knowing what you learned from the hack. A second pass is cheaper than a month of drag.
- Skip the elegance check on obvious, small fixes. Don't over-engineer trivial work.
- Prefer structural fixes made to handle border cases rather than just adding exceptions.

### 2.5 Self-improvement loop

- Maintain `tasks/lessons.md`. After every user correction, write the rule that prevents the mistake.
- Lessons are specific. Include the trigger ("when about to do X"), the correction ("do Y instead"), and the reason ("because Z happened / the user said so").
- Review `tasks/lessons.md` at session start. Lessons override defaults.
- Ruthlessly prune lessons that turn out to be context-specific, outdated, or duplicative.

### 2.6 Autonomous debugging, root-cause only

- Given a bug report, fix it end-to-end. Do not ask the user to narrate the fix.
- Point at the log line, the failing test, or the stack trace — then resolve the underlying cause.
- **No bandaids.** No `--no-verify`, no `try`/`except` that swallows the real error, no "temporary" fixes. If you cannot fix the root cause now, write a lesson about why and escalate.
- If CI fails, fix the failure before asking. Don't treat red CI as the user's problem.

### 2.7 Respect reversibility

- Local edits, test runs, and reversible commands: proceed freely.
- Destructive or shared-state actions require explicit confirmation: force-pushes, history rewrites, dropping tables, deleting branches, sending messages, publishing to external services, modifying CI/CD pipelines, or any `rm -rf` / `reset --hard` equivalent.
- "The user approved action A once" is not the same as "the user approves A always." Authorization applies to the specific scope granted.

---

## 3. Workflow

### 3.1 Task management

- `tasks/todo.md` — checkable items for the current task. Update as you go. One atomic step per checkbox.
- `tasks/lessons.md` — compounding rules derived from corrections (see §2.5).
- High-level summary at each milestone. A diff speaks louder than a paragraph — use the diff, not prose.
- End each task with a short review section in `tasks/todo.md`: what changed, what was learned, what's next.

### 3.2 Branching strategy (trunk-gated)

```
feature/* → develop → main
```

- `main` is the trunk. Feature branches never PR directly to `main`; they land via `develop`.
- `develop` is the integration branch — the default working target for feature work.
- One purpose per branch. Refactors and features do not share a branch.
- Small-project scope: no `staging`. When `develop` is green and verified, it merges to `main` via PR.

### 3.3 Commit hygiene

- Conventional Commits (`feat`, `fix`, `chore`, `refactor`, `docs`, `test`, `perf`). Scope when useful: `fix(auth): …`.
- Prefer new commits over amending. Amending a commit whose hook failed modifies the previous commit — a common source of lost work.
- Never skip hooks (`--no-verify`) unless the user explicitly requests it. A failing hook is a signal, not an obstacle.
- **IMPORTANT:** Stage files explicitly by name when possible. `git add .` is how secrets and build artifacts leak into history.

### 3.4 PR flow & review gates

- A PR is not ready until: typecheck clean, lint clean, tests pass, CI green, manually verified where applicable.
- Body format: **Summary** (1–3 bullets, the *why*) + **Test plan** (what you did to prove it works).
- If the PR touches user-visible surface, include a screenshot or a short description of the verification run.

---

## 4. Code Quality Rules

### 4.1 Simplicity first

- Impact the minimum code required to satisfy the request. A bug fix is a bug fix, not a refactor.
- No speculative abstractions. Three similar lines are better than a premature helper.
- No feature flags, compatibility shims, or "for future use" scaffolding unless the use case exists today.

### 4.2 Strict type safety

- No `any`, no untyped escape hatches, no `as unknown as X` shortcuts in production code.
- When the type system says something is wrong, it is usually right. Fix the type, don't cast around it.
- Once a repo is clean on a lint or type rule, promote it from warning to error. Regressions should fail CI, not get logged.

### 4.3 Tests colocated with source

- `foo.ts` → `foo.test.ts` next to it. No parallel `/tests` tree.
- One test framework per repo. Split environments (e.g. DOM vs. Node) via config, not via a second framework.
- Integration tests hit real dependencies where possible. Don't mock what you can stand up. Mocked tests that pass while production fails are worse than no tests.

### 4.4 Error handling at boundaries only

- Validate user input, external API responses, and untrusted payloads. That is a boundary.
- Do not add defensive `try`/`except` around internal code that the type system already guarantees. That is noise.

---

## 5. Architecture Heuristics

### 5.1 Capability-based access over role-based

- Derive what a user can do from the state of the system (do they have a profile? do they own a resource?), not from a role string baked into a token.
- Authorization checks should ask "does this entity have capability X?" not "is this entity role Y?".

### 5.2 Command + proposal + approval for AI mutations

- When an agent proposes changes to user data, structure the write as a command batch.
- Compute impact (what will change, what depends on it, cost/risk) before committing.
- Present the impact to the user. Let them approve, reject, or edit. Record the decision.
- Maintain a changelog of who changed what, when, and why — humans and agents alike.

### 5.3 Deterministic first, LLM second

- Rules engines before models. Notifications, permissions, routing, validation — all are rules, not judgment calls.
- Use an LLM where the input is genuinely open-ended (natural language, unstructured docs, fuzzy intent). Don't use one where an `if` would do.

---

## 6. Memory, Context & RAG Strategy

### 6.1 Memory file layout

Maintain a persistent memory directory. Each memory is a single file with frontmatter (`name`, `description`, `type`) plus a body. An index file (`MEMORY.md`) lists one-line pointers.

Four memory types:

- **user** — who the user is, their role, preferences, depth of knowledge. Tailors explanations and default choices.
- **feedback** — corrections and validated approaches. Lead with the rule, then **Why** and **How to apply**.
- **project** — decisions, deadlines, constraints with dates made absolute. Decays fast; prune aggressively.
- **reference** — pointers to external systems (dashboards, trackers, repos). Not the data itself, just where to find it.

### 6.2 What NOT to save

- Code patterns, file paths, project structure — derivable by reading the repo.
- Git history, recent changes, who-changed-what — `git log` / `git blame` are authoritative.
- Debugging solutions — the fix is in the code; the commit message has the context.
- Ephemeral task state, current-conversation context, in-progress work — that is not memory, that is the conversation.

### 6.3 Verify memory before acting on it

- A memory that names a file, function, or flag is a claim about the past. Before recommending action: check the file exists, grep for the symbol, confirm the flag is still wired up.
- When memory and the live codebase disagree, trust the code and update the memory.

### 6.4 External reference discipline

- Dashboards, trackers, and wikis are the source of truth for their domain. Don't copy their contents into memory; copy the pointer.
- When the user mentions "the X dashboard" or "the Y project in [tool]," save a reference memory so future sessions resolve the reference immediately.

### 6.5 Document ingestion — only read what's asked for

- Do not auto-read adjacent documentation directories unless explicitly instructed.
- Business docs, personal notes, and unrelated subtrees are off-limits by default. Ask before reading.

---

## 7. UI/UX Principles

- **Minimalism.** Ship what was asked for. No extra fields, no speculative settings, no "while we're here" additions.
- **Design tokens, not hex codes.** Colors, shadows, spacing, and typography come from a named palette. A one-off value is a bug waiting to happen.
- **Mobile-first.** Design for the narrow viewport first; desktop is a progressive enhancement.
- **Dark-theme capable.** Don't hardcode `#fff`. Use semantic tokens (`surface`, `text-primary`, `accent`) so themes switch by swapping the token layer.
- **Minimize cognitive effort.** Fewer clicks, fewer decisions, fewer surprises. Modern, but not a generic dashboard — every screen should feel opinionated about its purpose.
- **Verify visually.** For any UI change, run the dev server and exercise the flow. Screenshots beat descriptions.

---

## 8. Verification Checklist

Before declaring any task done, confirm **all** of:

- [ ] Tests pass (unit + integration, where both exist).
- [ ] Typecheck clean. No new `any` introduced.
- [ ] Lint clean. No rules disabled inline without a written reason.
- [ ] For UI: manually verified in a browser, desktop and narrow viewport.
- [ ] For data changes: migration runs forward and back, or is explicitly marked one-way with justification.
- [ ] For destructive or shared-state actions: explicit user confirmation obtained.
- [ ] CI green on the PR branch.
- [ ] If a user correction occurred during the task: a lesson is captured in `tasks/lessons.md`.

If any box is unchecked, the task is not done. Say so.
