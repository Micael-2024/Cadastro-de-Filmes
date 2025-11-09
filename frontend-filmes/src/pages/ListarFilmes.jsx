import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

// Importações do MUI (Avatar adicionado)
import { Box, Typography, IconButton, Avatar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function ListarFilmes() {
  const [filmes, setFilmes] = useState([]);

  // Helper para formatar atores (usado no valueGetter)
  const formatAtores = (atores) => {
    if (!atores || !Array.isArray(atores)) return '';
    return atores.map(ator => ator.nome).join(', ');
  };

  async function loadFilmes() {
    try {
      const response = await api.get('/filmes');
      setFilmes(response.data);
    } catch (error) {
      console.error("Erro ao carregar filmes", error);
    }
  }

  useEffect(() => {
    loadFilmes();
  }, []);

  async function handleDelete(id) {
    if (window.confirm('Tem certeza que deseja remover este filme?')) {
      try {
        await api.delete(`/filmes/${id}`);
        loadFilmes();
      } catch (error) {
        console.error("Erro ao deletar filme", error);
      }
    }
  }

  // Definição das colunas para o DataGrid
  const columns = [
    {
      field: 'posterUrl',
      headerName: 'Pôster',
      width: 100,
      sortable: false,
      // --- A MUDANÇA ESTÁ AQUI: ENVOLVENDO O AVATAR EM UM BOX FLEX ---
      renderCell: (params) => (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', // Centraliza horizontalmente
            alignItems: 'center',     // Centraliza verticalmente
            height: '100%',           // O Box ocupa toda a altura da célula
            width: '100%'             // O Box ocupa toda a largura da célula
          }}
        >
          <Avatar 
            src={params.value} 
            alt={params.row.titulo} 
            variant="rounded" 
            sx={{ width: 50, height: 75 }}
          >
            {params.row.titulo[0]} 
          </Avatar>
        </Box>
      )
    },
    { field: 'titulo', headerName: 'Título', width: 200 },
    {
      field: 'atores',
      headerName: 'Atores',
      width: 250,
      valueGetter: (value) => formatAtores(value),
    },
    { field: 'faixaEtaria', headerName: 'Faixa Etária', width: 130 },
    { field: 'genero', headerName: 'Gênero', width: 150 },
    {
      field: 'operacoes',
      headerName: 'Operações',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            color="primary"
            component={Link}
            to={`/alterar/${params.id}`} 
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Typography 
        variant="h4" 
        component="h2" 
        gutterBottom 
        sx={{ textAlign: 'center' }}
      >
        Listar Filmes
      </Typography>
      
      <DataGrid
        rows={filmes}
        columns={columns}
        rowHeight={90}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}

export default ListarFilmes;