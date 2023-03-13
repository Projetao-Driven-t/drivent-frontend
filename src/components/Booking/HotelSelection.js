import styled from 'styled-components';
import useHotel from '../../hooks/api/useHotel';
import { Hotel } from './Hotel';

export function HotelSelection({ hotelSelected, setHotelSelected, setShowRoomSelection }) {
  const { hotels, hotelsLoading } = useHotel();

  if (hotelsLoading) {
    return (
      <>
        <h1>Loading</h1>
      </>
    );
  }

  function handleHotelSelection(id) {
    setHotelSelected(hotels.find((hotel) => hotel.id === id));
    setShowRoomSelection(true);
  }

  return (
    <>
      <Subtitle>Primeiro, escolha seu hotel</Subtitle>
      <Hotels>
        {hotels.map((hotel) => (
          <Hotel
            key={hotel.id}
            id={hotel.id}
            name={hotel.name}
            image={hotel.image}
            rooms={hotel.Rooms}
            isSelectedHotel={hotel.id === hotelSelected.id}
            handleHotelSelection={handleHotelSelection}
          />
        ))}
      </Hotels>
    </>
  );
}

const Subtitle = styled.span`
  font-size: 20px;
  line-height: 23.5px;
  color: #8e8e8e;
`;

const Hotels = styled.div`
  width: 100%;
  margin: 20px 0px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
  /* 
  @media (max-width: 600px) {
    gap: 10px;
    justify-content: center;
  } */
`;
