import { useEffect, useState } from 'react';
import styled from 'styled-components';
import BookingResume from '../../../components/Booking/BookingResume';
import { HotelSelection } from '../../../components/Booking/HotelSelection';
import RoomSelection from '../../../components/Booking/RoomSelection';
import useGetBooking from '../../../hooks/api/useGetBooking';

export default function Hotel() {
  const [hotelSelected, setHotelSelected] = useState({});
  const [roomSelected, setRoomSelected] = useState({});
  const [bookingUser, setBookingUser] = useState({});

  const { booking, bookingLoading } = useGetBooking();

  const [showHotelSelection, setShowHotelSelection] = useState(true);
  const [showRoomSelection, setShowRoomSelection] = useState(false);
  const [showBookingResume, setShowBookingResume] = useState(false);

  useEffect(() => {
    if (booking) {
      setBookingUser(booking);
      setShowHotelSelection(false);
      setShowRoomSelection(false);
      setShowBookingResume(true);
    }
  }, [booking]);

  if (bookingLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <Title>Escolha de hotel e quarto</Title>
      {showHotelSelection ? (
        <HotelSelection setHotelSelected={setHotelSelected} setShowRoomSelection={setShowRoomSelection} />
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

const Title = styled.h1`
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 34px;
  line-height: 40px;
  color: #000000;
  margin-bottom: 30px;
`;
