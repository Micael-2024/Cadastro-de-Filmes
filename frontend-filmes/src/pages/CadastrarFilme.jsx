import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

// Importações do MUI
import { TextField, Button, Box, Typography, Container } from '@mui/material';

function CadastrarFilme() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  // Estado para guardar o arquivo selecionado
  const [posterFile, setPosterFile] = useState(null);

  // Cuida da seleção do arquivo
  const handleFileChange = (e) => {
    if (e.target.files) {
      setPosterFile(e.target.files[0]);
    }
  };

  const onSubmit = async (data) => {
    // 1. Criar FormData (necessário para enviar arquivos)
    const formData = new FormData();
    
    // 2. Adicionar todos os dados de texto
    formData.append('titulo', data.titulo);
    formData.append('faixaEtaria', data.faixaEtaria);
    formData.append('genero', data.genero);
    
    // Transforma a string de atores em array e adiciona ao formData
    const atoresArray = data.atores.split(',').map(ator => ator.trim());
    atoresArray.forEach(ator => {
      // O back-end vai receber um array de strings para 'atores'
      formData.append('atores', ator);
    });

    // 3. Adicionar o arquivo (se existir)
    if (posterFile) {
      // 'poster' deve bater com o nome do campo no back-end (upload.single('poster'))
      formData.append('poster', posterFile); 
    }

    try {
      // 4. Enviar FormData em vez de JSON
      await api.post('/filmes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // O navegador define isso
        },
      });
      alert('Filme cadastrado com sucesso!');
      navigate('/listar');
    } catch (error) {
      console.error("Erro ao cadastrar filme", error);
      alert('Erro ao cadastrar filme.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" gutterBottom>
        Cadastrar Filme
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }} // Adiciona espaço entre os campos
      >
        <TextField
          label="Título"
          variant="outlined"
          fullWidth
          {...register("titulo", { required: "Título é obrigatório" })}
          // Mostra o erro do react-hook-form
          error={!!errors.titulo}
          helperText={errors.titulo?.message}
        />
        <TextField
          label="Faixa Etária"
          type="number"
          variant="outlined"
          fullWidth
          {...register("faixaEtaria", { 
            required: "Faixa Etária é obrigatória", 
            min: { value: 0, message: "Valor inválido"} 
          })}
          error={!!errors.faixaEtaria}
          helperText={errors.faixaEtaria?.message}
        />
        <TextField
          label="Atores (separados por vírgula)"
          variant="outlined"
          fullWidth
          {...register("atores", { required: "Atores são obrigatórios" })}
          error={!!errors.atores}
          helperText={errors.atores?.message}
        />
        <TextField
          label="Gênero"
          variant="outlined"
          fullWidth
          {...register("genero", { required: "Gênero é obrigatório" })}
          error={!!errors.genero}
          helperText={errors.genero?.message}
        />

        {/* --- NOVO CAMPO DE UPLOAD DE PÔSTER --- */}
        <Button
          variant="outlined"
          component="label" // Faz o botão agir como um <label>
        >
          {/* Mostra o nome do arquivo selecionado ou o texto padrão */}
          {posterFile ? posterFile.name : "Selecionar Pôster"}
          <input
            type="file"
            hidden // O input HTML fica escondido
            onChange={handleFileChange}
            accept="image/*" // Aceita só imagens
          />
        </Button>
        {/* --- FIM DO CAMPO DE UPLOAD --- */}
        
        <Button type="submit" variant="contained" size="large">
          Cadastrar
        </Button>
      </Box>
    </Container>
  );
}

export default CadastrarFilme;