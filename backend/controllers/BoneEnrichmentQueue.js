const { generateMedicalInfo } = require('./MedicalBoneInformationController')
const db = require('../db')

const queue = []
let isProcessing = false

function enqueueBone(id, name) {
  if (queue.find(item => item.id === id)) return
  queue.push({ id, name })
  if (!isProcessing) {
    processQueue()
  }
}

async function processQueue() {
  isProcessing = true
  while (queue.length > 0) {
    const bone = queue.shift()
    if (bone.latin_name && bone.description) {
      console.log(`[Enrichment] Skipped: ${bone.name} already has data.`)
      continue
    }
    try {
      const info = await generateMedicalInfo(bone.name)
      db.prepare(`
        UPDATE bones SET latin_name = ?, description = ? WHERE id = ?
      `).run(info.latin_name, info.description, bone.id)
      console.log(`[Enrichment] Updated: ${bone.name}`)
    } catch (e) {
      console.error(`[Enrichment] Failed to update ${bone.name}`, e.message)
      break
    }
    await new Promise(resolve => setTimeout(resolve, 1500)) // Delay to avoid rate limits
  }
  isProcessing = false
}

function initEnrichmentRoutine() {
  const missing = db.prepare(`
    SELECT id, name, latin_name, description FROM bones
    WHERE latin_name IS NULL OR latin_name = '' OR description IS NULL OR description = ''
  `).all()

  missing.forEach(bone => enqueueBone(bone.id, bone.name))
}

module.exports = {
  enqueueBone,
  initEnrichmentRoutine
}