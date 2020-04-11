// Responsavel pelo Perfil de uma Identidade(Ong)

//constante da connection com o banco de dados
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        //Acessar dados da Ong que esta Logada
        const ong_id = request.headers.authorization;

        //Buscar Incidents(
        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');

        return response.json(incidents);
    }
}

