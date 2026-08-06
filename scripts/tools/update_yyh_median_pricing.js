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
    return rows
        .slice(1)
        .filter((dataRow) => dataRow.some((value) => String(value || "").trim() !== ""))
        .map((dataRow) => {
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

function pickBestMatch(title, pricingRecords, scoreThreshold) {
    const titleNorm = normalizeForSearch(title);
    const idInTitle = extractCardIdFromTitle(title);

    let best = null;
    let bestScore = 0;

    for (const candidate of pricingRecords) {
        const score = scoreCandidate(titleNorm, idInTitle, candidate);
        if (score > bestScore) {
            best = candidate;
            bestScore = score;
        }
    }

    if (bestScore < scoreThreshold) {
        return null;
    }

    return { card: best, score: bestScore };
}

function resolvePath(inputPath) {
    return path.isAbsolute(inputPath) ? inputPath : path.join(ROOT, inputPath);
}

function parseArgs(argv) {
    const out = {
        csvPaths: [],
        csvDir: "",
        minSamples: 2,
        scoreThreshold: 25,
        suspiciousDeltaPct: 25,
        applySuspicious: false,
        markSuspiciousNeedsReview: true,
        fallbackTolerancePercent: 20,
        write: false,
        reportJson: "",
        suspiciousJson: "",
        suspiciousCsv: "",
        setFilter: ""
    };

    for (let i = 2; i < argv.length; i += 1) {
        const token = argv[i];

        if (token === "--csv") {
            const value = argv[i + 1] || "";
            if (value) {
                out.csvPaths.push(value);
            }
            i += 1;
            continue;
        }

        if (token === "--csv-dir") {
            out.csvDir = argv[i + 1] || "";
            i += 1;
            continue;
        }

        if (token === "--min-samples") {
            const parsed = Number(argv[i + 1]);
            if (Number.isFinite(parsed) && parsed >= 1) {
                out.minSamples = parsed;
            }
            i += 1;
            continue;
        }

        if (token === "--score-threshold") {
            const parsed = Number(argv[i + 1]);
            if (Number.isFinite(parsed) && parsed >= 1) {
                out.scoreThreshold = parsed;
            }
            i += 1;
            continue;
        }

        if (token === "--suspicious-delta-pct") {
            const parsed = Number(argv[i + 1]);
            if (Number.isFinite(parsed) && parsed >= 0) {
                out.suspiciousDeltaPct = parsed;
            }
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

        if (token === "--set") {
            out.setFilter = String(argv[i + 1] || "").trim();
            i += 1;
            continue;
        }

        if (token === "--report-json") {
            out.reportJson = argv[i + 1] || "";
            i += 1;
            continue;
        }

        if (token === "--suspicious-json") {
            out.suspiciousJson = argv[i + 1] || "";
            i += 1;
            continue;
        }

        if (token === "--suspicious-csv") {
            out.suspiciousCsv = argv[i + 1] || "";
            i += 1;
            continue;
        }

        if (token === "--write") {
            out.write = true;
            continue;
        }

        if (token === "--apply-suspicious") {
            out.applySuspicious = true;
            continue;
        }

        if (token === "--no-mark-suspicious-needs-review") {
            out.markSuspiciousNeedsReview = false;
            continue;
        }
    }

    return out;
}

function uniqueSorted(values) {
    return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

function listCsvFilesFromDir(dirPath) {
    const files = fs.readdirSync(dirPath, { withFileTypes: true })
        .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".csv"))
        .map((entry) => path.join(dirPath, entry.name));
    return uniqueSorted(files);
}

function loadPricingCatalog(options) {
    const files = fs.readdirSync(PRICING_DIR)
        .filter((name) => name.endsWith("-pricing.json"))
        .sort((a, b) => a.localeCompare(b));

    const records = [];
    const payloadByFile = new Map();

    const setFilterNorm = normalizeForSearch(options.setFilter);

    for (const fileName of files) {
        const fullPath = path.join(PRICING_DIR, fileName);
        const raw = fs.readFileSync(fullPath, "utf8").replace(/^\uFEFF/, "");
        const payload = JSON.parse(raw);
        payloadByFile.set(fullPath, payload);

        const setName = String(payload.set || fileName.replace(/-pricing\.json$/i, "")).trim();
        const setNorm = normalizeForSearch(setName);
        if (setFilterNorm && setNorm !== setFilterNorm) {
            continue;
        }

        const items = Array.isArray(payload.items) ? payload.items : [];
        for (let i = 0; i < items.length; i += 1) {
            const item = items[i];
            const id = String(item.id || "").trim().toUpperCase();
            const name = String(item.name || "").trim();
            const variant = String(item.variant || "Standard").trim();
            if (!name) {
                continue;
            }

            records.push({
                filePath: fullPath,
                itemIndex: i,
                set: setName,
                id,
                name,
                variant,
                searchName: normalizeForSearch(name),
                searchSet: setNorm
            });
        }
    }

    return { records, payloadByFile };
}

function usd(value) {
    return `$${Number(value).toFixed(2)}`;
}

function formatDateYmd(dateObj) {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, "0");
    const d = String(dateObj.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

function buildMedianNotes(existing, stats) {
    const baselineMarker = " | Baseline: ";
    const existingText = String(existing || "").trim();

    let baseline = "";
    if (existingText.includes(baselineMarker)) {
        const parts = existingText.split(baselineMarker);
        baseline = parts.slice(1).join(baselineMarker).trim();
    } else if (existingText && !existingText.toLowerCase().startsWith("median comps:")) {
        baseline = existingText;
    }

    const medianPart = `Median comps: n=${stats.count}, min=${usd(stats.min)}, max=${usd(stats.max)}, updated=${stats.updatedAt}`;
    if (baseline) {
        return `${medianPart}${baselineMarker}${baseline}`;
    }

    return medianPart;
}

function buildSuspiciousReviewNote(existingNotes, reason, stats) {
    const marker = " | Suspicious median review: ";
    const existingText = String(existingNotes || "").trim();
    const baseText = existingText.includes(marker)
        ? existingText.split(marker)[0].trim()
        : existingText;

    const reviewText = `${reason}; n=${stats.count}; observed=${usd(stats.min)}-${usd(stats.max)}; median=${usd(stats.median)}; flagged=${stats.updatedAt}`;
    return `${baseText}${marker}${reviewText}`;
}

function csvEscape(value) {
    const text = String(value ?? "");
    if (/[,"\n]/.test(text)) {
        return `"${text.replace(/"/g, '""')}"`;
    }
    return text;
}

function writeSuspiciousCsv(filePath, rows) {
    const header = [
        "set",
        "id",
        "name",
        "variant",
        "oldPriceUsd",
        "newPriceUsd",
        "baselineMinUsd",
        "baselineMaxUsd",
        "deltaPct",
        "compsCount",
        "observedMinUsd",
        "observedMaxUsd",
        "reason"
    ];

    const lines = [header.join(",")];
    for (const row of rows) {
        lines.push([
            row.set,
            row.id,
            row.name,
            row.variant,
            row.oldPriceUsd,
            row.newPriceUsd,
            row.baselineMinUsd,
            row.baselineMaxUsd,
            row.deltaPct,
            row.compsCount,
            row.observedMinUsd,
            row.observedMaxUsd,
            row.reason
        ].map(csvEscape).join(","));
    }

    fs.writeFileSync(filePath, `${lines.join("\n")}\n`, "utf8");
}

function extractBaselineRange(existingNotes, oldPrice, fallbackTolerancePercent) {
    const baselineMarker = " | Baseline: ";
    const existingText = String(existingNotes || "").trim();
    const baselineText = existingText.includes(baselineMarker)
        ? existingText.split(baselineMarker).slice(1).join(baselineMarker).trim()
        : existingText;

    const notesRange = parseRangeFromText(baselineText);
    if (notesRange) {
        return notesRange;
    }

    if (oldPrice !== null && Number.isFinite(oldPrice)) {
        const spread = oldPrice * (fallbackTolerancePercent / 100);
        return {
            min: Math.max(0, oldPrice - spread),
            max: oldPrice + spread,
            source: "price-tolerance"
        };
    }

    return null;
}

function getSuspiciousAssessment(medianPrice, baselineRange, thresholdPct) {
    if (!baselineRange || !Number.isFinite(medianPrice)) {
        return {
            isSuspicious: false,
            status: "unknown",
            deltaPct: 0,
            thresholdPct,
            reason: "No baseline range available"
        };
    }

    if (medianPrice < baselineRange.min) {
        const deltaPct = baselineRange.min > 0
            ? ((baselineRange.min - medianPrice) / baselineRange.min) * 100
            : 0;
        return {
            isSuspicious: deltaPct >= thresholdPct,
            status: "below-range",
            deltaPct: Number(deltaPct.toFixed(2)),
            thresholdPct,
            reason: `Median is ${Number(deltaPct.toFixed(2))}% below baseline floor ${usd(baselineRange.min)}`
        };
    }

    if (medianPrice > baselineRange.max) {
        const deltaPct = baselineRange.max > 0
            ? ((medianPrice - baselineRange.max) / baselineRange.max) * 100
            : 0;
        return {
            isSuspicious: deltaPct >= thresholdPct,
            status: "above-range",
            deltaPct: Number(deltaPct.toFixed(2)),
            thresholdPct,
            reason: `Median is ${Number(deltaPct.toFixed(2))}% above baseline ceiling ${usd(baselineRange.max)}`
        };
    }

    return {
        isSuspicious: false,
        status: "in-range",
        deltaPct: 0,
        thresholdPct,
        reason: "Median is within baseline range"
    };
}

function main() {
    const args = parseArgs(process.argv);

    const csvPaths = [...args.csvPaths];
    if (args.csvDir) {
        const csvDirPath = resolvePath(args.csvDir);
        if (!fs.existsSync(csvDirPath) || !fs.statSync(csvDirPath).isDirectory()) {
            console.error(`CSV directory not found: ${csvDirPath}`);
            process.exit(1);
        }
        csvPaths.push(...listCsvFilesFromDir(csvDirPath));
    }

    const resolvedCsvPaths = uniqueSorted(csvPaths.map(resolvePath));

    if (resolvedCsvPaths.length === 0) {
        console.error("Usage: node scripts/tools/update_yyh_median_pricing.js --csv <file.csv> [--csv <file2.csv> ...] [--csv-dir <folder>] [--min-samples 2] [--set \"Dark Tournament\"] [--score-threshold 25] [--suspicious-delta-pct 25] [--report-json <out.json>] [--suspicious-json <out.json>] [--suspicious-csv <out.csv>] [--write]");
        process.exit(1);
    }

    for (const csvPath of resolvedCsvPaths) {
        if (!fs.existsSync(csvPath)) {
            console.error(`CSV file not found: ${csvPath}`);
            process.exit(1);
        }
    }

    const { records, payloadByFile } = loadPricingCatalog(args);
    if (records.length === 0) {
        console.error("No pricing records loaded. Check set filter and pricing files.");
        process.exit(1);
    }

    const matchedByItem = new Map();
    const fileStats = [];
    let processedRows = 0;
    let matchedRows = 0;
    let unmatchedRows = 0;

    for (const csvPath of resolvedCsvPaths) {
        const rawCsv = fs.readFileSync(csvPath, "utf8");
        const rows = parseCsv(rawCsv);

        if (rows.length === 0) {
            fileStats.push({ csvPath, rows: 0, matched: 0, unmatched: 0, skipped: true });
            continue;
        }

        const sample = rows[0];
        const titleColumn = detectColumn(sample, ["title", "item title", "listing title", "name"]);
        const priceColumn = detectColumn(sample, ["sold price", "price", "sale price", "amount"]);

        if (!titleColumn || !priceColumn) {
            console.error(`Could not detect title/price columns in ${csvPath}`);
            console.error(`Detected headers: ${Object.keys(sample).join(", ")}`);
            process.exit(1);
        }

        let fileMatched = 0;
        let fileUnmatched = 0;

        for (const row of rows) {
            processedRows += 1;

            const title = String(row[titleColumn] || "").trim();
            const salePrice = parseMoney(row[priceColumn]);
            if (!title || salePrice === null) {
                continue;
            }

            const bestMatch = pickBestMatch(title, records, args.scoreThreshold);
            if (!bestMatch) {
                unmatchedRows += 1;
                fileUnmatched += 1;
                continue;
            }

            matchedRows += 1;
            fileMatched += 1;

            const key = `${bestMatch.card.filePath}::${bestMatch.card.itemIndex}`;
            if (!matchedByItem.has(key)) {
                matchedByItem.set(key, {
                    ...bestMatch.card,
                    prices: []
                });
            }

            matchedByItem.get(key).prices.push(salePrice);
        }

        fileStats.push({ csvPath, rows: rows.length, matched: fileMatched, unmatched: fileUnmatched, skipped: false });
    }

    const today = formatDateYmd(new Date());
    const updatesByFile = new Map();
    const proposedUpdates = [];
    const suspiciousCards = [];
    let needsReviewPlanned = 0;
    let needsReviewApplied = 0;

    for (const entry of matchedByItem.values()) {
        const prices = entry.prices.filter((value) => Number.isFinite(value));
        if (prices.length < args.minSamples) {
            continue;
        }

        const med = median(prices);
        if (med === null) {
            continue;
        }

        const min = Math.min(...prices);
        const max = Math.max(...prices);
        const roundedMedian = Number(med.toFixed(2));

        const payload = payloadByFile.get(entry.filePath);
        const items = Array.isArray(payload?.items) ? payload.items : [];
        const item = items[entry.itemIndex];
        if (!item) {
            continue;
        }

        const oldPrice = parseMoney(item.priceUsd);
        const oldCount = Number(item.compsCount || 0);
        const oldNotes = String(item.notes || "");
        const baselineRange = extractBaselineRange(oldNotes, oldPrice, args.fallbackTolerancePercent);

        const newNotes = buildMedianNotes(oldNotes, {
            count: prices.length,
            min,
            max,
            updatedAt: today
        });

        const suspicion = getSuspiciousAssessment(roundedMedian, baselineRange, args.suspiciousDeltaPct);
        if (suspicion.isSuspicious) {
            suspiciousCards.push({
                set: entry.set,
                id: entry.id,
                name: entry.name,
                variant: entry.variant,
                oldPriceUsd: oldPrice,
                newPriceUsd: roundedMedian,
                baselineMinUsd: baselineRange ? Number(baselineRange.min.toFixed(2)) : null,
                baselineMaxUsd: baselineRange ? Number(baselineRange.max.toFixed(2)) : null,
                compsCount: prices.length,
                observedMinUsd: Number(min.toFixed(2)),
                observedMaxUsd: Number(max.toFixed(2)),
                deltaPct: suspicion.deltaPct,
                reason: suspicion.reason
            });
        }

        if (suspicion.isSuspicious && !args.applySuspicious) {
            if (args.markSuspiciousNeedsReview) {
                const reviewNotes = buildSuspiciousReviewNote(oldNotes, suspicion.reason, {
                    count: prices.length,
                    min,
                    max,
                    median: roundedMedian,
                    updatedAt: today
                });
                const statusNeedsReview = String(item.status || "") !== "Needs Review";
                const reviewNotesChanged = reviewNotes !== oldNotes;
                if (statusNeedsReview || reviewNotesChanged) {
                    needsReviewPlanned += 1;
                    if (args.write) {
                        item.status = "Needs Review";
                        item.notes = reviewNotes;
                        payload.updatedAt = today;
                        updatesByFile.set(entry.filePath, payload);
                        needsReviewApplied += 1;
                    }
                }
            }
            continue;
        }

        const priceChanged = oldPrice === null || Math.abs(oldPrice - roundedMedian) > 0.00001;
        const countChanged = oldCount !== prices.length;
        const notesChanged = oldNotes !== newNotes;

        if (!priceChanged && !countChanged && !notesChanged) {
            continue;
        }

        item.priceUsd = roundedMedian;
        item.compsCount = prices.length;
        item.status = "Priced";
        item.notes = newNotes;
        payload.updatedAt = today;

        updatesByFile.set(entry.filePath, payload);

        proposedUpdates.push({
            set: entry.set,
            id: entry.id,
            name: entry.name,
            variant: entry.variant,
            oldPriceUsd: oldPrice,
            newPriceUsd: roundedMedian,
            compsCount: prices.length,
            observedMinUsd: Number(min.toFixed(2)),
            observedMaxUsd: Number(max.toFixed(2)),
            suspicious: suspicion.isSuspicious,
            suspiciousDeltaPct: suspicion.deltaPct
        });
    }

    proposedUpdates.sort((a, b) => {
        if (a.set !== b.set) {
            return a.set.localeCompare(b.set);
        }
        if (a.id !== b.id) {
            return a.id.localeCompare(b.id);
        }
        return a.name.localeCompare(b.name);
    });

    if (args.write) {
        for (const [filePath, payload] of updatesByFile.entries()) {
            fs.writeFileSync(filePath, `${JSON.stringify(payload, null, 4)}\n`, "utf8");
        }
    }

    const report = {
        generatedAt: new Date().toISOString(),
        writeMode: args.write,
        applySuspicious: args.applySuspicious,
        markSuspiciousNeedsReview: args.markSuspiciousNeedsReview,
        minSamples: args.minSamples,
        scoreThreshold: args.scoreThreshold,
        suspiciousDeltaPct: args.suspiciousDeltaPct,
        fallbackTolerancePercent: args.fallbackTolerancePercent,
        setFilter: args.setFilter || null,
        csvFiles: resolvedCsvPaths,
        totals: {
            csvFiles: resolvedCsvPaths.length,
            processedRows,
            matchedRows,
            unmatchedRows,
            distinctCardsMatched: matchedByItem.size,
            suspiciousCards: suspiciousCards.length,
            needsReviewPlanned,
            needsReviewApplied,
            cardsUpdated: proposedUpdates.length,
            filesUpdated: updatesByFile.size
        },
        files: fileStats,
        suspicious: suspiciousCards,
        updates: proposedUpdates
    };

    if (args.reportJson) {
        const outPath = resolvePath(args.reportJson);
        fs.writeFileSync(outPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
        console.log(`Wrote report: ${outPath}`);
    }

    const suspiciousJsonPath = args.suspiciousJson
        ? resolvePath(args.suspiciousJson)
        : (args.reportJson ? resolvePath(args.reportJson).replace(/\.json$/i, ".suspicious.json") : "");
    if (suspiciousJsonPath) {
        const suspiciousPayload = {
            generatedAt: report.generatedAt,
            suspiciousDeltaPct: args.suspiciousDeltaPct,
            count: suspiciousCards.length,
            items: suspiciousCards
        };
        fs.writeFileSync(suspiciousJsonPath, `${JSON.stringify(suspiciousPayload, null, 2)}\n`, "utf8");
        console.log(`Wrote suspicious JSON queue: ${suspiciousJsonPath}`);
    }

    const suspiciousCsvPath = args.suspiciousCsv
        ? resolvePath(args.suspiciousCsv)
        : (args.reportJson ? resolvePath(args.reportJson).replace(/\.json$/i, ".suspicious.csv") : "");
    if (suspiciousCsvPath) {
        writeSuspiciousCsv(suspiciousCsvPath, suspiciousCards);
        console.log(`Wrote suspicious CSV queue: ${suspiciousCsvPath}`);
    }

    console.log("--- YYH Median Pricing Update ---");
    console.log(`CSV files: ${resolvedCsvPaths.length}`);
    console.log(`Rows processed: ${processedRows}`);
    console.log(`Rows matched: ${matchedRows}`);
    console.log(`Rows unmatched: ${unmatchedRows}`);
    console.log(`Distinct cards with matches: ${matchedByItem.size}`);
    console.log(`Suspicious cards flagged: ${suspiciousCards.length} (threshold ${args.suspiciousDeltaPct}%)`);
    console.log(`Needs Review planned: ${needsReviewPlanned}`);
    console.log(`Needs Review applied: ${needsReviewApplied}`);
    console.log(`Cards meeting min samples (${args.minSamples}): ${proposedUpdates.length}`);
    console.log(`Pricing files touched: ${updatesByFile.size}`);
    console.log(`Mode: ${args.write ? "WRITE" : "DRY RUN"}`);

    if (suspiciousCards.length > 0) {
        console.log("\nFlagged suspicious cards:");
        for (const row of suspiciousCards.slice(0, 20)) {
            const oldText = row.oldPriceUsd === null ? "n/a" : usd(row.oldPriceUsd);
            console.log(`${row.set} | ${row.id || "NO-ID"} | ${row.name} | ${row.variant} | ${oldText} -> ${usd(row.newPriceUsd)} | ${row.reason} | n=${row.compsCount}`);
        }
        if (suspiciousCards.length > 20) {
            console.log(`...and ${suspiciousCards.length - 20} more`);
        }

        if (!args.applySuspicious) {
            console.log("Suspicious updates are excluded by default. Use --apply-suspicious to include them.");
            if (args.markSuspiciousNeedsReview) {
                console.log("Flagged cards are marked as Needs Review in write mode.");
            }
        }
    }

    if (proposedUpdates.length > 0) {
        console.log("\nSample updates:");
        for (const row of proposedUpdates.slice(0, 20)) {
            const oldText = row.oldPriceUsd === null ? "n/a" : usd(row.oldPriceUsd);
            console.log(`${row.set} | ${row.id || "NO-ID"} | ${row.name} | ${row.variant} | ${oldText} -> ${usd(row.newPriceUsd)} | n=${row.compsCount}`);
        }
        if (proposedUpdates.length > 20) {
            console.log(`...and ${proposedUpdates.length - 20} more`);
        }
    }

    if (!args.write) {
        console.log("\nDry run only. Re-run with --write to save pricing changes.");
    }
}

main();
