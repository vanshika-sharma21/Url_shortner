import api from './authApi';

export const shortenUrl = async (originalUrl) => {
  const { data } = await api.post('/api/url/shorten', { originalUrl });
  return data;
};

export const getUserUrls = async () => {
  const { data } = await api.get('/api/url/user/urls');
  return data;
};

export const deleteUrl = async (id) => {
  await api.delete(`/api/url/${id}`);
};