const path = require('path')
const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database(path.join(__dirname, "sqlitedb.db"), err => {
    if (err) {
        return console.error(err.message)
    }
})

module.exports = db;