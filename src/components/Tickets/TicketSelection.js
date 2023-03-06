/* eslint-disable indent */
import { useState } from 'react';
import styled from 'styled-components';
import useTicketType from '../../hooks/api/useTicketTypes';
import { useFindTicketType } from '../../hooks/useReturnTicketsTypes';
import { Summary } from './Summary';

export default function TicketSelection() {
  const { ticketTypes, ticketTypesLoading } = useTicketType();

  const { ticketTypeOnline, ticketTypeIncludesHotel, ticketTypeNotIncludesHotel } = useFindTicketType(ticketTypes);

  const [ticketSelectedIsRemote, setTicketSelectedIsRemote] = useState(false);
  const [ticketSelectedIsInPerson, setTicketSelectedIsInPerson] = useState(false);

  const [ticketSelectedNotIncludesHotel, setTicketSelectedNotIncludesHotel] = useState(false);
  const [ticketSelectedIncludesHotel, setTicketSelectedIncludesHotel] = useState(false);

  const [ticketSelected, setTicketSelected] = useState({});

  return (
    <Container>
      {!ticketTypesLoading ? (
        <>
          <Title>Ingresso e pagamento</Title>
          <ContainerTicketTypes>
            <h2>Primeiro, escolha sua modalidade de ingresso</h2>
            <Cont>
              <Types
                onClick={(e) => {
                  setTicketSelectedIsInPerson(!ticketSelectedIsInPerson);
                  setTicketSelectedIsRemote(false);
                }}
                selected={ticketSelectedIsInPerson}
              >
                <h3>Presencial</h3>
                <h4>R$ {ticketTypeNotIncludesHotel.price}</h4>
              </Types>
              <Types
                onClick={(e) => {
                  setTicketSelectedIsRemote(!ticketSelectedIsRemote);
                  setTicketSelectedIsInPerson(false);
                  setTicketSelected({ ...ticketTypeOnline });
                }}
                selected={ticketSelectedIsRemote}
              >
                <h3>Online</h3>
                <h4>R$ {ticketTypeOnline.price}</h4>
              </Types>
            </Cont>
          </ContainerTicketTypes>
          {ticketSelectedIsInPerson ? (
            <ContainerTicketTypes>
              <h2>Ótimo! Agora escolha sua modalidade de hospedagem</h2>
              <Cont>
                <Types
                  onClick={(e) => {
                    setTicketSelectedNotIncludesHotel(true);
                    setTicketSelectedIncludesHotel(false);
                    setTicketSelected({ ...ticketTypeNotIncludesHotel });
                  }}
                  selected={ticketSelectedNotIncludesHotel}
                >
                  <h3>Sem Hotel</h3>
                  <h4>+ R$ 0</h4>
                </Types>
                <Types
                  onClick={(e) => {
                    setTicketSelectedIncludesHotel(true);
                    setTicketSelectedNotIncludesHotel(false);
                    setTicketSelected({ ...ticketTypeIncludesHotel });
                  }}
                  selected={ticketSelectedIncludesHotel}
                >
                  <h3>Com Hotel</h3>
                  <h4>+ R$ {ticketTypeIncludesHotel.price - ticketTypeNotIncludesHotel.price}</h4>
                </Types>
              </Cont>
            </ContainerTicketTypes>
          ) : (
            ''
          )}
          {ticketSelectedIsRemote ||
          (ticketSelectedIsInPerson && (ticketSelectedNotIncludesHotel || ticketSelectedIncludesHotel)) ? (
            <Summary ticketTypeId={ticketSelected.id} ticketTypePrice={ticketSelected.price} />
          ) : (
            ''
          )}{' '}
        </>
      ) : (
        ''
      )}
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
  /* height: 180px; */
  width: 100%;
  overflow: hidden;
  margin-bottom: 25px;

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
  justify-content: flex-start;
`;

const Types = styled.div`
  margin: 10px 20px 0px 0px;
  width: 145px;
  height: 145px;
  border: 1px solid #cecece;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: ${(props) => (props.selected ? '#FFEED2' : '#FFF')};
  cursor: pointer;
`;
