import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../Form/Button';

export default function BookingResume({ bookingUser, setShowHotelSelection, setShowBookingResume }) {
  const [roomCapacity, setRoomCapacity] = useState('');

  useEffect(() => {
    if (bookingUser.Room.capacity === 1) {
      setRoomCapacity('Single');
    }
    if (bookingUser.Room.capacity === 2) {
      setRoomCapacity('Double');
    }
    if (bookingUser.Room.capacity === 3) {
      setRoomCapacity('Triple');
    }
  }, [roomCapacity]);

  function changeBooking() {
    setShowHotelSelection(true);
    setShowBookingResume(false);
  }

  return (
    <BookingResumeStyle>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      <Subtitle>Você já escolheu seu quarto</Subtitle>
      <ResumeContainer>
        <img src={bookingUser.Room.Hotel.image} alt={'hotel'} />
        <h1>{bookingUser.Room.Hotel.name}</h1>
        <h2>Quarto reservado</h2>
        <h3>
          {bookingUser.Room.name} ({roomCapacity})
        </h3>
        <h2>Pessoas no seu quarto</h2>
        <h3>Você e mais {bookingUser.Room._count.Booking - 1}</h3>
      </ResumeContainer>
      <Button onClick={changeBooking}>TROCAR QUARTO</Button>
    </BookingResumeStyle>
  );
}

const BookingResumeStyle = styled.div`
  button {
    height: 37px;
    background: #e0e0e0;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    border: none;
  }
`;

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;

  h4 {
    color: #454545;
  }
`;

const Subtitle = styled.span`
  font-size: 20px;
  line-height: 23.5px;
  color: #8e8e8e;
`;

const ResumeContainer = styled.div`
  width: 196px;
  height: 264px;
  background-color: #ffeed2;
  margin-top: 16px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 14px;

  img {
    width: 168px;
    height: 109px;

    border-radius: 5px;
  }

  h1 {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #343434;
    margin-top: 10px;
  }

  h2 {
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    color: #3c3c3c;
    margin-top: 14px;
  }

  h3 {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #3c3c3c;
    margin-top: 2px;
  }
`;
