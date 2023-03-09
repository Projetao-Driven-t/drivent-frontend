import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';
import useAsync from '../useAsync';

function useBooking() {
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

function useGetBooking() {
  const token = useToken();
  const {
    data: booking,
    loading: bookingLoading,
    error: bookingError,
    act: getBooking,
  } = useAsync(() => bookingApi.getBooking(token));

  return {
    booking,
    bookingLoading,
    bookingError,
    getBooking,
  };
}

const useBookingFunction = {
  useGetBooking,
  useBooking,
};

export default useBookingFunction;
