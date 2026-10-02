# Yu-Gi-Oh V2 Planning Log

Planning only. These concepts are not part of the V1 release scope.

## History Of Interaction And Control

### Concept

Build an interactive history of Yu-Gi-Oh gameplay that begins with Kuriboh as an early hand-activated defensive monster and ends with modern hand traps. The feature should explain how interaction evolved from protecting the player during battle into disrupting summons, effects, resources, and entire game states during either player's turn.

Kuriboh provides the opening thematic bookend. The final section returns to hand traps and culminates with Nibiru, the Primal Being as a punishment for overextension.

### User Value

- Explains how Yu-Gi-Oh interaction changed over the game's history.
- Gives historical context to cards that newer players may know only as staples.
- Shows why modern decks must account for disruption before establishing a board.
- Connects individual cards to larger shifts in game design and competitive play.

### Historical Structure

1. **Kuriboh and early hand interaction**
   - Introduce Kuriboh as an early monster effect activated from the hand.
   - Explain its defensive role and why it resembles, but does not fully match, the modern competitive meaning of "hand trap."
2. **Reactive disruption develops**
   - Track cards that interrupt effects, attacks, summons, searches, graveyard use, or resource generation from hidden information zones.
3. **Anti-meta and stun become established strategies**
   - Show cards and decks designed to deny dominant mechanics rather than race them directly.
4. **Game-state and resource denial**
   - Explain effects that shut off actions, constrain resources, or prevent an opponent from developing a normal turn.
5. **Modern hand traps**
   - Present commonly recognized hand traps by the action or resource they contest.
6. **Nibiru and overextension**
   - End with an interactive scenario in which Nibiru becomes usable after five or more summons in a turn.

### Historical Accuracy Policy

- Describe Kuriboh as an early hand-activated defensive effect and a thematic precursor to modern hand traps.
- Verify any claim that labels a card the definitive "first hand trap" against contemporary terminology and reliable historical sources.
- Separate original release history from later competitive significance and reprints.
- Avoid implying that every effect activated from the hand belongs to the modern hand-trap category.

## Anti-Meta, Stun, And Resource Denial

### Concept

Create a systems-focused section explaining how anti-meta and stun strategies interfere with the opponent's ability to play. Focus on what each card shuts off and how combinations alter the available game state.

### Mechanic Categories

- Special Summon prevention or limits.
- Monster-effect negation.
- Spell and Trap restriction.
- Graveyard shutdown.
- Banishing and replacement effects.
- Search and draw restriction.
- Tribute, Extra Deck, or material restrictions.
- Resource taxation and forced costs.
- Board-space or zone restrictions.
- Turn-structure and action locks.

### Presentation Direction

Use a game-state panel rather than a simple card gallery. Each selected card should visibly disable or constrain the actions it affects. Combined cards should show overlapping restrictions and identify whether the resulting state is a soft constraint, hard lock, or fragile interaction.

### Important Distinctions

- **Anti-meta:** selected to attack prevalent strategies or formats.
- **Stun:** proactively limits broad categories of actions.
- **Floodgate:** continuously restricts one or more game mechanics.
- **Resource denial:** removes, taxes, or prevents access to cards and actions.
- **Lock:** a combination or state that prevents meaningful progression until disrupted.

These labels can overlap, but the feature should explain why rather than treating them as synonyms.

### Data And Assets

- Card release dates and original set information.
- Current and historical card text where wording changed.
- Forbidden and Limited List history when relevant.
- Representative decks and formats.
- Card scans and rulings references.
- Gameplay-state diagrams for affected actions and zones.

### Open Questions

- Which formats or eras should anchor each mechanic?
- How much ban-list history belongs in V2?
- Should notorious lock combinations be demonstrated fully or summarized to avoid overwhelming the timeline?
- Which cards best represent fair disruption versus non-interactive game states?

## Nibiru Overextension Mini-Game

### Concept

Build a turn-sequencing mini-game where the player develops a board while tracking summon count and hidden interaction. Nibiru becomes legally activatable once the fifth summon has occurred during the turn, subject to the actual card text and game state.

### Core Loop

- Present a hand and a simplified combo route.
- Increment a visible summon counter as the player makes choices.
- Signal that Nibiru is live at five or more summons without revealing whether the opponent holds it in every scenario.
- Let the player choose whether to stop, establish protection, bait interaction, or continue extending.
- Resolve Nibiru only when its activation conditions and the current board permit it.
- Explain the consequence and offer a safer alternative line after resolution.

### Learning Goals

- Understand why the fifth summon changes decision-making.
- Distinguish legal activation timing from automatic resolution.
- Learn to establish a negate, alter sequencing, recover after resolution, or stop on an acceptable board.
- Show that overextension is contextual rather than simply "summoning five times is wrong."

### Rules Accuracy Requirements

- Count Normal, Flip, and Special Summons according to Nibiru's current card text.
- Model activation timing, tributing face-up monsters, the summoned Nibiru, and the Primal Being Token accurately.
- Account for effects that prevent activation, prevent tributing, make monsters unaffected, or otherwise change resolution.
- Keep the first version focused on a curated scenario rather than attempting a complete duel simulator.

### Data And Assets

- Nibiru card data and rulings.
- Curated combo hands and board states.
- Summon sequence annotations.
- Token statistics generated from tributed monsters.
- Relevant protection, bait, recovery, and alternative-line cards.

### Open Questions

- Which archetype provides the clearest introductory combo route?
- Should difficulty levels introduce negates, locks, and alternate interaction gradually?
- Should the opponent's Nibiru be known, probabilistic, or hidden until activation?
- How should mobile users inspect the summon history without cluttering the board?

## Cards Outlive Their Decks

### Concept

Create an interactive historical feature showing how individual Yu-Gi-Oh cards can remain relevant long after the deck, archetype, format, or original strategy associated with them has disappeared.

The feature should follow selected cards through multiple stages of their competitive or casual life rather than treating their original release as the end of their story.

A card may begin with one intended or common purpose, lose relevance as the game changes, and later gain an entirely different role because of new archetypes, mechanics, card types, attributes, Levels, interactions, or support.

The central question is:

**What happens when the game around a card changes, but the card itself does not?**

### Experience Structure

Each featured card receives a historical progression.

Suggested structure:

1. **Original Release**
   - When and where the card first appeared.
   - What strategies or decks originally used it.
   - What the surrounding game looked like at the time.

2. **Original Role**
   - Explain what problem the card solved.
   - Identify the mechanics, attributes, Types, Levels, or effects that originally made it useful.

3. **Decline**
   - Show why the original strategy became less relevant.
   - Identify power creep, rule changes, new mechanics, stronger alternatives, Forbidden/Limited List changes, or disappearing archetypes where applicable.

4. **Dormancy**
   - Represent periods where the card existed in the card pool but had little reason to see significant play.

5. **Rediscovery**
   - Introduce the new card, archetype, mechanic, or strategy that gave the older card another purpose.

6. **New Role**
   - Compare the card's new function with its original use.

7. **Current Context**
   - Explain whether the card remains useful, niche, obsolete, restricted, or dependent on a particular format.

The progression should not imply that every selected card follows every stage. Some cards remain consistently useful, while others disappear and later return.

### Interactive Direction

Present the selected card in the center of a timeline.

As the user moves through eras, surrounding cards, decks, mechanics, and labels change while the featured card remains visually anchored.

Example:

**CARD RELEASED**

↓

**ORIGINAL STRATEGY**

↓

**FORMAT CHANGES**

↓

**ORIGINAL DECK DISAPPEARS**

↓

**CARD MOSTLY DISAPPEARS**

↓

**NEW SUPPORT / MECHANIC APPEARS**

↓

**OLD CARD — NEW JOB**

The user should be able to compare the card's original role directly with its later role.

### Card Selection Categories

Do not choose cards simply because they are old.

Candidate cards should demonstrate at least one meaningful historical transition.

Useful categories include:

- Old cards revived by later archetypes.
- Cards rediscovered because their Type became valuable.
- Cards rediscovered because their Attribute became valuable.
- Cards rediscovered because their Level or Rank became useful.
- Cards whose effects aged unusually well.
- Cards whose costs became easier to exploit over time.
- Cards whose original weaknesses were reduced by later support.
- Cards that moved from generic staple to niche tech.
- Cards that moved from niche tech to major competitive relevance.
- Cards that remained useful while the decks around them disappeared.
- Cards that eventually became obsolete despite once being important.

### Thunder King Rai-Oh Case Study Candidate

Thunder King Rai-Oh is a strong candidate for inclusion because it represents a standalone disruptive monster whose usefulness depends heavily on the surrounding game state and format.

The feature should not present Rai-Oh as universally strong across every era.

Instead, examine:

- What its effects restrict.
- What kinds of decks or formats make those restrictions valuable.
- How a standalone disruption monster can be incorporated into strategies that were not designed specifically around it.
- Why a card may remain conceptually useful even when its competitive frequency changes.
- How later card design changes the opportunity cost of Normal Summoning or maintaining a monster like Rai-Oh.

Shalimar Collectibles may also use unconventional or personal deck examples where they provide a useful demonstration, but these should be labeled as deck-building examples rather than historical competitive evidence.

### User Value

- Shows Yu-Gi-Oh history through individual cards instead of only formats and championship decks.
- Demonstrates how new cards can change the value of old cards.
- Encourages users to look differently at cards already in their collections.
- Explains why an old card appearing in a newer strategy is not necessarily random.
- Connects card design, deck building, format history, and collecting.
- Provides a natural reason to explore older prints and variants in the Shalimar Collectibles catalog.

### Data And Assets

#### Historical Research

For every featured card collect:

- Original release date.
- Original set.
- Original card text.
- Current card text.
- Errata where applicable.
- Original strategies or documented uses.
- Later strategies or archetypes that reused the card.
- Relevant tournament or deck evidence when making competitive claims.
- Rule changes affecting the card.
- Forbidden/Limited List history where relevant.
- Reprint history.
- Relevant rulings.
- Major mechanics introduced between the card's original and later uses.

#### Stage 1 — Research Assets

Begin with approximately five candidate cards.

For each candidate obtain:

- 1 original printing image.
- 1 modern or later printing if available.
- Original set information.
- Current card database entry.
- 1 representative original deck or strategy reference.
- 1 representative later interaction or strategy reference.
- Forbidden/Limited history if applicable.
- Notes explaining why the card qualifies for the feature.

Do not collect every printing during this stage.

#### Stage 2 — Prototype Assets

For each card selected for the first prototype:

- High-quality card image.
- Original-era supporting cards.
- Later-era supporting cards.
- Archetype or deck identifiers.
- Timeline dates.
- Mechanic icons.
- Original Role and New Role comparison data.
- Links into the existing Shalimar card and variant system.

Prototype with a small number of thoroughly researched cards before expanding the dataset.

#### Stage 3 — Production Assets

After the timeline interaction is proven:

- Additional card printings.
- Variant artwork.
- Set symbols.
- Era-specific visual treatments.
- Deck-list examples.
- Format references.
- Tournament references where appropriate.
- Animation for cards entering and leaving relevance.
- Additional timeline milestones.
- Mobile-specific condensed timeline graphics.

### Open Questions

- Which five cards provide the strongest first prototype?
- How much tournament evidence should be required before describing a card as competitively relevant?
- Should casual and rogue rediscoveries receive their own category?
- Should users be able to browse by Type, Attribute, mechanic, or era?
- Should a card's Forbidden/Limited history appear directly inside this feature or link to the dedicated history feature?
- Should Shalimar eventually identify cards that appear to have potential future utility because of unusual characteristics?

### Historical Accuracy Policy

Do not claim that a card was historically important solely because a modern interaction can be constructed with it.

Separate:

- **Documented historical use**
- **Documented later reuse**
- **Casual or rogue use**
- **Shalimar deck-building example**
- **Theoretical interaction**

Do not describe a deck or archetype as the reason a card returned to relevance without supporting evidence.

Where competitive significance is disputed or difficult to establish, describe the interaction rather than assigning historical importance.


## Forbidden And Limited History

### Concept

Create an interactive history showing how individual cards moved through Yu-Gi-Oh's Forbidden and Limited Lists and what was happening in the game when those changes occurred.

The feature should answer two different questions:

**What happened to this card?**

and:

**What was happening around this card when its status changed?**

A list change should therefore be presented as a historical event rather than simply a date and status label.

### Core Interaction

Allow the user to select a card and move through its list history.

Example:

**UNLIMITED**

↓

**SEMI-LIMITED**

↓

**LIMITED**

↓

**FORBIDDEN**

↓

**LIMITED**

↓

**UNLIMITED**

Only display stages that actually occurred for the selected card.

Each status change should include:

- Effective date.
- Previous status.
- New status.
- Relevant format.
- Relevant decks or interactions.
- Important card-pool changes.
- Rule or mechanic changes where applicable.
- A sourced explanation of the surrounding competitive context.

Do not automatically claim that one deck, combo, or event caused a list change unless reliable evidence supports that conclusion.

### Timeline Mode

Provide a horizontal or vertical historical timeline.

Example:

**2004 ───── 2008 ───── 2012 ───── 2016 ───── 2020 ───── 2026**

Moving through the timeline updates the selected card's legal status.

The interface should make status immediately recognizable:

- Unlimited.
- Semi-Limited.
- Limited.
- Forbidden.

The feature should also account for historical list structures or terminology where the official format differed.

### Historical Format Mode

A later expansion may allow the user to choose a historical date or format and see the legality of cards during that period.

Example:

**Card: Example Card**

**Current Status:** Forbidden

**September 2011:** Limited

**March 2008:** Unlimited

This creates a foundation for historical deck exploration without requiring Shalimar Collectibles to become a complete duel simulator.

### Change Explorer

Allow users to browse list updates themselves.

Example:

**September 20XX List**

**Newly Forbidden**
- Card A
- Card B

**Newly Limited**
- Card C

**Newly Semi-Limited**
- Card D

**Returned / Unlimited**
- Card E

Selecting a card opens its complete history.

### Context Panel

Every major change can include a contextual panel.

Suggested structure:

**WHAT CHANGED**

The card moved from Limited to Forbidden.

**WHAT THE CARD DOES**

Brief explanation of the relevant effect or interaction.

**WHAT WAS HAPPENING**

Describe the format, decks, combos, or card pool surrounding the change.

**WHY IT MATTERED**

Explain what changed for deck construction or gameplay after the restriction.

**WHAT HAPPENED NEXT**

Track whether the card remained restricted, returned later, received an erratum, became less dangerous as the game changed, or found another role.

### Exceptional List Events

Not every important Forbidden/Limited List event follows the normal pattern of a card being released, seeing play for an extended period, and then changing status on the next scheduled list.

Include a small collection of exceptional cases that demonstrate unusual list history.

#### Emergency Restrictions

Highlight cards whose legality changed outside the normal expected list cycle.

A primary historical case study should be:

**Cyber-Stein — Emergency Forbidden List Change**

Use the case to explain:

- what Cyber-Stein enabled at the time,
- the competitive environment surrounding the card,
- why the restriction was unusual,
- the timing of the emergency change,
- and how uncommon emergency list intervention has been in Yu-Gi-Oh history.

The presentation should distinguish an actual emergency or out-of-cycle restriction from an ordinary scheduled Forbidden/Limited List update.

#### Restricted At Introduction

Use Gorz the Emissary of Darkness as a separate historical case study.

Rather than presenting Gorz as an emergency ban, explain the unusual circumstances surrounding its TCG introduction and early Limited status.

Possible presentation:

**GORZ THE EMISSARY OF DARKNESS**

**TCG ARRIVAL**

↓

**IMMEDIATE RESTRICTION**

↓

**LIMITED ERA**

↓

**RESTRICTIONS LOOSEN**

↓

**UNLIMITED**

The interaction should explain why Gorz changed player behavior even when it was not visible on the field.

Its existence created a strategic question whenever an opponent controlled no cards:

**Do you attack directly with your strongest monster first?**

A player attacking carelessly could allow Gorz to appear and generate an Emissary of Darkness Token based on the battle damage taken.

This makes Gorz useful as both a Forbidden/Limited history example and an example of how a single card can alter player behavior without ever being revealed.

### Exceptional History Assets

#### Stage 1

Collect:

- Cyber-Stein original-era card image.
- Official list documentation surrounding its emergency restriction.
- Representative cards involved in the strategies that made Cyber-Stein dangerous.
- Gorz original TCG printing.
- Historical list documentation showing Gorz's early Limited status.
- Gorz Token reference.
- Representative late-2000s board states illustrating the threat of attacking an empty field.

#### Stage 2

Create:

- Emergency-ban timeline treatment.
- Normal scheduled-list timeline treatment for comparison.
- "Restricted At Introduction" timeline state.
- Gorz empty-field attack demonstration.
- Battle-damage calculator for the resulting Token.
- Historical-context cards for both examples.

### Historical Accuracy Policy

Do not use "emergency ban" as a general term for any rapid or unusual restriction.

Reserve the label for documented out-of-cycle or emergency list actions.

Cards that entered a format already restricted, were restricted shortly after release, or appeared on an unusual regional list should be categorized separately.

### Reprints, Availability, And Market History

Connect Forbidden/Limited history to the physical history of the card.

A card's competitive status is only one factor affecting its collector and player-market behavior. Reprints, rarity, new support, format changes, nostalgia, and changes in competitive demand may all affect availability and price.

Where sufficient historical data exists, display three synchronized timelines:

1. **Gameplay Status**
   - Unlimited.
   - Semi-Limited.
   - Limited.
   - Forbidden.

2. **Print History**
   - Original release.
   - Major reprints.
   - New rarities.
   - Structure Deck or promotional availability.
   - Significant accessibility changes.

3. **Market History**
   - Historical price observations.
   - Major increases or decreases.
   - Differences between original/high-rarity printings and inexpensive playable reprints.
   - Available market-volume or listing information where reliable data exists.

### Interactive Comparison

Allow the user to select an event on the timeline and inspect what changed around it.

Example:

**CARD BECOMES LIMITED**

↓

Competitive availability decreases.

↓

**MAJOR REPRINT**

↓

Playable copies become more accessible.

↓

**CARD RETURNS TO UNLIMITED**

↓

Competitive demand may change again.

The interface should not automatically claim that one event caused a price movement.

Instead, show overlapping events and allow the historical context to explain plausible relationships.

### Original Printing Versus Playable Copy

Where appropriate, separate:

**Collector Value**

from:

**Cost To Play**

A major reprint may reduce the cost of obtaining a legal playable copy while an original, first-edition, or high-rarity printing retains or increases collector value.

This distinction is particularly important when explaining why a reprint did not necessarily make every version of a card cheaper.

### Market Event Labels

Potential timeline labels include:

- **Released**
- **Reprinted**
- **New Rarity**
- **Limited**
- **Forbidden**
- **Returned**
- **New Support Released**
- **Competitive Resurgence**
- **Price Movement**
- **Collector Demand**

Labels describing competitive or collector behavior must be supported by appropriate evidence.

### Data Requirements

For supported cards collect:

- Original release date and set.
- Reprint dates and sets.
- Printing rarity.
- Edition where relevant.
- Forbidden/Limited history.
- Historical pricing observations where reliable.
- Current pricing.
- Relevant deck or format context.
- New support releases associated with renewed use.
- Tournament evidence where competitive resurgence is claimed.

### Market Accuracy Policy

Treat price history as observational data rather than proof of causation.

Do not state:

**"The ban caused the price to fall."**

unless sufficient evidence supports that conclusion.

Prefer:

**"The card's market price declined during the period following its restriction."**

Then show other relevant events, including reprints and format changes.

Where historical pricing is incomplete, label the gap rather than estimating missing values.

Never treat the price of one printing as representative of every version of the card.

### Connection To Cards Outlive Their Decks

The two historical features should share data where practical but answer different questions.

**Cards Outlive Their Decks**

asks:

**How did this card's role change?**

**Forbidden And Limited History**

asks:

**How did official tournament legality change?**

A card appearing in both features should link between them rather than duplicate the entire explanation.

Example:

**Explore this card's competitive role →**

**View complete Forbidden/Limited history →**

### User Value

- Makes Forbidden/Limited List history understandable without requiring users to search dozens of archived lists.
- Shows younger or newer players how a card's legality changed over time.
- Gives historical context to cards currently known primarily for being Forbidden or Limited.
- Demonstrates how changing card pools can alter the danger or usefulness of older effects.
- Connects Shalimar's Gameplay Status system to historical data.
- Creates a foundation for future historical-format exploration.

### Data And Assets

#### Official List Data

For each supported historical list collect:

- Effective date.
- Format/region.
- Card name.
- Previous status.
- New status.
- Official status category.
- Source reference.

Do not assume that TCG and OCG histories are interchangeable.

The first implementation should focus on one clearly identified rules environment, such as the TCG, before attempting cross-region comparison.

#### Context Research

For major card changes collect:

- Relevant deck usage.
- Major interactions.
- Format context.
- Tournament evidence where appropriate.
- Contemporary rulings.
- Errata.
- Rule changes.
- Newly released support or mechanics.
- Reliable contemporary commentary where needed.

Separate documented facts from retrospective interpretation.

#### Stage 1 — Research Assets

Choose approximately five cards with interesting and well-documented list histories.

For each card collect:

- Card image.
- Complete known status timeline.
- Official list dates.
- Original release information.
- Important errata if applicable.
- 2-5 surrounding cards needed to explain major interactions.
- Notes describing the historical context.

Also collect several official archived Forbidden/Limited Lists to validate the data model.

#### Stage 2 — Prototype Assets

Build the first timeline with:

- 3-5 cards.
- Status icons.
- Timeline markers.
- Date selector.
- Card image.
- Context panel.
- Source/reference field.
- Links to existing Shalimar card pages.

Do not attempt to import the entire history of the game before the interaction is proven.

#### Stage 3 — Production Assets

After the timeline works:

- Additional cards.
- Additional historical lists.
- Historical deck references.
- Format labels.
- Era graphics.
- Set information.
- Related cards.
- Search and filtering.
- Mobile timeline treatment.
- Tablet timeline treatment.
- Integration with Cards Outlive Their Decks.
- Integration with current Gameplay Status.

### Future Catalog Integration

The long-term version may allow Shalimar's existing card catalog to answer:

**What was legal on this date?**

A historical date selector could temporarily replace current Gameplay Status with the selected period's status.

Example:

**Viewing Format: September 2011**

Card results could then display legality for that historical list rather than today's list.

This should be treated as a later expansion after the underlying historical dataset has been validated.

### Open Questions

- Which five cards should launch the first prototype?
- How far back should the initial historical dataset go?
- Should V2 support only TCG history initially?
- Should Traditional Format be displayed or excluded from the first implementation?
- How should dates with regional differences be represented?
- Should historical deck lists eventually be reconstructed using the selected date's legality?
- Should users be able to compare two Forbidden/Limited Lists directly?
- How much explanation belongs to Shalimar versus linked primary sources?
- Should cards with errata show both legality history and text history on the same timeline?

### Historical Accuracy Policy

Forbidden/Limited status is objective historical data and should be sourced from official lists whenever available.

The explanation for **why** a card moved is a separate claim and may require additional evidence.

Do not convert correlation into causation.

Use labels such as:

- **Official List Change**
- **Documented Format Context**
- **Contemporary Explanation**
- **Shalimar Analysis**

Never imply that Konami officially provided a reason for a list change when no such explanation was published.

Keep TCG, OCG, and other regional list histories separate unless the interface is explicitly comparing them.

Record the effective date of each list rather than relying only on announcement dates.

## Shared Planning Notes

- Keep the history navigable by era, mechanic, and representative card.
- Prefer interactive game-state explanations over encyclopedia-style card lists.
- Present stun and resource denial analytically without framing all interaction as equally healthy or unhealthy.
- Verify release chronology, terminology, rulings, and format claims before implementation.
- Connect cards to the existing local catalog and variant picker where possible.
- Do not begin implementation until V1 is released and V2 scope is approved.
