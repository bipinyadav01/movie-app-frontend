import axios from 'axios';

const API = axios.create({
  baseURL: 'https://movie-app-backend-du4x.onrender.com/api'
});

export default API;
