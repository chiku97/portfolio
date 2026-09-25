---
name: image-to-code
description: >-
  Translates UI screenshots, Figma mockups, sketches, and reference images into pixel-perfect, responsive frontend code.
  Use when reproducing a visual design from an image, turning mockups into code, or matching a specific visual reference with high fidelity.
---

# Image-to-Code: High-Fidelity Multimodal UI Engineering

This skill provides a rigorous, multi-pass procedure to translate UI screenshots, Figma mockups, design specifications, or AI-generated design references into pixel-perfect, accessible, and responsive frontend code.

---

## 1. The 5-Phase Image-to-Code Pipeline

When given an image reference to implement, execute these 5 phases in order:

```text
[1. Token Extraction] → [2. Layout Tree Mapping] → [3. Component Breakdown] → [4. High-Fidelity Implementation] → [5. Visual Diff & Polish]
```

### Phase 1: Visual Token Extraction
Examine the reference image and extract exact design tokens:
* **Color Palette**:
  - Background canvas color (exact HEX/RGB, e.g., `#090e1c` vs `#000000`).
  - Card/container surface colors and opacity.
  - Border colors and opacities (e.g., `rgba(56, 189, 248, 0.28)`).
  - Primary, secondary, and accent typography colors.
* **Typography**:
  - Detect font families: Sans-serif (Geist, Inter), Display (Outfit, Syne), Monospace (JetBrains Mono).
  - Estimate font weights: bold (700), medium (500), regular (400).
  - Notice letter spacing (tracking): tightened for big display headers, widened for small uppercase labels.
* **Spatial & Shape Tokens**:
  - Corner radii: sharp (0px), subtle (6px-8px), rounded (12px-16px), pill (9999px).
  - Elevation: Drop-shadow directions, blur radius, color spread, and specular inner borders.

### Phase 2: Layout & Grid Mapping
* Identify the outer containment: fluid full-width, boxed container (`max-w-6xl`), or viewport-fixed.
* Map flexbox and grid structures:
  - Header / Hero / Section vertical rhythm.
  - Multi-column splits (e.g., 60/40 hero split, 3-column asymmetric grid).
  - Determine responsive collapsing behavior for smaller screens.

### Phase 3: Component Breakdown
* Break the visual into discrete, modular components:
  - Navigation bar (brand mark, links, CTA pills).
  - Cards and containers (headers, badges, content bodies, footers).
  - Interactive elements (buttons, inputs, sliders, toggles).
  - Media & data visualizations (metric counters, progress bars, charts).

### Phase 4: High-Fidelity Implementation
* **Zero Placeholders**: Never render grey empty placeholder boxes. Use clean vector icons (Lucide or inline SVG), generated images, or realistic mock data that matches the reference.
* **Semantic Structure**: Use proper HTML tags (`<nav>`, `<main>`, `<section>`, `<article>`, `<button>`).
* **Pixel Alignment**: Respect the visual padding, gaps, alignment (left/center/right), and optical balance shown in the reference.

### Phase 5: Visual Diff & Optical Refinement
Compare the generated implementation against the original image:
* [ ] Are typography sizes and line-heights matching the visual weight?
* [ ] Are margins, padding, and gaps optically balanced with the reference?
* [ ] Are border colors and box shadows matching the depth of the mockup?
* [ ] Are interactive states (`hover`, `active`, `focus-visible`) implemented even if the static image only captures the default state?

---

## 2. Best Practices & Guidelines

1. **Section-by-Section Accuracy**: If translating a full long-scroll page, implement and verify section by section to preserve high visual fidelity.
2. **Accessible Interaction**: A static image cannot show keyboard focus or accessibility attributes. Always enrich the output with ARIA labels, semantic roles, and keyboard navigation.
3. **Motion Enhancement**: If the design implies micro-interactions (e.g., floating cards, glowing badges, hover scale), add subtle, tasteful animations with spring curves (`cubic-bezier(0.16, 1, 0.3, 1)`).
