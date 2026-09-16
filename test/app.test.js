const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const test = require("node:test");

const app = require("../server");

const ROOT_DIR = path.resolve(__dirname, "..");
const PUBLIC_RUNTIME_FILES = [
    "index.js",
    "scripts/components/mobile-nav.js",
    "scripts/pages/card-page.js",
    "scripts/pages/inventory-filters.js",
    "scripts/pages/kings.js",
    "scripts/pages/sets.js"
];

let server;
let baseUrl;

test.before(async () => {
    await new Promise((resolve) => {
        server = app.listen(0, "127.0.0.1", resolve);
    });
    const address = server.address();
    baseUrl = `http://127.0.0.1:${address.port}`;
});

test.after(async () => {
    await new Promise((resolve, reject) => {
        server.close((error) => error ? reject(error) : resolve());
    });
});

test("health endpoint responds successfully", async () => {
    const response = await fetch(`${baseUrl}/api/health`);
    const payload = await response.json();

    assert.equal(response.status, 200);
    assert.equal(payload.status, "ok");
    assert.equal(payload.service, "shalimar-cards-api");
});

test("Pokemon sets come from the complete local Scrydex cache", async () => {
    const response = await fetch(`${baseUrl}/api/pokemon/sets`);
    const payload = await response.json();

    assert.equal(response.status, 200);
    assert.equal(payload.source, "cache");
    assert.equal(payload.total, 222);
    assert.equal(payload.setMetadata.length, 222);
    assert.ok(payload.setMetadata.every((set) => set.id && set.name && set.releaseDate));
    assert.ok(payload.setMetadata.every((set) => set.total > 0 || set.printedTotal > 0));
});

test("Pokemon cards paginate complete Dex families from local cache", async () => {
    const response = await fetch(`${baseUrl}/api/pokemon/cards?cached=all&dex=25&limit=18`);
    const payload = await response.json();

    assert.equal(response.status, 200);
    assert.equal(payload.source, "cache");
    assert.equal(payload.total, 223);
    assert.equal(payload.items.length, 18);
    assert.equal(new Set(payload.items.map((card) => card.id)).size, 18);
    assert.equal(payload.hasMore, true);
});

test("public pages and local Pokemon APIs do not call TCGdex", async () => {
    for (const relativePath of PUBLIC_RUNTIME_FILES) {
        const source = await fs.readFile(path.join(ROOT_DIR, relativePath), "utf8");
        assert.doesNotMatch(source, /(?:api|assets)\.tcgdex\.net/, relativePath);
    }
});

test("home suggestions render API text through textContent", async () => {
    const source = await fs.readFile(path.join(ROOT_DIR, "index.js"), "utf8");

    assert.match(source, /name\.textContent = item\.name/);
    assert.match(source, /meta\.textContent = metaParts\.join/);
    assert.doesNotMatch(source, /<span class="hero__search-suggestion-name">\$\{item\.name\}/);
});
