const connection = require('../database/connection');

module.exports = {
    async index (request, response) {
        //Fazer esquema de Paginação nos Incidentes, para não retornar todos Incidensts, mas sim, 5 em cada página
        //Buscar de dentro de todos os request.query, um parametro page com número padrão de pagina 1 (page = 1)
        const { page = 1 } = request.query;

        //Retornarr quantidadess de Casos(incidents), para mostrar no Front-end
        const [count] = await connection('incidents').count()
            //console.log(count);


        const incidents = await connection('incidents')
            //JOIN Para Relacionar Dados de 2 ou mais Tabelas
            //Trazer Dados da tabela ongs, onde o ong.id seja == ao incidents.ong_id
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            //limitar os dados desta busca no banco vai fazer em 5 registros(incidents) por página
            .limit(5)
            //Pular 5 registros por página
            .offset((page - 1) * 5)
            //Quero todos os Dados da tabela incidents e da tabela ongs quero o name, email, whatsapp, city, uf
            .select([
                'incidents.*', 
                'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);

        /* Este response.header server para o front-end saber que tem o X(TOTAL de INCIDENTS), vai saber quando não 
        deixar o usuario ir para proxima pagina 
        * Pode se ver a resposta de Quantidades de Incidents no Insomnia no Arquivo : Casos(Incidents) List, dentro do Header da direita
        */
        response.header('X-Total-Count', count['count(*)']);
        
        return response.json(incidents);
    },

    async create (request, response) {
        const { title, description, value } = request.body;
        // Headers guarda informações do contexto desta nossa requesição... Geralmente vem dados da AUTENTICAÇÃO, LOCALIZAÇÃO, IDIOMAS 
        // EX(Qual Empresa esta Logada, Qual Usuario esta logado) Vem atraves do Cabeçario da aquisição e não do corpo(body)
        // Neste caso vamos utilizar a AUTENTICAÇÃO e tem que ser na aba Headers do Insomnia
        const ong_id = request.headers.authorization;

        //retornar id deste cadastro atraves de uma array : const [id], antes do await
        const [id] = await connection('incidents').insert ({
          title,
          description,
          value,
          ong_id,
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        /*Busca-se o ong_id porque precisa-se verificar se o incident id que esta pra ser deletado realmente foi criado 
        pela ong_id que esta querendo deletar/ para que não se apague incidents de outras Ong
        */
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        //se o ong_id que se buscou no bando de dados for diferente do ong_id que esta logado (ERRO:401)
        if(incident.ong_id !== ong_id){
            //erro 204 : significa não autorizado, ou seja, autenticação não corresponde
            return response.status(401).json({ error: 'Operation not Permitted.' });
        } 

        //se o q esta acima deu certo, aqui deleta do banco
        await connection('incidents').where('id', id).delete();

        //erro 204 : significa resposta com sucesso sem conteúdo para retornar
        return response.status(204).send();
    }
};