const cors = require('cors')
const express = require('express')
const db = require('./db/instance')
const bootstrap = require('./bootstrap')
const components = require('./components')

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
components(app)
bootstrap(db)

app.get('/', (_, res) => {
    res.status(404).end()
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
