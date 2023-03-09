import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';
import useAsync from '../useAsync';

export default function useUpdateBooking() {
  const token = useToken();

  const {
    loading: bookingLoading,
    error: bookingError,
    act: updateBooking,
  } = useAsync((id, body) => bookingApi.putBooking(id, body, token), false);

  return {
    bookingLoading,
    bookingError,
    updateBooking,
  };
}
