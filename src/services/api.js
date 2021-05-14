import axios from 'axios';

const api = axios.create({
    baseURL: 'https://desafio-codex-matheus-lourival.herokuapp.com/',
});

export default api;