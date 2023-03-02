import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketTypes from '../../services/ticketTypeApi';

export default function useTicketType() {
  const token = useToken();
  
  const {
    data: ticketType,
    loading: ticketTypeLoading,
    error: ticketTypeError,
    act: getTicketTypes
  } = useAsync(() => ticketTypes.getTicketTypes(token));

  return {
    ticketType,
    ticketTypeLoading,
    ticketTypeError,
    getTicketTypes
  };
};
