const { Model } = require('objection');
const Knex = require('knex');
require('dotenv').config({ path: '.env.development' });
console.log(process.env);

// Initialize knex.
const knex = Knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    }
});

// Give the knex instance to objection.
Model.knex(knex);