export async function generateMedicalInfo(boneName) {
  const client = await Client.connect("warshanks/medgemma-4b-it")

  const prompt = `
    Give me the Latin name and a medical description of the human bone "${boneName}".
    Return a valid JSON object in this exact format:
    { "latin_name": "LATIN", "description": "DESCRIPTION" }
  `

  const result = await client.predict("/chat", {
    message: { text: prompt },
    param_2: "You are a helpful medical expert.",
    param_3: 2048
  })

  try {
    return JSON.parse(result.data)
  } catch (e) {
    console.error("[Parse Error] Invalid JSON from model:", result.data)
    return { latin_name: "", description: "" }
  }
}