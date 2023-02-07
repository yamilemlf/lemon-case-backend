const { validator } = require('cpf-cnpj-validator')
const Joi = require('@hapi/joi').extend(validator)

const dataValidation = {
    cpf: Joi.document().cpf(),
    cnpj: Joi.document().cnpj(),
    tiposDeConexao: Joi.string().valid('monofasico', 'bifasico', 'trifasico'),
    classesDeConsumo: Joi.string().valid('residencial', 'industrial', 'comercial', 'rural', 'poderPublico'),
    modalidadesTarifarias: Joi.string().valid('azul', 'branca', 'verde', 'convencional')
}
  
module.exports = {
    dataValidation
}