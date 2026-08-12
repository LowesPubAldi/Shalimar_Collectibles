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

Possible V1 follow-up items after source database review:
- A few edge-case collector notes and historical corrections, especially for uncommon card text or set annotations
- Uncut sheet and production-sheet documentation for select sets and rarities
- A small number of rare promo / foil confirmation gaps where the source site still flags unknowns
- Any remaining card-name, set-name, or rarity normalization issues discovered during feedback review
- Data completeness for archival collector context, excluding gameplay, message boards, and Universus coverage

## Authoritative Team Bonus + Insert Reference (2026-08-09)

This section captures the current source-of-truth details you provided for Team Bonus text and insert coverage targets.

### Team Bonus Text

- Team Urameshi: Gain 1 extra Spirit Energy during your Draw Step. When you pay the Attack Cost of an attack, the cards you discard are put at the bottom of your Deck in any order instead of being discarded.
- Team Saint Beasts: At the end of your turn, draw a card.
- Team Toguro: When you use an attack, you may discard up to 2 cards from your hand. That attack gains +3000 Attack Value for this turn for each card discarded in this way.
- Team Masho: During Setup, after both you and your opponent reveal your 4 starting characters and you show that you have the Masho Team Bonus, search your Deck for a 5th character and reveal it. Put all 5 characters into your hand. Choose 1 of your 5 characters and put it into the Arena face-up and the other 4 facedown in the Match Slots of your choosing. Your characters only flip face-up when a card affects them, or when they enter the Arena. If you qualify for the Team Bonus after the game has started, then you just turn your characters facedown, without rearranging them.
- Team Rokuyukai: Your characters with the Rokuyukai Team Symbol gain +2000 Defense Value.
- Team Ichigaki: Cards attached to your opponent's characters on the Sideline are face-up instead of facedown.
- Team Uraotogi: Your opponent cannot discard below 1 card in his hand when he pays for Attack Cost. Your opponent cannot draw cards while he has 6 or more cards in his hand.
- Team Genkai: When 1 of your characters with the Genkai Team Symbol enters the Arena, you may search your Deck for a technique and put it in your hand.
- Team Sarayashki: Once per turn, you may discard 1 of your face-up items in play and pay 1 Spirit Energy to search through your Deck for an item and put it in your hand.
- Team Sensui: All of your characters with the Sensui Team Symbol are both Heroes and Villains for your card effects.
- Team Koenma: When your opponent attacks one of your characters with the Koenma Team Symbol, discard the top two cards of your Deck. For each event discarded this way, your opponent's attacks gain -2000 Attack Value to a minimum of 0 Attack Value for this attack.
- Team Mukuro: When your fighter deals damage to an opposing character, discard the top two cards of that player's Deck for each point of damage dealt.
- Spirit Defense Force: All attacks used by your characters with the Spirit Defense Force Team Symbol gain +1000 Attack Value for each villain your opponent has in play.
- Team Kuroko: You may use the face-up attacks on any of your characters in play. All of your attacks used by characters that do not have the Kuroko Team Symbol gain +1 Attack Cost.
- Team Raizen: All of your Team Leaders gain +2000 Attack Value, and +2000 Defense Value.
- Team Yomi: Once per turn, you can pay 2 Spirit Energy to play a card from your opponent's Discard Pile as if it were in your hand. If you do, shuffle that card into your opponent's deck when it gets discarded from play.
- Team Kurama: The number of Team Symbols you require to gain a Team Bonus is reduced by 1.
- Raizen's Alliance: Events you play with a Spirit Energy of 1 or more gain -1 Spirit Energy to a minimum of 1.

### Insert Checklist Targets By Set

Ghost Files Insert (Pre-Release Cards):
- [ ] Origins Card Insert

Dark Tournament Inserts:
- [ ] Team Genkai
- [ ] Team Ichigaki
- [ ] Team Masho
- [ ] Team Rokuyukai
- [ ] Team Sarayashki
- [ ] Team St. Beasts
- [ ] Team Toguro
- [ ] Team Urameshi
- [ ] Team Uraotogi

Gateway Inserts:
- [ ] Team Genkai (Single Rainbow)
- [ ] Team Genkai (Double Rainbow)
- [ ] Team Ichigaki (Single Rainbow)
- [ ] Team Ichigaki (Double Rainbow)
- [ ] Team Koenma (Single Rainbow)
- [ ] Team Koenma (Double Rainbow)
- [ ] Team Masho (Single Rainbow)
- [ ] Team Masho (Double Rainbow)
- [ ] Team Rokuyukai (Single Rainbow)
- [ ] Team Rokuyukai (Double Rainbow)
- [ ] Team Sarayashki (Single Rainbow)
- [ ] Team Sarayashki (Double Rainbow)
- [ ] Team Sensui (Single Rainbow)
- [ ] Team Sensui (Double Rainbow)
- [ ] Team St. Beasts (Single Rainbow)
- [ ] Team St. Beasts (Double Rainbow)
- [ ] Team Toguro (Single Rainbow)
- [ ] Team Toguro (Double Rainbow)
- [ ] Team Uraotogi (Single Rainbow)
- [ ] Team Uraotogi (Double Rainbow)
- [ ] Team Urameshi (Single Rainbow)
- [ ] Team Urameshi (Double Rainbow)

Betrayal Inserts:
- [ ] Team Kuroko
- [ ] Team Mukuro
- [ ] Team Raizen
- [ ] Team Yomi
- [ ] Spirit Defense Force

Alliance Inserts:
- [ ] Raizen's Alliance
- [ ] Team Kurama

## Roadmap

This is the clean version of the roadmap so it is easier to follow.

### Version 2

Version 2 is the next big step. The goal is to make the site more useful and more reliable before moving to community features.

#### Pokemon Rollout Note (Format-First)

- Pokemon will follow a different rollout pattern based on actual gameplay format structure.
- Phase 1: start with the currently relevant format window (the most recent playable set range first).
- Phase 2: backfill older pre-window sets in small batches, one to two sets at a time.
- This keeps gameplay relevance high first, then expands archival depth in controlled steps.

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
