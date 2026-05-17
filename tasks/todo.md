# Tasks — Waymo for Business prototype (employee-only)

Tracking checklist for the active build, per CLAUDE.md §3.1. One checkbox = one
atomic step. Higher-level plan lives at
`/Users/yerkosquadrito/.claude/plans/ok-now-i-need-wobbly-pond.md`.

## Phase 1: shipped

- [x] **feat/bootstrap** — Vite + React 19 + TS strict, Tailwind v3 with
      CSS-variable-backed tokens, fonts, ESLint, Prettier, Vitest, PWA
      plugin, `tasks/{todo,lessons}.md`.
- [x] **feat/shell-and-tokens** — TopAppBar, BottomNavBar (Framer Motion
      animated active pill), PageScaffold, React Router v7 wired with all
      routes registered.
- [x] **feat/component-kit** — Button (pill h-14, three variants), Card,
      TextField, Chip (filter + 4 status flavors), ListRow, IconBadge,
      Toggle. Colocated tests on every component.
- [x] **feat/business-onboarding** — Zustand store w/ persist, seed data,
      `/app/business/connect` (corp email verification + personal-email
      domain rejection), `/app/business/calendar` (Google/Outlook provider
      rows + productivity toggle), Business hub w/ live progress chips.
- [x] **feat/commute-scheduler** — TripVisualizer component,
      `/app/business/commute` (5-day grid w/ suggested / confirmed / skip
      states), `/app/business/confirm` (alternative time chips +
      `addMinutes` helper).
- [x] **feat/home-and-booking** — MapMock (SVG with token-bound palette),
      BottomSheet, `/app/home` (search button + saved chips + state-aware
      Business teaser + recent destinations), `/app/book` (full-bleed map
      + sheet, Apple Pay vs Billed-to-Acme payment row, Request Ride →
      ride appended to store + confirmed sheet).
- [x] **feat/pwa-deploy** — manifest with SVG icon, apple-touch + iOS
      web-app meta tags, service worker generated via `vite-plugin-pwa`
      autoUpdate.

## Review

**What changed.** A blank repo with only design references became an
interactive employee-facing prototype with 11 routes (`/`, `/app/home`,
`/app/book`, `/app/vehicles`, `/app/account`, `/app/business` hub plus the
4 Stitch flows), state persisted to localStorage, 14 test files / 48
tests passing, and a production build under 150 KB gzipped JS. The
prototype installs as a PWA on iOS/Android home screens. All Stitch
screens are ported with the UI audit's cuts applied (no in-flow ad card,
no decorative bell, no purple "Optimize" panel, no glass-card outside the
map context). The real-Waymo aesthetic is matched on the two screens
that most define the brand (home + book): map prominence, anchored
bottom sheet, neutral header, pill primary CTAs.

**What was learned.** Three lessons captured in `tasks/lessons.md`:
referencing `React.X` globals (use named type imports), Node 25 + jsdom
needs a manual `localStorage` shim, and `useMemo` after an early-return
violates React hooks rules. Also: the Stitch HTML's inline `tailwind.config`
ports cleanly to a real `tailwind.config.ts` if you back colors with CSS
variables, which preserves the dark-theme exit ramp for ~90 minutes of
extra work.

**What's next.** Two paths, listed in priority order:

1. **Deploy to Cloudflare Pages / Vercel** and run a real iPhone +
   Android round-trip against the URL. Confirm "Add to Home Screen"
   produces a chromeless launch (icon will render from the SVG manifest
   entry). Capture Lighthouse PWA + Performance scores.
2. **Admin dashboard slice** (deferred from this phase per the user
   scope decision). The UI Designer's audit produced a complete admin
   layout spec — 3-column shell, KPI cards, spend chart, employees
   table — derived from the existing tokens. Building the spend ledger
   page first would unlock the cross-tab live-update demo (employee
   books a ride → admin sees the row appear) that the press release
   pitch depends on.

**Open risks for the user test.**
- Calendar "Updated just now from Google Workspace" is mocked; the
  moderator script must disclose this before testers form expectations
  about reliability.
- The `/app/home` "Where to?" search button does not actually accept
  text — it jumps straight to `/app/book?dest=hq`. Testers expecting
  to type an address will hit a dead end.
- `glass-card` is used inside `Card` only with `glass` prop opt-in,
  which is currently nowhere — safe.
- Bottom-nav "Vehicles" tab is a stub. If a tester taps it expecting
  fleet info, they get a placeholder.

---

## Revision pass — 2026-05-16 (feature/revision-pass)

User feedback: "fix some bugs like buttons not displaying correctly, or
the whole frame being wide for computer use instead of mimicking mobile
experience." Scope: surgical fixes + a phone-bezel mockup on desktop.

### Done

- [x] Added `DeviceFrame` (`src/components/DeviceFrame.tsx`) — mobile
      passthrough, desktop renders a phone-shaped bezel (rounded corners,
      shadow, dim outer background) that owns the scroll context so the
      sticky bars stay inside the phone instead of escaping the viewport.
- [x] Mounted `<DeviceFrame>` once at the router root (`src/App.tsx`
      `RootLayout`); every screen inherits it. Removed redundant
      `mx-auto max-w-mobile` from `PageScaffold`, `Landing`, and `Book`.
- [x] Converted `TopAppBar` and `BottomNavBar` from `fixed inset-x-0` to
      `sticky` so they live inside the 420 px column / phone bezel.
- [x] Slimmed `PageScaffold`: dropped the `pt-20`/`pb-32` reservations
      (no longer needed once bars are sticky); kept the
      `flex min-h-dvh flex-1 flex-col md:min-h-0` contract.
- [x] Routed every ad-hoc button through the canonical `<Button>`:
      Landing CTAs, Calendar ProviderRow Connect/Disconnect, Commute
      suggested-time pill, Confirm alternative-time grid.
- [x] Fixed tap targets without restyling: Home "Add place" (`h-9 px-4`,
      matches chips), Home star (`h-11 w-11`), Book header round
      buttons (`h-11 w-11`), Book "Change" + Commute "Add trip" text
      buttons (`-mx-3 -my-2 px-3 py-2`).
- [x] Compact bottom nav: 4 tabs always overflowed the 420 px frame; now
      only the active tab shows its label (inactive labels kept in DOM
      via `sr-only` for screen readers), active gets `px-4` pill, inactive
      gets `px-2`. Container down to `px-2`.
- [x] Tests: added `DeviceFrame.test.tsx` (3 tests). All 15 files / 51
      tests pass. Typecheck + lint clean (`--max-warnings=0`).
- [x] Browser-verified every route on desktop (1280 × 900): landing,
      home, book, business hub, connect, calendar, commute, confirm,
      vehicles, account. Phone bezel visible, sticky bars inside the
      bezel, all buttons consistent.

### Review

What changed — fundamental layout shift: the app now lives inside a
mobile-shaped frame on desktop, with sticky bars that respect the frame
boundary. Button system is now single-sourced through `<Button>` plus
the inline icon-only round-button pattern (Book header, Home star).

What was learned — three new lessons captured in `tasks/lessons.md`:
`fixed inset-x-0` escapes width constraints (use sticky); standardize
buttons through one component; 4-tab labeled bottom nav needs compact
inactive states.

What's next (out of scope this pass, listed for the next sprint):
- "Where to?" search field needs a real text input + autocomplete.
- Vehicles tab is still a placeholder.
- Hardcoded times in Book ("3:15 PM" / "3:37 PM") should derive from
  the pickup timestamp.
- Hero gradient on Landing/Connect is still a placeholder for real art.
- Dark theme tokens (`tokens.css` lines 69-74) remain TODO.
