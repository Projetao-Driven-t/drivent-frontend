import styled from 'styled-components';
import { useState } from 'react';
import useTicketType from '../../../hooks/api/useTicketTypes';

export default function Payment() {
  const [RemoteClicked, setRemoteClicked] = useState(false);
  const [PresentialClicked, setPresentialClicked] = useState(false);
  const { ticketType } = useTicketType();

  console.log(ticketType);

  return (
    <Container>
      <Title>Ingresso e pagamento</Title>
      <ContainerTicketTypes>
        <h2>Primeiro, escolha sua modalidade de ingresso</h2>
        <Cont>
          <Types
            onClick={() => setPresentialClicked(!PresentialClicked)}
            color={PresentialClicked ? '#FFEED2' : '#FFFFFF'}
          >
            <h3>Presencial</h3>
            <h4>R$250</h4>
          </Types>
          <Types onClick={() => setRemoteClicked(!RemoteClicked)} color={RemoteClicked ? '#FFEED2' : '#FFFFFF'}>
            <h3>Online</h3>
            <h4>R$100</h4>
          </Types>
        </Cont>
      </ContainerTicketTypes>
    </Container>
  );
}

const Title = styled.h1`
  width: 43%;
  height: auto;
  font-family: 'Roboto';
  font-style: normal;
  font-size: 32px;
  color: #000000;
  margin-bottom: 20px;
`;

const Container = styled.div`
  height: 100%;
`;

const ContainerTicketTypes = styled.div`
  height: 180px;
  width: 50%;
  overflow: hidden;

  h2 {
    font-size: 18px;
    margin-bottom: 10px;
    color: #8e8e8e;
    font-family: 'Roboto';
  }

  h3 {
    color: #454545;
    font-size: 16px;
  }

  h4 {
    color: #8e8e8e;
    font-size: 15px;
  }
`;

const Cont = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 60%;
  height: auto;
`;

const Types = styled.div`
  margin-top: 10px;
  width: 45%;
  height: 110px;
  border: 1px solid #cecece;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => props.color};
`;
