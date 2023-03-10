import styled from 'styled-components';

export function Hotel({ image, name, id, handleHotelSelection, rooms }) {
  let totalCapacity = 0;
  let totalBooking = 0;
  let arr = [];

  rooms.forEach((room) => {
    totalCapacity += room.capacity;
    totalBooking += room._count.Booking;
    if (room.capacity === 1 && !arr.includes(1)) {
      arr.push(1);
    } else if (room.capacity === 2 && !arr.includes(2)) {
      arr.push(2);
    } else if (room.capacity === 3 && !arr.includes(3)) {
      arr.push(3);
    }
  });
  let newArr = arr.sort((a, b) => a - b);

  function roomsTypes(newArr) {
    const obj = { 1: 'Single', 2: 'Double', 3: 'Triple' };
    if (newArr.length === 1) {
      return `${obj[newArr[0]]}`;
    } else if (newArr.length === 2) {
      return `${obj[newArr[0]]} e ${obj[newArr[1]]}`;
    } else if (newArr.length === 3) {
      return `${obj[newArr[0]]}, ${obj[newArr[1]]} e ${obj[newArr[2]]}`;
    }
  }

  let vagas = totalCapacity - totalBooking;

  return (
    <StyledHotel onClick={() => handleHotelSelection(id)}>
      <img src={image} alt={'Hotel imagem'} />
      <h1>{name}</h1>
      <Acomodar>
        <h2>Tipos de acomodação:</h2>
        <h3>{roomsTypes(newArr)}</h3>
      </Acomodar>
      <Acomodar>
        <h2>Vagas disponíveis:</h2>
        <h3>{vagas}</h3>
      </Acomodar>
    </StyledHotel>
  );
}

const Acomodar = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    margin-bottom: 4px;
    font-family: 'Roboto';
    font-weight: bold;
    font-size: 13px;
  }
  h3 {
    margin-bottom: 7px;
    font-family: 'Roboto';
    font-size: 12px;
  }
`;

const StyledHotel = styled.div`
  width: 25%;
  height: 100%;
  margin-right: 20px;
  margin-bottom: 20px;
  padding-left: 2%;
  display: flex;
  flex-direction: column;
  background-color: #ebebeb;
  border-radius: 10px;

  img {
    margin-top: 5%;
    width: 90%;
    height: 40%;
    object-fit: cover;
    border-radius: 5px;
    border: 1px solid white;
  }

  h1 {
    font-family: 'Roboto';
    font-size: 20px;
    color: #343434;
    margin: 5px 0;
  }
`;
