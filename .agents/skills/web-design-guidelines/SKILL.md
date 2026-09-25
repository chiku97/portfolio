---
name: web-design-guidelines
description: >-
  Audits and guides web interfaces for compliance with accessibility (WCAG AA), responsive ergonomics, layout stability, and Vercel Web Interface Guidelines.
  Use when reviewing, auditing, or implementing UI components, layouts, forms, and interactive states to ensure production-grade UX and accessibility.
---

# Web Design Guidelines: Interface Ergonomics & Accessibility

This skill provides an authoritative set of best practices and audit rules for modern web interfaces, synthesized from Vercel's Web Interface Guidelines, WCAG 2.2 AA standards, and production design engineering principles.

---

## 1. Accessibility & Semantic Architecture (WCAG 2.2 AA)

* **Semantic Landmark HTML**:
  - Always use appropriate HTML5 elements: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`, `<dialog>`, `<aside>`.
  - Exactly one `<h1>` per page reflecting the main context. Maintain sequential heading levels (`h1` → `h2` → `h3`) without skipping levels.
* **Interactive Elements**:
  - Actions that navigate must be `<a href="...">`. Actions that trigger operations must be `<button type="button|submit">`.
  - Never use `<div onClick={...}>` without `role="button"`, `tabIndex={0}`, and `onKeyDown` handlers for Enter/Space.
* **Forms & Inputs**:
  - Every `<input>`, `<textarea>`, and `<select>` must have an explicit matching `<label for="id">` or `aria-label`.
  - Error states must use `aria-invalid="true"` and reference the error message via `aria-describedby="error-id"`.
  - Never disable submit buttons while user input is valid; if submitting, switch the button to a loading state with `aria-busy="true"` and preserve focus.
* **Focus Management & Focus Rings**:
  - **Never use `outline: none` or `outline: 0`** without providing an explicit, prominent `:focus-visible` replacement.
  - Recommended focus ring: `outline: 2px solid var(--accent-cyan); outline-offset: 2px;`.
  - In modal dialogs, trap keyboard focus inside the dialog while open and restore focus to the trigger on close.

---

## 2. 5-State Ergonomics for Interactive Components

Every interactive element (button, link, card, form field) must have intentionally designed styles for all five visual states:

1. **Default**: Clear affordance, legible contrast, resting elevation.
2. **Hover**: Visual elevation, color shift, subtle cursor pointer, tooltip if icon-only.
3. **Focus-Visible**: High-contrast outline ring triggered by keyboard navigation (`Tab`).
4. **Active / Pressed**: Tactile feedback (`transform: scale(0.98)` or inset shadow).
5. **Disabled / Loading**: Reduced opacity (`opacity: 0.5`), `cursor: not-allowed`, or animated spinner with `aria-busy="true"`.

---

## 3. Layout Stability & Performance (Core Web Vitals)

* **Zero Cumulative Layout Shift (CLS)**:
  - Always declare explicit `width` and `height` or CSS `aspect-ratio` on images, videos, and dynamic embeds so the browser reserves the layout box before the asset loads.
  - Use skeleton loaders matching the exact dimensions of incoming asynchronous content.
* **Responsive Mobile Touch Ergonomics**:
  - Minimum touch target size: **44 × 44 CSS pixels** on mobile touchscreens.
  - Safe area insets: Incorporate `padding-bottom: env(safe-area-inset-bottom)` for fixed bottom bars and floating navigation docks on iOS/Android.
  - Avoid horizontal viewport scroll on mobile (`overflow-x: hidden` on viewport roots, container max-width: 100%).

---

## 4. Typography & Spacing Rhythm

* **Line Height Rules**:
  - Display headers (`text-4xl` to `text-6xl`): Tight line height (`1.05` to `1.2`). Large text with loose line-height looks detached.
  - Body text (`text-sm` to `text-base`): Generous line height (`1.5` to `1.65`) for effortless reading.
  - Monospace telemetry / labels: Compact line height (`1.2` to `1.4`).
* **Strict Spacing Scale**:
  - Use an 8-point spatial grid (4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px). Never use arbitrary ad-hoc values like `margin-top: 19px`.

---

## 5. UI Code Audit Workflow

When auditing or reviewing code, inspect components against this rubric and report issues in the format:

```text
[file:line] - [SEVERITY: ERROR|WARNING|INFO] - [CATEGORY]
Issue: Description of guideline violation
Fix: Exact suggested code change
```
