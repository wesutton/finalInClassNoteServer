const Sequelize = require('sequelize');

const db = new Sequelize('final-in-class', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = db;