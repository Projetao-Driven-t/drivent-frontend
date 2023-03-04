import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import useTicket from '../../../hooks/api/useTicket';

export default function PaymentArea() {
  const { ticket } = useTicket();

  console.log(ticket.TicketType.name, 'AKI TAAAAAAA TICKETTTTTT');

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <>ingresso escolhido</>
      <BotaoTemporario>
        <h1>{ticket.TicketType.name}</h1>
        <h2>R$ {ticket.TicketType.price.toFixed(2).replace('.', ',')}</h2>
      </BotaoTemporario>
      <>Pagamento</>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const BotaoTemporario = styled.div`
  width: 290px;
  height: 108px;
  background: #ffeed2;
  border-radius: 20px;
  margin-top: 17px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom:30px;

  h1 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #454545;
  }

  h2 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #898989;
    margin-top: 8px;
  }
`;
