/* eslint-disable indent */
import useAsync from '../useAsync';

import dayjs from 'dayjs';
import * as activityApi from '../../services/activityApi';
import useToken from '../useToken';

export default function useActivitiesDates() {
  const token = useToken();

  const {
    data: dates,
    loading: datesLoading,
    error: datesError,
    act: getActivitiesDates,
  } = useAsync(() => activityApi.getActivitiesDates(token));

  function datesAscendingOrder(dates) {
    return dates
      ? dates.sort((a, b) => {
          return dayjs(b.date).isBefore(dayjs(a.date)) ? 1 : -1;
        })
      : undefined;
  }

  return {
    dates: datesAscendingOrder(dates),
    datesLoading,
    datesError,
    getActivitiesDates,
  };
}
