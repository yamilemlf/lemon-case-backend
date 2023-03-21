# lemon-case-backend
# Teste de elegibilidade

    Esta API valida os dados de um cliente para verificar se este está apto a receber energia de fontes renováveis.
    Temos um endpoint POST /eligibilityTest que recebe os dados do cliente, faz as validações e retorna uma resposta ao cliente. Esta resposta determina se ele é elegível e o quanto de CO2 irá deixar de emitir mudando sua fonte de energia. Caso não seja elegível, o(s) motivo(s) de inelegibilidade será indicado.

    Node.js, Express, Jest, Joi foram as tecnologias e bibliotecas utilizadas 

    Para rodar localmente:

        npm install
        node app.js

