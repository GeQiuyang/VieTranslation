---
name: Industrial Core
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#444748'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#1e1e1e'
  on-primary: '#ffffff'
  primary-container: '#333333'
  on-primary-container: '#9c9b9b'
  inverse-primary: '#c8c6c6'
  secondary: '#705d00'
  on-secondary: '#ffffff'
  secondary-container: '#fcd400'
  on-secondary-container: '#6e5c00'
  tertiary: '#001f3d'
  on-tertiary: '#ffffff'
  tertiary-container: '#003461'
  on-tertiary-container: '#5a9ef1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e4e2e1'
  primary-fixed-dim: '#c8c6c6'
  on-primary-fixed: '#1b1c1c'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#ffe16d'
  secondary-fixed-dim: '#e9c400'
  on-secondary-fixed: '#221b00'
  on-secondary-fixed-variant: '#544600'
  tertiary-fixed: '#d4e3ff'
  tertiary-fixed-dim: '#a4c9ff'
  on-tertiary-fixed: '#001c39'
  on-tertiary-fixed-variant: '#004883'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  data-mono:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin: 32px
  container-max: 1440px
---

## Brand & Style
The design system is engineered for the heavy machinery trade, specifically targeting the precision-driven world of rotary drilling rig parts. The brand personality is authoritative, resilient, and technical. It evokes an emotional response of absolute reliability and mechanical confidence.

The visual style is **Corporate / Modern** with a slight **Tactile** influence. It avoids unnecessary decoration, focusing instead on high legibility and structural integrity. The interface mimics the rugged nature of industrial equipment—sturdy, high-contrast, and purposeful—while maintaining the sophisticated feel of a professional procurement and engineering tool.

## Colors
The palette is rooted in the "caution and steel" aesthetic of construction environments.

- **Primary (Charcoal Grey):** Used for primary text, structural headers, and heavy UI anchors. It represents the strength of forged steel.
- **Secondary (Industrial Yellow):** Used sparingly as a high-visibility accent for primary actions, status alerts, and critical indicators.
- **Tertiary (Slate Blue):** Applied to interactive elements, links, and technical highlights to establish professional trust and digital utility.
- **Neutral (Slate Tones):** A range of greys from `#F5F5F5` to `#E0E0E0` used for backgrounds and borders to keep the workspace clean and focused.

## Typography
This design system utilizes **Inter** for its exceptional legibility in technical contexts and its robust support for multi-language scripts (Chinese and Vietnamese).

- **Data-Dense Focus:** Use `data-mono` (utilizing Inter's tabular numbers) for part numbers, dimensions, and specifications to ensure vertical alignment in tables.
- **Hierarchical Clarity:** Labels use uppercase with slight tracking to differentiate metadata from body content.
- **Localization:** Ensure line heights are generous (minimum 1.5x for body) to accommodate the vertical height of Chinese characters and Vietnamese diacritics without clipping.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy, optimized for desktop-first engineering and procurement workflows.

- **Grid:** A 12-column grid system with 24px gutters. Content is housed in a max-width container of 1440px to prevent excessive line lengths on ultra-wide monitors.
- **Density:** High information density is preferred. Use a 4px baseline shift for tight alignment of technical specifications.
- **Breakpoints:**
  - **Desktop (1024px+):** Full 12-column visibility with persistent side navigation for parts categories.
  - **Tablet (768px - 1023px):** 8-column grid; sidebar collapses into a drawer.
  - **Mobile (<767px):** 4-column fluid grid; data tables transition to card-based layouts.

## Elevation & Depth
Depth is communicated through **Tonal Layers** and **Low-Contrast Outlines**.

- **Surface Levels:** The background uses the lightest neutral. Content containers use a pure white surface with a 1px border (`#E0E0E0`).
- **Interaction Depth:** Elements do not use heavy shadows. Instead, an elevation of 2px (Y-offset) with a very soft, high-spread grey shadow is used only for active cards or modals to suggest they are "machined" above the surface.
- **State Changes:** Hover states on interactive rows or cards should use a subtle background tint (`#F9F9F9`) rather than a shadow change, maintaining a flat, industrial feel.

## Shapes
The shape language is **Soft (0.25rem)**, reflecting the precision-milled edges of high-quality machinery parts.

- **Standard Elements:** Buttons, input fields, and small tags use a 4px radius.
- **Structural Elements:** Large cards and data containers use `rounded-lg` (8px) to provide a clear boundary.
- **Action Elements:** Toggle switches and status "pills" use a full radius (pill-shaped) to distinguish them from data-entry fields.

## Components
- **Input Cards:** Group related technical specs (e.g., "Torque Specifications") in cards with a clear `label-md` header and a `primary_color` top-border accent (3px).
- **Toggle Switches:** Used for language direction (CN/VN). The active state must use the `tertiary_color` (Slate Blue) to indicate "System Active" vs. `secondary_color` (Yellow) for "Caution/Warning."
- **Data Tables:** High-density rows (32px-40px height). Header cells must be `primary_color` with white text. Use zebra-striping for readability in long catalogs.
- **Robust Buttons:** Primary buttons use the `secondary_color` (Yellow) with black text for maximum visibility. Secondary buttons use a `primary_color` outline.
- **Part Status Chips:** Use a "Traffic Light" system: Green (In Stock), Yellow (Low Stock), Red (Discontinued), utilizing the primary palette's logic for consistency.
- **Language Switcher:** A prominent, high-contrast toggle in the top utility bar, using clear localized text (e.g., "中文" / "Tiếng Việt").