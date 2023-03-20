import React, { useEffect, useContext } from 'react';
import useGetActivities from '../../hooks/api/useActivities';
import styled from 'styled-components';
import useDayActivities from '../../hooks/api/useDayActivities';
import Activities from '../../pages/Dashboard/Activities';
import door from '../../assets/images/greendoor.png';
import fullyEvent from '../../assets/images/fullevent.png';
import checkCircle from '../../assets/images/checkcircle.png';
import colors from '../../assets/styles/colors';
import usePostSubscription from '../../hooks/api/usePostSubscription';

export default function ShowActivitiesList({ dayActivities, dayActivitiesLoading, setDayActivities }) {
  if (dayActivitiesLoading) {
    return <>Loading....</>;
  }

  const { postActivity } = usePostSubscription();

  useEffect(() => {
    if (dayActivities) {
      setDayActivities(dayActivities);
    }
  }, [dayActivities]);

  async function postSubscription(activityId) {
    try {
      await postActivity({ activityId: activityId });
      console.log('Deu certo');
    } catch (err) {
      console.log('Não foi possivel se inscrever nesse evento');
      console.log(err.message);
    }
  }

  const { Verde, Vermelho, Cinza, VerdeClaro } = colors;
  console.log(dayActivities, 'Recebi no componente LISTAGEM');
  return (
    <MainContainer>
      {dayActivities.map((room) => (
        <EventLocalContainer>
          <EventRoomContainer>
            <h1>{room.ActivityRoom.name}</h1>
            <ActivitiesListContainer>
            </ActivitiesListContainer>
          </EventRoomContainer>
        </EventLocalContainer>
      ))}
    </MainContainer>
  );
}

const BreakLine = styled.div`
  height: 80%;
  margin-top: 3%;
  border-right: 2px solid #cfcfcf;
  background-color: blue;
`;

const EventDetails = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 65%;

  span {
    font-size: 12px;
    margin: 10px 0 0 5px;
  }
`;

const MainContainer = styled.div`
  display: flex;
`;

const EventLocalContainer = styled.div`
  display: flex;
  align-items: center;
`;

const EventRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px;

  h1 {
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #7b7b7b;
    text-align: center;
  }
`;

const ActivitiesListContainer = styled.div`
  width: 295px;
  height: 392px;
  padding: 10px;
  border: 1px solid #cfcfcf;
`;

const EventInformations = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${(props) => props.backColor};
  border-radius: 5px;
  height: 80px;

  h1 {
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    color: #343434;
    font-style: normal;
  }

  h2 {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #343434;
    margin-top: 6px;
  }
`;

const VacancyIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;

  img {
    height: 30%;
    object-fit: cover;
  }
  span {
    color: ${(props) => props.colorText};
    font-size: 15px;
    margin-top: 5px;
  }
`;
