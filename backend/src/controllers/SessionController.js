// Responsavel por criar uma sessão, se logando no sistema

//constante da connection com o banco de dados
const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();

        //Se essa Ong não existir(ERRO 400 - Bad Requests)
        if(!ong){
            return response.status(400).json({ error: 'No ONG Found With This ID' });
        }

        return response.json(ong);
    }
}