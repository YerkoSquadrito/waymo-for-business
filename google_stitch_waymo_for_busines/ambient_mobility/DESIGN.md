---
name: Ambient Mobility
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#414755'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#717786'
  outline-variant: '#c1c6d7'
  surface-tint: '#005bc1'
  primary: '#0058bc'
  on-primary: '#ffffff'
  primary-container: '#0070eb'
  on-primary-container: '#fefcff'
  inverse-primary: '#adc6ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#006947'
  on-tertiary: '#ffffff'
  tertiary-container: '#00855b'
  on-tertiary-container: '#f5fff6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a41'
  on-primary-fixed-variant: '#004493'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-bold:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 24px
  gutter: 16px
  margin-sm: 16px
  margin-lg: 32px
---

## Brand & Style

This design system is built on the principles of clarity, optimism, and effortless movement. It targets a broad demographic ranging from daily commuters to corporate travelers who value safety and technological sophistication without the coldness often associated with automation.

The aesthetic follows a **Modern Corporate** style with strong **Minimalist** influences. It prioritizes high legibility and "airy" spatial relationships to reduce cognitive load during transit. The "Business" extension evolves this by introducing more structured information density and a refined secondary palette, ensuring the interface feels like a professional tool while retaining its approachable, consumer-grade friendliness.

Key attributes:
- **Friendly & Accessible:** Generous curves and soft shadows.
- **Precision:** Perfect alignment and purposeful use of whitespace.
- **Professional:** High-contrast typography and a disciplined color application.

## Colors

The palette is anchored by a high-energy primary blue, optimized for digital visibility and action.

- **Primary (#007AFF):** Used for critical actions, active states, and primary brand touchpoints.
- **Secondary / Business (#0F172A):** A deep slate blue used for the "For Business" environment to provide a more grounded, executive feel.
- **Success/Safety (#10B981):** A vibrant green for confirmation, "Go" states, and safety-related information.
- **Neutral Stack:** A range of cool grays (from #F8FAFC to #1E293B) provides the structural foundation, ensuring the background feels expansive and clean.

Color should be used sparingly to guide the eye; interactive elements use the primary blue, while informational headers and business-specific modules leverage the secondary slate.

## Typography

The design system utilizes **Plus Jakarta Sans** for its friendly yet modern geometric construction. It mimics the "Google Sans" aesthetic, offering excellent legibility at small sizes while appearing stylish and custom at larger scales.

- **Headlines:** Use Bold or SemiBold weights with slight negative letter-spacing to create a "locked-in" professional look.
- **Body Text:** Standardizes on a 16px base for accessibility. Use medium weight for emphasis within paragraphs rather than changing color.
- **Labels:** Small labels use a heavy weight and increased letter-spacing to maintain legibility even at 10-12px.
- **Scale:** For mobile devices, headlines downscale gracefully to ensure no text wrapping occurs on critical journey information.

## Layout & Spacing

The layout utilizes a **Fluid Grid** model with a focus on bottom-heavy sheet interactions, making the UI optimized for one-handed mobile use. 

- **Rhythm:** An 8px base unit governs all dimensions.
- **Margins:** Standard mobile views use a 24px side margin to create an "airy" and premium feel.
- **Safe Areas:** Elements floating over map views should maintain a 16px clearance from edges.
- **Business Layouts:** For corporate features, information density is slightly increased by reducing vertical padding between list items from 24px to 16px, allowing for more data-rich views (like expense logs or fleet lists).

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Ambient Shadows**.

1.  **Level 0 (Base):** Usually the map or a light gray background (#F8FAFC).
2.  **Level 1 (Cards):** Pure white surfaces with a very soft, high-diffusion shadow (0px 8px 24px rgba(0,0,0,0.04)).
3.  **Level 2 (Floating Action):** Elements like "Back" buttons or "Current Location" use a more pronounced shadow (0px 4px 12px rgba(0,0,0,0.1)) to indicate clickability.
4.  **Overlays:** Semi-transparent backdrops (60% opacity white with a 10px blur) are used for modal states to maintain the sense of place and spatial awareness.

## Shapes

The shape language is defined by significant corner rounding to communicate safety and friendliness. 

- **Standard Containers:** Use 24px (rounded-xl) for main bottom sheets and primary cards.
- **Buttons & Inputs:** Use 16px (rounded-lg) to provide a soft touchpoint.
- **Chips & Tags:** Use pill-shaping (full radius) for status indicators and category filters.
- **Business Elements:** To differentiate the corporate side, maintain the same radii but introduce subtle 1px inner borders (#E2E8F0) to add structural "crispness" to reports and dashboards.

## Components

### Buttons
- **Primary:** Solid #007AFF background with white text. High-contrast and distinctive.
- **Secondary/Outline:** 2px border in #E2E8F0 with #007AFF text. Used for less urgent actions.
- **Business Action:** Solid #0F172A background for corporate-specific triggers (e.g., "Switch to Business Profile").

### Input Fields
- Floating labels with a light gray background fill (#F1F5F9). On focus, the border transitions to 2px primary blue.

### Cards
- White background, 24px radius, and soft ambient shadows. In the business context, cards may include a left-hand "accent bar" in the secondary slate color to denote work-related trips.

### Chips & Status
- **Ride Status:** Pill-shaped with a light tint of the status color (e.g., light green background with dark green text for "Arrived").

### Lists
- Clean, borderless list items separated by whitespace or very light 1px dividers (#F1F5F9). Leading icons are always enclosed in a soft-rounded square or circle for consistency.