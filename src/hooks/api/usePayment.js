import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';
import useAsync from '../useAsync';

export default function usePayment() {
  const token = useToken();
  const {
    loading: paymentLoading,
    error: paymentError,
    act: paymentProcess,
  } = useAsync((data) => paymentApi.paymentProcess(data, token), false);

  return {
    paymentLoading,
    paymentError,
    paymentProcess,
  };
}
