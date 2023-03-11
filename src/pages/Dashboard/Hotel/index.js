import styled from 'styled-components';
import useTicket from '../../../hooks/api/useTicket';
import Hotels from './Hotels';

export default function Hotel() {
  const { ticket } = useTicket();

  if (!ticket || (ticket.TicketType.includesHotel && ticket.status !== 'PAID')) {
    return (
      <NoHotels>
        <Title>Escolha de hotel e quarto</Title>
        <Message>
          <p>Você precisa ter confirmado pagamento antes</p>
          <p>de fazer a escolha da hospedagem</p>
        </Message>
      </NoHotels>
    );
  } else if (!ticket.TicketType.includesHotel) {
    return (
      <NoHotels>
        <Title>Escolha de hotel e quarto</Title>
        <Message>
          <p>Sua modalidade de ingresso não inclui hospedagem</p>
          <p>Prossiga para a escolha de atividades</p>
        </Message>
      </NoHotels>
    );
  }

  return <Hotels />;
}

const Title = styled.h1`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 34px;
  line-height: 40px;
  color: #000000;
  margin-bottom: 30px;
`;

const NoHotels = styled.div`
  font-family: 'Roboto';
  height: 100vh;
`;

const Message = styled.div`
  height: 60vh;
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
