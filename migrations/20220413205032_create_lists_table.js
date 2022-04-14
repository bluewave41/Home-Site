/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
	return knex.schema.createTable('lists', function(table) {
		table.increments('listId').unique().notNullable();
		table.integer('ownedId').unsigned().references('userId').inTable('users').onDelete('cascade').notNullable();
        table.string('uuid', 36).unique().notNullable();
		table.timestamp('created_at').notNullable(); //will be set by objection model
		table.timestamp('updated_at').notNullable();  //wil be set by objection model
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	return knex.schema.dropTable('lists');
};
