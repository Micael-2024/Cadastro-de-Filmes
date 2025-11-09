const { Sequelize } = require('sequelize');

// Usando SQLite para simplicidade (banco em arquivo)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

module.exports = sequelize;