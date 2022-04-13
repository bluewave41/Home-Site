const { Model } = require('objection');
const Knex = require('knex');
require('dotenv').config({ path: '.env.development '});

// Initialize knex.
const knex = Knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    }
});

// Give the knex instance to objection.
Model.knex(knex);