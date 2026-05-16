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
