import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import ListarFilmes from './pages/ListarFilmes.jsx';
import CadastrarFilme from './pages/CadastrarFilme.jsx';
import AlterarFilme from './pages/AlterarFilme.jsx';

import { Container, CssBaseline, Box } from '@mui/material';

function App() {
  return (
    <>
      {/* CssBaseline aplica o 'background.default' (cinza claro) ao body */}
      <CssBaseline /> 
      <Header />
      <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ 
          p: 3, 
          bgcolor: 'background.paper', // USA A COR DO TEMA
          borderRadius: 2, 
          boxShadow: 3 
        }}>
          <Routes>
            <Route path="/" element={<Navigate to="/listar" />} />
            <Route path="/listar" element={<ListarFilmes />} />
            <Route path="/inserir" element={<CadastrarFilme />} />
            <Route path="/alterar/:id" element={<AlterarFilme />} />
          </Routes>
        </Box>
      </Container>
    </>
  );
}

export default App;