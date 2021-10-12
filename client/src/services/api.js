import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.107:4000',
  timeout: 1000,
  headers: {
    'X-Custom-Header': 'foobar',
    Authorization: `Bearer ${localStorage.getItem('@telegram.token')}`,
  },
});

export default api;
