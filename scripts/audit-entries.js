fs = require('fs');
path = require('path');

const CONFIG_FILENAME = "../docs/config.json";

console.log(`Loading file ${CONFIG_FILENAME}...`);
const config = JSON.parse(fs.readFileSync(path.resolve(__dirname, CONFIG_FILENAME), 'utf8'));
const missingUrls = config.entries.filter((entry) => { return !entry.url || entry.url === "#" });

console.log(`${missingUrls.length} of ${config.entries.length} entries with no URL`);

missingUrls.sort((a, b) => {
  const aRing = a.timeline[0].ringId;
  const bRing = b.timeline[0].ringId;

  if (aRing < bRing) { return -1; }
  if (aRing > bRing) { return 1; }
  return 0;
}).forEach((entry) => {
  console.log(`${entry.timeline[0].ringId.toUpperCase()} - ${entry.title}: ${entry.description}`);
});
