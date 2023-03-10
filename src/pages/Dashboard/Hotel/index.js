import { RoomSelection } from '../../../components/Booking/RoomSelection';
import { HotelSelection } from '../../../components/Booking/HotelSelection';
import styled from 'styled-components';

export default function Hotel() {
  // return <RoomSelection />;
  return (
    <>
      <Title>Escolha de hotel e quarto</Title>
      <HotelSelection />
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
