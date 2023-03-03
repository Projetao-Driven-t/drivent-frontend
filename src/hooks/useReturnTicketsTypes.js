import { useEffect, useRef } from 'react';

export function useFindTicketType(ticketTypes) {
  const ticketTypeOnline = useRef({});
  const ticketTypeIncludesHotel = useRef({});
  const ticketTypeNotIncludesHotel = useRef({});

  useEffect(() => {
    if (ticketTypes) {
      ticketTypeOnline.current = ticketTypes.find((ticketType) => ticketType.isRemote);
      ticketTypeIncludesHotel.current = ticketTypes.find((ticketType) => ticketType.includesHotel);
      ticketTypeNotIncludesHotel.current = ticketTypes.find(
        (ticketType) => !ticketType.isRemote && !ticketType.includesHotel
      );
    }
  }, [ticketTypes]);

  return {
    ticketTypeOnline: ticketTypeOnline.current,
    ticketTypeIncludesHotel: ticketTypeIncludesHotel.current,
    ticketTypeNotIncludesHotel: ticketTypeNotIncludesHotel.current,
  };
}
