function cleanModelOutput(raw) {
  const text = Array.isArray(raw) ? raw.join('\n') : raw;
  return text
    .replace(/```json\s*/gi, '')
    .replace(/```/g, '')
    .replace(/^[^{]*({.*?})[^}]*$/s, '$1') // Keep only the JSON object
    .trim();
}



async function generateMedicalInfo(boneName) {
  const { Client } = await import("@gradio/client");
  

  const client = await Client.connect("warshanks/medgemma-4b-it");

  const prompt = `
    Give me the Latin name and a medical description of the human bone "${boneName}".
    Return in this exact format:
    { "latin_name": "LATIN", "description": "DESCRIPTION" }
  `;

  const result = await client.predict("/chat", {
    message: { text: prompt },
    param_2: "You are a helpful medical expert.",
    param_3: 2048
  });

   try {
    const cleaned = cleanModelOutput(result.data);
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("[Parse Error] Invalid JSON from model:", result.data);
    return { latin_name: "", description: "" };
  }
}

module.exports = { generateMedicalInfo };