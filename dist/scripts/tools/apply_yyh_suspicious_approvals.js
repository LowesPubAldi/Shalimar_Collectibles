#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const PRICING_DIR = path.join(ROOT, "data", "pricing", "yyh");

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

function normalize(value) {
    return String(value || "").trim().toLowerCase();
}

function resolvePath(inputPath) {
    return path.isAbsolute(inputPath) ? inputPath : path.join(ROOT, inputPath);
}

function todayYmd() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

function parseArgs(argv) {
    const out = {
        queueJson: "",
        approvalsJson: "",
        reportJson: "",
        approveAll: false,
        write: false
    };

    for (let i = 2; i < argv.length; i += 1) {
        const token = argv[i];

        if (token === "--queue-json") {
            out.queueJson = argv[i + 1] || "";
            i += 1;
            continue;
        }

        if (token === "--approvals-json") {
            out.approvalsJson = argv[i + 1] || "";
            i += 1;
            continue;
        }

        if (token === "--report-json") {
            out.reportJson = argv[i + 1] || "";
            i += 1;
            continue;
        }

        if (token === "--approve-all") {
            out.approveAll = true;
            continue;
        }

        if (token === "--write") {
            out.write = true;
            continue;
        }
    }

    return out;
}

function parseJsonFile(filePath) {
    const raw = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
    return JSON.parse(raw);
}

function getQueueItems(queuePayload) {
    if (Array.isArray(queuePayload)) {
        return queuePayload;
    }

    if (queuePayload && Array.isArray(queuePayload.items)) {
        return queuePayload.items;
    }

    if (queuePayload && Array.isArray(queuePayload.suspicious)) {
        return queuePayload.suspicious;
    }

    return [];
}

function getApprovalsMap(payload) {
    const records = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.approvals)
            ? payload.approvals
            : [];

    const map = new Map();
    for (const row of records) {
        const approved = Boolean(row?.approved);
        if (!approved) {
            continue;
        }

        const key = [row?.set, row?.id || "", row?.name, row?.variant || "Standard"].map(normalize).join("||");
        map.set(key, {
            approved: true,
            approvedPriceUsd: parseMoney(row?.approvedPriceUsd),
            note: String(row?.note || "").trim()
        });
    }

    return map;
}

function buildQueueKey(item) {
    return [item?.set, item?.id || "", item?.name, item?.variant || "Standard"].map(normalize).join("||");
}

function stripSuspiciousReview(notes) {
    const marker = " | Suspicious median review: ";
    const text = String(notes || "").trim();
    if (!text.includes(marker)) {
        return text;
    }
    return text.split(marker)[0].trim();
}

function buildApprovalNote(existingNotes, approvedPriceUsd, queueItem, approvalNote, approvedOn) {
    const base = stripSuspiciousReview(existingNotes);
    const marker = " | Suspicious approval: ";
    const baseNoApproval = base.includes(marker) ? base.split(marker)[0].trim() : base;
    const reasonBits = [];
    reasonBits.push(`approved=${approvedOn}`);
    reasonBits.push(`price=${Number(approvedPriceUsd).toFixed(2)}`);
    if (Number.isFinite(queueItem?.deltaPct)) {
        reasonBits.push(`deltaPct=${queueItem.deltaPct}`);
    }
    if (approvalNote) {
        reasonBits.push(`note=${approvalNote}`);
    }

    return `${baseNoApproval}${marker}${reasonBits.join("; ")}`;
}

function matchesItem(queueItem, candidate, setName) {
    if (normalize(queueItem.set) !== normalize(setName)) {
        return false;
    }

    const qId = normalize(queueItem.id || "");
    const qName = normalize(queueItem.name);
    const qVariant = normalize(queueItem.variant || "standard");
    const cId = normalize(candidate.id || "");
    const cName = normalize(candidate.name);
    const cVariant = normalize(candidate.variant || "standard");

    if (qId && qName) {
        return qId === cId && qName === cName && qVariant === cVariant;
    }

    if (qId) {
        return qId === cId && qVariant === cVariant;
    }

    return qName === cName && qVariant === cVariant;
}

function applyApprovedItemToCatalog(queueItem, approvalData, catalog, writeMode) {
    const approvedPriceUsd = Number.isFinite(approvalData.approvedPriceUsd)
        ? approvalData.approvedPriceUsd
        : parseMoney(queueItem.newPriceUsd);

    if (!Number.isFinite(approvedPriceUsd)) {
        return { ok: false, reason: "No valid approved price" };
    }

    for (const entry of catalog) {
        const payload = entry.payload;
        const setName = String(payload?.set || "").trim();
        const items = Array.isArray(payload?.items) ? payload.items : [];

        for (let i = 0; i < items.length; i += 1) {
            const item = items[i];
            if (!matchesItem(queueItem, item, setName)) {
                continue;
            }

            const approvedOn = todayYmd();
            const updatedNotes = buildApprovalNote(item.notes, approvedPriceUsd, queueItem, approvalData.note, approvedOn);
            const targetComps = Number.isFinite(Number(queueItem.compsCount)) ? Number(queueItem.compsCount) : Number(item.compsCount || 0);

            const changed =
                parseMoney(item.priceUsd) !== approvedPriceUsd ||
                Number(item.compsCount || 0) !== targetComps ||
                String(item.status || "") !== "Priced" ||
                String(item.notes || "") !== updatedNotes;

            if (changed && writeMode) {
                item.priceUsd = Number(approvedPriceUsd.toFixed(2));
                item.compsCount = targetComps;
                item.status = "Priced";
                item.notes = updatedNotes;
                payload.updatedAt = approvedOn;
                entry.touched = true;
            }

            return {
                ok: true,
                changed,
                filePath: entry.filePath,
                set: setName,
                id: item.id || "",
                name: item.name,
                variant: item.variant || "Standard",
                approvedPriceUsd: Number(approvedPriceUsd.toFixed(2)),
                compsCount: targetComps
            };
        }
    }

    return { ok: false, reason: "No matching pricing item found" };
}

function main() {
    const args = parseArgs(process.argv);

    if (!args.queueJson) {
        console.error("Usage: node scripts/tools/apply_yyh_suspicious_approvals.js --queue-json <queue.json> [--approvals-json <approvals.json> | --approve-all] [--report-json <report.json>] [--write]");
        process.exit(1);
    }

    const queuePath = resolvePath(args.queueJson);
    if (!fs.existsSync(queuePath)) {
        console.error(`Queue JSON not found: ${queuePath}`);
        process.exit(1);
    }

    if (!args.approveAll && !args.approvalsJson) {
        console.error("Provide --approvals-json or use --approve-all.");
        process.exit(1);
    }

    const queuePayload = parseJsonFile(queuePath);
    const queueItems = getQueueItems(queuePayload);

    if (queueItems.length === 0) {
        console.error("Queue file has no suspicious items.");
        process.exit(1);
    }

    let approvalsMap = new Map();
    if (args.approvalsJson) {
        const approvalsPath = resolvePath(args.approvalsJson);
        if (!fs.existsSync(approvalsPath)) {
            console.error(`Approvals JSON not found: ${approvalsPath}`);
            process.exit(1);
        }
        const approvalsPayload = parseJsonFile(approvalsPath);
        approvalsMap = getApprovalsMap(approvalsPayload);
    }

    const pricingFiles = fs.readdirSync(PRICING_DIR)
        .filter((name) => name.endsWith("-pricing.json"))
        .sort((a, b) => a.localeCompare(b));

    const catalog = pricingFiles.map((name) => {
        const filePath = path.join(PRICING_DIR, name);
        const payload = parseJsonFile(filePath);
        return { filePath, payload, touched: false };
    });

    const decisions = [];

    for (const queueItem of queueItems) {
        const key = buildQueueKey(queueItem);
        const approvalData = args.approveAll
            ? { approved: true, approvedPriceUsd: null, note: "approve-all" }
            : approvalsMap.get(key);

        if (!approvalData || !approvalData.approved) {
            decisions.push({
                set: queueItem.set,
                id: queueItem.id || "",
                name: queueItem.name,
                variant: queueItem.variant || "Standard",
                approved: false,
                changed: false,
                reason: "Not approved"
            });
            continue;
        }

        const applied = applyApprovedItemToCatalog(queueItem, approvalData, catalog, args.write);
        decisions.push({
            set: queueItem.set,
            id: queueItem.id || "",
            name: queueItem.name,
            variant: queueItem.variant || "Standard",
            approved: true,
            changed: Boolean(applied.changed),
            reason: applied.ok ? "Applied" : applied.reason,
            approvedPriceUsd: applied.ok ? applied.approvedPriceUsd : null,
            compsCount: applied.ok ? applied.compsCount : null,
            filePath: applied.ok ? applied.filePath : null
        });
    }

    if (args.write) {
        for (const entry of catalog) {
            if (!entry.touched) {
                continue;
            }
            fs.writeFileSync(entry.filePath, `${JSON.stringify(entry.payload, null, 4)}\n`, "utf8");
        }
    }

    const report = {
        generatedAt: new Date().toISOString(),
        queueJson: queuePath,
        approvalsJson: args.approvalsJson ? resolvePath(args.approvalsJson) : null,
        approveAll: args.approveAll,
        writeMode: args.write,
        totals: {
            queueItems: queueItems.length,
            approved: decisions.filter((row) => row.approved).length,
            changed: decisions.filter((row) => row.changed).length,
            skipped: decisions.filter((row) => !row.approved).length,
            unresolved: decisions.filter((row) => row.approved && row.reason !== "Applied").length,
            filesTouched: catalog.filter((entry) => entry.touched).length
        },
        decisions
    };

    if (args.reportJson) {
        const reportPath = resolvePath(args.reportJson);
        fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
        console.log(`Wrote report: ${reportPath}`);
    }

    console.log("--- YYH Suspicious Approval Apply ---");
    console.log(`Queue items: ${report.totals.queueItems}`);
    console.log(`Approved: ${report.totals.approved}`);
    console.log(`Changed: ${report.totals.changed}`);
    console.log(`Skipped: ${report.totals.skipped}`);
    console.log(`Unresolved approved items: ${report.totals.unresolved}`);
    console.log(`Pricing files touched: ${report.totals.filesTouched}`);
    console.log(`Mode: ${args.write ? "WRITE" : "DRY RUN"}`);

    const preview = decisions.filter((row) => row.approved).slice(0, 20);
    if (preview.length > 0) {
        console.log("\nApproved preview:");
        for (const row of preview) {
            console.log(`${row.set} | ${row.id || "NO-ID"} | ${row.name} | ${row.variant} | ${row.reason}${row.approvedPriceUsd !== null ? ` | ${row.approvedPriceUsd}` : ""}`);
        }
    }
}

main();
