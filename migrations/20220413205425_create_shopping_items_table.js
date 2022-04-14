/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
	return knex.schema.createTable('shopping_items', function(table) {
		table.string('name', 40).notNullable();
		table.tinyint('amount').notNullable();
        table.integer('listId').unsigned().references('listId').inTable('lists');
        
        table.primary(['name', 'listId']);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	return knex.schema.dropTable('lists');
};
