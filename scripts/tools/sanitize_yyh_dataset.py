import json
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
FULL_DATA_PATH = ROOT / "data" / "yyh-cards-full.json"
ARCHIVE_DATA_PATH = ROOT / "data" / "yyh-cards-removed-noncore.json"

ALLOWED_TYPES = {"Character", "Technique", "Spirit", "Item", "Event"}


def is_placeholder_effect(value: str) -> bool:
    text = (value or "").strip().lower()
    return (not text) or ("not available in checklist source" in text)


def score_record(card: dict) -> int:
    score = 0
    if card.get("type") in ALLOWED_TYPES:
        score += 2
    if not is_placeholder_effect(card.get("effect", "")):
        score += 2
    if card.get("variant") and card.get("variant") != "Standard":
        score += 1
    return score


def main() -> None:
    full_cards = json.loads(FULL_DATA_PATH.read_text(encoding="utf-8"))
    archived_cards = []
    if ARCHIVE_DATA_PATH.exists():
        archived_cards = json.loads(ARCHIVE_DATA_PATH.read_text(encoding="utf-8"))

    by_id = defaultdict(list)
    for card in [*full_cards, *archived_cards]:
        card_id = str(card.get("id", "")).upper().strip()
        if card_id:
            by_id[card_id].append(card)

    type_fixes = 0
    effect_fixes = 0

    for card in full_cards:
        card_id = str(card.get("id", "")).upper().strip()
        candidates = by_id.get(card_id, [])

        if card.get("type") not in ALLOWED_TYPES:
            valid_types = [c.get("type") for c in candidates if c.get("type") in ALLOWED_TYPES]
            if valid_types:
                card["type"] = Counter(valid_types).most_common(1)[0][0]
                type_fixes += 1

        if is_placeholder_effect(card.get("effect", "")):
            valid_effects = [
                (c.get("effect") or "").strip()
                for c in candidates
                if not is_placeholder_effect(c.get("effect", ""))
            ]
            if valid_effects:
                valid_effects.sort(key=len, reverse=True)
                card["effect"] = valid_effects[0]
                effect_fixes += 1

    # Remove exact duplicates while retaining the richest record.
    chosen = {}
    for card in full_cards:
        key = (
            str(card.get("set", "")),
            str(card.get("id", "")).upper(),
            str(card.get("name", "")),
            str(card.get("variant", "Standard")),
        )
        previous = chosen.get(key)
        if previous is None or score_record(card) > score_record(previous):
            chosen[key] = card

    deduped = list(chosen.values())
    removed_duplicates = len(full_cards) - len(deduped)

    unknown_type_after = sum(1 for c in deduped if c.get("type") not in ALLOWED_TYPES)
    missing_effect_after = sum(1 for c in deduped if is_placeholder_effect(c.get("effect", "")))

    FULL_DATA_PATH.write_text(json.dumps(deduped, indent=2), encoding="utf-8")

    print(f"before_total={len(full_cards)}")
    print(f"after_total={len(deduped)}")
    print(f"type_fixes={type_fixes}")
    print(f"effect_fixes={effect_fixes}")
    print(f"removed_duplicates={removed_duplicates}")
    print(f"unknown_type_after={unknown_type_after}")
    print(f"missing_effect_after={missing_effect_after}")


if __name__ == "__main__":
    main()
