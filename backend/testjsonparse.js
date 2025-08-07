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