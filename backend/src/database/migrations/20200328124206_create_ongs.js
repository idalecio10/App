//Arquivo onde crio as tabelas

//Metodo up responsavel pela criação da Tabela
exports.up = function(knex) {
  return knex.schema.createTable('ongs', function (table) {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();    
  });
};

//Metodo down responsavel se der algum problema posso voltar atrás
exports.down = function(knex) {
  //Caso eu preciso deletar a Tabela ongs
  return knex.schema.dropTable('ongs');
};
