/* eslint-disable indent */
import useAsync from '../useAsync';

import dayjs from 'dayjs';
import * as activityApi from '../../services/activityApi';
import useToken from '../useToken';

export default function useDayActivities() {
  const token = useToken();

  const {
    data: dayActivities,
    loading: dayActivitiesLoading,
    error: dayActivitiesError,
    act: getDayActivities,
  } = useAsync((day) => activityApi.getDayActivitiesApi(dayjs(day).format('YYYY-MM-DD'), token), false);

  return {
    dayActivities,
    dayActivitiesLoading,
    dayActivitiesError,
    getDayActivities,
  };
}
