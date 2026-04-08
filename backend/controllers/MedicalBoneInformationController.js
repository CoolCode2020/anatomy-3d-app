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
  const baseUrl = 'http://host.docker.internal:11434/api/generate'; //use when in docker
  //const baseUrl = 'http://localhost:11434/api/generate';

  async function queryOllama(prompt) {
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'medllama2:latest', // or 'medllama2:latest' 'meditron:latest'
        prompt: prompt,
        stream: false
      })
    });

    const data = await res.json();
    console.log("[Ollama Response]:", data);
    return data.response || '';
  }

  const latinPrompt = `ONLY respond with the Latin name of the human bone "${boneName}".`;
  const descriptionPrompt = `ONLY respond with a medical description of the human bone "${boneName}".`;

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

async function generateMedicalInfoUniOllama(boneName) {
  // Uni Ollama is accessed via SSH tunnel on the host
  // Docker reaches it via host.docker.internal
  const baseUrl = 'http://host.docker.internal:11434/api/generate';

  async function queryUniOllama(prompt) {
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gemma3:27b-it-fp16', // strong medical / instruction model
        prompt: prompt,
        stream: false
      })
    });

    if (!res.ok) {
      throw new Error(`Uni Ollama error: ${res.status}`);
    }

    const data = await res.json();
    return data.response || '';
  }

  const prompt = `
Give me the Latin name and a concise medical description of the human bone "${boneName}".

Return ONLY valid JSON in this exact format:
{ "latin_name": "LATIN", "description": "DESCRIPTION" }
`;

  try {
    const raw = await queryUniOllama(prompt);
    const cleaned = cleanModelOutput(raw);
    return JSON.parse(cleaned);
  } catch (err) {
    console.error('[Uni Ollama Error]', err);
    return { latin_name: '', description: '' };
  }
}
module.exports = {
  generateMedicalInfo,
  generateMedicalInfoOllama,
  generateMedicalInfoUniOllama
};