const validateEligibility = { 
    validateConsumptionClass: (consumptionClass) => {
        if (consumptionClass === 'comercial' || consumptionClass === 'residencial' || consumptionClass === 'industrial') {
            return true
        } else {
            return 'Classe de consumo não aceita'
        }
    },
    
    validateTariffModality: (tariffModality) => {
        if (tariffModality === 'convencional' || tariffModality === 'branca') {
            return true
        } else {
            return 'Modalidade tarifária não aceita'
        }
     },
   
    calculateAverageConsumption: (consumptionHistory) => {
        const initialValue = 0
        const totalConsumption = consumptionHistory.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue)
        const numberOfMonths = consumptionHistory.length
        const averageConsumption = totalConsumption/numberOfMonths
       
        return averageConsumption
    },

    validateConnectionType: (connectionType, calculateAverageConsumption, consumptionHistory) => {

        if(connectionType === 'monofasico' && calculateAverageConsumption(consumptionHistory) > 400) {
            return true
        }

        if(connectionType === 'bifasico' && calculateAverageConsumption(consumptionHistory) > 500) {
            return true
        }

        if(connectionType === 'trifasico' && calculateAverageConsumption(consumptionHistory) > 750) {
            return true
        }

        return 'Consumo muito baixo para tipo de conexão'
    },

    calculateCarbonNotEmittedProjection: (averageConsumption) => {
        const carbonNotEmittedProjection = averageConsumption/1000*84*12
        return carbonNotEmittedProjection
    }
}

module.exports = {
    validateEligibility
}