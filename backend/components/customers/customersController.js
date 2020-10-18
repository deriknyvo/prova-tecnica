const customersRepository = require('./customersRepository')

const customersController = {
    async index(_, res) {
        const customers = await customersRepository.all()

        if (customers.length === 0) {
            return res.json({
                data: []
            })
        }

        res.json({
            data: customers
        })
    },

    async store(req, res) {
        const params = req.body
        const requiredParams = ['name', 'email', 'cpf', 'dateOfBirth']
        const passedParamsKeys = Object.keys(params)
        const isAllParamsPassed =
            requiredParams.every((requiredParam) => passedParamsKeys.includes(requiredParam))

        if (!isAllParamsPassed) {
            return res.status(400).json({
                error: {
                    code: 400,
                    message: `Voce deve informar todos os campos obrigatórios: ${requiredParams.join(', ')}`
                }
            })
        }

        await customersRepository.create(req.body).catch((err) => {
            res.status(500).json({
                error: {
                    code: err.code,
                    message: err.message
                }
            })
        })

        return res.status(201).end()
    },

    async update(req, res) {
        const id = req.params.id
        const params = req.body

        let payload = { ...params }

        if (params.dataNascimento !== undefined) {
            payload.data_nascimento = params.dataNascimento
            delete payload.dataNascimento
        }

        await customersRepository.update(id, payload).catch((err) => {
            res.status(500).json({
                error: {
                    code: err.code,
                    message: err.message
                }
            })
        })

        return res.status(204).end()
    },

    async destroy(req, res) {
        const id = req.params.id

        await customersRepository.delete(id).catch((err) => {
            res.status(500).json({
                error: {
                    code: err.code,
                    message: err.message
                }
            })
        })

        return res.status(204).end()
    }
}

module.exports = customersController