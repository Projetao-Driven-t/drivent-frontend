/* eslint-disable indent */
import { useState } from 'react';
import styled from 'styled-components';
import { useFindTicketType } from '../../hooks/useReturnTicketsTypes';
import { ticketTypes } from '../../mock/tickets';
import { Summary } from './Summary';

export default function TicketSelection() {
  const { ticketTypeOnline, ticketTypeIncludesHotel, ticketTypeNotIncludesHotel } = useFindTicketType(ticketTypes);

  const [ticketSelected, setTicketSelected] = useState({});

  const [ticketSelectedIsRemote, setTicketSelectedIsRemote] = useState(false);
  const [ticketSelectedIsInPerson, setTicketSelectedIsInPerson] = useState(false);

  const [ticketSelectedNotIncludesHotel, setTicketSelectedNotIncludesHotel] = useState(false);
  const [ticketSelectedIncludesHotel, setTicketSelectedIncludesHotel] = useState(false);

  console.log(ticketSelected);
  // TODO: refactor... handleTicketSelection()

  return (
    <>
      <TicketsBox>
        <Ticket
          onClick={(e) => {
            setTicketSelectedIsInPerson(!ticketSelectedIsInPerson);
            setTicketSelectedIsRemote(false);
          }}
          selected={ticketSelectedIsInPerson}
        >
          Presencial
        </Ticket>
        <Ticket
          onClick={(e) => {
            setTicketSelectedIsRemote(!ticketSelectedIsRemote);
            setTicketSelectedIsInPerson(false);
            setTicketSelected({ ...ticketTypeOnline.current });
          }}
          selected={ticketSelectedIsRemote}
        >
          Online
        </Ticket>
      </TicketsBox>
      {ticketSelectedIsInPerson ? (
        <TicketsBox>
          <Ticket
            onClick={(e) => {
              setTicketSelectedNotIncludesHotel(true);
              setTicketSelectedIncludesHotel(false);
              setTicketSelected({ ...ticketTypeNotIncludesHotel.current });
            }}
            selected={ticketSelectedNotIncludesHotel}
          >
            Sem Hotel + R$ 0
          </Ticket>
          <Ticket
            onClick={(e) => {
              setTicketSelectedIncludesHotel(true);
              setTicketSelectedNotIncludesHotel(false);
              setTicketSelected({ ...ticketTypeIncludesHotel.current });
            }}
            selected={ticketSelectedIncludesHotel}
          >
            Com Hotel + R$ {ticketTypeIncludesHotel.current.price - ticketTypeNotIncludesHotel.current.price}
          </Ticket>
        </TicketsBox>
      ) : (
        ''
      )}

      <SummaryBox>
        {ticketSelectedIsRemote ||
        (ticketSelectedIsInPerson && (ticketSelectedNotIncludesHotel || ticketSelectedIncludesHotel)) ? (
          <Summary ticketTypeId={ticketSelected.id} ticketTypePrice={ticketSelected.price} />
        ) : (
          ''
        )}
      </SummaryBox>
    </>
  );
}

const TicketsBox = styled.div`
  height: 30%;
  display: flex;
  align-items: center;
  gap: 50px;
`;

const Ticket = styled.div`
  height: 145px;
  width: 145px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;

  text-align: center;

  border: 1px solid #cecece;
  border-radius: 20px;

  background-color: ${(props) => (props.selected ? '#FFEED2' : '#FFF')};

  &:hover {
    cursor: pointer;
  }
`;

const SummaryBox = styled.div`
  margin-top: 50px;
`;
