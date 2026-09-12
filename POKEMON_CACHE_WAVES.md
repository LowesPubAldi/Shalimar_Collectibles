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
Base       -> base1
Jungle     -> base2
Fossil     -> base3
Team Rocket -> base5
Gym Heroes  -> gym1
Gym Challenge -> gym2
Neo Genesis   -> neo1
Neo Discovery -> neo2
Neo Revelation -> neo3
Neo Destiny    -> neo4
Legendary Collection -> base6
Expedition Base Set -> ecard1
Aquapolis -> ecard2
Skyridge -> ecard3
Wizards Black Star Promos -> basep
```

Known English totals confirmed so far:

```text
Base        -> 102 cards, 2 card pages
Jungle      -> 64 cards, 1 card page
Fossil      -> 62 cards, 1 card page
Team Rocket -> 83 cards, 1 card page
Gym Heroes  -> 132 cards, 2 card pages
Gym Challenge -> 132 cards, 2 card pages
Neo Genesis   -> 111 cards, 2 card pages
Neo Discovery -> 75 cards, 1 card page
Neo Revelation -> 66 cards, 1 card page
Neo Destiny    -> 113 cards, 2 card pages
Legendary Collection -> 110 cards, 2 card pages
Expedition Base Set -> 165 cards, 2 card pages
Aquapolis -> 182 cards, 2 card pages
Skyridge -> 182 cards, 2 card pages
Wizards Black Star Promos -> 53 cards, 1 card page
```

Completed batch on 2026-09-11:

```text
Fossil + Team Rocket + Gym Heroes
277 cards imported in 7 Scrydex requests

Gym Challenge + Neo Genesis + Neo Discovery + Neo Revelation + Neo Destiny
497 cards imported in 8 Scrydex requests

Legendary Collection + Expedition Base Set + Aquapolis + Skyridge + Wizards Black Star Promos
692 cards imported in 9 Scrydex requests

Base + Jungle production-cache repair
166 cards imported in 3 Scrydex requests
```

Wave 1 complete: 15 sets and 1,632 locally cached cards.

## Wave 2: EX Era

Wave 2 contains 16 main EX sets, split into batches of 6, 5, and 5.

Completed batch 1 on 2026-09-11:

```text
Ruby & Sapphire (ex1) -> 109 cards, 2 requests
Sandstorm (ex2) -> 100 cards, 1 request
Dragon (ex3) -> 100 cards, 1 request
Team Magma vs Team Aqua (ex4) -> 97 cards, 1 request
Hidden Legends (ex5) -> 102 cards, 2 requests
FireRed & LeafGreen (ex6) -> 116 cards, 2 requests

624 cards imported in 9 Scrydex requests
```

Completed batch 2 on 2026-09-11:

```text
Team Rocket Returns (ex7) -> 111 cards, 2 requests
Deoxys (ex8) -> 108 cards, 2 requests
Emerald (ex9) -> 107 cards, 2 requests
Unseen Forces (ex10) -> 145 cards, 2 requests
Delta Species (ex11) -> 114 cards, 2 requests

585 cards imported in 10 Scrydex requests
```

Completed batch 3 on 2026-09-11:

```text
Legend Maker (ex12) -> 93 cards, 1 request
Holon Phantoms (ex13) -> 111 cards, 2 requests
Crystal Guardians (ex14) -> 100 cards, 1 request
Dragon Frontiers (ex15) -> 101 cards, 2 requests
Power Keepers (ex16) -> 108 cards, 2 requests

513 cards imported in 8 Scrydex requests
```

Wave 2 complete: 16 sets and 1,722 cards imported in 27 Scrydex requests.

## Wave 3: Diamond & Pearl / Platinum

Wave 3 contains 11 main sets, split into batches of 6 and 5.

Completed batch 1 on 2026-09-11:

```text
Diamond & Pearl (dp1) -> 130 cards, 2 requests
Mysterious Treasures (dp2) -> 124 cards, 2 requests
Secret Wonders (dp3) -> 132 cards, 2 requests
Great Encounters (dp4) -> 106 cards, 2 requests
Majestic Dawn (dp5) -> 100 cards, 1 request
Legends Awakened (dp6) -> 146 cards, 2 requests

738 cards imported in 11 Scrydex requests
```

Completed batch 2 on 2026-09-11:

```text
Stormfront (dp7) -> 106 cards, 2 requests
Platinum (pl1) -> 133 cards, 2 requests
Rising Rivals (pl2) -> 120 cards, 2 requests
Supreme Victors (pl3) -> 153 cards, 2 requests
Arceus (pl4) -> 111 cards, 2 requests

623 cards imported in 10 Scrydex requests
```

Wave 3 complete: 11 sets and 1,361 cards imported in 21 Scrydex requests.

## Wave 4: HeartGold & SoulSilver / Early Black & White

Wave 4 includes 12 main sets plus 9 promos and side products, split into three batches of 7.

```text
Batch 1: 499 cards imported in 9 Scrydex requests
Batch 2: 492 cards imported in 10 Scrydex requests
Batch 3: 630 cards imported in 12 Scrydex requests
```

Wave 4 complete: 21 sets and 1,621 cards imported in 31 Scrydex requests.

Running cache total: 6,336 cards, about 25.3% of the projected 25,010-card catalog.

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

Once a wave exists locally, `/api/pokemon/cards` should prefer local cache results for cached sets.

Live Scrydex should become a deliberate fallback or sync-only path, not the default path for casual browsing.