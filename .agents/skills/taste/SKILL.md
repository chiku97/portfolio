---
name: taste
description: >-
  Enforces agency-level frontend design direction and anti-slop constraints.
  Use when designing or building websites, landing pages, web apps, or redesigning UI to prevent generic AI templates, weak typography, washed-out gradients, and repetitive card layouts.
---

# Taste Skill: High-Craft Frontend Design & Anti-Slop Protocol

This skill enforces intentionality, distinctive visual aesthetics, and agency-grade execution for frontend interfaces. AI models naturally default to statistical averages—generic centered heroes, repetitive three-card feature grids, low-contrast gradients, and unmotivated animations. This skill provides explicit design contracts to eliminate "AI slop" and produce memorable, production-grade web interfaces.

---

## 1. Phase 0: "Read the Room" (Brief & Archetype Inference)

Before generating any UI code, analyze the project requirements and establish the design contract:

1. **Classify the Page Kind**:
   - Landing page / Marketing showcase
   - SaaS dashboard / High-density productivity tool
   - Developer portfolio / Technical case study
   - E-commerce / Product catalog
   - Editorial / Content publication

2. **Select an Aesthetic Archetype**:
   - **Linear/Dark-Slate Precision**: Monochromatic zinc/slate, fine 1px translucent borders (`rgba(255,255,255,0.08)`), subtle specular highlights, monospaced telemetry accents.
   - **Stripe FinTech Glow**: Deep rich indigo/navy backgrounds, vivid gradient accents (cyan, violet, emerald), layered cards with diffuse ambient drop-shadows.
   - **Apple Minimalist Glass**: Generous whitespace, large typographic scale, frosted glass (`backdrop-filter: blur(20px)`), subtle spring physics.
   - **Swiss Grid / Brutalist Craft**: High-contrast typography, strict geometric grids, bold structural dividers, monospaced labels, raw functional beauty.
   - **Warm Editorial Luxe**: Cream/paper background (`#fcfbf9`), serif headline pairings (Playfair, Instrument Serif), warm charcoal body copy, sophisticated restraint.

3. **Calibrate Global Dials (1–10 Scale)**:
   - `DESIGN_VARIANCE` (Default: 7): Level of structural asymmetry and creative layout risks.
   - `MOTION_INTENSITY` (Default: 6): Speed and frequency of micro-interactions and animations.
   - `VISUAL_DENSITY` (Default: 6): Information density and spatial compactness.

---

## 2. Anti-Slop Directives (Hard Constraints)

### ❌ What is Banned (AI Slop Patterns):
* **No Centered 3-Card Heroes**: Never build a centered headline followed by three identical rectangular cards with generic Lucide icons.
* **No Muddy Purple Gradients**: Avoid standard `from-purple-600 to-blue-500` gradients pasted over dark backgrounds without lighting or texture.
* **No Low-Contrast Text**: Never use `#666` or `text-gray-400` on dark backgrounds where contrast falls below WCAG AA (4.5:1).
* **No Unmotivated Motion**: Never add floating elements or bouncing buttons that do not serve visual hierarchy or user feedback.
* **No Generic Browser Fonts**: Never rely on raw `sans-serif` or unstyled browser defaults.

### ✅ What is Required (High-Craft Patterns):
* **Asymmetrical & Dynamic Composition**: Use split viewports, offset content columns, interactive preview cards, or overlapping media frames.
* **Distinctive Typography Pairings**:
  - Expressive Display + Clean Body: e.g., *Outfit / Plus Jakarta Sans*, *Syne / Inter*, *Space Grotesk / JetBrains Mono*, *Instrument Serif / Geist*.
  - Strict line-height tuning: `1.05 - 1.15` for large display headings, `1.5 - 1.65` for readable paragraph copy.
* **Depth & Surface Architecture**:
  - Multi-layered background lighting (subtle mesh gradients, radial specular glares).
  - Fine borders with inner specular highlights (`box-shadow: inset 0 1px 0 rgba(255,255,255,0.12)`).
  - Subtle noise/grain overlays to break sterile digital flat color.
* **Tactile Micro-Interactions**:
  - Clear state transitions (`hover`, `active`, `focus-visible`).
  - Spring-based easing curves (`cubic-bezier(0.16, 1, 0.3, 1)`).
  - Subtle scale nudges (`transform: translateY(-2px) scale(1.01)`).

---

## 3. Pre-Flight Mechanical Checklist

Before finalizing any frontend output, verify:
- [ ] **Contrast**: Body text passes 4.5:1 contrast against its background; interactive borders pass 3:1.
- [ ] **Spacing Scale**: All padding and margins adhere to a consistent 4px/8px modular scale.
- [ ] **Responsive Ergonomics**: All interactive elements have a minimum hit target of 44x44px; layout adapts cleanly without horizontal overflow.
- [ ] **Visual Hierarchy**: Exactly one primary `<h1>` per view, with distinct visual weights across primary, secondary, and tertiary elements.
