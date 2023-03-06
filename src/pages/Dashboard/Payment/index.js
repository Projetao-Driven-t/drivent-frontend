import { useState } from 'react';
import ShowWarning from '../../../components/Dashboard/Content/ShowWarning';
import TicketSelection from '../../../components/Tickets/TicketSelection';
import useEnrollment from '../../../hooks/api/useEnrollment';

export default function Payment() {
  const [isThereTicket, setIsThereTicket] = useState(false);
  const { enrollment } = useEnrollment();
  if(!enrollment) {
    return <ShowWarning/>;
  }
  return <>{!isThereTicket ? <TicketSelection /> : 'Tem ticket'}</>;
}

