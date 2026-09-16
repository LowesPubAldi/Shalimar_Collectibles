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

## Shared Planning Notes

- Keep the history navigable by era, mechanic, and representative card.
- Prefer interactive game-state explanations over encyclopedia-style card lists.
- Present stun and resource denial analytically without framing all interaction as equally healthy or unhealthy.
- Verify release chronology, terminology, rulings, and format claims before implementation.
- Connect cards to the existing local catalog and variant picker where possible.
- Do not begin implementation until V1 is released and V2 scope is approved.
