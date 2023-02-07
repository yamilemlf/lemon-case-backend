const Joi = require('@hapi/joi')

const { dataValidation } = require('./types')
const { tiposDeConexao, classesDeConsumo, modalidadesTarifarias, cpf, cnpj } = dataValidation

const input = Joi.object({
    numeroDoDocumento: Joi.alternatives().try(cpf, cnpj),
    tipoDeConexao: tiposDeConexao,
    classeDeConsumo: classesDeConsumo,
    modalidadeTarifaria: modalidadesTarifarias,
    historicoDeConsumo: Joi.array().min(3).max(12).items(Joi.number().min(0).max(9999))
}).required()

module.exports = {
    input
}