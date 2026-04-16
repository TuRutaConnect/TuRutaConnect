import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const locationsService = {
  getAll: async () => {
    const response = await api.get('/locations');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/locations/${id}`);
    return response.data;
  },
};

export default api;
