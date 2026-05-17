# Lessons — Waymo for Business

Compounding rules derived from user corrections, per CLAUDE.md §2.5. Lessons
should be specific: trigger ("when about to do X"), correction ("do Y"), and
reason ("because Z happened / the user said so"). Prune ruthlessly when a rule
becomes outdated.

## Format

```
### Short rule title
**Trigger:** when about to do X
**Correction:** do Y instead
**Reason:** because Z (incident, preference, or domain constraint)
**Captured:** YYYY-MM-DD
```

---

### Never reference `React.X` globals — use named type imports
**Trigger:** about to write `React.FormEvent`, `React.ReactNode`,
`React.MouseEvent`, etc. inside a component file.
**Correction:** `import { type FormEvent, type ReactNode } from 'react'` and
use the bare names. The `React` global is undefined under the new JSX
transform + `react-in-jsx-scope: off` ESLint config we use, so the global
reference is a hard lint error.
**Reason:** `connect.tsx` shipped twice with `React.FormEvent` /
`React.ReactNode` and broke lint each time. Cheaper to import the named
types from `react` than to retroactively fix lint failures.
**Captured:** 2026-05-16

### Fixed-position bars escape mobile-width constraints — use sticky
**Trigger:** about to add a `<header>` / `<nav>` to a mobile-shaped app
shell using `fixed inset-x-0 top-0` or `fixed inset-x-0 bottom-0`.
**Correction:** Use `sticky top-0` / `sticky bottom-0` inside the
constrained flex column. The bar then respects the container's width
(420px phone frame) instead of stretching to the desktop viewport edge.
**Reason:** The first prototype shipped with `fixed inset-x-0` bars
sitting under a 420px `mx-auto` container. On desktop the bars stretched
the full viewport while content stayed in a narrow column — looked
broken. The user flagged it as "the whole frame being wide for computer
use instead of mimicking mobile experience."
**Captured:** 2026-05-16

### Standardize buttons through the `<Button>` component
**Trigger:** about to write a custom `<button>` or `<Link>` styled with
raw pill classes (`rounded-full bg-primary ...`) anywhere outside the
canonical `Button.tsx`.
**Correction:** Use `<Button variant=... size=... fullWidth=...>` (with
`useNavigate()` for routing). For icon-only round buttons that don't fit
the Button API, still match its sizing contract: minimum 44×44 tap
target and `active:scale-[0.96]` press treatment.
**Reason:** First version shipped 6+ ad-hoc button styles across Landing,
Home, Book, Calendar, Commute, and Confirm — inconsistent tap targets
(some 4 px tall) and divergent press states. User flagged "buttons not
displaying correctly." Routing everything through one component prevents
this class of drift entirely.
**Captured:** 2026-05-16

### Bottom-nav with 4 labeled tabs overflows 420px — compact inactive
**Trigger:** about to add a 4-tab bottom nav where every tab renders
`icon + visible label` inside a pill.
**Correction:** Show the label only on the active tab; inactive tabs
render icon-only (label kept in DOM as `sr-only` for accessibility).
Active tab can use a wider `px-4` pill background while inactive uses
`px-2`. Use `flex-1 min-w-0` so the row distributes evenly even when
labels differ in length.
**Reason:** Four labeled tabs (Home, Vehicles, Business, Account) total
~500 px of natural content width — they overflow a 390 px viewport on
narrow phones and even tease the edge of the 420 px desktop phone bezel.
Compact-inactive is the Material 3 / iOS convention and resolves the
overflow without truncation.
**Captured:** 2026-05-16
