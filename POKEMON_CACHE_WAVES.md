# Pokemon Cache Waves

This document tracks the planned Scrydex cache waves for Pokemon Inventory.

The goal is to use Scrydex deliberately, cache useful metadata locally, and make normal Inventory browsing read from our backend/local JSON instead of spending Scrydex credits on every set change.

## Sync Contract

Every cache wave script run should do these four things:

1. Fetch
2. Filter English-only
3. Normalize/cache
4. Log what was imported

The working Scrydex scope is English Pokemon data:

```text
https://api.scrydex.com/pokemon/v1/en
```

Scrydex caps card and expansion list requests at 100 records per page. Complete sets are collected by paging until all records for that set are imported.

## Cache Shape

Planned files:

```text
data/pokemon-sets-scrydex.json
data/pokemon-cards-scrydex-wave-1.json
data/pokemon-cache-import-log.json
```

Later waves can either become separate files or be merged into a single indexed Pokemon cache once the import process is stable.

## Wave Script Behavior

The first script should be something like:

```text
scripts/tools/sync_scrydex_pokemon_wave.js --wave 1
```

Expected behavior:

- Load `SCRYDEX_API_KEY` and `SCRYDEX_TEAM_ID` from `.env.local`.
- Fetch English expansion metadata first.
- Resolve each planned set to a Scrydex expansion id.
- Fetch each set's cards with `pageSize=100` until all pages are complete.
- Filter out anything that is not English as a defensive check.
- Normalize records to the Inventory card shape.
- Write cache JSON atomically when practical.
- Write an import log with timestamps, wave number, set ids, card counts, request counts, and failures.

## Import Log Fields

Each wave log entry should capture:

```json
{
  "wave": 1,
  "label": "Wizards Era",
  "startedAt": "2026-09-11T00:00:00.000Z",
  "finishedAt": "2026-09-11T00:00:00.000Z",
  "status": "success",
  "scrydexRequests": 0,
  "setsRequested": 0,
  "setsImported": 0,
  "cardsImported": 0,
  "sets": [
    {
      "id": "base1",
      "name": "Base",
      "expectedTotal": 102,
      "cardsImported": 102,
      "pagesFetched": 2,
      "status": "success"
    }
  ],
  "errors": []
}
```

## Wave Planning Rules

- Target about 20 sets per wave.
- Keep waves era-based instead of forcing exact set counts.
- Cache cards by Scrydex expansion id, not loose set name, when possible.
- Keep `Base` mapped to Scrydex `base1` so it means original Base Set.
- Default Inventory can continue to show original Base Set while the cache grows.

## Wave 1: Wizards Era

Initial planned wave:

```text
Base
Jungle
Fossil
Team Rocket
Gym Heroes
Gym Challenge
Neo Genesis
Neo Discovery
Neo Revelation
Neo Destiny
Legendary Collection
Expedition Base Set
Aquapolis
Skyridge
Wizards Black Star Promos
```

Known Scrydex ids confirmed so far:

```text
Base   -> base1
Jungle -> base2
Fossil -> base3
```

Known English totals confirmed so far:

```text
Base   -> 102 cards, 2 card pages
Jungle -> 64 cards, 1 card page
Fossil -> expected under 100 cards, verify from expansion metadata during sync
```

## Later Waves

Rough planning direction:

```text
Wave 2: EX era
Wave 3: Diamond & Pearl / Platinum
Wave 4: HeartGold SoulSilver / early Black & White
Wave 5: late Black & White / XY
Wave 6: late XY / early Sun & Moon
Wave 7: late Sun & Moon
Wave 8: Sword & Shield
Wave 9: Scarlet & Violet and remaining special sets
```

Exact wave membership should come from the cached English expansion metadata so set counts, release dates, ids, and estimated request counts are visible before importing cards.

## Backend Goal

Once Wave 1 exists locally, `/api/pokemon/cards` should prefer local cache results for cached sets.

Live Scrydex should become a deliberate fallback or sync-only path, not the default path for casual browsing.