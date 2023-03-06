import { useEffect, useState } from 'react';
import ShowWarning from '../../../components/Dashboard/Content/ShowWarning';
import TicketSelection from '../../../components/Tickets/TicketSelection';
import useEnrollment from '../../../hooks/api/useEnrollment';
import PaymentArea from './PaymenteArea';
import useTicket from '../../../hooks/api/useTicket';

export default function Payment() {
  const { enrollment } = useEnrollment();
  const { ticket, ticketLoading } = useTicket();
  const [ticketUser, setTicketUser] = useState({ ...ticket });
  useEffect(() => {
    setTicketUser({ ...ticket });
  }, [ticket]);
  if (!enrollment) {
    return <ShowWarning />;
  }
  if (ticketLoading) {
    return <>Loading...</>;
  }
  return <>{ticketUser.id ? <PaymentArea ticket={ticketUser} setTicketUser={setTicketUser}/> : <TicketSelection setTicketUser={setTicketUser} />}</>;
}

