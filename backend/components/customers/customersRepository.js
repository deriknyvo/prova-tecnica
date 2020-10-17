const db = require('../../db/instance');

const customersRepository = {
    update(id, customer) {
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE customers SET nome = $nome, email = $email, cpf = $cpf, data_nascimento = $dataNascimento WHERE id = $id
                `, {
                $id: id,
                $nome: customer.name,
                $email: customer.email,
                $cpf: customer.cpf,
                $dataNascimento: customer.dateOfBirth,
            }, function (err) {
                if (err) {
                    reject(err)
                }

                resolve(this.lastID)
            })
        })
    },

    create(customer) {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO customers VALUES (null, $nome, $email, $cpf, $dataNascimento)
                `, {
                $nome: customer.name,
                $email: customer.email,
                $cpf: customer.cpf,
                $dataNascimento: customer.dateOfBirth,
            }, function (err) {
                if (err) {
                    reject(err)
                }

                resolve(this.lastID)
            })
        })
    },

    delete(id) {
        return new Promise((resolve, reject) => {
            db.run(
                `DELETE FROM customers WHERE id = $id
                `, {
                $id: id,
            }, function (err) {
                if (err) {
                    reject(err)
                }

                resolve(this.lastID)
            })
        })
    },

    all() {
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT * from customers
                `, function (err, rows) {

                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }
}

module.exports = customersRepository