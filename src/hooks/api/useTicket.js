import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';
import useAsync from '../useAsync';

export default function useTicket() {
  const token = useToken();

  const {
    data: ticket,
    loading: ticketLoading,
    error: ticketError,
    act: getTicket,
  } = useAsync(() => paymentApi.getTickets(token));

  return {
    ticket,
    ticketLoading,
    ticketError,
    getTicket,
  };
}
