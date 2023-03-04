import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import useTicket from '../../../hooks/api/useTicket';
import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

import Button from '../../../components/Form/Button';

export default function PaymentArea() {
  const { ticket, ticketLoading } = useTicket();
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [focus, setFocus] = useState('');

  if (ticketLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <>ingresso escolhido</>
      <BotaoTemporario>
        <h1>{ticket.TicketType.name}</h1>
        <h2>R$ {ticket.TicketType.price.toFixed(2).replace('.', ',')}</h2>
      </BotaoTemporario>
      <>Pagamento</>
      <CardInformations>
        <Cards number={number} name={name} expiry={expiry} cvc={cvc} focused={focus} />
        <InputContainer>
          <input
            type="number"
            name="number"
            placeholder="Card Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
          />
          <input
            type="tel"
            name="expiry"
            placeholder="Valid Thru"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
          />
          <input
            type="number"
            name="cvc"
            placeholder="CVC"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
          />
        </InputContainer>
      </CardInformations>
      <SubmitContainer>
        <Button type="submit">Finalizar Pagamento</Button>
      </SubmitContainer>
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
  margin-bottom: 30px;

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

const CardInformations = styled.div`
  margin-top: 24px;
  display:flex; 
  align-items:center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right:300px;

  input {
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s;
    margin-top: 20px;
  }
`;

const SubmitContainer = styled.div`
  margin-top: 40px !important;
  width: 100% !important;

  > button {
    margin-top: 0 !important;
  }
`;
