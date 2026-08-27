const https = require("https");

const SETS = ["Summoned Skull Sample promotional card"];

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

async function run() {
  let total = 0;
  for (const setName of SETS) {
    const cards = await fetchCards(setName);
    total += cards.length;
    console.log(`${setName}: ${cards.length} cards`);
  }
  console.log(`Batch total: ${total} cards`);
  console.log(`Running total: ${36129 + total} cards`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
