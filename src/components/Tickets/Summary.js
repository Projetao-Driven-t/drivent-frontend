import { toast } from 'react-toastify';
import styled from 'styled-components';
import usePostTicket from '../../hooks/api/usePostTicket';
import Button from '../Form/Button';

export function Summary({ ticketTypeId, ticketTypePrice, setTicketUser }) {
  const { postTicket } = usePostTicket();

  async function sendTicketType() {
    try {
      const ticketReceived = await postTicket({ ticketTypeId });
      setTicketUser({ ...ticketReceived });
      console.log(ticketReceived, 'SUMMARY');
      toast('Informações salvas com sucesso!');
    } catch (err) {
      toast('Não foi possível salvar suas informações!');
    }
  }

  return (
    <SummaryStyle>
      <div>
        <h2>
          Fechado! O total ficou em <strong>R$ {ticketTypePrice}</strong>. Agora é só confirmar:
        </h2>
      </div>
      <Button onClick={() => sendTicketType()}>RESERVAR INGRESSO</Button>
    </SummaryStyle>
  );
}

const SummaryStyle = styled.div`
  h2 {
    font-size: 18px;
    margin-bottom: 10px;
    color: #8e8e8e;
    font-family: 'Roboto';
  }

  button {
    height: 37px;
  }
`;
