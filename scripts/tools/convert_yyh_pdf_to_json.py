import json
import re
from pathlib import Path

from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[2]
PDF_PATH = ROOT / "assets" / "yyh-source" / "yyh-card-library-source.pdf"
OUT_PATH = ROOT / "data" / "yyh-cards-full.json"

CARD_TYPES = ("Character", "Event", "Item", "Technique")
NUMBER_RE = re.compile(r"(?P<number>(?:[A-Za-z]{1,3}|X)\d+(?:/\d+)?)", re.IGNORECASE)

NOISE_LINES = {
    "Search Results",
    "Card",
    "Name",
    "Type",
    "Card NumberCard Effect Card",
    "Card Effect Card",
    "NumberCard Effect Card",
    "Download the Demo Deck",
    "View the Demo Video",
    "See the Rules",
    "FAQ",
    "Current Rulings Document (CRD)",
    "Card Library",
    "Alliance Preview",
    "Advanced Card Search",
    "Deck Builder",
    "Where Can I Get Some Yu Yu?",
    "Tournaments",
    "Special Events",
    "Sign Up",
    "Visit the Spirit Boards",
}


def clean_line(line: str) -> str:
    line = line.replace("\u2122", "")
    line = line.replace("\u2022", "")
    line = line.replace("\xa0", " ")
    line = re.sub(r"\s+", " ", line).strip()
    return line


def looks_like_noise(line: str) -> bool:
    if not line:
        return True
    if line in NOISE_LINES:
        return True
    if line.startswith("http"):
        return True
    return False


def infer_set_from_number(number: str) -> str:
    match = re.search(r"/(\d+)$", number)
    if match:
        return f"Set {match.group(1)}"

    prefix = re.match(r"([A-Za-z]{1,3}|X)", number)
    if prefix:
        return f"Code {prefix.group(1).upper()}"

    return "Unknown Set"


def parse_records(lines: list[str]) -> list[dict]:
    records = []
    state = "name"
    name_parts: list[str] = []
    number = ""
    effect_parts: list[str] = []

    def finalize(card_type: str) -> None:
        nonlocal state, name_parts, number, effect_parts
        name = re.sub(r"\s+", " ", " ".join(name_parts)).strip(" -")
        effect = re.sub(r"\s+", " ", " ".join(effect_parts)).strip()

        if not name or not number:
            state = "name"
            name_parts = []
            number = ""
            effect_parts = []
            return

        record = {
            "id": number.upper(),
            "number": number.upper(),
            "game": "Yu Yu Hakusho",
            "set": infer_set_from_number(number.upper()),
            "name": name,
            "type": card_type,
            "rarity": "Unknown Rarity",
            "variant": "Standard",
            "effect": effect,
            "source": "yyh-card-library-source.pdf",
        }
        records.append(record)

        state = "name"
        name_parts = []
        number = ""
        effect_parts = []

    for raw_line in lines:
        line = clean_line(raw_line)
        if looks_like_noise(line):
            continue

        if state == "name":
            match = NUMBER_RE.search(line)
            if not match:
                name_parts.append(line)
                continue

            found_number = match.group("number")
            before = line[: match.start()].strip()
            after = line[match.end() :].strip()

            if before:
                name_parts.append(before)

            number = found_number
            state = "effect"

            if after:
                for card_type in CARD_TYPES:
                    suffix = f" {card_type}"
                    if after == card_type:
                        finalize(card_type)
                        break
                    if after.endswith(suffix):
                        effect_body = after[: -len(suffix)].strip()
                        if effect_body:
                            effect_parts.append(effect_body)
                        finalize(card_type)
                        break
                else:
                    effect_parts.append(after)

            continue

        if state == "effect":
            if line in CARD_TYPES:
                finalize(line)
                continue

            matched_type = None
            for card_type in CARD_TYPES:
                suffix = f" {card_type}"
                if line.endswith(suffix):
                    matched_type = card_type
                    body = line[: -len(suffix)].strip()
                    if body:
                        effect_parts.append(body)
                    break

            if matched_type:
                finalize(matched_type)
                continue

            effect_parts.append(line)

    return records


def dedupe(records: list[dict]) -> list[dict]:
    seen = set()
    unique = []

    for record in records:
        key = (record["id"], record["name"], record["type"])
        if key in seen:
            continue
        seen.add(key)
        unique.append(record)

    return unique


def main() -> None:
    reader = PdfReader(str(PDF_PATH))
    all_lines: list[str] = []

    for page in reader.pages:
        text = page.extract_text() or ""
        all_lines.extend(text.splitlines())

    parsed = parse_records(all_lines)
    unique_records = dedupe(parsed)

    OUT_PATH.write_text(json.dumps(unique_records, indent=2), encoding="utf-8")

    print(f"Parsed {len(unique_records)} cards")
    print(f"Output: {OUT_PATH}")


if __name__ == "__main__":
    main()
