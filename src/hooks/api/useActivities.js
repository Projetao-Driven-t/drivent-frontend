import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';
import useAsync from '../useAsync';

export default function useGetActivities(onlyDate) {
  const token = useToken();

  const {
    data: activities,
    loading: activitiesLoading,
    error: activitiesError,
    act: getAcitivitiesByDate,
  } = useAsync(() => activitiesApi.getAcitivitiesByDate(token, onlyDate));

  return {
    activities,
    activitiesLoading,
    activitiesError,
    getAcitivitiesByDate,
  };
}
