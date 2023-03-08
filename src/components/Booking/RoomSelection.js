import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import useBooking from '../../hooks/api/useBooking';
import useHotelById from '../../hooks/api/useHotelById';
import Button from '../Form/Button';
import { Room } from './Room';

const hotelId = 2;
export function RoomSelection() {
  const { hotel } = useHotelById(hotelId);
  const [rooms, setRooms] = useState([]);

  const roomIdSelected = useRef(0);

  const { postBooking } = useBooking();

  useEffect(() => {
    if (hotel) {
      setRooms(
        hotel.Rooms.sort((a, b) => {
          return a.name - b.name;
        }).map((room) => ({
          id: room.id,
          name: room.name,
          capacity: room.capacity,
          occupation: room._count.Booking,
          isSelected: false,
        }))
      );
    }
  }, [hotel]);

  function handleRoomSelection(id) {
    setRooms(rooms.map((room) => (room.id === id ? { ...room, isSelected: true } : { ...room, isSelected: false })));
    roomIdSelected.current = id;
  }

  async function sendBooking() {
    if (roomIdSelected.current) {
      try {
        await postBooking({ roomId: roomIdSelected.current });
        toast('Informações salvas com sucesso!');
      } catch (err) {
        toast('Não foi possível salvar suas informações!');
      }
    }
  }

  return (
    <RoomSelectionStyle>
      <h1>Room Selections</h1>
      <Rooms>
        {rooms.map((room) => (
          <Room
            key={room.id}
            id={room.id}
            name={room.name}
            capacity={room.capacity}
            occupation={room.occupation}
            isSelected={room.isSelected}
            handleRoomSelection={handleRoomSelection}
          />
        ))}
      </Rooms>
      {roomIdSelected.current !== 0 ? <Button onClick={sendBooking}>RESERVAR QUARTO</Button> : ''}
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

const Rooms = styled.div`
  width: 100%;

  margin: 15px 0px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;
