const express = require('express');
//Importae Celebrate (Joi é biblioteca de validação)
const { celebrate, Segments, Joi } = require('celebrate');

//serve para utilizar um metodo dele, para gerar uma string aleatorio
//const crypto = require('crypto');

//importar o Arquivo OngController.js
const OngController = require('./controllers/OngController');

//importar o Arquivo IncidentsController.js
const IncidentController = require('./controllers/IncidentController');

//importar o Arquivo ProfileController.js
const ProfileController = require('./controllers/ProfileController');

//importar o Arquivo SessionController.js
const SessionController = require('./controllers/SessionController');

//constante da connection
//const connection = require('./database/connection');

const routes = express.Router();


//Route(Metodo) para Criar Sessão
routes.post('/sessions', SessionController.create);


//Route(Metodo) para Listar todas as Ongs
routes.get('/ongs', OngController.index);

/*
//Route(Metodo) para Listar todas as Ongs
routes.get('/ongs', async (request, response) =>{
    const ongs = await connection('ongs').select('*');

    return response.json(ongs);
});
*/

//(Route(Metodo) para inserir as Ongs) 
// Celebrate para Validação
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(10).max(14),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);


//(Route(Metodo) para inserir) vamos utilizar async para poder utilizar o await lá em baixo
//
// Este codigo a baixo(da linha 35 a linha 54) é a mesma coisa que esta no arquivo OngController.js(da linha 18 a linha 37)
/*
routes.post('/ongs', async (request, response) => {
    //const { name, email, whatsapp, city, uf } = request.body;

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
});
*/


//(Route(Metodo) para listar os profiles) 
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);



//(Route(Metodo) para listar os incidents) 
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index);

//(Route(Metodo) para inserir os incidents) 
routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(10).max(14),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), IncidentController.create);
//

//(Route(Metodo) para deletar os incidents) 
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete);


//exportar variavel de dentro de um arquivo
module.exports = routes;