import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketsApi';

export default function usePostTicket() {
  const token = useToken();

  const {
    loading: postTicketLoading,
    error: postTicketError,
    act: postTicket,
  } = useAsync((data) => ticketApi.postTicket(data, token));

  return {
    postTicketLoading,
    postTicketError,
    postTicket,
  };
}
