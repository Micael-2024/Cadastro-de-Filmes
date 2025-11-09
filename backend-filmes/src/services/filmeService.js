const { Filme, Ator, sequelize } = require('../models');

// URL base do seu back-end (IMPORTANTE)
const BASE_URL = 'http://localhost:3001';

// Função para construir a URL completa
function getFullPosterUrl(posterPath) {
  if (!posterPath) return null;
  // Converte barras invertidas (Windows) para barras normais
  return `${BASE_URL}/${posterPath.replace(/\\/g, '/')}`;
}

// Função para formatar um filme (adicionar a URL completa)
function formatFilme(filme) {
  if (!filme) return null;
  const filmeJson = filme.get({ plain: true });
  return {
    ...filmeJson,
    posterUrl: getFullPosterUrl(filmeJson.posterUrl),
  };
}

async function findOrCreateAtores(nomesAtores, transaction) {
  const atoresPromises = nomesAtores.map(nome => {
    return Ator.findOrCreate({
      where: { nome: nome.trim() },
      transaction
    });
  });
  // Retorna apenas os objetos Ator (ignorando o booleano 'created')
  return (await Promise.all(atoresPromises)).map(([ator, _]) => ator);
}

async function createFilme(data, file) { // Recebe o 'file'
  const { titulo, faixaEtaria, genero, atores: nomesAtores } = data;
  
  // Pega o caminho do arquivo, se existir
  const posterUrl = file ? file.path : null;

  const t = await sequelize.transaction();
  try {
    const filme = await Filme.create({ 
      titulo, 
      faixaEtaria, 
      genero, 
      posterUrl // Salva o caminho
    }, { transaction: t });
    
    // Transforma 'nomesAtores' (que pode ser string ou array) em array
    const atoresArray = Array.isArray(nomesAtores) ? nomesAtores : nomesAtores.split(',');
    
    const atores = await findOrCreateAtores(atoresArray, t);
    await filme.setAtores(atores, { transaction: t });

    await t.commit();
    
    const novoFilme = await getFilmeById(filme.id); // Pega o filme formatado
    return novoFilme;
  } catch (error) {
    await t.rollback();
    throw error;
  }
}

async function getAllFilmes() {
  const filmes = await Filme.findAll({
    include: { model: Ator, as: 'atores', through: { attributes: [] } }
  });
  // Formata cada filme para incluir a URL completa do pôster
  return filmes.map(formatFilme);
}

async function getFilmeById(id) {
  const filme = await Filme.findByPk(id, {
    include: { model: Ator, as: 'atores', through: { attributes: [] } }
  });
  return formatFilme(filme); // Formata o filme
}

async function updateFilme(id, data, file) { // Recebe o 'file'
  const { titulo, faixaEtaria, genero, atores: nomesAtores } = data;
  
  const filme = await Filme.findByPk(id);
  if (!filme) return null;

  // Pega o novo poster, se existir
  const posterUrl = file ? file.path : filme.posterUrl; // Mantém o antigo se não houver novo

  const t = await sequelize.transaction();
  try {
    await filme.update({ 
      titulo, 
      faixaEtaria, 
      genero, 
      posterUrl // Atualiza o poster
    }, { transaction: t });

    if (nomesAtores) {
      const atoresArray = Array.isArray(nomesAtores) ? nomesAtores : nomesAtores.split(',');
      const atores = await findOrCreateAtores(atoresArray, t);
      await filme.setAtores(atores, { transaction: t });
    }
    
    await t.commit();
    return getFilmeById(id); // Retorna o filme atualizado
  } catch (error) {
    await t.rollback();
    throw error;
  }
}

async function deleteFilme(id) {
  const filme = await Filme.findByPk(id);
  if (!filme) return null;

  await filme.destroy();
  return true;
}

module.exports = {
  createFilme,
  getAllFilmes,
  getFilmeById,
  updateFilme,
  deleteFilme
};