# Yu Yu Hakusho V2 Planning Log

Planning only. These concepts are not part of the V1 release scope.

## Season 1 Release Strategy

Yu Yu Hakusho V2 should be developed as a sequential season of interactive experiences rather than as one large simultaneous feature release.

Each experience must complete its own development cycle before implementation begins on the next experience.

### Feature Development Cycle

1. Confirm canon research and required source material.
2. Acquire the minimum assets required for the prototype.
3. Build the desktop experience.
4. Test the complete interaction from beginning to end.
5. Refine visual presentation and animation.
6. Complete tablet-specific QA and responsive adjustments.
7. Complete mobile-specific QA and responsive adjustments.
8. Verify reduced-motion and accessibility behavior where applicable.
9. Test existing Shalimar Collectibles functionality for regressions.
10. Deploy and verify production behavior.
11. Commit the completed experience as a stable milestone.
12. Begin asset acquisition and research for the next experience.

### Season Structure

Experiences should be added progressively to the Yu Yu Hakusho interactive page.

A new experience should not be added simply because its assets are available. The previous experience must first be considered stable across desktop, tablet, and mobile.

The working Season 1 order may change during development based on research, asset availability, technical complexity, and lessons learned from earlier experiences.

### Development Principle

**One experience. Three screen classes. One stable release. Then move forward.**

Do not allow unfinished later experiences to destabilize completed earlier experiences.

Where possible, extract reusable systems only after repeated patterns actually appear. Avoid prematurely building a universal mini-game framework before multiple completed experiences demonstrate what should be shared.

### Season 1 Completion

Season 1 is complete when every selected experience:

- functions correctly from beginning to end,
- works on desktop,
- works on tablet,
- works on mobile,
- preserves clear canon/speculation labeling,
- integrates relevant YYH TCG material where appropriate,
- has passed regression testing against previously released experiences,
- and has been verified in the production deployment.

## Rando Technique Game

### Concept

Create an interactive encounter demonstrating the six or seven named techniques Rando uses against Yusuke and Kuwabara. Explore a small selection of his other claimed 99 stolen techniques when the source material provides enough visual or behavioral evidence, without inventing names for undocumented attacks.

### User Value

- Turns an important early-series fight into an interactive feature.
- Connects anime and manga moments to technique descriptions and relevant cards.
- Gives lesser-known techniques more context than a static character profile.

### Data And Assets

- Canonical list of techniques visibly used against Yusuke and Kuwabara.
- Episode, chapter, and scene references for each technique.
- Technique names, effects, targets, counters, and outcomes.
- Rando, Yusuke, and Kuwabara visual assets.
- Relevant YYH TCG cards and gameplay text where available.

### Open Questions

- Should the experience be a sequential boss fight, technique-identification game, or counter-selection game?
- Which unnamed techniques have enough evidence to demonstrate responsibly?
- Should anime-only and manga-only material be separated?

### Ending Sequence

Preserve the canonical comedic resolution of Rando's shrinking technique.

After Rando attempts to use the shrinking technique against Yusuke, the technique backfires because the target must hear the chant for it to work. Yusuke has unintentionally avoided hearing it because algae entered his ears while he was in the water.

The interaction should initially allow the user to believe that Yusuke has deliberately discovered the counter before revealing the absurd truth.

This ending is valuable because it captures a defining Yu Yu Hakusho trait: a serious supernatural fight can still resolve through character comedy rather than pure power escalation.

### Additional Assets

**Stage 1 — Planning Assets**

- Rando normal appearance.
- Rando transformed/revealed appearance if needed.
- Yusuke during the final fight.
- Kuwabara during the shrinking-technique sequence.
- Rando shrinking-technique reference.
- Yusuke with the algae/ear reveal.
- Genkai reaction/reference.
- Tournament environment.

**Stage 2 — Prototype Assets**

- Rando neutral pose.
- Rando technique pose.
- Miniature Rando state.
- Yusuke combat pose.
- Kuwabara combat/reaction pose.
- Algae visual.
- Technique-effect overlays.
- Tournament background.

**Stage 3 — Polish Assets**

- Additional Rando technique states.
- Character reaction poses.
- Technique animation layers.
- Relevant Rando/Yusuke/Kuwabara cards.
- Optional short audio/visual punchline treatment for the shrinking backfire.

### Canon Policy

Label every technique as named canon, visually demonstrated but unnamed, or interpretation. Do not manufacture names for the remaining techniques.

### Sensui Case Study

Sensui should demonstrate why energy class alone cannot describe combat capability. Track Resshuken mastery, Sacred Energy, tactical adaptability, and the limited canon information about his seven personalities separately.

The working narrative sequence is:

- **Minoru:** the primary identity presented through most of the Chapter Black storyline; calm, persuasive, and strategic. Before Kazuya surfaces, he demonstrates Splinter Resshuken and describes mastering it as necessary because his work did not allow for gentlemanly one-on-one duels. This English-dub wording frames the style as practical preparation for multiple or unfair opponents, not simply formal martial-arts prestige. Verify the episode number and whether the manga expresses the same rationale.
- **Kazuya:** surfaces during the confrontation with Yusuke and uses the arm-mounted gun. The working episode map places Kazuya and the Koenma conversation in the second episode of the roughly two-to-three-episode Yusuke versus Sensui fight.
- **Shinobu:** the original personality revealed in the following fight episode, associated with Sensui's highest level of martial and spiritual power and the first Sacred Energy reveal.

Verify the exact Season 3 episode numbers and corresponding manga chapters before publishing this sequence as definitive.

Only assign traits or actions to personalities that the anime or manga identifies clearly. Treat the remaining personalities as unknown rather than inventing complete profiles. Their collective combat advantage may be discussed as unpredictability and compartmentalization, but this interpretation must remain distinct from confirmed abilities.

## Shared Planning Notes

- Keep all three experiences grounded in story context and the YYH card database.
- Prefer interactive explanation over encyclopedia-style walls of text.
- Research anime and manga differences before finalizing mechanics.
- Treat community review as part of validation for obscure techniques, rankings, and translations.
- Do not begin implementation until V1 is released and V2 scope is approved.## Saint Beasts Interactive Encounter

### Concept

Create a focused Saint Beasts encounter built around one of the remaining villains whose abilities translate naturally into an interactive mechanic.

Genbu and Seiryu should not be prioritized for this feature because other Shalimar experiences already cover or can cover their material. The strongest current candidates are Byakko and Suzaku with Murugu.

### Byakko Option

Build a platform-survival encounter around Byakko's destructive attacks.

The player must recognize an incoming attack, move to a safe position, and adapt as portions of the battlefield become unusable. The environment should become progressively more dangerous rather than simply reducing a health bar.

Kuwabara's Spirit Sword can provide the counter mechanic. Its ability to extend beyond the range of an ordinary sword gives the player a way to attack across dangerous terrain or reach Byakko without requiring the character to stand directly beside him.

Exact technique names, environmental destruction, and encounter order must be verified against the anime and manga before implementation.

### Suzaku And Murugu Option

Create an escalating encounter centered on Suzaku's multiplication ability, lightning attacks, and Murugu's role as a scout and source of interference.

The interaction can begin with one Suzaku and progressively increase the number of identical opponents until the player must identify the actual threat while simultaneously dealing with Murugu's interference.

The experience should emphasize information overload and target identification rather than becoming a conventional fighting game.

### User Value

- Gives the Saint Beasts arc an interactive representation without requiring a full recreation of every fight.
- Demonstrates how character abilities can become mechanics rather than static encyclopedia entries.
- Creates a different style of interaction from Rando, the Dark Tournament, and Chapter Black experiences.
- Provides opportunities to connect Saint Beasts characters to their YYH TCG appearances.

### Data And Assets

#### Canon Research

- Anime episodes covering the selected Saint Beast.
- Corresponding manga chapters.
- Confirmed technique names and descriptions.
- Confirmed counters and outcomes.
- Differences between anime and manga portrayals.
- Relevant YYH TCG cards and card text.

#### Visual Assets

**Stage 1 — Planning Assets**

- 1 clear reference image for Byakko.
- 1 clear reference image for Suzaku.
- 1 clear reference image for Murugu.
- 2-3 screenshots showing the relevant battlefield/environment.
- Screenshots showing each candidate's primary technique.

**Stage 2 — Prototype Assets**

If Byakko is selected:

- Byakko neutral pose.
- Byakko attack pose.
- Kuwabara neutral pose.
- Kuwabara Spirit Sword pose.
- Platform/battlefield background.
- Destructible platform or terrain elements.
- Attack-effect reference or animation source.

If Suzaku is selected:

- Suzaku neutral pose.
- Suzaku attack pose.
- Duplicate Suzaku assets or a reusable sprite that can be cloned.
- Murugu neutral/flying pose.
- Lightning-effect reference.
- Saint Beasts castle/interior background.

**Stage 3 — Polish Assets**

- Higher-resolution character cutouts.
- Additional reaction poses.
- Hit/effect overlays.
- Ambient background animation.
- Relevant YYH cards for contextual information.
- Optional anime clips only where they provide information that cannot be communicated effectively through still assets.

### Open Questions

- Byakko or Suzaku/Murugu for the first implementation?
- Should the player directly control Kuwabara/Yusuke or interact with the environment instead?
- How much battlefield destruction can be shown without making the mobile interface visually confusing?
- Should the unused Saint Beast become a later expansion?

### Canon Policy

Do not invent attack names, battlefield rules, or weaknesses. Any mechanic added for gameplay that is not explicitly demonstrated in canon must be labeled as a gameplay abstraction.


## Hiruiseki Underground Bidding Experience

### Concept

Create an underground auction/bidding experience centered on the extraordinary value placed on Yukina's Hiruiseki tear gems.

The experience should place the user among wealthy collectors, criminals, or Black Black Club-style bidders competing over an extremely rare artifact.

The game may assign fictional bids and a fictional bankroll for gameplay purposes, but it must never imply that the fictional numbers represent a canonical monetary value.

### Experience Flow

1. Introduce the Hiruiseki and explain why it is coveted.
2. Give the player a fictional bankroll.
3. Begin with relatively believable bids.
4. Allow rival bidders to escalate the price rapidly.
5. Force the player to decide whether to continue bidding or recognize that the auction has become irrational.
6. Reveal the connection between greed, Tarukane, and Yukina's exploitation.
7. End with a canon-information card.

Suggested ending:

**PRICE: UNKNOWN**

Yu Yu Hakusho establishes Hiruiseki as extraordinarily valuable and highly coveted, but Shalimar Collectibles should not assign the stones a definitive canonical monetary value without a direct source.

### User Value

- Turns a lore detail into an interactive economics/collector experience.
- Connects naturally to Shalimar Collectibles' broader focus on collectibles and market value.
- Provides a non-combat YYH activity.
- Allows discussion of rarity, perceived value, speculation, and collector behavior.
- Provides story context for Tarukane without trivializing Yukina's treatment.

### Tone

The auction interface may use dark humor about absurd bidding and collector behavior.

Yukina's imprisonment and suffering should remain serious. The joke is the greed of the bidders, not what happened to Yukina.

### Data And Assets

#### Canon Research

- Canon description of Hiruiseki.
- Scenes describing their rarity and desirability.
- Tarukane's motivations.
- Black Black Club material connected to the storyline.
- Anime/manga differences.
- Any statements that imply value without establishing an exact monetary amount.
- Relevant TCG cards.

#### Visual Assets

**Stage 1 — Planning Assets**

- Yukina reference image.
- Hiruiseki close-up/reference.
- Tarukane reference image.
- Black Black Club or underground-betting visual references.
- 2-3 environmental references for an auction room or luxury criminal setting.

**Stage 2 — Prototype Assets**

- Hiruiseki primary object image.
- Auction-stage background.
- Bidder silhouettes or generic original bidder designs.
- Tarukane portrait/cutout.
- Currency/bid UI elements.
- Paddle, counter, or auction-display elements.

**Stage 3 — Polish Assets**

- Multiple Hiruiseki images if visual variations exist.
- Additional bidder reactions.
- Tarukane reaction states.
- Relevant cards.
- Ambient crowd animation.
- Optional audio such as gavel strikes, murmuring, or bid-confirmation effects.

### Open Questions

- Should the player be trying to win the auction or determine when to stop bidding?
- Should rival bidders have recognizable personalities or remain anonymous?
- Should the experience include a collector-market explanation after the story section?
- Should fictional currency use yen, dollars, or a deliberately generic symbol to further separate gameplay numbers from canon?

### Canon Policy

Never assign a definitive canonical monetary value to Hiruiseki unless supported by a primary source.

All gameplay bids must be visibly labeled fictional or simulated.

Separate:

- **Canon rarity**
- **Canon desirability**
- **Fictional auction value**
- **Modern collector analogy**


## Team Masho Shinobi Boss Rush

### Concept

Create a compact five-stage Dark Tournament experience based on Team Masho.

The encounter should feel like a rapid sequence of specialized opponents rather than five versions of the same fight.

Working progression:

1. Gama
2. Toya
3. Bakken
4. Jin
5. Risho

The experience should follow the canonical Team Urameshi matchups closely enough that each opponent's mechanic reflects what actually made that fight distinct.

### Encounter Structure

#### Stage 1 — Gama

Focus on restriction.

Gama's techniques progressively interfere with movement or abilities. The player must understand what has been restricted and adapt rather than simply attacking repeatedly.

#### Stage 2 — Toya

Focus on precision and ice.

Toya should create a more technical encounter than Gama. The player must recognize attack patterns, limited movement, and openings.

This encounter can also introduce narrative foreshadowing.

Toya recognizes that Kurama possesses combat experience inconsistent with his apparent age or appearance. Verify the exact anime and manga dialogue before writing the final text.

Rather than reproducing dialogue verbatim, the experience can summarize the observation:

**Toya notices something: Kurama fights with the experience of someone far beyond his apparent years.**

Then:

**Remember this.**

A later Youko Kurama feature can call back to this observation.

#### Stage 3 — Bakken

Focus on visibility.

Bakken's mist/fog ability reduces the player's information.

The player must rely on partial visual cues, movement, sound, or timing instead of having complete visibility.

#### Stage 4 — Jin

Make Jin the centerpiece encounter.

Wind and flight should change the entire battlefield.

Possible mechanics:

- moving attack zones,
- wind direction,
- aerial positioning,
- timing attacks when Jin enters range,
- avoiding being pushed into dangerous positions.

This should feel faster and more energetic than the previous three stages.

#### Stage 5 — Risho

Focus on endurance and earth/armor.

Risho's earth-based defenses should make direct attacks less effective.

The final stage should communicate that the player has reached the team leader and must overcome a defensive opponent after surviving four highly specialized fighters.

### User Value

- Converts an entire Dark Tournament team into one cohesive interactive feature.
- Highlights opponents who receive less attention than Team Toguro.
- Demonstrates the variety of YYH's combat abilities.
- Creates opportunities for narrative foreshadowing rather than treating fights as isolated events.
- Gives Jin a substantial interactive role without requiring a standalone game.

### Data And Assets

#### Canon Research

For each Team Masho member collect:

- Confirmed techniques.
- Opponent.
- Match result.
- Important dialogue.
- Tactical observations.
- Anime episode.
- Manga chapter.
- Anime/manga differences.
- Relevant TCG cards.

#### Visual Assets

**Stage 1 — Planning Assets**

Obtain at least one clean reference for:

- Gama
- Toya
- Bakken
- Jin
- Risho
- Kurama
- Yusuke
- Kuwabara

Also collect:

- Team Masho tournament arena reference.
- Gama technique reference.
- Toya ice reference.
- Bakken fog reference.
- Jin wind/flight reference.
- Risho earth armor reference.

**Stage 2 — Prototype Assets**

For each opponent:

- Neutral pose.
- Primary attack pose.
- Defeat/reaction pose if available.

For Team Urameshi:

- Kurama combat pose.
- Yusuke combat pose.
- Kuwabara combat pose.

Environment:

- Dark Tournament arena background.
- Reusable crowd layer.
- Tournament platform/ring.
- Basic restriction, ice, fog, wind, and earth effect assets.

**Stage 3 — Polish Assets**

- Additional opponent expressions.
- Multiple attack/effect frames.
- Crowd reactions.
- Arena damage states.
- Relevant cards.
- Short informational overlays tied to each opponent.
- Optional clips for particularly distinctive moments.

### Open Questions

- Should the five stages be playable consecutively or individually selectable?
- Should damage/state carry between stages?
- Should the experience reproduce Team Urameshi's difficult circumstances during these matches or simplify them?
- How much of the tournament committee/referee controversy belongs in the feature?
- Should Toya's observation become part of a larger foreshadowing system across Shalimar Collectibles?

### Canon Policy

Matchups, techniques, and major outcomes should follow canon.

Gameplay timing, controls, health values, and scoring are abstractions.

Any summarized character observation must be checked against the source before publication.


## Hagiri Territory: Reverse Sniper Encounter

### Concept

Create a Chapter Black encounter that initially makes the player believe they are the sniper.

The interface begins with a targeting reticle.

The player naturally assumes the reticle represents their aim.

Then the environment begins attacking them.

A vehicle or object changes direction toward the player. Smaller projectiles begin tracking them. The player gradually realizes:

**The reticle is not showing where you are aiming.**

**It is showing where Hagiri has marked you.**

The experience then shifts from apparent shooting mechanics to survival, deduction, and locating Hagiri.

### Experience Flow

1. Reticle appears.
2. Player attempts to aim or inspect the environment.
3. First environmental projectile unexpectedly tracks toward the marked position.
4. Additional objects begin homing toward the player.
5. Territory explanation appears only after the player experiences the effect.
6. Hagiri remains mostly distant or hidden.
7. Player identifies the sniper's location.
8. Final objective changes from avoiding projectiles to reaching or exposing Hagiri.

### Design Principle

Do not explain the mechanic before the player experiences it.

The reveal is the mechanic.

### User Value

- Teaches Territory through experience instead of exposition.
- Reverses a familiar sniper-game interface.
- Represents Hagiri without turning the encounter into a generic shooting gallery.
- Fits Chapter Black's emphasis on unusual rules and abilities.
- Provides a dramatically different interaction from Dark Tournament combat.

### Data And Assets

#### Canon Research

- Exact rules of Hagiri's Territory.
- How targets are marked.
- Objects/projectiles demonstrated in canon.
- Effective range if stated.
- Limitations and counters.
- Anime episode and manga chapter.
- Relevant cards.

#### Visual Assets

**Stage 1 — Planning Assets**

- Hagiri reference image.
- Hagiri aiming/attack reference.
- Bullseye/target-mark reference.
- Street/environment references from the encounter.
- Reference images for every canon projectile/object being considered.

**Stage 2 — Prototype Assets**

- Street background.
- Target reticle.
- Bullseye marker.
- Hagiri distant silhouette.
- Vehicle/object projectile.
- Several smaller projectile assets.
- Yusuke/player hit or dodge state.

**Stage 3 — Polish Assets**

- Multiple environmental layers for parallax.
- Reflections/windows where Hagiri may briefly appear.
- Additional canon-supported projectile types.
- Impact effects.
- Camera shake.
- Relevant TCG cards.
- Optional sound cues for incoming objects.

### Open Questions

- First-person, over-the-shoulder, or abstract player perspective?
- How long should the player believe they control the reticle?
- Should Hagiri's location change between sessions?
- Should the player defeat Hagiri or merely identify/reach him?
- How much assistance should be given after repeated failed dodges?

### Canon Policy

The targeting rules and projectile behavior must remain grounded in Hagiri's demonstrated Territory.

Do not add arbitrary homing objects solely for gameplay spectacle unless clearly labeled as gameplay abstractions.


## Mukuro And Shigure: Lost Chapter

### Concept

Create a clearly labeled speculative story exploring one unanswered question:

**How did Shigure eventually become associated with Mukuro's territory?**

Canon establishes Shigure as the demon surgeon responsible for implanting Hiei's Jagan and later places him in Mukuro's sphere. The exact origin of that relationship should be researched carefully before this feature is developed.

If canon does not explain their first meeting or recruitment, Shalimar Collectibles may present one possible interpretation without pretending it is missing canon.

### Structure

Use four explicit sections:

**CANON**

Establish only confirmed information about Shigure before his association with Mukuro.

**UNKNOWN**

State clearly what the source material does not explain.

**ONE POSSIBLE STORY**

Present Shalimar Collectibles' speculative sequence.

Working interpretation:

1. Mukuro encounters or learns about Shigure.
2. His combat ability earns attention.
3. His surgical/medical skill makes him unusually useful beyond combat.
4. Mukuro recognizes the strategic value of someone who can both fight and perform extraordinary procedures.
5. Shigure eventually enters her service or territory.

The relationship should remain practical and consistent with the personalities involved rather than becoming artificially friendly.

**CANON**

Return to the point where the established story resumes.

End with:

**THE RECORD GOES QUIET**

Shigure's eventual association with Mukuro is established. How that relationship began should only be presented as speculation if the source material does not provide the answer.

### User Value

- Demonstrates how Shalimar Collectibles can explore unanswered lore without presenting fan theory as fact.
- Gives Shigure more context than a standard character profile.
- Connects Hiei's past to the Three Kings storyline.
- Creates a story-driven experience rather than another combat game.
- Provides a reusable structure for other canon gaps.

### Data And Assets

#### Canon Research

- Every Shigure appearance.
- Shigure's role in Hiei's Jagan surgery.
- Confirmed combat abilities.
- Confirmed medical/surgical abilities.
- Every confirmed reference to Shigure's relationship with Mukuro.
- Mukuro's known recruitment practices and territory structure.
- Exact chronology.
- Anime/manga differences.
- Relevant TCG cards.

#### Visual Assets

**Stage 1 — Planning Assets**

- Shigure portrait/reference.
- Shigure combat reference.
- Shigure surgical/Jagan reference.
- Mukuro portrait/reference.
- Mukuro territory reference.
- Hiei Jagan reference.

**Stage 2 — Prototype Assets**

- Shigure character cutout.
- Mukuro character cutout.
- Demon World/Mukuro territory background.
- Medical/surgical environment or symbolic elements.
- Combat-environment background.
- Timeline or chapter-divider graphics.

**Stage 3 — Polish Assets**

- Multiple Shigure states.
- Multiple Mukuro states.
- Original transition/environment artwork where canon imagery is insufficient.
- Relevant cards.
- Atmospheric Demon World effects.
- Visual labels for CANON, UNKNOWN, and SPECULATION.

### Open Questions

- Does any anime, manga, guidebook, or supplemental material actually explain their first meeting?
- How much speculative dialogue should be included?
- Should the player make decisions or simply explore the possible sequence?
- Should alternative community theories eventually be shown beside Shalimar's interpretation?

### Canon Policy

This feature must never visually blur confirmed events and invented connective material.

Use persistent labels:

- **CANON**
- **UNKNOWN**
- **SHALIMAR SPECULATION**

If later research reveals canonical information about the relationship, revise or remove conflicting speculative material.

## Unanswered Questions And Community Theories

### Concept

Create a curated discussion area for questions Yu Yu Hakusho leaves unresolved or only partially explained.

Rather than beginning as an unrestricted forum, Shalimar Collectibles should publish carefully researched questions and allow community discussion around them.

### Core Structure

Each topic follows:

**WHAT CANON ESTABLISHES**

Present confirmed evidence.

**WHAT CANON DOES NOT ESTABLISH**

Define the actual gap.

**SHALIMAR THEORY**

Optional. Present a clearly labeled interpretation when Shalimar has one.

**COMMUNITY THEORIES**

Allow users to discuss alternate interpretations.

### Initial Topics

#### King Enma

Question:

**How much of King Enma's power came from personal combat strength, and how much came from his authority over Spirit World?**

Do not assign him a definitive demon-style class unless canon explicitly supports one.

Separate:

- political/institutional authority,
- supernatural authority,
- demonstrated personal abilities,
- unknown combat capability.

#### Shigure And Mukuro

Question:

**How did Shigure enter Mukuro's service or territory?**

Connect this discussion to the Lost Chapter feature.

#### Yusuke's Future

Question:

**What could Yusuke become after decades of additional training?**

Connect this discussion to the Post-Series Energy Experiment.

Do not turn the discussion into an official Shalimar power-ranking claim.

### Future Community Features

Potential later additions:

- User accounts.
- Discussion threads.
- Replies.
- Likes/upvotes.
- Spoiler tags.
- Report/moderation tools.
- Timestamps.
- Notifications.
- Links directly to supporting cards, episodes, chapters, and Shalimar experiences.

Do not implement all community infrastructure merely to launch the first version of this feature.

A V2 version can begin with curated questions and static Shalimar analysis.

### User Value

- Turns gaps in canon into ongoing content.
- Encourages users to return after exploring cards and character pages.
- Gives knowledgeable fans a place to compare interpretations.
- Allows Shalimar Collectibles to acknowledge uncertainty rather than forcing definitive answers.
- Creates natural connections between research pages, cards, interactive experiences, and community discussion.

### Data And Assets

#### Canon Research

For every question:

- Relevant anime episodes.
- Relevant manga chapters.
- Official supplemental material when available.
- Exact statements that establish known information.
- Conflicting translations.
- Anime/manga differences.
- Relevant TCG cards.

#### Visual Assets

**Stage 1 — Planning Assets**

Only obtain assets for the first three questions:

- King Enma.
- Shigure.
- Mukuro.
- Yusuke.
- Raizen.
- Spirit World environment.
- Demon World environment.

**Stage 2 — Prototype Assets**

- Character portraits.
- Question-card backgrounds.
- Canon/Unknown/Theory badges.
- Episode/chapter citation UI.
- Relevant card thumbnails.

**Stage 3 — Community Expansion Assets**

- User avatar system.
- Thread/reply UI.
- Voting/like icons.
- Spoiler-state graphics.
- Moderation/report UI.
- Notification states.

### Open Questions

- Should community discussion require accounts?
- Should voting rank theories or simply indicate interest?
- How should spoilers be handled for users who have not finished the series?
- Should Shalimar theories be editable as new evidence is found?
- Should users be able to submit new unanswered questions for review?
- How should anime-only and manga-only answers be displayed when they differ?

### Canon Policy

Never turn community consensus into canon.

Every topic must distinguish:

- **Confirmed Canon**
- **Unknown**
- **Interpretation**
- **Shalimar Speculation**
- **Community Theory**

Popularity is not evidence.


## V2 Asset Acquisition Plan

Assets do not need to be collected all at once.

Acquire them in stages so planning can continue without creating a large asset-management project before implementation begins.

### Stage 1 — Research References

Collect low-volume reference material sufficient to validate each concept.

Priority:

1. Rando.
2. Saint Beasts candidates.
3. Hiruiseki/Tarukane.
4. Team Masho.
5. Sensui and Hagiri.
6. Mukuro/Shigure.
7. Post-series Yusuke concept.
8. Unanswered Questions.

For each character or encounter, initially collect:

- 1 clean character reference.
- 1 important technique reference.
- 1 environment reference.
- episode number,
- manga chapter,
- short research note,
- relevant TCG card IDs if available.

Do not worry about production-quality cutouts during this stage.

### Stage 2 — Prototype Assets

Only collect full prototype assets when an experience has been approved for implementation.

Each prototype should generally begin with:

- 1 background.
- 1-3 character states per major character.
- primary ability/effect assets.
- minimum UI graphics needed for the mechanic.
- relevant card thumbnails.

Avoid collecting every possible reaction pose before the mechanic works.

### Stage 3 — Production Assets

After the prototype proves the interaction is worthwhile:

- higher-resolution images,
- cleaned character cutouts,
- additional poses,
- animation frames,
- environmental layers,
- sound effects,
- card integrations,
- accessibility alternatives,
- reduced-motion states.

### Stage 4 — Optional Video And Advanced Effects

Video should be acquired last unless a concept fundamentally depends on footage.

Potential uses:

- distinctive transformation moments,
- complicated attacks that still images cannot communicate,
- short contextual clips,
- background atmospheric sequences.

Do not make a prototype dependent on large video files when still images and CSS/React animation can prove the concept first.

## Yu Yu Hakusho Interactive — Season 1

### Genkai Tournament
Rando Technique Game

### Saint Beasts
Byakko OR Suzaku/Murugu Encounter

### Yukina Rescue / Tarukane
Hiruiseki Underground Bidding Experience

### Dark Tournament
Team Masho Boss Rush

### Chapter Black
Hagiri: Reverse Sniper Encounter

### Three Kings
Yomi: Fighting Without Sight

### Three Kings Power Context
Yusuke / Raizen Power-Level Comparison

### Supplemental / Experimental Exhibits
D-to-S Power-Level Explorer
Post-Series Yusuke Energy Experiment
Unanswered Questions & Community Theories

### Possible Later Lost Chapter
Mukuro / Shigure

### Asset Tracking Fields

For every acquired asset, track:

- Feature.
- Character.
- Arc.
- Episode.
- Manga chapter if applicable.
- Asset type.
- Source.
- Intended use.
- Resolution.
- Crop needed.
- Background removal needed.
- Animation needed.
- Canon status.
- Rights/licensing note.
- File name.
- Final project path.

Use predictable file names rather than retaining downloaded names.

Example:

`team-masho_jin_wind-attack_epXX_reference.jpg`

or:

`hagiri_target-marker_ui.svg`


## Updated Shared Planning Notes

- Keep all experiences grounded in story context and the YYH card database.
- Prefer interactive explanation over encyclopedia-style walls of text.
- Research anime and manga differences before finalizing mechanics.
- Treat community review as part of validation for obscure techniques, rankings, and translations.
- Do not begin implementation until V1 is released and V2 scope is approved.
- When canon leaves an intentional or unresolved gap, an interaction may explore it, but the UI must visibly distinguish **Canon**, **Unknown**, **Interpretation**, and **Shalimar Speculation**.
- Never allow visual presentation quality to make speculative material appear more authoritative than confirmed material.
- Acquire assets progressively: research references first, prototype assets second, production assets only after the mechanic proves worthwhile.
- Prefer reusable assets and environmental components where multiple YYH experiences share locations, effects, or characters.
- Record episode/chapter provenance while acquiring an asset rather than attempting to reconstruct its origin later.
- Keep anime-only and manga-only evidence distinguishable where the versions differ.
- V2 planning may remain broad. Final implementation scope should be narrowed only after V1 is complete.