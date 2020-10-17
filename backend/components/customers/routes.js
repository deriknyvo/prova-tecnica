const express = require('express')
const customersController = require('./customersController');

const router = express.Router()

router.get('/', customersController.index)

router.post('/', customersController.store)

router.put('/:id', customersController.update)

router.delete('/:id', customersController.destroy)

router.delete('/:id', (req, res) => {
    res.send('Hello world')
})

module.exports = router;