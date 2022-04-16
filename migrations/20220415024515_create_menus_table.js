/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('menus', function(table) {
        table.integer('userId').unsigned().references('userId').inTable('users').onDelete('cascade').notNullable();
        table.date('date').notNullable();
        table.string('name').notNullable();

        table.primary(['userId', 'date']);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('menus');
};
