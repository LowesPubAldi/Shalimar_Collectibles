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
    },
    5: {
        label: "Late Black & White / XY",
        batches: {
            1: ["Plasma Storm", "Plasma Freeze", "Plasma Blast", "XY Black Star Promos", "Legendary Treasures", "Kalos Starter Set", "XY"],
            2: ["XY Trainer Kit Sylveon", "XY Trainer Kit Noivern", "Flashfire", "McDonald's Collection 2014", "Furious Fists", "XY Trainer Kit Wigglytuff", "XY Trainer Kit Bisharp"],
            3: ["Phantom Forces", "Primal Clash", "XY Trainer Kit Latios", "XY Trainer Kit Latias", "Roaring Skies", "Ancient Origins", "BREAKthrough"],
            4: ["Double Crisis", "McDonald's Collection 2015", "BREAKpoint", "Generations", "XY Trainer Kit Suicune", "XY Trainer Kit Pikachu Libre", "Fates Collide", "Steam Siege"]
        }
    },
    6: {
        label: "Late XY / Early Sun & Moon",
        batches: {
            1: ["McDonald's Collection 2016", "Evolutions", "Sun & Moon", "SM Black Star Promos", "SM Trainer Kit Lycanroc", "SM Trainer Kit Alolan Raichu", "Guardians Rising", "Burning Shadows", "Shining Legends", "Crimson Invasion", "McDonald's Collection 2017", "Ultra Prism", "Forbidden Light", "Celestial Storm"]
        }
    },
    7: {
        label: "Late Sun & Moon",
        batches: {
            1: ["Dragon Majesty", "McDonald's Collection 2018", "Lost Thunder", "Team Up", "Detective Pikachu", "Unbroken Bonds"],
            2: ["Unified Minds", "Hidden Fates", "Hidden Fates Shiny Vault", "McDonald's Collection 2019", "Cosmic Eclipse"],
            3: ["SWSH Black Star Promos"]
        }
    },
    8: {
        label: "Sword & Shield",
        batches: {
            1: ["Sword & Shield", "Rebel Clash", "Darkness Ablaze", "Pokémon Futsal Collection", "Champion's Path", "Vivid Voltage", "McDonald's Collection 2021"],
            2: ["Shining Fates", "Shining Fates Shiny Vault", "Battle Styles", "Chilling Reign", "Evolving Skies", "Fusion Strike", "Brilliant Stars", "Brilliant Stars Trainer Gallery"],
            3: ["Celebrations", "Celebrations: Classic Collection", "Astral Radiance", "Astral Radiance Trainer Gallery", "Pokémon GO", "McDonald's Collection 2022", "Lost Origin", "Lost Origin Trainer Gallery"],
            4: ["Silver Tempest", "Silver Tempest Trainer Gallery", "Scarlet & Violet Black Star Promos", "Crown Zenith", "Crown Zenith Galarian Gallery"]
        }
    },
    9: {
        label: "Scarlet & Violet and Later",
        batches: {
            1: ["Scarlet & Violet", "Scarlet & Violet Energies", "Paldea Evolved", "Obsidian Flames", "McDonald's Collection 2023", "151", "Paradox Rift"],
            2: ["Pokémon TCG Classic - Blastoise", "Pokémon TCG Classic - Charizard", "Pokémon TCG Classic - Venusaur", "Paldean Fates", "Temporal Forces", "Twilight Masquerade", "Shrouded Fable", "Stellar Crown"],
            3: ["Genetic Apex", "Promo-A", "Surging Sparks", "Mythical Island", "Prismatic Evolutions", "McDonald's Collection 2024", "Space-Time Smackdown", "Triumphant Light", "Shining Revelry"],
            4: ["Journey Together", "Celestial Guardians", "Extradimensional Crisis", "Destined Rivals", "Eevee Grove", "Black Bolt", "White Flare"],
            5: ["Wisdom of Sea and Sky", "Secluded Springs", "Mega Evolution", "Mega Evolution Black Star Promos", "Mega Evolution Energies", "Deluxe Pack ex"],
            6: ["Mega Rising", "Promo-B", "Phantasmal Flames", "Crimson Blaze", "Fantastical Parade", "Ascended Heroes", "Paldean Wonders", "Mega Shine"],
            7: ["Perfect Order", "Pulsing Aura", "Chaos Rising", "Paradox Drive", "Everyday Wonders", "Pitch Black", "Ruler of the Skies", "Team Rocket's Ambition"]
        }
    },
    10: {
        label: "Supplemental Products",
        batches: {
            1: ["Miscellaneous", "Base Set 2", "Southern Islands", "Best of Game", "Nintendo Black Star Promos", "EX Trainer Kit Latias", "EX Trainer Kit Latios", "Poké Card Creator Pack"],
            2: ["POP Series 1", "POP Series 2", "EX Trainer Kit 2 Minun", "EX Trainer Kit 2 Plusle", "POP Series 3", "POP Series 4", "POP Series 5", "DP Black Star Promos"],
            3: ["DP Trainer Kit Lucario", "DP Trainer Kit Manaphy", "POP Series 6", "POP Series 7", "POP Series 8", "POP Series 9", "Pokémon Rumble"]
        }
    }
};
const waveArgumentIndex = process.argv.indexOf("--wave");
const batchArgumentIndex = process.argv.indexOf("--batch");
const syncExpansionsOnly = process.argv.includes("--sync-expansions-only");
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

function deduplicateExpansions(expansions) {
    const expansionsById = new Map();
    for (const expansion of expansions) {
        const id = String(expansion?.id || "").trim();
        if (id) {
            expansionsById.set(id, expansion);
        }
    }
    return Array.from(expansionsById.values());
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
    const fetchedExpansionIds = new Set();
    let recordsFetched = 0;
    let page = 1;
    let total = Number.POSITIVE_INFINITY;

    while (recordsFetched < total) {
        const payload = await fetchScrydex("expansions", {
            page,
            pageSize: PAGE_SIZE,
            orderBy: "id",
            select: "id,name,release_date,printed_total,total,language"
        });
        const items = Array.isArray(payload?.data) ? payload.data : [];
        recordsFetched += items.length;
        for (const expansion of items.filter(isEnglish)) {
            const id = String(expansion?.id || "").trim();
            if (!id) {
                throw new Error(`Expansion page ${page} returned a record without an id`);
            }
            if (fetchedExpansionIds.has(id)) {
                throw new Error(`Expansion pagination returned duplicate id ${id} on page ${page}`);
            }
            fetchedExpansionIds.add(id);
            expansions.push(expansion);
        }
        total = payloadTotal(payload, recordsFetched);
        if (items.length < PAGE_SIZE) {
            break;
        }
        page += 1;
    }

    if (recordsFetched < total) {
        throw new Error(`Expansion pagination ended after ${recordsFetched} of ${total} records`);
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
    if (!apiKey || !teamId) {
        throw new Error("SCRYDEX_API_KEY and SCRYDEX_TEAM_ID must be set in .env.local");
    }

    const setsCachePath = path.join(DATA_DIR, "pokemon-sets-scrydex.json");
    if (syncExpansionsOnly) {
        const expansionRecords = await fetchAllExpansions();
        const expansions = deduplicateExpansions(expansionRecords).map(normalizeExpansion);
        await fs.mkdir(DATA_DIR, { recursive: true });
        await writeJsonAtomic(setsCachePath, {
            syncedAt: new Date().toISOString(),
            language: "en",
            items: expansions
        });
        console.log(JSON.stringify({ status: "success", scrydexRequests: requestCount, expansionsImported: expansions.length }, null, 2));
        return;
    }
    if (!Array.isArray(WAVE.sets)) {
        const availableWaves = Object.keys(WAVES).join(", ");
        const availableBatches = waveConfig ? Object.keys(waveConfig.batches).join(", ") : "none";
        throw new Error(`Unknown wave ${waveNumber}, batch ${batchNumber}. Available waves: ${availableWaves}; batches for this wave: ${availableBatches}`);
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
    const cardsCachePath = path.join(DATA_DIR, `pokemon-cards-scrydex-wave-${WAVE.number}.json`);
    const existingSetsCache = await readJsonIfPresent(setsCachePath);
    const existingCardsCache = await readJsonIfPresent(cardsCachePath);
    const expansionRecords = deduplicateExpansions(Array.isArray(existingSetsCache?.items) && existingSetsCache.items.length > 0
        ? existingSetsCache.items
        : await fetchAllExpansions());
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