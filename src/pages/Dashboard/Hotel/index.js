import { useEffect, useState } from 'react';
import BookingResume from '../../../components/Booking/BookingResume';
import RoomSelection from '../../../components/Booking/RoomSelection';
import useGetBooking from '../../../hooks/api/useGetBooking';

const hotelMock = {
  id: 1,
  name: 'Cezar Hotel',
  image:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0mL5gqDkFwnbR1HUV8TRQoKhVW8PHxqJLoi7gEKX-HPobhqywMsApMXBTTkCzF_l_-Kc&usqp=CAU',
  createdAt: '2023-03-07T00:15:19.654Z',
  updatedAt: '2023-03-07T00:15:19.655Z',
};

export default function Hotel() {
  const [hotelSelected, setHotelSelected] = useState(hotelMock);
  const [roomSelected, setRoomSelected] = useState({});
  const [bookingUser, setBookingUser] = useState({});

  const { booking, bookingLoading, getBooking } = useGetBooking();

  const [showSelectHotel, setShowSelectHotel] = useState(true);
  const [showSelectRoom, setShowSelectRoom] = useState(false);
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    if (booking) {
      setBookingUser(booking);
    }
  }, [booking]);

  if (bookingLoading) {
    return <>Loading...</>;
  }

  function changeBooking() {
    getBooking();
    setShowResume(false);
    setShowSelectHotel(true);
  }

  return (
    <>
      {showSelectHotel ? <h1 onClick={() => setShowSelectRoom(true)}>Seleção de Hotel</h1> : ''}
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
      {showResume ? <BookingResume booking={bookingUser} changeBooking={changeBooking} /> : ''}
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
