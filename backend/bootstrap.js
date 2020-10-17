module.exports = (db) => {
    db.run(`CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        cpf VARCHAR(100) NOT NULL,
        data_nascimento DATE NOT NULL
    );`, err => {
        if (err) {
            return console.error(err.message)
        }
    })
}