//Arquivo onde Adicionarei os casos da app

exports.up = function(knex) {
  return knex.schema.createTable('incidents', function (table) {
    table.increments();

    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    //id da ong que criou esse incident
    table.string('ong_id').notNullable();  
    //chave estrangeira da ('ong_id')
    table.foreign('ong_id').references('id').inTable('ongs');
    
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
