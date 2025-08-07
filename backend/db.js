const Database = require('better-sqlite3')
const db = new Database('mydatabase.db', { verbose: console.log })

db.exec(`
  CREATE TABLE IF NOT EXISTS bones (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    latin_name TEXT,
    description TEXT
  )
`)

module.exports = db