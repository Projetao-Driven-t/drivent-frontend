/* eslint-disable indent */
import { useState } from 'react';
import TicketSelection from '../../../components/Tickets/TicketSelection';

export default function Payment() {
  const [isThereTicket, setIsThereTicket] = useState(false);
  return <>{!isThereTicket ? <TicketSelection /> : 'Tem ticket'}</>;
}
