const { eligibilityService } = require('../services/eligibilityService')

const eligibilityController = {
    post: (req, res) => {
        try {
            const { tipoDeConexao, classeDeConsumo, modalidadeTarifaria, historicoDeConsumo } = req.body
            const eligibilityResponse = eligibilityService.eligibilityTest(tipoDeConexao, classeDeConsumo, modalidadeTarifaria, historicoDeConsumo)
            res.status(201).send(eligibilityResponse)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                message: "Erro ao validar elegibilidade"
            })
        }
    }
}

module.exports = {
    eligibilityController
}