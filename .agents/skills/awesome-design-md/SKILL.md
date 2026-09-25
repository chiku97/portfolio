---
name: awesome-design-md
description: >-
  Standardizes and generates plaintext DESIGN.md specifications for UI design systems.
  Use when creating, documenting, or applying a cohesive design system (colors, typography, spacing, shadows, motion, component tokens) modeled after iconic brands like Linear, Stripe, Vercel, Apple, and Notion.
---

# Awesome Design.md: Plaintext Design System Protocol

This skill guides the creation, maintenance, and enforcement of `DESIGN.md` files—plaintext design system specifications stored directly in repository roots. By maintaining design system tokens and rules in a structured Markdown protocol, AI agents and engineers can consistently generate, refactor, and scale UI code without requiring external Figma exports or design tooling.

---

## 1. The DESIGN.md Protocol Specification

A valid `DESIGN.md` document must define the following core token layers:

### A. Design Identity & Archetype
- **Brand Aesthetic**: e.g., Linear Dark-Slate, Stripe High-Contrast FinTech, Apple Minimalist Glass, Notion Warm Editorial.
- **Visual Personality**: High-level keywords guiding voice, tone, visual density, and motion budget.

### B. Color Tokens (Semantic Mapping)
All colors should be declared as CSS custom properties or design tokens:
- `--bg-canvas`: Primary app/page background.
- `--bg-surface`: Card, modal, and panel background.
- `--bg-elevated`: Flyouts, dropdowns, and tooltips.
- `--border-subtle`: 1px structural hairline borders (`rgba(255,255,255,0.06)` or `#e2e8f0`).
- `--border-active`: Highlight/focus/hover state border.
- `--text-primary`: Highest contrast body and headline color.
- `--text-muted`: Secondary metadata, timestamps, and captions.
- `--accent-primary`: Brand signature color (e.g., Electric Cyan, Emerald, Violet).

### C. Typographic Hierarchy
- **Font Families**:
  - `font-display`: Expressive headings (e.g., Outfit, Syne, Space Grotesk).
  - `font-body`: High-legibility paragraph text (e.g., Inter, Plus Jakarta Sans, Geist).
  - `font-mono`: Code, numbers, and telemetry (e.g., JetBrains Mono, Fira Code).
- **Scale**: Explicit font sizes, line heights, and letter-spacing for `display`, `h1`, `h2`, `h3`, `body`, `caption`.

### D. Spatial Grid & Radii
- **Grid Unit**: 4px base (4, 8, 12, 16, 24, 32, 48, 64px).
- **Border Radii Tokens**: `--radius-sm` (4px), `--radius-md` (8px), `--radius-lg` (12px), `--radius-xl` (16px), `--radius-full` (9999px).

### E. Shadows & Elevation
- Layered multi-stop box shadows:
  - Resting Card: `0 4px 16px -2px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)`.
  - Elevated Modal: `0 24px 64px -12px rgba(0, 0, 0, 0.85), 0 0 30px rgba(56, 189, 248, 0.1)`.

### F. Motion & Animation Curves
- Standard easing functions:
  - Spring-smooth: `cubic-bezier(0.16, 1, 0.3, 1)`.
  - Snappy exit: `cubic-bezier(0.4, 0, 1, 1)`.
- Standard durations: Micro (150ms), Standard (250ms), Layout (400ms).

---

## 2. Iconic Design System Archetypes

### Archetype 1: Linear / Vercel Dark Mode
* Dark canvas (`#080c14` or `#000000`), subtle dark zinc surfaces (`#0e1422`).
* Fine 1px translucent borders (`rgba(255,255,255,0.08)`).
* Specular inner box-shadow highlights (`inset 0 1px 0 rgba(255,255,255,0.12)`).
* Monospaced labels and status badges with luminous pulse dots.

### Archetype 2: Stripe Dynamic Vibrancy
* Rich saturated backgrounds with subtle radial gradient lighting.
* Layered cards with generous padding (24px–32px) and soft ambient drop shadows.
* Crisp, confident microcopy with distinct CTA contrast.

### Archetype 3: Apple Minimalist Glass
* Light or dark frosted acrylic glass (`backdrop-filter: blur(24px)`).
* Expansive whitespace, subtle optical hierarchy, large rounded corners (16px–24px).
* Highly fluid transitions and organic gestures.

---

## 3. Workflow Directives

1. **When starting a new feature or project**:
   - Check if a `DESIGN.md` exists in the project root.
   - If not present, generate one tailored to the project's identity before building UI components.
2. **When implementing components**:
   - Strictly reference the tokens declared in `DESIGN.md` rather than hardcoding arbitrary HEX values or random margins.
3. **When refactoring UI**:
   - Update `DESIGN.md` to reflect new component patterns or design tokens, keeping the documentation synchronized with the codebase.
