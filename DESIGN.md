---
name: "KeepScope.ai"
description: "Visible personal-data protection for enterprise AI."
colors:
  ink: "#102f29"
  muted: "#4c625b"
  paper: "#ffffff"
  wash: "#f5f8f5"
  mint: "#98e8c5"
  mint-light: "#dff3e9"
  mint-deep: "#c2e9d5"
  green: "#155a43"
  green-hover: "#0d4432"
  pine: "#0b3229"
  on-pine: "#f2fbf5"
  muted-pine: "#bad0c5"
  rule: "#d4dfd8"
  rule-dark: "#446459"
  red: "#8a3a2a"
  red-bg: "#fbece5"
  safe-bg: "#d9f3e6"
  safe-ink: "#12523c"
  pending-bg: "#f6f0d9"
  pending-ink: "#6c5513"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(48px, 4.6vw, 66px)"
    fontWeight: 650
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(32px, 3.1vw, 44px)"
    fontWeight: 650
    lineHeight: 1.16
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "21px"
    fontWeight: 650
    lineHeight: 1.4
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    lineHeight: 1.65
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "12px"
    fontWeight: 650
  button:
    fontFamily: "Manrope, sans-serif"
    fontSize: "14px"
    fontWeight: 650
    lineHeight: 1.5
rounded:
  highlight: "3px"
  status: "4px"
  button: "8px"
  boundary: "12px"
  surface: "16px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
  section: "104px"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.green-hover}"
  button-compact:
    backgroundColor: "{colors.green}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "11px 20px"
  button-reset:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.green}"
    rounded: "{rounded.button}"
    width: "100%"
  text-link:
    textColor: "{colors.ink}"
  navigation:
    backgroundColor: "{colors.mint-light}"
    textColor: "{colors.ink}"
    height: "96px"
  status-pending:
    backgroundColor: "{colors.pending-bg}"
    textColor: "{colors.pending-ink}"
    rounded: "{rounded.status}"
    padding: "6px 8px"
  status-approved:
    backgroundColor: "{colors.safe-bg}"
    textColor: "{colors.safe-ink}"
    rounded: "{rounded.status}"
    padding: "6px 8px"
  demonstration-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
  disclosure:
    textColor: "{colors.ink}"
    padding: "18px 0"
---

# Design System: KeepScope.ai

## Overview

**Creative North Star: "Visible protection"**

An approachable enterprise security system: pale mint, deep pine ink, generous spacing, and compact white demonstrations make sensitive-data handling legible. The user-selected category direction favors familiar navigation, plain Spanish, and concrete product states.

Self-hosted Manrope carries every role. Rounded demonstration surfaces, fine separators, and restrained motion provide clarity without ornamental imagery. The existing favicon remains the identity asset; the build adds no raster imagery.

**Key Characteristics:**
- Mint and pine with explicit semantic state colors.
- One type family, strong heading hierarchy, compact labels.
- Spacious sections around useful, operable demonstrations.

## Colors

Mint supplies an approachable brand presence; pine provides contrast and structural weight.

### Primary

- **Mint / Mint Light / Mint Deep:** accent region, pale hero surface, and its separator.
- **Green / Green Hover:** filled actions, links on hover, icons, and focus outlines.

### Secondary

- **Red / Red Background:** personal data before protection.
- **Safe Ink / Safe Background:** protected substitutions and approved status.
- **Pending Ink / Pending Background:** approval that has not yet been granted.

### Neutral

- **Ink / Muted:** primary and supporting text on light surfaces.
- **Paper / Wash:** white product surfaces and soft explanatory regions.
- **Pine / On Pine / Muted Pine:** dark regions with distinct heading and supporting-text contrast.
- **Rule / Rule Dark:** fine separators appropriate to light and dark surfaces.

**The Readable States Rule.** Pair state color with words: pending, approved, and protected data remain understandable without color.

## Typography

**Display Font:** Manrope, sans-serif. **Body Font:** Manrope, sans-serif. The variable font is self-hosted in `assets/manrope.ttf`, with weights 200–800 and swap loading.

The frontmatter records the hierarchy. Display and headline roles are tightly tracked and balanced; prose stays open and readable. Hero prose is enlarged (19px desktop, 17px narrow), while supporting captions and status labels use 12px. Paragraph widths commonly sit between 39ch and 60ch; disclosure text reaches 75ch. Numbers in step and audit rows use tabular figures.

Display overrides are 54px at widths up to 1050px, 56px up to 800px, and 44px up to 520px. Titles reduce to 19px at 520px. These are the shipped responsive values, not a universal scale ratio.

**The One Family Rule.** Use self-hosted Manrope for headings, prose, navigation, and product examples.

## Layout

The centered container is 1248px including 40px side gutters. Gutters become 24px at 760px and 20px at 420px. Section spacing follows the recorded scale and drops to 64px at 760px. Desktop explanatory layouts use two columns with 40–100px gaps; they stack at 800px. The architecture diagram changes to vertical flow at 520px.

Navigation is 96px tall on desktop and 80px at 800px. At 800px, links move into a disclosure menu; at 520px, the header CTA gives way to the menu while the hero action remains visible. Product panels use roughly 18–28px inner padding, smaller on mobile. Content density is compact within panels and generous between sections.

## Elevation & Depth

Most depth comes from white, wash, pale mint, and pine surface changes plus fine borders. Only the primary demonstration uses the ambient shadow defined in the sidecar. Buttons rise subtly on hover; they are flat at rest.

**The Demonstration Depth Rule.** Reserve the ambient shadow for the primary interactive demonstration; use surface tones and separators elsewhere.

## Shapes

Rounded rectangles define the system: modest button corners, larger demonstration surfaces, small status chips, and close-fitting inline data highlights. The architecture boundary uses a dashed outline; ordinary separators are solid and thin. Icons are restrained inline SVG line drawings. The brand symbol is an outlined enclosure with internal vertical divisions.

## Components

### Buttons and links

Primary buttons use Green on Paper text, compact Manrope, and the frontmatter padding. Standard buttons have a 50px minimum height; compact and full-width demonstration actions use 44px. Hover darkens and translates upward 2px over 160ms; active returns to rest. Reset is a white, green-outline button with a wash hover. Text actions remain underlined. Keyboard focus is a 3px Green outline offset 5px, with Mint substituted on pine disclosures.

### Navigation

Sentence-case links share the pale-mint header. Desktop hover adds an underline. The mobile menu is an in-flow disclosure with a top separator; its trigger exposes expanded state, and Escape closes it and returns focus.

### Status and data highlights

Pending and approved chips share their compact shape. Their color and label change together. Personal data uses warm red highlighting; protected replacements use safe green highlighting. Keep highlighted values intact while surrounding prose wraps.

### Demonstrations and records

White cards contain distinct original/protected areas, labeled status, and full-width actions. Approval swaps its action for reset and moves focus to the visible control. Restitution is an independent toggle with visible state and live feedback. Audit and process rows rely on separators and aligned small labels rather than extra cards.

### Disclosures

Native details/summary controls reveal technical qualifications under a fine divider. Hover changes text to Green, or Mint on pine. Preserve native keyboard operation and visible focus. No text-input component exists in this build.

## Do's and Don'ts

### Do:

- Do preserve the mint brand accent, existing favicon, and Spanish interface.
- Do use white product surfaces, sentence-case labels, and visible text for every state.
- Do let columns stack and text wrap; retain the demonstration content on narrow screens.
- Do honor reduced motion and retain visible keyboard focus.

### Don't:

- Don't use status color as the only explanation of a result.
- Don't promote illustrative examples into customer evidence or performance claims.
- Don't replace the approved category direction with sparse abstract layouts.
