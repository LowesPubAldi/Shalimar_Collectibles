import argparse
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
FULL_DATA_PATH = ROOT / "data" / "yyh-cards-full.json"
ARCHIVE_DATA_PATH = ROOT / "data" / "yyh-cards-removed-noncore.json"

LINE_RE = re.compile(r"^\[ \]\s+(?P<code>[A-Za-z]+\d+(?:/\d+)?)\s+(?P<name>.+)$")

RARITY_BY_PREFIX = {
    "C": "C - Common",
    "R": "R - Rare (standard)",
    "ST": "ST - Starter Deck",
    "S": "S - Spirit Rare",
    "U": "U - Uber Rare",
    "F": "F - Storm of Torment misprint marker",
    "G": "G - Ghost Rare",
    "P": "P - Promo",
    "V": "V - Video",
    "TC": "TC - Tournament Common",
    "TR": "TR - Tournament Rare",
    "TS": "TS - Tournament Spirit Rare",
    "TU": "TU - Tournament Uber Rare",
    "TG": "TG - Tournament Ghost Rare",
    "X": "X - Team Challenge/Box Topper",
    "SK": "SK - Skannerz",
    "TX": "TX - Texas Team Challenge",
}


def code_prefix(code: str) -> str:
    match = re.match(r"^([A-Za-z]+)", code)
    return match.group(1).upper() if match else ""


def normalize_name(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", value.lower())


def clean_name_and_variant(raw_name: str) -> tuple[str, str]:
    variant = "Standard"
    name = raw_name.strip()

    if name.endswith("(Foil)"):
        name = name[: -len("(Foil)")].strip()
        variant = "Foil"

    if name.endswith("(Stamped)"):
        name = name[: -len("(Stamped)")].strip()
        variant = "Stamped"

    corrected_suffix = "(1st Edition Corrected Version)"
    if name.endswith(corrected_suffix):
        name = name[: -len(corrected_suffix)].strip()
        variant = "1st Edition Corrected Version"

    generic_variant_match = re.search(r"\(([^()]+)\)$", name)
    if generic_variant_match:
        variant = generic_variant_match.group(1).strip()
        name = name[: generic_variant_match.start()].strip()

    return name, variant


def parse_checklist(checklist_path: Path, set_name: str, source_name: str) -> list[dict]:
    entries = []
    text = checklist_path.read_text(encoding="utf-8")

    for raw_line in text.splitlines():
        line = raw_line.strip()
        match = LINE_RE.match(line)
        if not match:
            continue

        code = match.group("code").upper()
        name, variant = clean_name_and_variant(match.group("name"))
        rarity = RARITY_BY_PREFIX.get(code_prefix(code), "Unknown Rarity")

        entries.append(
            {
                "id": code,
                "number": code,
                "game": "Yu Yu Hakusho",
                "set": set_name,
                "name": name,
                "type": "Unknown Type",
                "rarity": rarity,
                "variant": variant,
                "effect": "Effect text not available in checklist source.",
                "source": source_name,
            }
        )

    return entries


def merge_entries(full_cards: list[dict], checklist_entries: list[dict], source_label: str, candidate_cards: list[dict]) -> tuple[list[dict], int, int]:
    # Keyed by set+id+name+variant so foil/non-foil can coexist.
    existing_keys = {
        (
            str(card.get("set", "")),
            str(card.get("id", "")).upper(),
            str(card.get("name", "")),
            str(card.get("variant", "Standard")),
        )
        for card in full_cards
    }

    updated = 0
    added = 0

    for entry in checklist_entries:
        entry_key = (entry["set"], entry["id"], entry["name"], entry["variant"])

        if entry_key in existing_keys:
            continue

        # Try to enrich from an existing parsed PDF card with same code+name.
        entry_name_norm = normalize_name(entry["name"])
        best_match = None
        for card in candidate_cards:
            if str(card.get("id", "")).upper() != entry["id"]:
                continue

            if normalize_name(str(card.get("name", ""))) == entry_name_norm:
                best_match = card
                break

        if best_match:
            merged = dict(best_match)
            merged["id"] = entry["id"]
            merged["number"] = entry["number"]
            merged["game"] = entry["game"]
            merged["set"] = entry["set"]
            merged["name"] = entry["name"]
            merged["rarity"] = entry["rarity"]
            merged["variant"] = entry["variant"]
            merged["source"] = source_label

            if not merged.get("effect"):
                merged["effect"] = entry["effect"]

            full_cards.append(merged)
            existing_keys.add(entry_key)
            updated += 1
            continue

        full_cards.append(dict(entry))
        existing_keys.add(entry_key)
        added += 1

    return full_cards, updated, added


def main() -> None:
    parser = argparse.ArgumentParser(description="Apply a YYH set checklist into yyh-cards-full.json")
    parser.add_argument("--checklist", required=True, help="Path to checklist .txt file")
    parser.add_argument("--set", required=True, help="Target set name (e.g. Dark Tournament)")
    parser.add_argument("--source", required=False, help="Source label to store in card records")
    parser.add_argument("--write-checklist-json", action="store_true", help="Also emit parsed checklist JSON")
    args = parser.parse_args()

    checklist_path = (ROOT / args.checklist).resolve() if not Path(args.checklist).is_absolute() else Path(args.checklist)
    source_name = args.source or checklist_path.name

    checklist_entries = parse_checklist(checklist_path, args.set, source_name)

    full_cards = json.loads(FULL_DATA_PATH.read_text(encoding="utf-8"))
    if not isinstance(full_cards, list):
        raise RuntimeError("Expected yyh-cards-full.json to contain a top-level array")

    candidate_cards = list(full_cards)
    if ARCHIVE_DATA_PATH.exists():
        archived_cards = json.loads(ARCHIVE_DATA_PATH.read_text(encoding="utf-8"))
        if isinstance(archived_cards, list):
            candidate_cards.extend(archived_cards)

    full_cards, updated, added = merge_entries(full_cards, checklist_entries, source_name, candidate_cards)

    FULL_DATA_PATH.write_text(json.dumps(full_cards, indent=2), encoding="utf-8")

    if args.write_checklist_json:
        out_name = checklist_path.stem + ".json"
        out_path = checklist_path.with_name(out_name)
        out_path.write_text(json.dumps(checklist_entries, indent=2), encoding="utf-8")
        print(f"Wrote parsed checklist JSON: {out_path}")

    set_count = sum(1 for card in full_cards if card.get("set") == args.set)

    print(f"Checklist parsed entries: {len(checklist_entries)}")
    print(f"Enriched from existing parsed cards: {updated}")
    print(f"Checklist-only cards added: {added}")
    print(f"Total cards now in set '{args.set}': {set_count}")
    print(f"Full data path: {FULL_DATA_PATH}")


if __name__ == "__main__":
    main()
