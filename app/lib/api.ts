import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data.access_token;
};

export const fetchData = async (endpoint: string, token: string) => {
  const response = await api.get(endpoint, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateData = async (endpoint: string, data: any, token: string) => {
  const response = await api.put(endpoint, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const createData = async (endpoint: string, data: any, token: string) => {
  const response = await api.post(endpoint, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteData = async (endpoint: string, token: string) => {
  const response = await api.delete(endpoint, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};