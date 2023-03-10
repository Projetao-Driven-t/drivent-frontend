import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import useGetBooking from '../../hooks/api/useGetBooking';
import usePostBooking from '../../hooks/api/usePostBooking';
import useUpdateBooking from '../../hooks/api/useUpdateBooking';
import Button from '../Form/Button';
import { Room } from './Room';

export default function RoomSelection({
  hotelSelected,
  roomSelected,
  setRoomSelected,
  bookingUser,
  setBookingUser,
  setShowHotelSelection,
  setShowRoomSelection,
  setShowBookingResume,
}) {
  const isItRoomChange = Boolean(bookingUser.id);
  const roomIdPreviousSelected = isItRoomChange ? bookingUser.Room.id : 0;

  const { postBooking } = usePostBooking();
  const { updateBooking } = useUpdateBooking();
  const { getBooking } = useGetBooking();

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (hotelSelected) {
      setRooms(
        hotelSelected.Rooms.sort((a, b) => {
          return a.name - b.name;
        }).map((room) => ({
          id: room.id,
          hotelId: hotelSelected.id,
          name: room.name,
          capacity: room.capacity,
          occupation: room._count.Booking,
          isSelected: roomIdPreviousSelected === room.id,
          isRoomChange: isItRoomChange && roomIdPreviousSelected === room.id,
        }))
      );
    }
  }, [hotelSelected]);

  function handleRoomSelection(id) {
    const newRooms = rooms.map((room) =>
      room.id === id ? { ...room, isSelected: true } : { ...room, isSelected: false }
    );
    setRooms(newRooms);
    setRoomSelected(newRooms.find((room) => room.isSelected));
  }

  async function sendBooking() {
    if (roomSelected) {
      try {
        if (!isItRoomChange) {
          await postBooking({ roomId: roomSelected.id });
        } else if (roomSelected.id !== roomIdPreviousSelected) {
          await updateBooking(bookingUser.id, { roomId: roomSelected.id });
        }
        setBookingUser(await getBooking());
        setShowBookingResume(true);
        setShowRoomSelection(false);
        setShowHotelSelection(false);
        toast('Informações salvas com sucesso!');
      } catch (err) {
        toast('Não foi possível salvar suas informações!');
      }
    }
  }

  return (
    <RoomSelectionStyle>
      <Subtitle>Ótima pedida! Agora escolha seu quarto</Subtitle>
      <Rooms>
        {rooms.map((room) => (
          <Room
            key={room.id}
            id={room.id}
            name={room.name}
            capacity={room.capacity}
            occupation={room.occupation}
            isSelected={room.isSelected}
            isRoomChange={room.isRoomChange}
            handleRoomSelection={handleRoomSelection}
          />
        ))}
      </Rooms>
      {roomSelected.id && roomSelected.hotelId === hotelSelected.id ? (
        <Button onClick={sendBooking}>RESERVAR QUARTO</Button>
      ) : (
        ''
      )}
    </RoomSelectionStyle>
  );
}
const RoomSelectionStyle = styled.div`
  width: 100%;

  button {
    height: 37px;
    background: #e0e0e0;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    border: none;
  }
`;

const Subtitle = styled.span`
  font-family: 'Roboto';
  font-size: 20px;
  line-height: 23.5px;
  color: #8e8e8e;
`;

const Rooms = styled.div`
  width: 100%;

  margin: 30px 0px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    gap: 10px;
    justify-content: center;
  }
`;
