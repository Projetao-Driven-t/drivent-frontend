import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import BookingResume from '../../../components/Booking/BookingResume';
import { HotelSelection } from '../../../components/Booking/HotelSelection';
import RoomSelection from '../../../components/Booking/RoomSelection';
import useGetBooking from '../../../hooks/api/useGetBooking';
import useTicket from '../../../hooks/api/useTicket';

export default function Hotel() {
  const { ticket } = useTicket();

  const [hotelSelected, setHotelSelected] = useState({});
  const [roomSelected, setRoomSelected] = useState({});
  const [bookingUser, setBookingUser] = useState({});
  const { booking, bookingLoading } = useGetBooking();

  const [showHotelSelection, setShowHotelSelection] = useState(false);
  const [showRoomSelection, setShowRoomSelection] = useState(false);
  const [showBookingResume, setShowBookingResume] = useState(false);
  const [showErrorMessageNotPaidTicket, setShowErrorMessageNotPaidTicket] = useState(false);
  const [showErrorMessageNotIncludesHotel, setShowErrorMessageNotIncludesHotel] = useState(false);

  useEffect(() => {
    if (booking) {
      setBookingUser(booking);
      setShowErrorMessageNotPaidTicket(false);
      setShowErrorMessageNotIncludesHotel(false);
      setShowHotelSelection(false);
      setShowRoomSelection(false);
      setShowBookingResume(true);
    }
  }, [booking]);

  useEffect(() => {
    if (!ticket || ticket.status !== 'PAID') {
      setShowErrorMessageNotPaidTicket(true);
      setShowErrorMessageNotIncludesHotel(false);
    } else if (!ticket.TicketType.includesHotel) {
      setShowErrorMessageNotIncludesHotel(true);
      setShowErrorMessageNotPaidTicket(false);
    } else if (ticket.TicketType.includesHotel) {
      setShowErrorMessageNotPaidTicket(false);
      setShowErrorMessageNotIncludesHotel(false);
      setShowHotelSelection(true);
    }
  }, [ticket]);

  if (bookingLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {showErrorMessageNotPaidTicket ? (
        <Message>
          <p>Você precisa ter confirmado pagamento antes</p>
          <p>de fazer a escolha da hospedagem</p>
        </Message>
      ) : (
        ''
      )}
      {showErrorMessageNotIncludesHotel ? (
        <Message>
          <p>Sua modalidade de ingresso não inclui hospedagem</p>
          <p>Prossiga para a escolha de atividades</p>
        </Message>
      ) : (
        ''
      )}
      {showHotelSelection ? (
        <HotelSelection
          hotelSelected={hotelSelected}
          setHotelSelected={setHotelSelected}
          setShowRoomSelection={setShowRoomSelection}
        />
      ) : (
        ''
      )}
      {showRoomSelection ? (
        <RoomSelection
          hotelSelected={hotelSelected}
          roomSelected={roomSelected}
          setRoomSelected={setRoomSelected}
          bookingUser={bookingUser}
          setBookingUser={setBookingUser}
          setShowHotelSelection={setShowHotelSelection}
          setShowRoomSelection={setShowRoomSelection}
          setShowBookingResume={setShowBookingResume}
        />
      ) : (
        ''
      )}
      {showBookingResume ? (
        <BookingResume
          bookingUser={bookingUser}
          setShowHotelSelection={setShowHotelSelection}
          setShowBookingResume={setShowBookingResume}
        />
      ) : (
        ''
      )}
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
