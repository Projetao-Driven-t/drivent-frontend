import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import iconCheck from '../../../assets/images/check.png';
import Button from '../../../components/Form/Button';
import usePayment from '../../../hooks/api/usePayment';

export default function PaymentArea({ ticket, setTicketUser }) {
  const { paymentProcess } = usePayment();

  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [focus, setFocus] = useState('');
  const [issuer, setIssuer] = useState('');

  async function sendPayment() {
    const body = {
      ticketId: ticket.id,
      cardData: {
        issuer: issuer.toUpperCase(),
        number: parseInt(number),
        name: name,
        expirationDate: expiry,
        cvv: cvc,
      },
    };
    try {
      await paymentProcess(body);
      setTicketUser({ ...ticket, status: 'PAID' });
      toast('Informações salvas com sucesso!');
    } catch (err) {
      toast('Não foi possível salvar suas informações!');
    }
  }

  function handleCardCallback({ issuer }, isValid) {
    if (isValid) {
      setIssuer(issuer);
    }
  }

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <Subtitle>Ingresso escolhido</Subtitle>
      <BotaoTemporario>
        <h1>{ticket.TicketType.name}</h1>
        <h2>R$ {ticket.TicketType.price.toFixed(2).replace('.', ',')}</h2>
      </BotaoTemporario>
      <Subtitle>Pagamento</Subtitle>
      {ticket.status === 'PAID' ? (
        <ConfirmContainer>
          <img src={iconCheck} alt="icon check" />
          <div>
            <h2>
              <strong>Pagamento confirmado!</strong>
            </h2>
            <h2>Prossiga para escolha de hospedagem e atividades</h2>
          </div>
        </ConfirmContainer>
      ) : (
        <>
          <CardInformations>
            <Cards
              callback={handleCardCallback}
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              focused={focus}
            />
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
              <InsideContainer>
                <input
                  type="tel"
                  name="expiry"
                  placeholder="Valid Thru"
                  value={expiry}
                  maxLength={4}
                  onChange={(e) => setExpiry(e.target.value)}
                  onFocus={(e) => setFocus(e.target.name)}
                />
                <input
                  type="number"
                  name="cvc"
                  placeholder="CVC"
                  value={cvc}
                  maxLength={3}
                  onChange={(e) => setCvc(e.target.value)}
                  onFocus={(e) => setFocus(e.target.name)}
                />
              </InsideContainer>
            </InputContainer>
          </CardInformations>
          <SubmitContainer>
            <Button type="submit" onClick={sendPayment}>
              Finalizar Pagamento
            </Button>
          </SubmitContainer>
        </>
      )}
    </>
  );
}

const ConfirmContainer = styled.div`
  width: 55%;
  height: auto;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  h2 {
    font-family: 'Roboto';
    font-size: 16px;
    line-height: 19px;
    color: #454545;
  }
`;

const Subtitle = styled.span`
  font-family: 'Roboto';
  font-size: 20px;
  line-height: 23.5px;
  color: #8e8e8e;
`;

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;

  h4 {
    font-family: 'Roboto';
    color: #454545;
  }
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
    font-size: 16px;
    line-height: 19px;
    color: #454545;
  }

  h2 {
    font-family: 'Roboto';
    font-size: 14px;
    color: #898989;
    margin-top: 8px;
  }
`;

const CardInformations = styled.div`
  margin-top: 24px;
  display: flex;
  align-items: center;
`;

const InsideContainer = styled.div`
  display: flex;
  justify-content: space-between;

  input {
    width: 40%;
  }
`;

const InputContainer = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  margin-right: 25%;

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
    margin-top: 22px;
    margin-left: 20px;
  }
`;

const SubmitContainer = styled.div`
  margin-top: 40px !important;
  width: 100% !important;

  > button {
    margin-top: 0 !important;
    background: #e0e0e0;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    border: none;
  }
`;
