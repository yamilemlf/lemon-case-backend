const { validateEligibility } = require('../middlewares/validateDataMiddleware')
const { validateConsumptionClass, validateTariffModality, validateConnectionType, calculateAverageConsumption, calculateCarbonNotEmittedProjection } = validateEligibility

const eligibilityController = {
    post: async (req, res) => {
        const { tipoDeConexao, classeDeConsumo, modalidadeTarifaria, historicoDeConsumo } = req.body
        const eligibleResponse = {}
        if (validateConsumptionClass(classeDeConsumo) === true && validateTariffModality(modalidadeTarifaria) === true && validateConnectionType(tipoDeConexao, calculateAverageConsumption, historicoDeConsumo) === true){
            eligibleResponse.elegivel = true
            const averageConsumption = calculateAverageConsumption(historicoDeConsumo)
            const carbonNotEmittedProjection = calculateCarbonNotEmittedProjection(averageConsumption)
            eligibleResponse.economiaAnualDeCO2 = carbonNotEmittedProjection
        } else {
            eligibleResponse.elegivel = false
            eligibleResponse.razaoIneligibilidade = []
            if (validateConsumptionClass(classeDeConsumo) !== true) {
                eligibleResponse.razaoIneligibilidade.push(validateConsumptionClass(classeDeConsumo))
            }
            if (validateTariffModality(modalidadeTarifaria) !== true) {
                eligibleResponse.razaoIneligibilidade.push(validateTariffModality(modalidadeTarifaria))
            }
            if (validateConnectionType(tipoDeConexao, calculateAverageConsumption, historicoDeConsumo) !== true) {
                eligibleResponse.razaoIneligibilidade.push(validateConnectionType(tipoDeConexao, calculateAverageConsumption, historicoDeConsumo))
            }
        }
       
        res.send(eligibleResponse)
    }
}

module.exports = { eligibilityController }