const pgp = require('pg-promise')();

const connection = {
  user: 'Alex',
  host: 'localhost',
  database: 'product_overview',
  port: 5432,
  password: ''
};

const db = pgp(connection);

module.exports = db;
