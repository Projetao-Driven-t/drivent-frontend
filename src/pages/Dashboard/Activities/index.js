import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ActivitiesDaySelection from '../../../components/Activities/ActivitiesDaySelection';
import useTicket from '../../../hooks/api/useTicket';

export default function Activities() {
  const { ticket } = useTicket();

  const [showErrorMessageNotPaidTicket, setShowErrorMessageNotPaidTicket] = useState(false);
  const [showErrorMessageNotNeedActivities, setShowErrorMessageNotNeedActivities] = useState(false);
  const [showActivitiesDaySelection, setShowActivitiesDaySelection] = useState(false);

  useEffect(() => {
    if (!ticket || ticket.status !== 'PAID') {
      setShowErrorMessageNotPaidTicket(true);
      setShowErrorMessageNotNeedActivities(false);
    } else if (ticket.TicketType.isRemote) {
      setShowErrorMessageNotNeedActivities(true);
      setShowErrorMessageNotPaidTicket(false);
    } else if (!ticket.TicketType.isRemote) {
      setShowErrorMessageNotPaidTicket(false);
      setShowErrorMessageNotNeedActivities(false);
      setShowActivitiesDaySelection(true);
    }
  }, [ticket]);

  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      {showErrorMessageNotPaidTicket ? (
        <Message>
          <p>Você precisa ter confirmado pagamento antes</p>
          <p>de fazer a escolha de atividades</p>
        </Message>
      ) : (
        ''
      )}
      {showErrorMessageNotNeedActivities ? (
        <Message>
          <p>Sua modalidade de ingresso não necessita escolher</p>
          <p>atividade. Você terá acesso a todas as atividades.</p>
        </Message>
      ) : (
        ''
      )}
      {showActivitiesDaySelection ? <ActivitiesDaySelection /> : ''}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const Message = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & > p {
    color: #8e8e8e;
    font-size: 20px;
    text-align: center;
  }
`;
