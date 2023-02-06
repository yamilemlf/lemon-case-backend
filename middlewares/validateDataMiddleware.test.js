const { describe } = require('@jest/globals')
const { validateEligibility } = require('./validateDataMiddleware')
const { validateConsumptionClass, validateTariffModality, validateConnectionType, calculateAverageConsumption, calculateCarbonNotEmittedProjection } = validateEligibility

const mockEligibleCustomer = {
    numeroDoDocumento: "14041737706",
    tipoDeConexao: "bifasico",
    classeDeConsumo: "comercial",
    modalidadeTarifaria: "convencional",
    historicoDeConsumo: [
        3878, 
        9760, 
        5976, 
        2797, 
        2481, 
        5731, 
        7538, 
        4392, 
        7859, 
        4160, 
        6941, 
        4597
    ]
}

const mockNonEligibleCustomer = {
    numeroDoDocumento: "14041737706",
    tipoDeConexao: "bifasico",
    classeDeConsumo: "rural",
    modalidadeTarifaria: "verde",
    historicoDeConsumo: [
        387, 
        97, 
        596, 
        277, 
        241, 
        57, 
        75, 
        432, 
        78, 
        410  
      ]
  }

  const averageConsumption = 5509.166666666667

describe('test: validate consumption class', () => {
    it('should return true when customer is eligible for consumption class', () => {
        expect(validateConsumptionClass(mockEligibleCustomer.classeDeConsumo)).toBe(true)
    })
    
    it('should return the reason the customer is not eligible', () => {
        expect(validateConsumptionClass(mockNonEligibleCustomer.classeDeConsumo)).toBe("Classe de consumo não aceita")
    })
})

describe('test: validate tariff modality', () => {
    it('should return true when customer is eligible for tariff modality', () => {
        expect(validateTariffModality(mockEligibleCustomer.modalidadeTarifaria)).toBe(true)
    })
    
    it('should return the reason the customer is not eligible', () => {
        expect(validateTariffModality(mockNonEligibleCustomer.modalidadeTarifaria)).toBe("Modalidade tarifária não aceita")
    })
})

describe('test: calculate average consumption', () => {
    it('should return the average of the consumption history values', () => {
        expect(calculateAverageConsumption(mockEligibleCustomer.historicoDeConsumo)).toBeCloseTo(5509.166666666667)
    })
    
})

describe('test: validate connection type', () => {
    it('should return true when customer is eligible for connection type and has the minimum value of average consumption', () => {
        expect(validateConnectionType(mockEligibleCustomer.tipoDeConexao, calculateAverageConsumption, mockEligibleCustomer.historicoDeConsumo)).toBe(true)
    })
    
    it('should return the reason the customer is not eligible', () => {
        expect(validateConnectionType(mockNonEligibleCustomer.tipoDeConexao, calculateAverageConsumption, mockNonEligibleCustomer.historicoDeConsumo)).toBe("Consumo médio abaixo do exigido para o tipo de conexão")
    })
})

describe('test: calculate carbon not emitted projection', () => {
    it('should return the carbon not emitted projection', () => {
        expect(calculateCarbonNotEmittedProjection(averageConsumption)).toBeCloseTo(5553.240000000001)
    })
})
