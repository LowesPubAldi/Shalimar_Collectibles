import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CHECKLIST_PATH = ROOT / "data" / "ghost-files-checklist.txt"
FULL_DATA_PATH = ROOT / "data" / "yyh-cards-full.json"
CHECKLIST_JSON_PATH = ROOT / "data" / "ghost-files-checklist.json"

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
}


def clean_name(raw_name: str) -> tuple[str, str]:
    variant = "Standard"
    name = raw_name.strip()

    if name.endswith("(Stamped)"):
        name = name[: -len("(Stamped)")].strip()
        variant = "Stamped"

    corrected_suffix = "(1st Edition Corrected Version)"
    if name.endswith(corrected_suffix):
        name = name[: -len(corrected_suffix)].strip()
        variant = "1st Edition Corrected Version"

    return name, variant


def code_prefix(code: str) -> str:
    match = re.match(r"^([A-Za-z]+)", code)
    return match.group(1).upper() if match else ""


def parse_checklist() -> tuple[dict, list]:
    mapping = {}
    ordered = []

    text = CHECKLIST_PATH.read_text(encoding="utf-8")
    for raw_line in text.splitlines():
        line = raw_line.strip()
        match = LINE_RE.match(line)
        if not match:
            continue

        code = match.group("code").upper()
        raw_name = match.group("name").strip()
        name, variant = clean_name(raw_name)

        prefix = code_prefix(code)
        rarity = RARITY_BY_PREFIX.get(prefix, "Unknown Rarity")

        entry = {
            "id": code,
            "number": code,
            "game": "Yu Yu Hakusho",
            "set": "Ghost Files",
            "name": name,
            "type": "Unknown Type",
            "rarity": rarity,
            "variant": variant,
            "source": "ghost-files-checklist.txt",
        }

        mapping[code] = entry
        ordered.append(entry)

    return mapping, ordered


def apply_mapping(full_cards: list[dict], checklist_map: dict) -> tuple[list[dict], int, list[dict]]:
    updated = []
    matched = 0
    matched_codes = set()

    for card in full_cards:
        card_id = str(card.get("id", "")).upper()
        checklist_entry = checklist_map.get(card_id)

        if not checklist_entry:
            updated.append(card)
            continue

        merged = dict(card)
        merged["id"] = checklist_entry["id"]
        merged["number"] = checklist_entry["number"]
        merged["game"] = "Yu Yu Hakusho"
        merged["set"] = "Ghost Files"
        merged["name"] = checklist_entry["name"]

        if not merged.get("type") or merged.get("type") == "Unknown Type":
            merged["type"] = checklist_entry["type"]

        merged["rarity"] = checklist_entry["rarity"]
        merged["variant"] = checklist_entry["variant"]
        merged["source"] = "yyh-card-library-source.pdf + ghost-files-checklist.txt"

        updated.append(merged)
        matched += 1
        matched_codes.add(card_id)

    missing_entries = [entry for code, entry in checklist_map.items() if code not in matched_codes]

    for missing in missing_entries:
        checklist_only_card = dict(missing)
        checklist_only_card["effect"] = "Effect text not available in checklist source."
        checklist_only_card["source"] = "ghost-files-checklist.txt"
        updated.append(checklist_only_card)

    return updated, matched, missing_entries


def main() -> None:
    checklist_map, checklist_ordered = parse_checklist()

    full_cards = json.loads(FULL_DATA_PATH.read_text(encoding="utf-8"))
    if not isinstance(full_cards, list):
        raise RuntimeError("Expected yyh-cards-full.json to contain a top-level array")

    updated_cards, matched, missing_entries = apply_mapping(full_cards, checklist_map)

    FULL_DATA_PATH.write_text(json.dumps(updated_cards, indent=2), encoding="utf-8")
    CHECKLIST_JSON_PATH.write_text(json.dumps(checklist_ordered, indent=2), encoding="utf-8")

    unmatched_codes = sorted(entry["id"] for entry in missing_entries)

    print(f"Checklist entries parsed: {len(checklist_map)}")
    print(f"Cards updated in yyh-cards-full.json: {matched}")
    print(f"Checklist-only cards added to yyh-cards-full.json: {len(missing_entries)}")
    print(f"Checklist entries not found in PDF-derived data: {len(unmatched_codes)}")
    if unmatched_codes:
        print("Missing codes sample:", ", ".join(unmatched_codes[:15]))
    print(f"Wrote checklist JSON: {CHECKLIST_JSON_PATH}")


if __name__ == "__main__":
    main()
