const fetch = (...args) => import('node-fetch').then(mod => mod.default(...args));

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


async function generateMedicalInfoOllama(boneName) {
  const baseUrl = 'http://host.docker.internal:11434/api/generate';

  async function queryOllama(prompt) {
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'medllama2',
        prompt: prompt,
        stream: false
      })
    });

    const data = await res.json();
    console.log("[Ollama Response]:", data);
    return data.response || '';
  }

  const latinPrompt = `You are a medical expert. ONLY respond with the Latin name of the human bone "${boneName}".`;
  const descriptionPrompt = `You are a medical expert. ONLY respond with a medical description of the human bone "${boneName}".`;

  try {
    const latin = await queryOllama(latinPrompt);
    const description = await queryOllama(descriptionPrompt);

    return {
      latin_name: latin.trim().replace(/^"|"$/g, ''),
      description: description.trim()
    };
  } catch (err) {
    console.error("[Ollama Error]", err);
    return { latin_name: "", description: "" };
  }
}
module.exports = {
  generateMedicalInfo,
  generateMedicalInfoOllama
};