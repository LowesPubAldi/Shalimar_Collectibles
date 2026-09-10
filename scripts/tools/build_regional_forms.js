const fs = require("fs/promises");
const path = require("path");

const API_ROOT = "https://pokeapi.co/api/v2";
const REGION_RULES = [
    { region: "alola", matches: (name) => name.endsWith("-alola") && name !== "raticate-totem-alola" },
    { region: "galar", matches: (name) => (name.endsWith("-galar") || name === "darmanitan-galar-standard") && name !== "darmanitan-galar-zen" },
    { region: "hisui", matches: (name) => name.endsWith("-hisui") },
    { region: "paldea", matches: (name) => name.endsWith("-paldea") || name.startsWith("tauros-paldea-") }
];

async function fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${response.status} ${url}`);
    return response.json();
}

async function fetchBasePokemon(baseName) {
    try {
        return await fetchJson(`${API_ROOT}/pokemon/${baseName}`);
    } catch (error) {
        if (baseName === "darmanitan") return fetchJson(`${API_ROOT}/pokemon/darmanitan-standard`);
        throw error;
    }
}

function idFromUrl(url) {
    return Number(url.split("/").filter(Boolean).pop());
}

function evolutionPosition(node, speciesName, rootId, depth = 0) {
    if (node.species.name === speciesName) return { rootId, stage: depth };
    for (const child of node.evolves_to) {
        const position = evolutionPosition(child, speciesName, rootId, depth + 1);
        if (position) return position;
    }
    return null;
}

async function main() {
    const index = await fetchJson(`${API_ROOT}/pokemon-form?limit=20000`);
    const selected = index.results.flatMap((entry) => {
        const rule = REGION_RULES.find((candidate) => candidate.matches(entry.name));
        return rule ? [{ ...entry, region: rule.region }] : [];
    });
    const baseCache = new Map();
    const speciesCache = new Map();
    const evolutionCache = new Map();
    const records = [];
    for (const entry of selected) {
        const form = await fetchJson(entry.url);
        const regional = await fetchJson(form.pokemon.url);
        const baseName = regional.species.name;
        if (!baseCache.has(baseName)) baseCache.set(baseName, fetchBasePokemon(baseName));
        if (!speciesCache.has(baseName)) speciesCache.set(baseName, fetchJson(`${API_ROOT}/pokemon-species/${baseName}`));
        const original = await baseCache.get(baseName);
        const species = await speciesCache.get(baseName);
        const chainUrl = species.evolution_chain.url;
        if (!evolutionCache.has(chainUrl)) evolutionCache.set(chainUrl, fetchJson(chainUrl));
        const chain = await evolutionCache.get(chainUrl);
        const position = evolutionPosition(chain.chain, baseName, idFromUrl(chain.chain.species.url)) || { rootId: original.id, stage: 0 };
        records.push({
            region: entry.region,
            formName: form.name,
            baseName,
            baseId: original.id,
            evolutionRootId: position.rootId,
            evolutionStage: position.stage,
            sprite: form.sprites.front_default || regional.sprites.front_default,
            types: regional.types.map((type) => type.type.name),
            originalSprite: original.sprites.front_default,
            originalTypes: original.types.map((type) => type.type.name)
        });
    }
    records.sort((left, right) => left.region.localeCompare(right.region) || left.evolutionRootId - right.evolutionRootId || left.evolutionStage - right.evolutionStage || left.baseId - right.baseId || left.formName.localeCompare(right.formName));
    await fs.writeFile(path.resolve("data/regional-forms.json"), `${JSON.stringify(records, null, 2)}\n`);
    console.log(`Wrote ${records.length} regional forms.`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});