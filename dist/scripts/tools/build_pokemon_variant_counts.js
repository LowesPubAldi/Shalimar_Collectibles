const fs = require("fs/promises");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "../..");
const DATA_DIR = path.join(ROOT_DIR, "data");
const CACHE_FILE_PATTERN = /^pokemon-cards-scrydex-wave-(\d+)\.json$/;
const JSON_OUTPUT_PATH = path.join(DATA_DIR, "pokemon-variant-counts.json");
const CSV_OUTPUT_PATH = path.join(DATA_DIR, "pokemon-variant-counts.csv");
const MARKDOWN_OUTPUT_PATH = path.join(ROOT_DIR, "POKEMON_VARIANT_COUNTS.md");

function getTier(count) {
    if (count <= 25) {
        return { id: "01-25", label: "Compact", min: 1, max: 25 };
    }

    const min = count <= 40 ? 26 : Math.floor((count - 41) / 20) * 20 + 41;
    const max = count <= 40 ? 40 : min + 19;
    return { id: `${String(min).padStart(2, "0")}-${max}`, label: `${min}-${max}`, min, max };
}

function getBalancedGroupSizes(count) {
    if (count <= 18) {
        return [count];
    }

    const fullGroups = Math.floor(count / 18);
    const remainder = count % 18;
    return [
        ...Array.from({ length: fullGroups }, () => 18),
        ...(remainder ? [remainder] : [])
    ];
}

function getNameScore(name) {
    const normalized = String(name || "").trim();
    let score = normalized.length / 100;
    if (/\s&\s/.test(normalized)) score += 100;
    if (/[’'][sS]\s/.test(normalized)) score += 60;
    if (/^(?:Dark|Light|Radiant|Shining|Mega|Team|Rocket's|M)\s/i.test(normalized)) score += 40;
    if (/(?:-GX|-EX|\sex|\sV(?:MAX|STAR|-UNION)?|\sBREAK|\sLV\.X)$/i.test(normalized)) score += 30;
    if (/[()]/.test(normalized)) score += 20;
    return score;
}

function chooseDisplayName(nameCounts) {
    return Array.from(nameCounts.entries())
        .sort((left, right) => {
            const scoreDiff = getNameScore(left[0]) - getNameScore(right[0]);
            if (scoreDiff !== 0) return scoreDiff;
            const frequencyDiff = right[1] - left[1];
            if (frequencyDiff !== 0) return frequencyDiff;
            return left[0].localeCompare(right[0]);
        })[0]?.[0] || "Unknown Pokemon";
}

function escapeCsv(value) {
    const text = String(value ?? "");
    return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

async function loadUniqueCards() {
    const fileNames = (await fs.readdir(DATA_DIR))
        .filter((fileName) => CACHE_FILE_PATTERN.test(fileName))
        .sort((left, right) => Number(left.match(CACHE_FILE_PATTERN)[1]) - Number(right.match(CACHE_FILE_PATTERN)[1]));
    const cardsById = new Map();

    for (const fileName of fileNames) {
        const cache = JSON.parse(await fs.readFile(path.join(DATA_DIR, fileName), "utf8"));
        for (const cards of Object.values(cache.cardsByExpansionId || {})) {
            for (const card of Array.isArray(cards) ? cards : []) {
                const id = String(card?.id || "").trim();
                if (id) cardsById.set(id, card);
            }
        }
    }

    return { fileNames, cards: Array.from(cardsById.values()) };
}

async function main() {
    const { fileNames, cards } = await loadUniqueCards();
    const speciesByDex = new Map();

    for (const card of cards) {
        const dexNumbers = Array.from(new Set((Array.isArray(card.pokemonDexNumbers) ? card.pokemonDexNumbers : [])
            .map(Number)
            .filter((value) => Number.isInteger(value) && value > 0)));
        for (const dexNumber of dexNumbers) {
            if (!speciesByDex.has(dexNumber)) {
                speciesByDex.set(dexNumber, { cardIds: new Set(), nameCounts: new Map() });
            }
            const species = speciesByDex.get(dexNumber);
            species.cardIds.add(String(card.id));
            const cardName = String(card.name || "Unknown Pokemon").trim();
            species.nameCounts.set(cardName, (species.nameCounts.get(cardName) || 0) + 1);
        }
    }

    const pokemon = Array.from(speciesByDex.entries())
        .sort(([leftDex], [rightDex]) => leftDex - rightDex)
        .map(([dexNumber, species]) => {
            const printingCount = species.cardIds.size;
            const tier = getTier(printingCount);
            const pickerGroupSizes = getBalancedGroupSizes(printingCount);
            return {
                dexNumber,
                name: chooseDisplayName(species.nameCounts),
                printingCount,
                tier: tier.id,
                pickerGroupCount: pickerGroupSizes.length,
                pickerGroupSizes
            };
        });

    const tiers = Array.from(new Map(pokemon.map((entry) => {
        const tier = getTier(entry.printingCount);
        return [tier.id, {
            id: tier.id,
            label: tier.label,
            min: tier.min,
            max: tier.max,
            pokemonCount: 0
        }];
    })).values()).sort((left, right) => left.min - right.min);
    const tierById = new Map(tiers.map((tier) => [tier.id, tier]));
    for (const entry of pokemon) tierById.get(entry.tier).pokemonCount += 1;

    const hasCompleteDex = pokemon.every((entry, index) => entry.dexNumber === index + 1);
    const hasValidGroups = pokemon.every((entry) => (
        entry.pickerGroupSizes.reduce((sum, size) => sum + size, 0) === entry.printingCount
            && entry.pickerGroupSizes.slice(0, -1).every((size) => size === 18)
            && entry.pickerGroupSizes.at(-1) > 0
            && entry.pickerGroupSizes.at(-1) <= 18
    ));
    if (!hasCompleteDex || !hasValidGroups) {
        throw new Error(`Variant count validation failed (completeDex=${hasCompleteDex}, validGroups=${hasValidGroups}).`);
    }

    const report = {
        generatedAt: new Date().toISOString(),
        source: {
            cacheFiles: fileNames,
            uniqueCards: cards.length,
            countingRule: "Each unique card ID counts once for every National Pokedex number it references."
        },
        pickerPolicy: {
            compactMaximum: 18,
            pageSize: 18,
            groupingRule: "All counts use fixed 18-printing pages, with only the final page shorter."
        },
        totals: {
            representedPokemon: pokemon.length,
            printingAssociations: pokemon.reduce((sum, entry) => sum + entry.printingCount, 0),
            highestPrintingCount: Math.max(...pokemon.map((entry) => entry.printingCount))
        },
        tiers,
        pokemon
    };

    const csvHeaders = ["dexNumber", "name", "printingCount", "tier", "pickerGroupCount", "pickerGroupSizes"];
    const csvRows = pokemon.map((entry) => csvHeaders.map((header) => {
        const value = header === "pickerGroupSizes" ? entry.pickerGroupSizes.join("|") : entry[header];
        return escapeCsv(value);
    }).join(","));
    const topPokemon = [...pokemon]
        .sort((left, right) => right.printingCount - left.printingCount || left.dexNumber - right.dexNumber)
        .slice(0, 25);
    const markdownRows = pokemon.map((entry) => (
        `| ${entry.dexNumber} | ${entry.name} | ${entry.printingCount} | ${entry.tier} | ${entry.pickerGroupSizes.join(" + ")} |`
    ));
    const markdown = [
        "# Pokemon Variant Counts",
        "",
        `Generated from ${fileNames.length} local Scrydex cache files with ${cards.length.toLocaleString()} unique card IDs. No API request is used.`,
        "",
        "A card counts once for every National Pokedex number it references. This means a tag-team card contributes to each represented Pokemon.",
        "",
        "## Picker Policy",
        "",
        "- 1-18 printings: one compact picker.",
        "- 19+ printings: fixed 18-printing pages, with only the final page shorter.",
        "",
        "## Tier Distribution",
        "",
        "| Tier | Pokemon |",
        "| --- | ---: |",
        ...tiers.map((tier) => `| ${tier.id} | ${tier.pokemonCount} |`),
        "",
        "## Highest Counts",
        "",
        "| Dex | Pokemon | Printings | Picker groups |",
        "| ---: | --- | ---: | --- |",
        ...topPokemon.map((entry) => `| ${entry.dexNumber} | ${entry.name} | ${entry.printingCount} | ${entry.pickerGroupSizes.join(" + ")} |`),
        "",
        "## Complete National Dex",
        "",
        "| Dex | Pokemon | Printings | Tier | Picker groups |",
        "| ---: | --- | ---: | --- | --- |",
        ...markdownRows,
        ""
    ].join("\n");

    await fs.writeFile(JSON_OUTPUT_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");
    await fs.writeFile(CSV_OUTPUT_PATH, `${csvHeaders.join(",")}\n${csvRows.join("\n")}\n`, "utf8");
    await fs.writeFile(MARKDOWN_OUTPUT_PATH, markdown, "utf8");
    console.log(JSON.stringify({
        json: path.relative(ROOT_DIR, JSON_OUTPUT_PATH),
        csv: path.relative(ROOT_DIR, CSV_OUTPUT_PATH),
        markdown: path.relative(ROOT_DIR, MARKDOWN_OUTPUT_PATH),
        ...report.totals,
        validation: { completeDex: hasCompleteDex, validGroups: hasValidGroups },
        topPokemon,
        tiers
    }, null, 2));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});