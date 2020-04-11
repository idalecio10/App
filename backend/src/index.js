//(importar funcionalidades express para dentro do node) 
//esta importando o modulo 'express' para dentro da variavel express (agora a variavel express possui todas as funcionalidades do express disponiveis)
const express = require('express');

const routes = require('./routes');
//importar módulo de Segurança (cors)
const cors = require('cors');

//criar variavel que vai armazenar a aplicação(Declaração de app)
const app = express();


//Por estarmos ainda em desenvolvimento colocamos Desse jeito, assim permite que todas Aplicações front-end possam acessar o back-end
app.use(cors());
//
//No fim do desenvolvimento adicionamos o origin(Que é Qual Endereço vai poder acessar a Aplicação) 
//Ex : se o front-end estiver hospedado em : http://meuapp.com,  nós colocaremos esse endereço na origin
/*app.use(cors({
    origin : 'http://meuapp.com'
})); */


//Nós Temos q informar para o app(express) que estaremos a usar JSON para as Request Body
app.use(express.json());
//logo abaixo de :
//app.use(express.json());
app.use(routes);


//fazer a aplicaçao (app) ouvir a porta 3333... (localhost:3333)
app.listen(3333);