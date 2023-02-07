const { validateEligibility } = require('../middlewares/validateDataMiddleware')
const { validateConsumptionClass, validateTariffModality, validateConnectionType, calculateAverageConsumption, calculateCarbonNotEmittedProjection } = validateEligibility

const eligibilityService = {
    eligibilityTest: (connectionType, consumptionClass, tariffModality, consumptionHistory) => {
        const eligibilityResponse = {}

        if (validateConsumptionClass(consumptionClass) === true && validateTariffModality(tariffModality) === true && validateConnectionType(connectionType, calculateAverageConsumption, consumptionHistory) === true) {
            eligibilityResponse.elegivel = true

            const averageConsumption = calculateAverageConsumption(consumptionHistory)
            const carbonNotEmittedProjection = calculateCarbonNotEmittedProjection(averageConsumption)

            eligibilityResponse.economiaAnualDeCO2 = carbonNotEmittedProjection
        } else {
            eligibilityResponse.elegivel = false
            eligibilityResponse.razaoIneligibilidade = []

            if (validateConsumptionClass(consumptionClass) !== true) {
                eligibilityResponse.razaoIneligibilidade.push(validateConsumptionClass(consumptionClass))
            }

            if (validateTariffModality(tariffModality) !== true) {
                eligibilityResponse.razaoIneligibilidade.push(validateTariffModality(tariffModality))
            }

            if (validateConnectionType(connectionType, calculateAverageConsumption, consumptionHistory) !== true) {
                eligibilityResponse.razaoIneligibilidade.push(validateConnectionType(connectionType, calculateAverageConsumption, consumptionHistory))
            }
        }

        return eligibilityResponse
    }   
}

module.exports = {
    eligibilityService
}