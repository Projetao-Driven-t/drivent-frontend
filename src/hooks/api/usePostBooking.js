import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';
import useAsync from '../useAsync';

export default function usePostBooking() {
  const token = useToken();

  const {
    loading: bookingLoading,
    error: bookingError,
    act: postBooking,
  } = useAsync((data) => bookingApi.postBooking(data, token), false);

  return {
    bookingLoading,
    bookingError,
    postBooking,
  };
}
