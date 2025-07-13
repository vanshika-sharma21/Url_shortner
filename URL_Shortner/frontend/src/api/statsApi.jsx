import api from './authApi';

export const getUserStats = async () => {
  const { data } = await api.get('/api/stats/user');
  return data;
};

export const getUrlStats = async (urlId) => {
  const { data } = await api.get(`/api/stats/url/${urlId}`);
  return data;
};