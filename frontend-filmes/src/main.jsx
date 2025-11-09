import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// 1. FERRAMENTAS DE TEMA E CORES
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blueGrey, amber } from '@mui/material/colors';

// Fontes para o Material-UI
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Nosso CSS
import './App.css';
import './index.css'; // Mantenha isso, mesmo que 'index.css' esteja vazio

// 2. DEFINIÇÃO DO NOVO TEMA "CINEMA"
const cinemaTheme = createTheme({
  palette: {
    primary: {
      main: blueGrey[900], // Um azul bem escuro, quase preto
    },
    secondary: {
      main: amber[600], // Um dourado/âmbar
    },
    background: {
      default: blueGrey[50], // Fundo da página (body)
      paper: '#ffffff',     // Fundo dos "cards" e da DataGrid
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 3. APLICA O TEMA NA APLICAÇÃO INTEIRA */}
    <ThemeProvider theme={cinemaTheme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);