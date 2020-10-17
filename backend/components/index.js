const customers = require('./customers/routes')

module.exports = (app) => {
    app.use('/customers', customers)
}