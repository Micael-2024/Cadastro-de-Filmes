const express = require('express');
const cors = require('cors');
const path = require('path'); // IMPORT O 'PATH'
const { sequelize } = require('./models');
const filmeRoutes = require('./routes/filmeRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Para parsear JSON

// Servir arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rotas
app.use('/api/filmes', filmeRoutes);

// Middleware de Erro (deve ser o último)
app.use(errorMiddleware);

const PORT = process.env.PORT || 3001;

// Sincroniza o banco de dados e inicia o servidor
sequelize.sync({ force: false }).then(() => { // use 'force: true' para recriar as tabelas
  console.log('Banco de dados sincronizado.');
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch(err => {
  console.error('Não foi possível conectar ao banco de dados:', err);
});