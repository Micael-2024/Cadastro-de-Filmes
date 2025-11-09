import axios from 'axios';

// Aponta para o seu back-end Express
const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export default api;