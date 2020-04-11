//constante da connection
const connection = require('../database/connection');

//serve para utilizar um metodo dele, para gerar uma string aleatorio
const crypto = require('crypto');

module.exports = {
    //Route(Metodo) para Listar todas as Ongs
    // Este codigo a baixo(da linha 10 a linha 14) é a mesma coisa que esta no arquivo routes.js (da linha 20 a linha 24)
    async index(request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },


    // Este codigo a baixo(da linha 18 a linha 37) é a mesma coisa que esta no arquivo routes.js (da linha 22 a linha 37)
    async create (request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        //metodo de crypto para id aleatorio
        const id = crypto.randomBytes(4).toString('HEX');

        //conexão com o banco de dados para inserir
        //como o insert pode demorar um pouco, await serve para fazer o codigo abaixo finalizar para entaõ ele continuar
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
        //

        return response.json({ id });
    }
};