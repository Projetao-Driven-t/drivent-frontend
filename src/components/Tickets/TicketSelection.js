import { useRef, useState } from 'react';
import styled from 'styled-components';
import { ticketTypes } from '../../mock/tickets';
import { Summary } from './Summary';

export default function TicketSelection() {
  const ticketTypeOnline = useRef(ticketTypes.find((ticketType) => ticketType.isRemote));
  const ticketTypeIncludesHotel = useRef(ticketTypes.find((ticketType) => ticketType.includesHotel));
  const ticketTypeNotIncludesHotel = useRef(
    ticketTypes.find((ticketType) => !ticketType.isRemote && !ticketType.includesHotel)
  );

  const [ticketSelectedIsRemote, setTicketSelectedIsRemote] = useState(false);
  const [ticketSelectedIsInPerson, setTicketSelectedIsInPerson] = useState(false);

  const [ticketSelectedNotIncludesHotel, setTicketSelectedNotIncludesHotel] = useState(false);
  const [ticketSelectedIncludesHotel, setTicketSelectedIncludesHotel] = useState(false);

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
            }}
            selected={ticketSelectedNotIncludesHotel}
          >
            Sem Hotel + R$ 0
          </Ticket>
          <Ticket
            onClick={(e) => {
              setTicketSelectedIncludesHotel(true);
              setTicketSelectedNotIncludesHotel(false);
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
        {ticketSelectedIsRemote ? <Summary value={ticketTypeOnline.current.price} /> : ''}
        {ticketSelectedIsInPerson && (ticketSelectedNotIncludesHotel || ticketSelectedIncludesHotel) ? (
          <Summary
            value={
              ticketSelectedNotIncludesHotel
                ? ticketTypeNotIncludesHotel.current.price
                : ticketTypeIncludesHotel.current.price
            }
          />
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
