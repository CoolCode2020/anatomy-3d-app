const express = require('express')          // Import the Express library (used to create HTTP server and routes)
const router = express.Router()             // Create a new Express Router instance to define route handlers
const db = require('../db')                 // Import the database instance (likely using SQLite with better-sqlite3)



router.post('/seed', (req, res) => {
  const bones = [
    {
      id: 'Rib_1',
      name: 'Rib 1',
      latin_name: 'Costa I',
      description: 'The first rib is the most curved and shortest of all the ribs.'
    },
    {
      id: 'Rib_2',
      name: 'Rib 2',
      latin_name: 'Costa II',
      description: 'The second rib is thinner and longer than the first.'
    }
  ]

  const insert = db.prepare('INSERT OR REPLACE INTO bones (id, name, latin_name, description) VALUES (?, ?, ?, ?)')
  const insertMany = db.transaction((bones) => {
    for (const bone of bones) {
      insert.run(bone.id, bone.name, bone.latin_name, bone.description)
    }
  })

  insertMany(bones)
  res.json({ success: true, count: bones.length })
})

/**
 * Routing to find a Bone by name in DBS
 */
router.get('/:id', (req,res) => {
    const bone = db.prepare('SELECT * FROM bones WHERE id = ?').get(req.params.id)
    if (bone) {
        res.json(bone)
    }else {
        res.status(404).json({error:'Bone not found'})
    }
})

router.post('/populate', (req, res) => {
console.log('[Bones Router] Received /populate request with:', req.body)
  const bones = req.body.bones

  if (!Array.isArray(bones)) {
    return res.status(400).json({ error: 'Invalid input: bones must be an array' })
  }

  const insert = db.prepare('INSERT OR IGNORE INTO bones (id, name, latin_name, description) VALUES (?, ?, ?, ?)')
  const insertMany = db.transaction((bones) => {
    for (const id of bones) {
      const displayName = id.replace(/_/g, ' ')
      insert.run(id, displayName, '', '')
    }
  })

  insertMany(bones)
  res.json({ success: true, inserted: bones.length })
})


module.exports = router