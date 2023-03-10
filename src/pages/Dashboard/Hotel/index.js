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

  const { booking, bookingLoading, getBooking } = useGetBooking();

  const [showSelectHotel, setShowSelectHotel] = useState(true);
  const [showSelectRoom, setShowSelectRoom] = useState(false);
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    if (booking) {
      setBookingUser(booking);
      setShowSelectHotel(false);
      setShowSelectRoom(false);
      setShowResume(true);
    }
  }, [booking]);

  if (bookingLoading) {
    return <>Loading...</>;
  }

  function changeBooking() {
    // getBooking();
    setShowResume(false);
    setShowSelectHotel(true);
  }

  return (
    <>
      <Title>Escolha de hotel e quarto</Title>
      {showSelectHotel ? (
        <HotelSelection setHotelSelected={setHotelSelected} setShowSelectRoom={setShowSelectRoom} />
      ) : (
        ''
      )}
      {showSelectRoom ? (
        <RoomSelection
          hotelSelected={hotelSelected}
          roomSelected={roomSelected}
          setRoomSelected={setRoomSelected}
          bookingUser={bookingUser}
          setBookingUser={setBookingUser}
          setShowSelectHotel={setShowSelectHotel}
          setShowSelectRoom={setShowSelectRoom}
          setShowResume={setShowResume}
        />
      ) : (
        ''
      )}
      {showResume ? (
        <BookingResume booking={bookingUser} roomSelected={roomSelected} changeBooking={changeBooking} />
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
