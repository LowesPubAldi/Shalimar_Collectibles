const fs = require("fs/promises");
const path = require("path");
const dotenv = require("dotenv");

const ROOT_DIR = path.resolve(__dirname, "../..");
const DATA_DIR = path.join(ROOT_DIR, "data");
const API_BASE_URL = "https://api.scrydex.com/pokemon/v1/en";
const PAGE_SIZE = 100;
const WAVES = {
    1: {
        label: "Wizards Era",
        batches: {
            1: ["Fossil", "Team Rocket", "Gym Heroes"],
            2: ["Gym Challenge", "Neo Genesis", "Neo Discovery", "Neo Revelation", "Neo Destiny"],
            3: ["Legendary Collection", "Expedition Base Set", "Aquapolis", "Skyridge", "Wizards Black Star Promos"],
            4: ["Base", "Jungle"]
        }
    },
    2: {
        label: "EX Era",
        batches: {
            1: ["Ruby & Sapphire", "Sandstorm", "Dragon", "Team Magma vs Team Aqua", "Hidden Legends", "FireRed & LeafGreen"],
            2: ["Team Rocket Returns", "Deoxys", "Emerald", "Unseen Forces", "Delta Species"],
            3: ["Legend Maker", "Holon Phantoms", "Crystal Guardians", "Dragon Frontiers", "Power Keepers"]
        }
    },
    3: {
        label: "Diamond & Pearl / Platinum",
        batches: {
            1: ["Diamond & Pearl", "Mysterious Treasures", "Secret Wonders", "Great Encounters", "Majestic Dawn", "Legends Awakened"],
            2: ["Stormfront", "Platinum", "Rising Rivals", "Supreme Victors", "Arceus"]
        }
    },
    4: {
        label: "HeartGold & SoulSilver / Early Black & White",
        batches: {
            1: ["HeartGold & SoulSilver", "HGSS Black Star Promos", "HGSS Trainer Kit Raichu", "HGSS Trainer Kit Gyarados", "HS—Unleashed", "HS—Undaunted", "HS—Triumphant"],
            2: ["Call of Legends", "BW Black Star Promos", "Black & White", "McDonald's Collection 2011", "Emerging Powers", "BW Trainer Kit Zoroark", "BW Trainer Kit Excadrill"],
            3: ["Noble Victories", "Next Destinies", "Dark Explorers", "McDonald's Collection 2012", "Dragons Exalted", "Dragon Vault", "Boundaries Crossed"]
        }
    }
};
const waveArgumentIndex = process.argv.indexOf("--wave");
const batchArgumentIndex = process.argv.indexOf("--batch");
const waveNumber = Number(waveArgumentIndex >= 0 ? process.argv[waveArgumentIndex + 1] : 1);
const batchNumber = Number(batchArgumentIndex >= 0 ? process.argv[batchArgumentIndex + 1] : 1);
const waveConfig = WAVES[waveNumber];
const WAVE = {
    number: waveNumber,
    batch: batchNumber,
    label: `${waveConfig?.label || `Wave ${waveNumber}`} - Batch ${batchNumber}`,
    sets: waveConfig?.batches?.[batchNumber]
};

dotenv.config({ path: path.join(ROOT_DIR, ".env.local"), override: true });

const apiKey = process.env.SCRYDEX_API_KEY || "";
const teamId = process.env.SCRYDEX_TEAM_ID || "";
let requestCount = 0;

function headers() {
    return {
        "X-Api-Key": apiKey,
        "X-Team-ID": teamId
    };
}

async function fetchScrydex(pathname, searchParams) {
    const endpoint = new URL(`${API_BASE_URL}/${pathname}`);
    for (const [name, value] of Object.entries(searchParams)) {
        endpoint.searchParams.set(name, String(value));
    }

    requestCount += 1;
    const response = await fetch(endpoint, { headers: headers() });
    if (!response.ok) {
        const body = await response.text();
        throw new Error(`${pathname} request failed (${response.status}): ${body.slice(0, 300)}`);
    }
    return response.json();
}

function payloadTotal(payload, fallback) {
    const total = Number(payload?.totalCount ?? payload?.total_count);
    return Number.isFinite(total) ? total : fallback;
}

function isEnglish(record) {
    const language = record?.language?.id || record?.language?.name || record?.language;
    return !language || ["en", "eng", "english"].includes(String(language).trim().toLowerCase());
}

function normalizeExpansion(expansion) {
    return {
        id: String(expansion.id || ""),
        name: String(expansion.name || ""),
        releaseDate: String(expansion.release_date || expansion.releaseDate || ""),
        printedTotal: Number(expansion.printed_total ?? expansion.printedTotal ?? 0) || null,
        total: Number(expansion.total ?? expansion.card_count ?? expansion.cardCount ?? 0) || null
    };
}

function normalizeCard(card) {
    const frontImage = Array.isArray(card.images)
        ? card.images.find((image) => image?.type === "front") || card.images[0]
        : null;

    return {
        id: String(card.id || "UNKNOWN"),
        number: String(card.number || card.id || "UNKNOWN"),
        game: "Pokemon",
        set: String(card.expansion?.name || "Unknown Set"),
        name: String(card.name || "Unnamed Card"),
        type: String(card.supertype || "Unknown Type"),
        rarity: String(card.rarity || "Unknown Rarity"),
        pokemonTypes: Array.isArray(card.types) ? card.types.map((type) => String(type || "").trim()).filter(Boolean) : [],
        pokemonDexNumbers: Array.isArray(card.national_pokedex_numbers) ? card.national_pokedex_numbers.filter((value) => Number.isFinite(Number(value))).map(Number) : [],
        variant: "Standard",
        effect: String(card.rules?.join(" ") || card.flavor_text || ""),
        imageUrl: String(frontImage?.small || frontImage?.medium || frontImage?.large || ""),
        setReleaseDate: String(card.expansion?.release_date || "")
    };
}

async function fetchAllExpansions() {
    const expansions = [];
    let page = 1;
    let total = Number.POSITIVE_INFINITY;

    while (expansions.length < total) {
        const payload = await fetchScrydex("expansions", {
            page,
            pageSize: PAGE_SIZE,
            orderBy: "releaseDate",
            select: "id,name,release_date,printed_total,total,language"
        });
        const items = Array.isArray(payload?.data) ? payload.data : [];
        expansions.push(...items.filter(isEnglish));
        total = payloadTotal(payload, expansions.length);
        if (items.length < PAGE_SIZE) {
            break;
        }
        page += 1;
    }

    return expansions;
}

async function fetchExpansionCards(expansion) {
    const cards = [];
    let page = 1;
    let pagesFetched = 0;
    let total = Number.POSITIVE_INFINITY;

    while (cards.length < total) {
        const payload = await fetchScrydex("cards", {
            q: `expansion.id:${expansion.id}`,
            page,
            pageSize: PAGE_SIZE,
            select: "id,name,number,supertype,types,rarity,rules,flavor_text,national_pokedex_numbers,images,expansion,language"
        });
        pagesFetched += 1;
        const items = Array.isArray(payload?.data) ? payload.data.filter(isEnglish) : [];
        cards.push(...items.map(normalizeCard));
        total = payloadTotal(payload, cards.length);
        if (items.length < PAGE_SIZE) {
            break;
        }
        page += 1;
    }

    return { cards, total, pagesFetched };
}

async function writeJsonAtomic(filePath, value) {
    const temporaryPath = `${filePath}.${process.pid}.tmp`;
    await fs.writeFile(temporaryPath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
    await fs.rename(temporaryPath, filePath);
}

async function readImportLog(filePath) {
    try {
        const parsed = JSON.parse(await fs.readFile(filePath, "utf8"));
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        if (error?.code === "ENOENT") {
            return [];
        }
        throw error;
    }
}

async function readJsonIfPresent(filePath) {
    try {
        return JSON.parse(await fs.readFile(filePath, "utf8"));
    } catch (error) {
        if (error?.code === "ENOENT") {
            return null;
        }
        throw error;
    }
}

async function main() {
    if (!Array.isArray(WAVE.sets)) {
        const availableWaves = Object.keys(WAVES).join(", ");
        const availableBatches = waveConfig ? Object.keys(waveConfig.batches).join(", ") : "none";
        throw new Error(`Unknown wave ${waveNumber}, batch ${batchNumber}. Available waves: ${availableWaves}; batches for this wave: ${availableBatches}`);
    }
    if (!apiKey || !teamId) {
        throw new Error("SCRYDEX_API_KEY and SCRYDEX_TEAM_ID must be set in .env.local");
    }

    const startedAt = new Date().toISOString();
    const logEntry = {
        wave: WAVE.number,
        batch: WAVE.batch,
        label: WAVE.label,
        startedAt,
        finishedAt: null,
        status: "running",
        scrydexRequests: 0,
        setsRequested: WAVE.sets.length,
        setsImported: 0,
        cardsImported: 0,
        sets: [],
        errors: []
    };
    const setsCachePath = path.join(DATA_DIR, "pokemon-sets-scrydex.json");
    const cardsCachePath = path.join(DATA_DIR, `pokemon-cards-scrydex-wave-${WAVE.number}.json`);
    const existingSetsCache = await readJsonIfPresent(setsCachePath);
    const existingCardsCache = await readJsonIfPresent(cardsCachePath);
    const expansionRecords = Array.isArray(existingSetsCache?.items) && existingSetsCache.items.length > 0
        ? existingSetsCache.items
        : await fetchAllExpansions();
    const expansions = expansionRecords.map(normalizeExpansion);
    const expansionByName = new Map(expansionRecords.map((expansion) => [String(expansion.name || "").trim().toLowerCase(), expansion]));
    const cardsByExpansionId = { ...(existingCardsCache?.cardsByExpansionId || {}) };
    const cachedSetsById = new Map((existingCardsCache?.sets || []).map((set) => [set.id, set]));

    for (const setName of WAVE.sets) {
        const expansion = expansionByName.get(setName.toLowerCase());
        if (!expansion) {
            logEntry.errors.push(`Expansion not found: ${setName}`);
            logEntry.sets.push({ name: setName, status: "failed", error: "Expansion not found" });
            continue;
        }

        try {
            const result = await fetchExpansionCards(expansion);
            cardsByExpansionId[expansion.id] = result.cards;
            logEntry.setsImported += 1;
            logEntry.cardsImported += result.cards.length;
            logEntry.sets.push({
                id: String(expansion.id),
                name: String(expansion.name),
                expectedTotal: result.total,
                cardsImported: result.cards.length,
                pagesFetched: result.pagesFetched,
                status: "success"
            });
            cachedSetsById.set(String(expansion.id), logEntry.sets.at(-1));
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            logEntry.errors.push(`${setName}: ${message}`);
            logEntry.sets.push({ id: String(expansion.id), name: setName, status: "failed", error: message });
        }
    }

    await fs.mkdir(DATA_DIR, { recursive: true });
    await writeJsonAtomic(setsCachePath, {
        syncedAt: new Date().toISOString(),
        language: "en",
        items: expansions
    });
    await writeJsonAtomic(cardsCachePath, {
        wave: WAVE.number,
        label: waveConfig.label,
        syncedAt: new Date().toISOString(),
        language: "en",
        sets: Array.from(cachedSetsById.values()),
        cardsByExpansionId
    });

    logEntry.finishedAt = new Date().toISOString();
    logEntry.status = logEntry.errors.length === 0 ? "success" : (logEntry.setsImported > 0 ? "partial" : "failed");
    logEntry.scrydexRequests = requestCount;
    const logPath = path.join(DATA_DIR, "pokemon-cache-import-log.json");
    const importLog = await readImportLog(logPath);
    importLog.push(logEntry);
    await writeJsonAtomic(logPath, importLog);

    console.log(JSON.stringify(logEntry, null, 2));
    if (logEntry.status !== "success") {
        process.exitCode = 1;
    }
}

main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
});