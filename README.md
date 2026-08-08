# Shalimar Collectibles

Shalimar Collectibles is a simple trading card site for Pokemon, Yu-Gi-Oh, and Yu Yu Hakusho.

## Project Goal

Build a clean place to search cards, view sets, and check prices, then keep improving it based on feedback.

## What Is Already Built

The site is now at a production-ready v1 baseline for the YYH launch scope.

### Already Built

- Inventory search and filters for names, sets, numbers, types, rarities, editions, finishes, and price status
- Tablet and mobile inventory layouts
- Card images and image loading
- Variant tracking for card printings and versions
- Individual card pages with a hero, quick facts, notes, and a variant picker
- Individual card pages with foil-tier premium treatment and shimmer staging for foil-like variants
- Kings set page pricing context with piece-level hover pricing support
- Shared mobile nav system with sticky mobile header behavior and hardened startup initialization
- Starter backend routes for YYH card data
- Starter eBay login/search code in the local Express server
- Drafted release-notes workflow and tagged v1.0.0 release baseline

### In Progress

- Vercel preview deployment cleanup
- Expanded eBay API setup and production validation
- Continuing checklist/data expansion for non-YYH lanes
- Planning the next set-card-list API phase

## Today's Done Checklist (2026-08-08)

- [x] Kings set polish completed and fully integrated into site nav
- [x] Legacy `item.html` route converted into redirect shim to `card-template.html` (query/hash preserved)
- [x] Card-page variant details synchronization bug fixed
- [x] Premium foil-vs-standard treatment shipped on individual card pages
- [x] Mobile header/nav behavior hardened and kept pinned at top
- [x] Mobile footer nav links hidden to prevent clipping and overlap
- [x] CSS compatibility warnings cleaned (`color-mix`/`text-wrap` replacements)
- [x] Broken-link sweep completed with zero internal href/src breaks
- [x] Placeholder/content sweep completed for YYH v1 launch scope
- [x] Release notes drafted and updated with final nav reliability details
- [x] v1.0.0 tag moved to latest release commit baseline

## Version 1 Release Status (2026-08-08)

- [x] Core YYH inventory and card-page journey validated
- [x] Final mobile nav/footer behavior validated across Home and card pages
- [x] Individual card page foil premium styling shipped
- [x] Compatibility cleanup completed for key CSS warnings
- [x] v1 draft release notes prepared and maintained
- [x] Release tag `v1.0.0` aligned to latest release commit

Carry-forward items after v1 launch:
- Optional hardening: replace external Alliance pack image with a stable local hosted asset
- Continue eBay endpoint resilience and user-facing fallback copy tuning

## Roadmap

This is the clean version of the roadmap so it is easier to follow.

### Version 2

Version 2 is the next big step. The goal is to make the site more useful and more reliable before moving to community features.

#### V2 Footholds Already Established

- Reusable card-variant logic now supports tiered finish presentation, making future variant UX extension lower risk.
- Shared mobile-nav component now uses idempotent initialization and startup isolation, reducing cross-page regressions.
- Sets pricing override workflow is already wired for sealed product display and can be expanded set-by-set.
- Suspicious-pricing review/apply scripts already exist, enabling safer iterative pricing automation.

#### V2A - Near-Term UI Work

- Finish inventory layout polish and broader QA automation checks
- Expand individual card pages with richer print history and pricing confidence context
- Complete remaining set-detail polish and gameplay format filters
- Add clearer cross-game lane labeling as non-YYH content expands

#### V2B - Data and Pricing Foundation

- eBay pricing updates
- Price history snapshots
- Better price confidence notes
- One clean format for API and manual pricing data
- Cleaner notes for sets, cards, and prices

#### V2C - Platform Foundation

- One stable ID system for every card printing and variant
- Shared data shape for cards and sets
- Better image naming and fallback rules
- Background jobs for imports and syncs
- Feature flags for safer launches

### Version 3

Version 3 is the community layer after the catalog and pricing tools are stable.

- Message boards and discussion threads
- Trades, swaps, and reputation
- Deck showcase pages
- Public deck pages with deck details
- Community submissions and moderation tools
- User accounts and synced collections

## Scope Guardrails

To keep the project moving, new ideas are checked in this order:

1. Does it help search, discovery, or collection tracking?
2. Does it belong in the next version, or can it wait?
3. Does it need a reliable API or data source?

If it does not clearly fit the current version, it goes into the next version backlog.

## Backend Starter (YYH API)

The site now has a simple backend starter so the frontend can ask for card data from an API route.

### What This Means

- The inventory page asks the backend for cards.
- The backend looks for card data in this order:
	- `data/yyh-cards-full.json`
	- `data/yyh-cards.json`
	- `data/yyh-cards-slice.json`
- The backend sends the cards back as JSON.

### Backend Files

- `server.js` -> Express server and API routes
- `data/yyh-cards-slice.json` -> starter YYH card data
- `data/yyh-cards-full.json` (optional) -> full YYH inventory data (preferred when present)
- `scripts/pages/inventory-filters.js` -> frontend request + render logic

### Run The Backend

1. Open terminal in project root.
2. Run `npm install` (only needed first time).
3. Run `npm start`.

You should see the API start at `http://127.0.0.1:3000`.

### Test API Endpoints

- Health check:
	- `http://127.0.0.1:3000/api/health`

- All YYH starter cards:
	- `http://127.0.0.1:3000/api/yyh/cards`

- Query example:
	- `http://127.0.0.1:3000/api/yyh/cards?q=kurama`

- Sets endpoint:
	- `http://127.0.0.1:3000/api/yyh/sets`

- Sets summary endpoint:
	- `http://127.0.0.1:3000/api/yyh/sets/summary?game=Yu%20Yu%20Hakusho`

### eBay API Starter

The backend also has starter code for eBay login and eBay search.

Required `.env.local` values:

- `EBAY_APP_ID`
- `EBAY_DEV_ID`
- `EBAY_CLIENT_SECRET`

Optional `.env.local` values:

- `EBAY_ENV` -> `sandbox` (default) or `production`
- `EBAY_MARKETPLACE_ID` -> defaults to `EBAY-US`

Test endpoints:

- eBay auth test:
	- `http://127.0.0.1:3000/api/ebay/test`

- eBay auth refresh test:
	- `http://127.0.0.1:3000/api/ebay/test?refresh=1`

- eBay browse search:
	- `http://127.0.0.1:3000/api/ebay/search?q=yu%20yu%20hakusho%20tcg&limit=20`

Search query params:

- `q` (required)
- `limit` (optional, max 200)
- `offset` (optional)
- `category_ids` (optional)
- `sort` (optional)
- `filter` (optional, eBay Browse API filter string)

### Current API Query Params

- `q` -> text search
- `game` -> exact game filter
- `set` -> exact set filter
- `type` -> exact type filter
- `rarity` -> exact rarity filter
- `limit` -> page size
- `offset` -> starting row

### Cards Response Shape

`/api/yyh/cards` now returns:

- `items` -> array of cards for this page
- `total` -> total matching cards before pagination
- `limit` -> active page size
- `offset` -> active starting row
- `hasMore` -> true when another page exists

### Safety Fallback

If the API is down, Inventory falls back to local JSON so the page still works.

### Full Inventory Notes

- To show more than 12 cards, add your full export as `data/yyh-cards-full.json`.
- Different card number formats are supported. The loader automatically maps common fields like `id`, `number`, `cardNumber`, and `card_number`.

### Convert YYH PDF To JSON

- Source PDF: `assets/yyh-source/yyh-card-library-source.pdf`
- Converter script: `scripts/tools/convert_yyh_pdf_to_json.py`
- Run command:
	- `python scripts/tools/convert_yyh_pdf_to_json.py`
- Output file:
	- `data/yyh-cards-full.json`

### Apply Ghost Files Checklist Mapping

- Checklist source file:
	- `data/ghost-files-checklist.txt`
- Mapping script:
	- `scripts/tools/apply_ghost_files_checklist.py`
- Run command:
	- `python scripts/tools/apply_ghost_files_checklist.py`
- What it does:
	- Normalizes matching cards to `set = Ghost Files`
	- Applies rarity labels from checklist code prefixes (for example `C`, `R`, `ST`, `U`, `S`, `G`, `TC`, `TR`)
	- Adds checklist-only cards not found in PDF parse so the set is complete in Inventory/API
	- Writes parsed checklist entries to `data/ghost-files-checklist.json`

### Apply Any Set Checklist

- Generic importer:
	- `scripts/tools/apply_set_checklist.py`
- Example command:
	- `python scripts/tools/apply_set_checklist.py --checklist data/dark-tournament-checklist.txt --set "Dark Tournament" --source "dark-tournament-checklist.txt" --write-checklist-json`
- Result:
	- Merges checklist entries into `data/yyh-cards-full.json`
	- Adds missing checklist-only entries so the full checklist is visible in Inventory/API

- Current imported checklist files:
	- `data/ghost-files-checklist.txt`
	- `data/dark-tournament-checklist.txt`
	- `data/gateway-checklist.txt`
	- `data/exile-checklist.txt`
	- `data/betrayal-checklist.txt`
	- `data/alliance-checklist.txt`

### Compare Completed Listings Against Baseline Ranges

- Script:
	- `scripts/tools/compare_completed_listings.js`
- Input:
	- A CSV export of completed/sold listings from eBay (or your own archive)
- Example command:
	- `node scripts/tools/compare_completed_listings.js --csv data/exports/yyh-completed-32-months.csv --out-json data/exports/yyh-comparison-report.json --out-csv data/exports/yyh-comparison-report.csv`
- Optional tolerance when a price note does not include an explicit range:
	- `--fallback-tolerance 20` (default is +/- 20% around `priceUsd`)
- Output:
	- Summary counts of cards above range, below range, and in range
	- Top out-of-range cards sorted by variance
	- Full per-card report in JSON/CSV when output paths are provided

### Update YYH Prices To Completed-Listing Medians

- Script:
	- `scripts/tools/update_yyh_median_pricing.js`
- Purpose:
	- Uses one or more completed-listing CSV batches to calculate cumulative per-card medians
	- Updates `data/pricing/yyh/*-pricing.json` `priceUsd` and `compsCount`
	- Writes a median audit note in each updated card's `notes`
- Recommended workflow:
	1. Save each eBay export as its own CSV file (piece by piece over time).
	2. Run a dry run first to see proposed updates.
	3. Re-run with `--write` to apply.
- Example dry run:
	- `npm run yyh:update-medians -- --csv tmp-visible-sold-sample-3.csv --min-samples 2 --report-json data/yyh-median-update-report.json`
- Example write:
	- `npm run yyh:update-medians -- --csv tmp-visible-sold-sample-3.csv --min-samples 2 --write --report-json data/yyh-median-update-report.json`
- Multiple CSVs at once:
	- Repeat `--csv` for each file
	- or use `--csv-dir <folder>` to load all CSV files in that folder
- Useful options:
	- `--set "Dark Tournament"` to limit updates to one set
	- `--min-samples <n>` to require at least `n` sales per card (default `2`)
	- `--score-threshold <n>` to make title matching stricter (default `25`)
	- `--suspicious-delta-pct <n>` flags cards whose median is more than `n%` outside baseline range (default `25`)
	- `--apply-suspicious` includes flagged cards in write mode (default is to skip flagged cards)
	- `--suspicious-json <path>` writes a suspicious-only review queue JSON
	- `--suspicious-csv <path>` writes a suspicious-only review queue CSV
	- `--fallback-tolerance <n>` baseline fallback when notes do not include a range (default `20`)

- Suspicious card handling:
	- If a card is flagged and you do not pass `--apply-suspicious`, price updates are skipped.
	- In `--write` mode, flagged cards are automatically marked `Needs Review`.
	- Use `--no-mark-suspicious-needs-review` to disable that auto-status behavior.

### Apply Approved Suspicious Prices

- Script:
	- `scripts/tools/apply_yyh_suspicious_approvals.js`
- Purpose:
	- Reads the suspicious queue and applies only approved entries back into pricing files.
	- Resets approved cards to `status = Priced` with an approval audit note.
- Example dry run (approve all):
	- `npm run yyh:apply-suspicious -- --queue-json data/yyh-median-update-report.suspicious.json --approve-all --report-json data/yyh-suspicious-approval-report.json`
- Example write (approve all):
	- `npm run yyh:apply-suspicious -- --queue-json data/yyh-median-update-report.suspicious.json --approve-all --write --report-json data/yyh-suspicious-approval-report.json`
- Example with manual approvals file:
	- `npm run yyh:apply-suspicious -- --queue-json data/yyh-median-update-report.suspicious.json --approvals-json data/yyh-suspicious-approvals.json --write --report-json data/yyh-suspicious-approval-report.json`
- Manual approvals file shape:
	- `{ "approvals": [{ "set": "Dark Tournament", "id": "S21", "name": "Yusuke, Unleashed", "variant": "Standard", "approved": true, "approvedPriceUsd": 10.5, "note": "confirmed from comps" }] }`

### Current Working Window

- As of today, the live eBay sold-results view we are using is narrowed to:
	- Yu Yu Hakusho TCG
	- CCG Individual Cards
	- English only
	- Sold/completed only
- The visible date span currently runs from Jul 11, 2026 back to May 8, 2026 on the paging we checked.
- This is the starting anchor for the rolling comparison work, not the full 32-month archive yet.
