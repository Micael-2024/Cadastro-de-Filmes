const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Filme = sequelize.define('Filme', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  faixaEtaria: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false
  },
  posterUrl: {
    type: DataTypes.STRING,
    allowNull: true // Permite ser nulo
  }
});

module.exports = Filme;