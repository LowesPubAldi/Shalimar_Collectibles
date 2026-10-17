# Pokémon V2 — Master Outline

## Purpose

V2 expands the Pokémon side of Shalimar Collectibles beyond card/set browsing into interactive experiences, Pokémon history, creator showcases, mini-games, and deeper mechanical storytelling.

This document is the master outline for V2.

Large features should be broken into their own planning documents before implementation. The goal is to keep each build manageable rather than treating V2 as one massive project.

---

# 1. Game Boy Legends: Lost Cards, Modern Echoes

## Status
Planning document already created.

## Reference
See the existing Game Boy Legends README.

## Concept
Explore the four special Pokémon TCG cards originally created for the Pokémon Trading Card Game on Game Boy:

- Articuno
- Moltres
- Zapdos
- Dragonite

Compare their digital-only or promotional mechanics with modern Pokémon TCG cards that revisit similar design ideas.

## Core Interaction

- English Game Boy card shown by default.
- Japanese card/promotional version revealed on hover or tap where available.
- Modern comparison card displayed beneath.
- Explain how the original mechanic evolved.

## Core Theme

Game Boy-era mechanics often used randomness or one-time effects that were convenient for a digital game.

Modern Pokémon TCG design frequently transforms those ideas into:

- Player choice
- Repeatable systems
- More deliberate strategic decisions

---

# 2. PokeTuber Picks With Upgrades

## Status
Large planning document already created.

## Reference
See `POKEMON_CREATOR_FAVORITES.md`.

## Concept

A fan-curated showcase featuring Pokémon associated with Pokémon YouTube creators.

Target approximately 5% of the Pokédex, roughly 50–55 Pokémon.

Normally feature two meaningful Pokémon per creator, with exceptions when one Pokémon supports enough interaction depth to carry the showcase.

## Structure

### Creator Picks — Generations 1–5

Creator-associated Pokémon whose species debuted during Generations 1–5.

### Creator Picks — Generations 6–9

Creator-associated Pokémon whose species debuted during Generations 6–9.

### Curator Picks

Josh's personal selections appear after the creator showcases.

Current personal selections include:

- Lucario
- Tyranitar
- Reuniclus
- Frosmoth

Additional curator selections can be finalized during V2 development.

## Design Rule

Each Pokémon receives a bespoke interaction based on something meaningful about:

- Evolution
- Ability
- Form
- Habitat
- Shiny form
- Battle mechanic
- Creator connection
- Pokémon history

Avoid turning the showcase into a collection of identical shiny toggles.

---

# 3. Pokémon Mini-Games & Interactive Experiences

## Purpose

Build smaller interactive experiences that demonstrate Pokémon mechanics, personality, evolution, ecology, or humor.

These should be developed individually rather than all at once.

---

## Feebas → Milotic

### Concept

Build an evolution-focused mini-game around Feebas becoming Milotic.

### Ideas to Explore

- Original Beauty-based evolution.
- Pokéblock/Contest-era presentation.
- Later Prism Scale + trade evolution method.
- Contrast the awkward original evolution requirement with the simplified modern method.
- Milotic reveal serves as the visual payoff.

### Possible Expansion

Connect Milotic to a Contest-style interaction rather than presenting evolution as a static diagram.

---

## Castform Weather Game

### Concept

Turn Castform's weather forms into a quick reaction/matching game.

### Interaction

Weather conditions change while the player attempts to select the correct Castform form before the forecast changes.

Possible states:

- Normal
- Sunny
- Rainy
- Snowy

The environment changes alongside Castform.

Successful completion can unlock a shiny presentation.

### Reference

This concept also appears in the MandJTV portion of `POKEMON_CREATOR_FAVORITES.md`.

---

## Unown Interaction

### Concept

Use the different Unown forms for a letter/word-based mini-game.

### Ideas to Explore

- Spell Pokémon-related words.
- Decode an Unown message.
- Find specific letters among a group.
- Build a phrase from individual Unown forms.

### Status

Needs additional design before implementation.

---

## Haunted House Interactive Comic

### Pokémon

Core group:

- Chandelure
- Gastly
- Haunter
- Gengar
- Cinccino

Possible sixth Pokémon:

- Mimikyu

### Concept

A short interactive haunted-house comic where the player influences how the scene ends.

### Interaction Ideas

- Player chooses the ending.
- Pokémon can be switched between regular and shiny appearances.
- Individual Pokémon can potentially be swapped depending on the scene.
- Ghost Pokémon create the apparent haunting.
- Cinccino provides a contrasting personality within the ghost-heavy cast.

### Design Question

Determine whether six Pokémon makes the scene too visually busy or whether Mimikyu adds enough personality to justify the additional character.

---

## Pokémon Daycare Chaos

### Concept

A comedy-focused interactive scene built around baby Pokémon causing progressively greater chaos inside a Pokémon Daycare.

### Daycare Provider

Kangaskhan.

Kangaskhan initially sleeps or calmly supervises the daycare.

If the chaos reaches a high enough level, Kangaskhan Mega Evolves and Parental Bond becomes the comedic final warning:

**SHUT IT!!!!!!**

### Ditto

Use a smaller Ditto in the daycare.

Ditto attempts to interact with the baby Pokémon despite the baby Pokémon group being unable to breed.

This becomes the setup for escalating chaos rather than a breeding mechanic.

### Baby Pokémon Beats

#### Cleffa
Uses Metronome and accidentally produces Double Slap against Ditto.

#### Pichu
Gets startled and shocks itself.

#### Magby
Reaction should communicate that it wants absolutely nothing to do with the situation.

#### Smoochum
Attempts to calm everyone down.

#### Mime Jr.
Acts as the clown of the group and adds to the chaos.

#### Riolu
Carries a more serious attitude — essentially warning everyone that trying the same nonsense with it would be a bad idea.

### Goal

The interaction should primarily showcase Pokémon personality and humor rather than function as a traditional win/lose mini-game.

---

## Milcery Lab

### Concept

Interactive experience centered on Milcery and its evolution possibilities.

### Ideas to Explore

- Sweets
- Spin direction
- Spin duration
- Time-of-day requirements
- Alcremie forms
- Visual transformation payoff

### Status

Needs a dedicated design pass before implementation.

Because of the large number of possible Alcremie appearances, scope should be established before asset production begins.

---

## Milotic + Frosmoth Contest Performance

### Concept

A coordinated Pokémon Contest-style performance.

### Sequence

1. Milotic creates a large water display or wave.
2. Frosmoth freezes the water.
3. The frozen structure becomes the centerpiece of the performance.
4. Milotic shatters the ice for the finishing visual.

### Goal

Show Pokémon working together through compatible abilities and visual themes rather than presenting another conventional battle.

### Status

Needs mechanics and presentation research before implementation.

---

# 4. Shared V2 Design Principles

## Interactivity First

Whenever possible, Pokémon mechanics should be demonstrated rather than explained only through text.

## Canon Before Spectacle

Interactions can be exaggerated for presentation and humor, but the underlying Pokémon mechanic, form, evolution, or ability should remain recognizable.

## Mobile Matters

Hover cannot be required for essential information.

Desktop interactions must have tap/click equivalents for tablet and mobile.

## Reduced Motion

Motion-heavy showcases should provide reduced-motion alternatives.

## Keep Features Manageable

Before implementing a large feature:

1. Pull that feature out of this master outline.
2. Create a focused planning document if necessary.
3. Define the interaction states.
4. Identify required assets.
5. Build and test the feature independently.
6. Integrate it into Pokémon V2.

---

# 5. V2 Planning Documents

## Existing

- Game Boy Legends: Lost Cards, Modern Echoes
- `POKEMON_CREATOR_FAVORITES.md`

## Create As Needed

- Mini-game specifications
- Interactive comic specification
- Daycare Chaos specification
- Milcery Lab specification
- Contest/performance specification
- Other large Pokémon V2 features discovered during review

---

# 6. Pre-Build Review

Before beginning the full V2 implementation:

- Review this outline for missing concepts.
- Review existing creator selections.
- Finalize remaining curator picks.
- Identify duplicate Pokémon between features.
- Decide which mini-games deserve full standalone sections.
- Confirm which ideas can reuse existing V1 components/assets.
- Break V2 into small implementation milestones.
- Prioritize features by impact versus development time.

V2 does not need to be built in document order.

The master outline exists so individual pieces can be selected, scoped, completed, and checked off without losing the larger vision.