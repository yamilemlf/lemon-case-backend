const { eligibilityService } = require('../services/eligibilityService')
const { input } = require('../schema')

const eligibilityController = {
    post: (req, res) => {
        try {
            const { tipoDeConexao, classeDeConsumo, modalidadeTarifaria, historicoDeConsumo } = req.body
            const { error } = input.validate(req.body)
            if (error) {
                return res.status(400).send(error.details)
            }
            const eligibilityResponse = eligibilityService.eligibilityTest(tipoDeConexao, classeDeConsumo, modalidadeTarifaria, historicoDeConsumo)
            res.status(200).send(eligibilityResponse)
        } catch (error) {
            res.status(500).send({
                message: 'Erro no servidor'
            })
        }
    }
}

module.exports = {
    eligibilityController
}