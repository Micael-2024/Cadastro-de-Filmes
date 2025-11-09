const sequelize = require('../config/database');
const Filme = require('./filme');
const Ator = require('./ator');

// Define a tabela de junção 'FilmeAtor'
Filme.belongsToMany(Ator, { through: 'FilmeAtor', as: 'atores', foreignKey: 'filmeId' });
Ator.belongsToMany(Filme, { through: 'FilmeAtor', as: 'filmes', foreignKey: 'atorId' });

module.exports = {
  sequelize,
  Filme,
  Ator
};