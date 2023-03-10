import { useEffect } from 'react';
import styled from 'styled-components';
import useHotel from '../../hooks/api/useHotel';
import { Hotel } from './Hotel';

export function HotelSelection() {
  const { hotels, hotelsLoading } = useHotel();

  useEffect(() => {
    console.log(hotels);
  }, [hotels]);
  if (hotelsLoading) {
    return (
      <>
        <h1>Loading</h1>
      </>
    );
  }
  return (
    <>
      <Subtitle>Primeiro, escolha seu hotel</Subtitle>
      <Hotels>
        {hotels.map((hotel) => (
          <Hotel key={hotel.id} id={hotel.id} name={hotel.name} image={hotel.image} />
        ))}
      </Hotels>
    </>
  );
}

const Subtitle = styled.span`
  font-family: 'Roboto';
  font-size: 20px;
  line-height: 23.5px;
  color: #8e8e8e;
`;

const Hotels = styled.div`
  width: 100%;
  height: 38%;
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
