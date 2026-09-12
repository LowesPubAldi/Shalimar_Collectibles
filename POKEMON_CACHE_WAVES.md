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
- Refresh expansion metadata independently with `npm run pokemon:sync-expansions`.
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

Running cache total through Wave 4: 6,336 cards, about 25.3% of the projected 25,010-card catalog.

## Wave 5: Late Black & White / XY

Completed batch 1 on 2026-09-12: 7 sets/products and 906 cards imported in 14 Scrydex requests.

```text
Plasma Storm
Plasma Freeze
Plasma Blast
XY Black Star Promos
Legendary Treasures
Kalos Starter Set
XY
```

Completed batch 2 on 2026-09-12: 7 sets/products and 356 cards imported in 9 Scrydex requests.

```text
XY Trainer Kit Sylveon
XY Trainer Kit Noivern
Flashfire
McDonald's Collection 2014
Furious Fists
XY Trainer Kit Wigglytuff
XY Trainer Kit Bisharp
```

Completed batch 3 on 2026-09-12: 7 sets/products and 726 cards imported in 12 Scrydex requests.

```text
Phantom Forces
Primal Clash
XY Trainer Kit Latios
XY Trainer Kit Latias
Roaring Skies
Ancient Origins
BREAKthrough
```

Completed batch 4 on 2026-09-12: the final 8 sets/products and 594 cards imported in 12 Scrydex requests.

```text
Double Crisis
McDonald's Collection 2015
BREAKpoint
Generations
XY Trainer Kit Suicune
XY Trainer Kit Pikachu Libre
Fates Collide
Steam Siege
```

Wave 5 complete: 29 sets/products and 2,582 cards imported.

Running cache total: 8,918 cards, about 35.7% of the projected 25,010-card catalog.

## Wave 6: Late XY / Early Sun & Moon

Completed Wave 6 on 2026-09-12: one batch of 14 sets/products and 1,700 cards imported in 24 Scrydex requests.

```text
McDonald's Collection 2016
Evolutions
Sun & Moon
SM Black Star Promos
SM Trainer Kit Lycanroc
SM Trainer Kit Alolan Raichu
Guardians Rising
Burning Shadows
Shining Legends
Crimson Invasion
McDonald's Collection 2017
Ultra Prism
Forbidden Light
Celestial Storm
```

Running cache total: 10,618 cards, about 42.5% of the projected 25,010-card catalog.

## Wave 7: Late Sun & Moon

Completed batch 1 on 2026-09-12: 6 sets/products and 786 cards imported in 11 Scrydex requests.

```text
Dragon Majesty
McDonald's Collection 2018
Lost Thunder
Team Up
Detective Pikachu
Unbroken Bonds
```

Completed batch 2 on 2026-09-12: 5 sets/products and 708 cards imported in 9 Scrydex requests.

```text
Unified Minds
Hidden Fates
Hidden Fates Shiny Vault
McDonald's Collection 2019
Cosmic Eclipse
```

Completed boundary repair batch 3 on 2026-09-12: SWSH Black Star Promos added 307 cards in 4 Scrydex requests, matching the Inventory date grouping.

Wave 7 complete: 12 sets/products and 1,801 cards imported.

Running cache total: 12,419 cards, about 49.7% of the projected 25,010-card catalog.

## Wave 8: Sword & Shield

Completed batch 1 on 2026-09-12: 7 sets/products and 939 cards imported in 15 Scrydex requests.

```text
Sword & Shield
Rebel Clash
Darkness Ablaze
Pokémon Futsal Collection
Champion's Path
Vivid Voltage
McDonald's Collection 2021
```

Running cache total: 13,358 cards, about 53.4% of the projected 25,010-card catalog.

Completed batch 2 on 2026-09-12: 8 sets/products and 1,348 cards imported in 17 Scrydex requests.

```text
Shining Fates
Shining Fates Shiny Vault
Battle Styles
Chilling Reign
Evolving Skies
Fusion Strike
Brilliant Stars
Brilliant Stars Trainer Gallery
```

Running cache total: 14,706 cards, about 58.8% of the projected 25,010-card catalog.

Completed batch 3 on 2026-09-12: 8 sets/products and 646 cards imported in 12 Scrydex requests.

```text
Celebrations
Celebrations: Classic Collection
Astral Radiance
Astral Radiance Trainer Gallery
Pokémon GO
McDonald's Collection 2022
Lost Origin
Lost Origin Trainer Gallery
```

Completed batch 4 on 2026-09-12: 5 sets/products and 700 cards imported in 10 Scrydex requests.

```text
Silver Tempest
Silver Tempest Trainer Gallery
Scarlet & Violet Black Star Promos
Crown Zenith
Crown Zenith Galarian Gallery
```

Wave 8 complete: all 28 Inventory sets/products and 3,633 cards are locally cached.

Running cache total: 16,052 cards, about 64.2% of the projected 25,010-card catalog.

## Wave 9: Scarlet & Violet and Later

Completed batch 1 on 2026-09-12: 7 sets/products and 1,279 cards imported in 17 Scrydex requests.

```text
Scarlet & Violet
Scarlet & Violet Energies
Paldea Evolved
Obsidian Flames
McDonald's Collection 2023
151
Paradox Rift
```

Running cache total: 17,331 cards, about 69.3% of the projected 25,010-card catalog.

Completed batch 2 on 2026-09-12: 8 sets/products and 1,065 cards imported in 15 Scrydex requests.

```text
Pokémon TCG Classic - Blastoise
Pokémon TCG Classic - Charizard
Pokémon TCG Classic - Venusaur
Paldean Fates
Temporal Forces
Twilight Masquerade
Shrouded Fable
Stellar Crown
```

Running cache total: 18,396 cards, about 73.6% of the projected 25,010-card catalog.

Completed batch 3 on 2026-09-12: 9 sets/products and 1,349 cards imported in 18 Scrydex requests.

```text
Genetic Apex
Promo-A
Surging Sparks
Mythical Island
Prismatic Evolutions
McDonald's Collection 2024
Space-Time Smackdown
Triumphant Light
Shining Revelry
```

Running cache total: 19,745 cards, about 79.0% of the projected 25,010-card catalog.

Completed batch 4 on 2026-09-12: 7 sets/products and 1,228 cards imported in 16 Scrydex requests.

```text
Journey Together
Celestial Guardians
Extradimensional Crisis
Destined Rivals
Eevee Grove
Black Bolt
White Flare
```

Running cache total: 20,973 cards, about 83.9% of the projected 25,010-card catalog.

Completed batch 5 on 2026-09-12: 6 sets/products and 1,033 cards imported in 14 Scrydex requests.

```text
Wisdom of Sea and Sky
Secluded Springs
Mega Evolution
Mega Evolution Black Star Promos
Mega Evolution Energies
Deluxe Pack ex
```

Running cache total: 22,006 cards, about 88.0% of the projected 25,010-card catalog.

Completed batch 6 on 2026-09-12: 8 sets/products and 1,352 cards imported in 19 Scrydex requests.

```text
Mega Rising
Promo-B
Phantasmal Flames
Crimson Blaze
Fantastical Parade
Ascended Heroes
Paldean Wonders
Mega Shine
```

Running cache total: 23,358 cards, about 93.4% of the projected 25,010-card catalog.

Completed batch 7 on 2026-09-12: 8 sets/products and 1,157 cards imported in 18 Scrydex requests. Ruler of the Skies returned 232 cards despite its cached expansion metadata listing 233.

```text
Perfect Order
Pulsing Aura
Chaos Rising
Paradox Drive
Everyday Wonders
Pitch Black
Ruler of the Skies
Team Rocket's Ambition
```

Wave 9 complete: all 53 Inventory sets/products and 8,463 cards are locally cached.

Running cache total: 24,515 cards, about 98.0% of the projected 25,010-card catalog.

## Wave 10: Supplemental Products

Completed batch 1 on 2026-09-12: 8 products and 223 cards imported in 9 Scrydex requests.

```text
Miscellaneous
Base Set 2
Southern Islands
Best of Game
Nintendo Black Star Promos
EX Trainer Kit Latias
EX Trainer Kit Latios
Poké Card Creator Pack
```

Completed batch 2 on 2026-09-12: 8 products and 165 cards imported in 8 Scrydex requests.

```text
POP Series 1
POP Series 2
EX Trainer Kit 2 Minun
EX Trainer Kit 2 Plusle
POP Series 3
POP Series 4
POP Series 5
DP Black Star Promos
```

Completed batch 3 on 2026-09-12: 7 products and 107 cards imported in 7 Scrydex requests.

```text
DP Trainer Kit Lucario
DP Trainer Kit Manaphy
POP Series 6
POP Series 7
POP Series 8
POP Series 9
Pokémon Rumble
```

Wave 10 complete: all 23 supplemental Inventory products and 495 cards are locally cached.

Pokemon Inventory cache complete: all 222 products and 25,010 unique cards are locally cached.

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