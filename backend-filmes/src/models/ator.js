const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ator = sequelize.define('Ator', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = Ator;