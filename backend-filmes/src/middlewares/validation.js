const { body, validationResult } = require('express-validator');

const validateFilme = [
  body('titulo').notEmpty().withMessage('O título é obrigatório.'),
  body('faixaEtaria').isInt({ min: 0 }).withMessage('A faixa etária deve ser um número válido.'),
  body('genero').notEmpty().withMessage('O gênero é obrigatório.'),
  body('atores').isArray({ min: 1 }).withMessage('Pelo menos um ator é obrigatório.'),
  body('atores.*').isString().notEmpty().withMessage('Nome do ator não pode ser vazio.'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateFilme };