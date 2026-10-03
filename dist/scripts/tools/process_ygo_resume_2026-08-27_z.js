const https = require("https");

const SETS = [
  "Starter Deck: Pegasus",
  "Starter Deck: Joey",
  "Tournament Pack: 3rd Season"
];

function fetchCards(setName) {
  return new Promise((resolve, reject) => {
    const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?cardset=${encodeURIComponent(setName)}`;
    https.get(url, (response) => {
      let body = "";
      response.on("data", (chunk) => { body += chunk; });
      response.on("end", () => {
        try {
          const parsed = JSON.parse(body);
          resolve(Array.isArray(parsed.data) ? parsed.data : []);
        } catch (error) {
          reject(error);
        }
      });
    }).on("error", reject);
  });
}

function rarityCounts(cards) {
  return cards.reduce((counts, card) => {
    const rarity = card.card_sets?.[0]?.set_rarity || "Unknown";
    counts[rarity] = (counts[rarity] || 0) + 1;
    return counts;
  }, {});
}

async function run() {
  let total = 0;
  for (const setName of SETS) {
    const cards = await fetchCards(setName);
    total += cards.length;
    console.log(`\n${setName}: ${cards.length} cards`);
    console.log(JSON.stringify(rarityCounts(cards)));
  }
  console.log(`\nBatch total: ${total} cards`);
  console.log(`Running total: ${35093 + total} cards`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
