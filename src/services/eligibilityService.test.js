const { describe } = require('@jest/globals')
const { eligibilityService } = require('./eligibilityService')
const { eligibilityTest } = eligibilityService

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

describe('test: validate consumption class', () => {
    it('should return an object with the properties elegivel (true) and economiaAnualDeCO2 with its value', () => {
        expect(eligibilityTest(
            mockEligibleCustomer.tipoDeConexao,
            mockEligibleCustomer.classeDeConsumo, 
            mockEligibleCustomer.modalidadeTarifaria,
            mockEligibleCustomer.historicoDeConsumo
        )).toStrictEqual({economiaAnualDeCO2: 5553.240000000001, elegivel: true})
    })
    
    it('should return an object with the properties elegivel (false) and razaoIneligibilidade with the reason the customer is not eligible', () => {
        expect(eligibilityTest(
            mockNonEligibleCustomer.tipoDeConexao,
            mockNonEligibleCustomer.classeDeConsumo, 
            mockNonEligibleCustomer.modalidadeTarifaria,
            mockNonEligibleCustomer.historicoDeConsumo
        )).toStrictEqual({
            elegivel: false,
            razaoIneligibilidade: [
              "Classe de consumo não aceita",
              "Modalidade tarifária não aceita",
              "Consumo muito baixo para tipo de conexão"
            ]
          })
    })
})
