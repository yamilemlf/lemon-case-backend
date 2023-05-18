# lemon-case-backend
# Teste de elegibilidade

    Esta API valida os dados de um cliente para verificar se este está apto a receber energia de fontes renováveis.
    Temos um endpoint POST /eligibilityTest que recebe os dados do cliente, faz as validações e retorna uma resposta ao cliente. Esta resposta determina se ele é elegível e o quanto de CO2 irá deixar de emitir mudando sua fonte de energia. Caso não seja elegível, o(s) motivo(s) de inelegibilidade será indicado.

    Node.js, Express, Jest, Joi foram as tecnologias e bibliotecas utilizadas 

    Para rodar localmente:

        npm install
        node app.js

Requisição POST http://localhost:3000/eligibilityTest

Body (elegível):

{
    "numeroDoDocumento": "78905549071",
    "tipoDeConexao": "bifasico",
    "classeDeConsumo": "industrial",
    "modalidadeTarifaria": "branca",
    "historicoDeConsumo": [
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

Ao modificar a modalidade tarifaria para azul, por exemplo, ou a classe de consumo para rural, por exemplo, deve retornar inelegível e mostrar o motivo. Caso adicione um valor inválido, deve retornar um erro mostrando as opções válidas.

O numero do Documento deve ser um cpf válido.