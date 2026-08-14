#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const OUT_FILE = path.join(ROOT, "tmp-yyh-singles-2026-08-09-to-2026-08-14.csv");

const SETS = ["Dark Tournament", "Exile", "Gateway", "Ghost Files"];
const START = new Date("2026-08-09T00:00:00.000Z");
const END = new Date("2026-08-14T23:59:59.999Z");
const MAX_PAGES = 3;
const PER_PAGE = 200;

function normalizeForSearch(value) {
    return String(value || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}

function looksLikeSingle(title, setName) {
    const titleNorm = normalizeForSearch(title);
    const setTokens = normalizeForSearch(setName).split(" ").filter(Boolean);
    const includesSet = setTokens.every((token) => titleNorm.includes(token));
    const includesCoreTerms =
        titleNorm.includes("yu") &&
        titleNorm.includes("hakusho") &&
        titleNorm.includes("tcg");

    const excludedTerms = [
        "booster",
        "box",
        "pack",
        "blister",
        "starter",
        "deck",
        "display",
        "case",
        "sealed",
        "lot",
        "binder",
        "collection",
        "playset",
        "set of",
        "factory",
        "empty",
        "signed",
        "autograph",
        "full set"
    ];
    const hasExcluded = excludedTerms.some((term) => titleNorm.includes(term));

    return includesSet && includesCoreTerms && !hasExcluded;
}

function isInsideWindow(item) {
    const rawDate = item.itemCreationDate || item.itemEndDate || "";
    if (!rawDate) {
        return false;
    }

    const parsed = new Date(rawDate);
    if (!Number.isFinite(parsed.getTime())) {
        return false;
    }

    return parsed >= START && parsed <= END;
}

function csvEscape(value) {
    const text = String(value ?? "");
    if (/[",\n]/.test(text)) {
        return `"${text.replace(/"/g, '""')}"`;
    }
    return text;
}

async function main() {
    const rows = [];

    for (const setName of SETS) {
        for (let page = 0; page < MAX_PAGES; page += 1) {
            const offset = page * PER_PAGE;
            const query = encodeURIComponent(`${setName} yu yu hakusho tcg`);
            const url = `http://127.0.0.1:3000/api/ebay/search?q=${query}&limit=${PER_PAGE}&offset=${offset}&sort=newlyListed`;
            const response = await fetch(url);
            if (!response.ok) {
                break;
            }

            const payload = await response.json();
            const items = Array.isArray(payload.items) ? payload.items : [];
            if (items.length === 0) {
                break;
            }

            for (const item of items) {
                if (!looksLikeSingle(item.title, setName)) {
                    continue;
                }

                if (!isInsideWindow(item)) {
                    continue;
                }

                rows.push({
                    Title: item.title,
                    "Sold Price": item.currentPrice,
                    Date: item.itemCreationDate || item.itemEndDate || "",
                    Set: setName
                });
            }

            if (items.length < PER_PAGE) {
                break;
            }
        }
    }

    const lines = ["Title,Sold Price,Date,Set"];
    for (const row of rows) {
        lines.push([
            csvEscape(row.Title),
            csvEscape(row["Sold Price"]),
            csvEscape(row.Date),
            csvEscape(row.Set)
        ].join(","));
    }

    fs.writeFileSync(OUT_FILE, `${lines.join("\n")}\n`, "utf8");
    console.log(`Wrote ${rows.length} rows to ${OUT_FILE}`);
}

main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
});
