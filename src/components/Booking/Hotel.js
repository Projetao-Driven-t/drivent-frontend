import styled from 'styled-components';

export function Hotel({ image, name, id, handleHotelSelection }) {
  return (
    <StyledHotel onClick={() => handleHotelSelection(id)}>
      <img src={image} alt={'Hotel imagem'} />
      <h1>{name}</h1>
      <Acomodar>
        <h2>Tipos de acomodação:</h2>
        <h3>Single e Double</h3>
      </Acomodar>
      <Acomodar>
        <h2>Vagas disponíveis:</h2>
        <h3>20</h3>
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
