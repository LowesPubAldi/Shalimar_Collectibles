# Shalimar_Collectibles

Shalimar Collectibles is a trading card resource platform focused on Pokemon, Yu-Gi-Oh, and Yu Yu Hakusho.

## Project Goal

Build a clean, searchable card resource for collectors and players, then expand features based on real community feedback.

## Roadmap

This roadmap is our guideline for feature planning.

### Version 1 (Core Release)

Focus: deliver the most requested foundational tools first.

- [ ] Card database pages for supported games
- [ ] Strong search + filters
- [ ] Filter by name
- [ ] Filter by set
- [ ] Filter by card number
- [ ] Filter by card type
- [ ] Filter by rarity
- [ ] Card image library
- [ ] Set lists and set-level views
- [ ] Card detail page basics (name, set, number, rarity, image)
- [ ] Starter deck list pages
- [ ] Basic collection tracker
- [ ] Track print/finish variants (non-foil, single rainbow, double rainbow, limited/unlimited)

### Version 2 (Expansion Release)

Focus: deepen utility after V1 is stable and feedback is collected.

- [ ] Pricing guide system (beta)
- [ ] Automated/assisted price updates from available market data
- [ ] Advanced collection tools (totals, gaps, duplicates)
- [ ] Deck Showcase feed (listing-style deck cards)
- [ ] Public deck detail pages with full card quantities
- [ ] Deck metadata (format, archetype, condition notes, value range)
- [ ] Shareable deck URLs
- [ ] Save/share/contact actions for deck owners
- [ ] Community-submitted deck lists and improvements
- [ ] Deck comments and ratings
- [ ] Deck version history
- [ ] Deck price roll-up from card data
- [ ] Trade/swap matching between users
- [ ] Better search quality (saved filters, faster results, more filter combinations)
- [ ] User accounts and synced collections (optional)

## Scope Guardrails

To keep momentum, new requests are evaluated in this order:

1. Does it improve V1 search, card discovery, or collection tracking?
2. Is it required for launch, or can it wait for V2?
3. Does it depend on a reliable API/data source?

If it does not clearly support V1 launch goals, move it to the V2 backlog.

## Current Status

- Homepage design and seasonal spotlight UI: in progress
- API/data source research (especially Yu Yu Hakusho): in progress
- Feature roadmap defined in this README: complete

## Phase 1 Backend (YYH API Starter)

We now have a beginner-friendly API starter so the frontend can request data from a backend route.

### What This Means (Simple)

- Frontend (Inventory page) asks backend for cards.
- Backend reads card data from the first available file in this order:
	- `data/yyh-cards-full.json`
	- `data/yyh-cards.json`
	- `data/yyh-cards-slice.json`
- Backend sends card records back as JSON.

Think of it like this:

- Frontend = customer
- API route = checkout counter
- JSON file = shelf with card records

### Backend Files

- `server.js` -> Express server and API routes
- `data/yyh-cards-slice.json` -> starter YYH card data
- `data/yyh-cards-full.json` (optional) -> full YYH inventory data (preferred when present)
- `scripts/pages/inventory-filters.js` -> frontend request + render logic

### Run The Backend

1. Open terminal in project root.
2. Run `npm install` (only needed first time).
3. Run `npm start`.

You should see:

- `Shalimar API running at http://127.0.0.1:3000`

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

If the API is unavailable, Inventory falls back to local JSON data so the page still works.

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
