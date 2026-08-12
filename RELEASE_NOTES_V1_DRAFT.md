# Shalimar Collectibles v1.0.0 (Draft)

## Summary
Shalimar Collectibles v1 focuses on a polished Yu Yu Hakusho collector experience with clean navigation, responsive card browsing, and card-level variant clarity.

## Highlights
- Inventory cards are fully clickable and route into single-card pages.
- YYH gameplay status support is present (Banned and Limit 1 per Deck) with filter support.
- Kings page includes complete set price context and piece-level hover pricing.
- Single-card pages include finish-aware interaction:
  - Standard views remain neutral.
  - Foil-like variants receive premium visual treatment for clear purchase intent.
- Site navigation now includes Kings across header and footer generation.
- Mobile UX updates:
  - Header/nav remains pinned at top.
  - Footer nav links are hidden on mobile to prevent clipping.
  - Home page mobile-nav initialization is hardened so menu behavior remains reliable during startup.

## Stability and Compatibility
- Static responses use no-store/no-cache behavior to reduce stale-client mismatches during iteration.
- Unsupported CSS compatibility warnings (color-mix/text-wrap usage in styles.css) were replaced with broadly supported alternatives.

## Data Scope in v1
- Primary launch scope is Yu Yu Hakusho.
- Non-YYH placeholders may remain in non-core game lanes by design for phased expansion.

## Known Follow-Up (Post-v1)
- Expand and continuously refresh marketplace pricing from eBay over time.
- Continue filling non-YYH set data and filters as additional coverage is added.

## QA Snapshot (Pre-Launch)
- Internal local HTML href/src broken-link sweep: pass.
- Mobile nav behavior across Home and card pages (open/close via toggle, Escape, and link/overlay close): pass.
- Footer clipping issue on mobile: resolved by hiding footer nav links at mobile breakpoints.
- Content placeholder sweep under YYH launch scope: effectively complete.

## Hotfix Notes (2026-08-09)
- Corrected Betrayal Team Bonus insert alias mapping so `Team Yomi` resolves to `TB5` and `Spirit Defense Force` resolves to `TB4`.
- Confirmed fix in production after redeploy to address inventory thumbnail mismatch.

## Commit Baseline
- Suggested release commit: latest main after final Home mobile-nav reliability commit.
