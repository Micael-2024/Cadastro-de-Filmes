import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

// Importações do MUI
import { TextField, Button, Box, Typography, Container, Avatar } from '@mui/material';

function AlterarFilme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
  // Estado para o novo arquivo de pôster
  const [posterFile, setPosterFile] = useState(null);
  // Estado para mostrar o pôster atual
  const [currentPosterUrl, setCurrentPosterUrl] = useState(null);

  const formatAtores = (atores) => {
    if (!atores || !Array.isArray(atores)) return '';
    return atores.map(ator => ator.nome).join(', ');
  };

  useEffect(() => {
    async function fetchFilme() {
      try {
        const response = await api.get(`/filmes/${id}`);
        const filme = response.data;
        // O 'reset' do react-hook-form popula os TextFields
        reset({
          ...filme,
          atores: formatAtores(filme.atores)
        });
        // Guarda a URL do pôster atual para exibição
        setCurrentPosterUrl(filme.posterUrl);
      } catch (error) {
        console.error("Erro ao buscar filme", error);
        navigate('/listar');
      }
    }
    fetchFilme();
  }, [id, reset, navigate]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setPosterFile(e.target.files[0]);
      // Mostra uma prévia local da nova imagem
      setCurrentPosterUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('titulo', data.titulo);
    formData.append('faixaEtaria', data.faixaEtaria);
    formData.append('genero', data.genero);
    
    const atoresArray = data.atores.split(',').map(ator => ator.trim());
    atoresArray.forEach(ator => {
      formData.append('atores', ator);
    });

    // Adiciona o novo arquivo de pôster APENAS se um novo foi selecionado
    if (posterFile) {
      formData.append('poster', posterFile);
    }

    try {
      await api.put(`/filmes/${id}`, formData, {
         headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Filme alterado com sucesso!');
      navigate('/listar');
    } catch (error) {
      console.error("Erro ao alterar filme", error);
      alert('Erro ao alterar filme.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" gutterBottom>
        Alterar Filme
      </Typography>

      {/* Exibe o pôster atual ou o novo selecionado */}
      {currentPosterUrl && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Avatar 
            src={currentPosterUrl} 
            variant="rounded" 
            sx={{ width: 100, height: 100 }} 
          />
        </Box>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <TextField
          label="Título"
          variant="outlined"
          fullWidth
          {...register("titulo", { required: "Título é obrigatório" })}
          error={!!errors.titulo}
          helperText={errors.titulo?.message}
          InputLabelProps={{ shrink: true }} // Garante que o label não sobreponha o texto
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
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Atores (separados por vírgula)"
          variant="outlined"
          fullWidth
          {...register("atores", { required: "Atores são obrigatórios" })}
          error={!!errors.atores}
          helperText={errors.atores?.message}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Gênero"
          variant="outlined"
          fullWidth
          {...register("genero", { required: "Gênero é obrigatório" })}
          error={!!errors.genero}
          helperText={errors.genero?.message}
          InputLabelProps={{ shrink: true }}
        />
        
        {/* CAMPO DE UPLOAD PARA ALTERAR O PÔSTER */}
        <Button
          variant="outlined"
          component="label"
        >
          {posterFile ? posterFile.name : "Alterar Pôster"}
          <input
            type="file"
            hidden
            onChange={handleFileChange}
            accept="image/*"
          />
        </Button>

        <Button type="submit" variant="contained" size="large">
          Salvar Alterações
        </Button>
      </Box>
    </Container>
  );
}

export default AlterarFilme;