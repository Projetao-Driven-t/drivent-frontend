import BookinResume from '../../../components/Booking/BookingResume';
import { RoomSelection } from '../../../components/Booking/RoomSelection';
import { useEffect, useState } from 'react';
import useBookingFunction from '../../../hooks/api/useBooking';

export default function Hotel() {
  const { booking, bookingLoading } = useBookingFunction.useGetBooking();
  const [bookingUser, setBookingUser] = useState({ ...booking });
  useEffect(() => {
    setBookingUser({ ...booking });
  }, [booking]);
  if (bookingLoading) {
    return <>Loading...</>;
  }

  return <>{bookingUser.id ? <BookinResume booking={booking} /> : <RoomSelection />} </>;
}
