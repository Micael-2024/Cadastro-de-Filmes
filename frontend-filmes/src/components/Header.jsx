import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

import logoImage from '../assets/logo-cineclub.png'; // Lembre-se de colocar sua logo aqui

function Header() {
  return (
    // 'color="primary"' fará ele usar o azul escuro do nosso tema
    <AppBar position="static" color="primary"> 
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img 
            src={logoImage} 
            alt="Cineclub Logo" 
            style={{ 
              height: '50px', 
              verticalAlign: 'middle',
              borderRadius: '8px' // Arredonda as bordas da logo
            }} 
          />
        </Typography>
        
        <Box>
          {/* BOTÃO "INSERIR" AGORA TEM DESTAQUE */}
          <Button
            variant="contained" 
            color="secondary" // Usa a cor dourada
            component={NavLink}
            to="/inserir"
            sx={{ mr: 1 }} // Margem à direita
          >
            Inserir
          </Button>
          
          {/* BOTÃO "LISTAR" FICA COMO ESTAVA */}
          <Button
            color="inherit"
            component={NavLink}
            to="/listar"
            sx={{
              '&.active': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            Listar
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;