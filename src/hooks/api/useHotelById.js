import useAsync from '../useAsync';
import useToken from '../useToken';

import * as hotelsApi from '../../services/hotelApi';

export default function useHotelById(_id) {
  const token = useToken();

  const {
    data: hotel,
    loading: hotelLoading,
    error: hotelError,
    act: getHotelById,
  } = useAsync((id = _id) => hotelsApi.getHotelById(id, token));

  return {
    hotel,
    hotelLoading,
    hotelError,
    getHotelById,
  };
}
