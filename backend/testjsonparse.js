// Simulated raw model output (as array)
const raw = [
  '```json\n',
  '{\n',
  '  "latin_name": "Stapes",\n',
  '  "description": "The stapes (plural: stapes) is the smallest bone in the human body, located in the middle ear. It is a stirrup-shaped bone that forms the middle ear ossicle. The stapes\' primary function is to transmit sound vibrations from the tympanic membrane (eardrum) to the inner ear (cochlea), thereby enabling hearing. It connects to the oval window, which is a membrane-covered opening into the inner ear, and to the incus (another middle ear ossicle). The stapes footplate sits within the oval window, anchoring the chain of ossicles."\n',
  '}\n',
  '```'
];

// Cleaning function (from your actual code)
function cleanModelOutput(raw) {
  const text = Array.isArray(raw) ? raw.join('\n') : raw;
  return text
    .replace(/```json\s*/gi, '')
    .replace(/```/g, '')
    .replace(/^[^{]*({.*?})[^}]*$/s, '$1')
    .trim();
}

const cleaned = cleanModelOutput(raw);
console.log("Cleaned JSON string:\n", cleaned);

// Try to parse
try {
  const json = JSON.parse(cleaned);
  console.log("\n✅ Parsed result:");
  console.log(json);
} catch (err) {
  console.error("\n❌ Parse error:", err.message);
}