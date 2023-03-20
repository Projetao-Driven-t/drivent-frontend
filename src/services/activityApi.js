import api from './api';

export async function getActivitiesDates(token) {
  const response = await api.get('/activities?onlyDate=true', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getDayActivitiesApi(day, token) {
  const response = await api.get(`/activities?date=${day}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function postActivity(body, token) {
  const response = await api.post('/activities/subscription', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
