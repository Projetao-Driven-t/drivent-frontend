import api from './api';

export async function getAcitivitiesByDate(token, onlyDate) {
  const response = await api.get(`/activities?date=${onlyDate}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
