const filmeService = require('../services/filmeService');

async function createFilme(req, res, next) {
  try {
    // Os dados de texto vêm em req.body, o arquivo vem em req.file
    const filme = await filmeService.createFilme(req.body, req.file);
    res.status(201).json(filme);
  } catch (error) {
    next(error);
  }
}

async function getAllFilmes(req, res, next) {
  try {
    const filmes = await filmeService.getAllFilmes();
    res.status(200).json(filmes);
  } catch (error) {
    next(error);
  }
}

async function getFilmeById(req, res, next) {
  try {
    const filme = await filmeService.getFilmeById(req.params.id);
    if (!filme) {
      return res.status(404).json({ message: 'Filme não encontrado' });
    }
    res.status(200).json(filme);
  } catch (error) {
    next(error);
  }
}

async function updateFilme(req, res, next) {
  try {
    const filme = await filmeService.updateFilme(req.params.id, req.body, req.file);
    if (!filme) {
      return res.status(404).json({ message: 'Filme não encontrado' });
    }
    res.status(200).json(filme);
  } catch (error) {
    next(error);
  }
}

async function deleteFilme(req, res, next) {
  try {
    const result = await filmeService.deleteFilme(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Filme não encontrado' });
    }
    res.status(200).json({ message: 'Filme deletado com sucesso' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createFilme,
  getAllFilmes,
  getFilmeById,
  updateFilme,
  deleteFilme
};