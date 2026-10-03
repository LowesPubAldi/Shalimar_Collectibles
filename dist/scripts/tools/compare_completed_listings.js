#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const PRICING_DIR = path.join(ROOT, "data", "pricing", "yyh");

function normalizeForSearch(value) {
    return String(value || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}

function parseMoney(value) {
    if (typeof value === "number" && Number.isFinite(value)) {
        return value;
    }

    const cleaned = String(value || "").replace(/[^0-9.-]+/g, "").trim();
    if (!cleaned) {
        return null;
    }

    const parsed = Number(cleaned);
    return Number.isFinite(parsed) ? parsed : null;
}

function parseRangeFromText(text) {
    const raw = String(text || "");
    const matches = [...raw.matchAll(/\$?\s*(\d+(?:\.\d+)?)/g)].map((entry) => Number(entry[1]));
    if (matches.length >= 2) {
        const min = Math.min(matches[0], matches[1]);
        const max = Math.max(matches[0], matches[1]);
        return { min, max, source: "notes" };
    }
    if (matches.length === 1) {
        return { min: matches[0], max: matches[0], source: "notes-single" };
    }
    return null;
}

function parseCsv(text) {
    const rows = [];
    let cell = "";
    let row = [];
    let inQuotes = false;

    for (let i = 0; i < text.length; i += 1) {
        const ch = text[i];
        const next = text[i + 1];

        if (inQuotes) {
            if (ch === '"' && next === '"') {
                cell += '"';
                i += 1;
                continue;
            }
            if (ch === '"') {
                inQuotes = false;
                continue;
            }
            cell += ch;
            continue;
        }

        if (ch === '"') {
            inQuotes = true;
            continue;
        }

        if (ch === ",") {
            row.push(cell);
            cell = "";
            continue;
        }

        if (ch === "\n") {
            row.push(cell);
            rows.push(row);
            row = [];
            cell = "";
            continue;
        }

        if (ch === "\r") {
            continue;
        }

        cell += ch;
    }

    if (cell.length > 0 || row.length > 0) {
        row.push(cell);
        rows.push(row);
    }

    if (rows.length === 0) {
        return [];
    }

    const headers = rows[0].map((header) => String(header || "").trim());
    return rows.slice(1).filter((dataRow) => dataRow.some((value) => String(value || "").trim() !== "")).map((dataRow) => {
        const record = {};
        for (let i = 0; i < headers.length; i += 1) {
            record[headers[i]] = dataRow[i] ?? "";
        }
        return record;
    });
}

function median(values) {
    if (!values.length) {
        return null;
    }
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
        return (sorted[mid - 1] + sorted[mid]) / 2;
    }
    return sorted[mid];
}

function detectColumn(row, candidates) {
    const keys = Object.keys(row);
    for (const candidate of candidates) {
        const exact = keys.find((key) => key.toLowerCase() === candidate.toLowerCase());
        if (exact) {
            return exact;
        }
    }

    for (const key of keys) {
        const lower = key.toLowerCase();
        if (candidates.some((candidate) => lower.includes(candidate.toLowerCase()))) {
            return key;
        }
    }

    return null;
}

function loadPricingRecords(options) {
    const fallbackTolerancePercent = options.fallbackTolerancePercent;
    const files = fs.readdirSync(PRICING_DIR)
        .filter((name) => name.endsWith("-pricing.json"));

    const records = [];

    for (const fileName of files) {
        const fullPath = path.join(PRICING_DIR, fileName);
        let payload = null;
        try {
            const raw = fs.readFileSync(fullPath, "utf8").replace(/^\uFEFF/, "");
            payload = JSON.parse(raw);
        } catch (error) {
            console.warn(`Skipping pricing file due to JSON parse error: ${fullPath}`);
            console.warn(`Reason: ${error instanceof Error ? error.message : String(error)}`);
            continue;
        }
        const setName = String(payload.set || fileName.replace(/-pricing\.json$/i, ""));
        const items = Array.isArray(payload.items) ? payload.items : [];

        for (const item of items) {
            const priceUsd = parseMoney(item.priceUsd);
            if (priceUsd === null) {
                continue;
            }

            const notesRange = parseRangeFromText(item.notes);
            const fallbackSpread = priceUsd * (fallbackTolerancePercent / 100);
            const defaultRange = {
                min: Math.max(0, priceUsd - fallbackSpread),
                max: priceUsd + fallbackSpread,
                source: "priceUsd-tolerance"
            };
            const range = notesRange || defaultRange;

            const id = String(item.id || "").trim().toUpperCase();
            const name = String(item.name || "").trim();
            const variant = String(item.variant || "Standard").trim();

            records.push({
                set: setName,
                id,
                name,
                variant,
                expectedPriceUsd: priceUsd,
                minExpectedUsd: range.min,
                maxExpectedUsd: range.max,
                rangeSource: range.source,
                searchName: normalizeForSearch(name),
                searchSet: normalizeForSearch(setName)
            });
        }
    }

    return records;
}

function extractCardIdFromTitle(title) {
    const normalized = String(title || "").toUpperCase();
    const match = normalized.match(/\b([A-Z]{1,3}\d{1,3}(?:\/\d{1,3})?)\b/);
    return match ? match[1] : "";
}

function scoreCandidate(titleNorm, idInTitle, candidate) {
    let score = 0;

    if (idInTitle && candidate.id && idInTitle === candidate.id) {
        score += 100;
    }

    if (candidate.searchName && titleNorm.includes(candidate.searchName)) {
        score += 40;
    }

    const nameTokens = candidate.searchName.split(" ").filter((token) => token.length >= 4);
    if (nameTokens.length > 0) {
        const matchedTokens = nameTokens.filter((token) => titleNorm.includes(token)).length;
        score += matchedTokens * 5;
    }

    if (candidate.searchSet && titleNorm.includes(candidate.searchSet)) {
        score += 8;
    }

    if (candidate.variant && candidate.variant.toLowerCase() !== "standard") {
        const variantNorm = normalizeForSearch(candidate.variant);
        if (variantNorm && titleNorm.includes(variantNorm)) {
            score += 8;
        }
    }

    return score;
}

function pickBestMatch(title, pricingRecords, options = {}) {
    const titleNorm = normalizeForSearch(title);
    const idInTitle = extractCardIdFromTitle(title);
    const strictMatch = options.strictMatch !== false;
    const minScore = Number.isFinite(options.minScore) ? options.minScore : 25;

    let best = null;
    let bestScore = 0;
    let bestMeta = null;

    for (const candidate of pricingRecords) {
        const score = scoreCandidate(titleNorm, idInTitle, candidate);
        if (score > bestScore) {
            best = candidate;
            bestScore = score;

            const setExact = Boolean(candidate.searchSet && titleNorm.includes(candidate.searchSet));
            const idExact = Boolean(idInTitle && candidate.id && idInTitle === candidate.id);
            const nameTokens = candidate.searchName.split(" ").filter((token) => token.length >= 4);
            const nameTokenMatches = nameTokens.filter((token) => titleNorm.includes(token)).length;
            bestMeta = {
                setExact,
                idExact,
                nameTokenMatches
            };
        }
    }

    if (!best || bestScore < minScore) {
        return null;
    }

    if (strictMatch) {
        // Strict mode rejects fuzzy cross-set/name collisions.
        const hasStrongNameEvidence = bestMeta && bestMeta.nameTokenMatches >= 2;
        const hasStrongIdEvidence = bestMeta && bestMeta.idExact;
        const isSetAligned = bestMeta && bestMeta.setExact;
        if (!isSetAligned || (!hasStrongIdEvidence && !hasStrongNameEvidence)) {
            return null;
        }
    }

    return { card: best, score: bestScore };
}

function buildCardKey(card) {
    return [card.set, card.id || "NO-ID", card.name, card.variant]
        .map((part) => String(part || "").trim())
        .join("||");
}

function formatUsd(value) {
    return `$${Number(value).toFixed(2)}`;
}

function parseArgs(argv) {
    const out = {
        csv: "",
        outJson: "",
        outCsv: "",
        fallbackTolerancePercent: 20,
        minScore: 25,
        strictMatch: true
    };

    for (let i = 2; i < argv.length; i += 1) {
        const token = argv[i];
        if (token === "--csv") {
            out.csv = argv[i + 1] || "";
            i += 1;
            continue;
        }
        if (token === "--out-json") {
            out.outJson = argv[i + 1] || "";
            i += 1;
            continue;
        }
        if (token === "--out-csv") {
            out.outCsv = argv[i + 1] || "";
            i += 1;
            continue;
        }
        if (token === "--fallback-tolerance") {
            const parsed = Number(argv[i + 1]);
            if (Number.isFinite(parsed) && parsed >= 0) {
                out.fallbackTolerancePercent = parsed;
            }
            i += 1;
            continue;
        }

        if (token === "--min-score") {
            const parsed = Number(argv[i + 1]);
            if (Number.isFinite(parsed) && parsed >= 0) {
                out.minScore = parsed;
            }
            i += 1;
            continue;
        }

        if (token === "--strict-match") {
            const value = String(argv[i + 1] || "").trim().toLowerCase();
            if (value === "0" || value === "false" || value === "off") {
                out.strictMatch = false;
            } else if (value) {
                out.strictMatch = true;
            }
            i += 1;
            continue;
        }
    }

    return out;
}

function writeCsv(filePath, rows) {
    const header = [
        "set",
        "id",
        "name",
        "variant",
        "baselineMinUsd",
        "baselineMaxUsd",
        "baselineMidUsd",
        "observedMedianUsd",
        "observedMinUsd",
        "observedMaxUsd",
        "sampleSize",
        "status",
        "deltaPct"
    ];

    const lines = [header.join(",")];
    for (const row of rows) {
        const cells = [
            row.set,
            row.id,
            row.name,
            row.variant,
            row.baselineMinUsd,
            row.baselineMaxUsd,
            row.baselineMidUsd,
            row.observedMedianUsd,
            row.observedMinUsd,
            row.observedMaxUsd,
            row.sampleSize,
            row.status,
            row.deltaPct
        ].map((value) => {
            const text = String(value ?? "");
            if (/[,"\n]/.test(text)) {
                return `"${text.replace(/"/g, '""')}"`;
            }
            return text;
        });
        lines.push(cells.join(","));
    }

    fs.writeFileSync(filePath, `${lines.join("\n")}\n`, "utf8");
}

function main() {
    const args = parseArgs(process.argv);
    if (!args.csv) {
        console.error("Usage: node scripts/tools/compare_completed_listings.js --csv <completed-listings.csv> [--out-json <report.json>] [--out-csv <report.csv>] [--fallback-tolerance 20]");
        process.exit(1);
    }

    const csvPath = path.isAbsolute(args.csv) ? args.csv : path.join(ROOT, args.csv);
    if (!fs.existsSync(csvPath)) {
        console.error(`CSV file not found: ${csvPath}`);
        process.exit(1);
    }

    const pricingRecords = loadPricingRecords(args);
    const rawCsv = fs.readFileSync(csvPath, "utf8");
    const rows = parseCsv(rawCsv);

    if (rows.length === 0) {
        console.error("CSV file has no data rows.");
        process.exit(1);
    }

    const sample = rows[0];
    const titleColumn = detectColumn(sample, ["title", "item title", "listing title", "name"]);
    const priceColumn = detectColumn(sample, ["sold price", "price", "sale price", "amount"]);
    const dateColumn = detectColumn(sample, ["end date", "date", "sold date", "time"]);

    if (!titleColumn || !priceColumn) {
        console.error("Could not detect required CSV columns. Need title and sold price columns.");
        console.error(`Detected headers: ${Object.keys(sample).join(", ")}`);
        process.exit(1);
    }

    const matchedByCard = new Map();
    let matchedRows = 0;
    let unmatchedRows = 0;

    for (const row of rows) {
        const title = String(row[titleColumn] || "").trim();
        const salePrice = parseMoney(row[priceColumn]);

        if (!title || salePrice === null) {
            continue;
        }

        const bestMatch = pickBestMatch(title, pricingRecords, {
            strictMatch: args.strictMatch,
            minScore: args.minScore
        });
        if (!bestMatch) {
            unmatchedRows += 1;
            continue;
        }

        const card = bestMatch.card;
        const key = buildCardKey(card);
        if (!matchedByCard.has(key)) {
            matchedByCard.set(key, {
                set: card.set,
                id: card.id,
                name: card.name,
                variant: card.variant,
                baselineMinUsd: card.minExpectedUsd,
                baselineMaxUsd: card.maxExpectedUsd,
                baselineMidUsd: card.expectedPriceUsd,
                rangeSource: card.rangeSource,
                samples: []
            });
        }

        matchedByCard.get(key).samples.push({
            title,
            salePrice,
            date: dateColumn ? String(row[dateColumn] || "").trim() : "",
            score: bestMatch.score
        });

        matchedRows += 1;
    }

    const comparisons = [];

    for (const entry of matchedByCard.values()) {
        const prices = entry.samples.map((sampleRow) => sampleRow.salePrice).filter((value) => Number.isFinite(value));
        if (prices.length === 0) {
            continue;
        }

        const observedMedian = median(prices);
        const observedMin = Math.min(...prices);
        const observedMax = Math.max(...prices);

        let status = "in-range";
        let deltaPct = 0;

        if (observedMedian < entry.baselineMinUsd) {
            status = "below-range";
            deltaPct = ((observedMedian - entry.baselineMinUsd) / entry.baselineMinUsd) * 100;
        } else if (observedMedian > entry.baselineMaxUsd) {
            status = "above-range";
            deltaPct = ((observedMedian - entry.baselineMaxUsd) / entry.baselineMaxUsd) * 100;
        }

        comparisons.push({
            set: entry.set,
            id: entry.id,
            name: entry.name,
            variant: entry.variant,
            baselineMinUsd: Number(entry.baselineMinUsd.toFixed(2)),
            baselineMaxUsd: Number(entry.baselineMaxUsd.toFixed(2)),
            baselineMidUsd: Number(entry.baselineMidUsd.toFixed(2)),
            observedMedianUsd: Number(observedMedian.toFixed(2)),
            observedMinUsd: Number(observedMin.toFixed(2)),
            observedMaxUsd: Number(observedMax.toFixed(2)),
            sampleSize: prices.length,
            status,
            deltaPct: Number(deltaPct.toFixed(2)),
            rangeSource: entry.rangeSource
        });
    }

    comparisons.sort((a, b) => {
        const severityA = Math.abs(a.deltaPct);
        const severityB = Math.abs(b.deltaPct);
        if (severityA !== severityB) {
            return severityB - severityA;
        }
        return b.sampleSize - a.sampleSize;
    });

    const out = {
        generatedAt: new Date().toISOString(),
        csvPath,
        matchedRows,
        unmatchedRows,
        distinctCardsMatched: comparisons.length,
        summary: {
            belowRange: comparisons.filter((row) => row.status === "below-range").length,
            inRange: comparisons.filter((row) => row.status === "in-range").length,
            aboveRange: comparisons.filter((row) => row.status === "above-range").length
        },
        comparisons
    };

    if (args.outJson) {
        const outJsonPath = path.isAbsolute(args.outJson) ? args.outJson : path.join(ROOT, args.outJson);
        fs.writeFileSync(outJsonPath, `${JSON.stringify(out, null, 2)}\n`, "utf8");
        console.log(`Wrote JSON report: ${outJsonPath}`);
    }

    if (args.outCsv) {
        const outCsvPath = path.isAbsolute(args.outCsv) ? args.outCsv : path.join(ROOT, args.outCsv);
        writeCsv(outCsvPath, comparisons);
        console.log(`Wrote CSV report: ${outCsvPath}`);
    }

    console.log("--- Comparison Summary ---");
    console.log(`Rows matched to pricing records: ${matchedRows}`);
    console.log(`Rows unmatched: ${unmatchedRows}`);
    console.log(`Distinct cards compared: ${comparisons.length}`);
    console.log(`Below range: ${out.summary.belowRange}`);
    console.log(`In range: ${out.summary.inRange}`);
    console.log(`Above range: ${out.summary.aboveRange}`);

    const topOutliers = comparisons.filter((row) => row.status !== "in-range").slice(0, 12);
    if (topOutliers.length > 0) {
        console.log("\nTop out-of-range cards (by variance):");
        for (const row of topOutliers) {
            console.log(
                `${row.set} | ${row.id || "NO-ID"} | ${row.name} | ${row.variant} | median ${formatUsd(row.observedMedianUsd)} vs baseline ${formatUsd(row.baselineMinUsd)}-${formatUsd(row.baselineMaxUsd)} | ${row.status} (${row.deltaPct}%) | n=${row.sampleSize}`
            );
        }
    }
}

main();
