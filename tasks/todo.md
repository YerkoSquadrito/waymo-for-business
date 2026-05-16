# Tasks — Waymo for Business prototype (employee-only)

Tracking checklist for the active build, per CLAUDE.md §3.1. One checkbox = one
atomic step. Higher-level plan lives at
`/Users/yerkosquadrito/.claude/plans/ok-now-i-need-wobbly-pond.md`.

## feat/bootstrap

- [x] Vite + React 19 + TS strict scaffold (manual; no `npm create vite` because
      the repo wasn't empty).
- [x] Tailwind v3 compiled, ports the Stitch `tailwind.config` verbatim with
      CSS-variable-backed colors so dark mode is a one-block swap later.
- [x] `src/styles/tokens.css` — Ambient Mobility palette as space-separated RGB
      triplets (works with Tailwind `<alpha-value>`).
- [x] Plus Jakarta Sans self-hosted via `@fontsource`. Material Symbols on the
      Google CDN (loaded from `index.html`).
- [x] ESLint flat config + Prettier (with `prettier-plugin-tailwindcss`).
- [x] Vitest + RTL + jsdom. `cn()` helper has a colocated test.
- [x] `vite-plugin-pwa` wired (manifest, icon stub at `/icon-512.png` pending —
      see follow-up). Build doesn't fail without it; runtime PWA install will
      fail until the icon ships in `feat/pwa-deploy`.
- [ ] `npm install`.
- [ ] `npm run typecheck && npm run lint && npm test && npm run build` — all
      green before merging.

## feat/shell-and-tokens (next)

- [ ] `PageScaffold`, `TopAppBar`, `BottomNavBar` (Framer Motion shared layoutId
      for the active-state pill).
- [ ] Routes registered: `/`, `/app/home`, `/app/book`, `/app/business/*`,
      `/app/account`. Empty screens return a centered placeholder.
- [ ] Visual verification in Chrome DevTools at iPhone 14 viewport (390×844).

## Review (write after each merge to `develop`)

_(none yet — first feature branch is in flight)_
