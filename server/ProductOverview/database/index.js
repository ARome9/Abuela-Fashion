const pgp = require('pg-promise')();

const connection = {
  // user: 'postgres',
  user: 'Alex',
  // host: 'ec2-54-221-36-195.compute-1.amazonaws.com',
  host: 'localhost',
  database: 'product_overview',
  port: 5432,
  // password: 'password'
  password: ''
};

const db = pgp(connection);

module.exports = db;
