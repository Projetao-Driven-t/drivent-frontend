import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import door from '../../assets/images/greendoor.png';
import fullyEvent from '../../assets/images/fullevent.png';
import checkCircle from '../../assets/images/checkcircle.png';
import colors from '../../assets/styles/colors';
import usePostSubscription from '../../hooks/api/usePostSubscription';
import UserContext from '../../contexts/UserContext';
import { toast } from 'react-toastify';

export default function ShowActivitiesList({ dayActivities, dayActivitiesLoading, setDayActivities }) {
  const { userData } = useContext(UserContext);

  const testeHoraum =parseInt(dayActivities[2].startTime);
  const testeHoradois =parseInt(dayActivities[2].endTime);
  console.log(testeHoradois-testeHoraum, 'askadkdsaksad');

  if (dayActivitiesLoading) {
    return <>Loading....</>;
  }

  const { postActivity } = usePostSubscription();

  useEffect(() => {}, [dayActivities]);

  async function postSubscription(activityId) {
    try {
      await postActivity({ activityId: activityId });
    } catch (err) {
      throw err.message;
    }
  }

  const { Verde, Vermelho, Cinza, VerdeClaro } = colors;
  return (
    <MainContainer>
      {dayActivities.map((room, index) => (
        <EventLocalContainer key={index}>
          <EventRoomContainer >
            <h1>{room.ActivityRoom.name}</h1>
            <ActivitiesListContainer>
              {room.ActivitySubscription.find((subs) => subs.userId === userData.user.id) ? (
                <EventInformations backColor={VerdeClaro}>
                  <EventDetails>
                    <span>
                      <strong>{room.name}</strong>
                    </span>
                    <span>
                      {room.startTime} - {room.endTime}
                    </span>
                  </EventDetails>
                  <BreakLine />
                  <VacancyIcon colorText={Verde}>
                    <img
                      src={checkCircle}
                      alt="Já inscrito"
                      onClick={() => toast('Você já está inscrito nesse evento :D')}
                    />
                    <h6 colorText={Verde}>Inscrito</h6>
                  </VacancyIcon>
                </EventInformations>
              ) : (
                <EventInformations backColor={Cinza} heighContainer = {(parseInt(room.endTime) - parseInt(room.startTime))}>
                  <EventDetails>
                    <span>
                      <strong>{room.name}</strong>
                    </span>
                    <span>
                      {room.startTime} - {room.endTime}
                    </span>
                  </EventDetails>
                  <BreakLine />
                  <VacancyIcon colorText={room.capacity === 0 ? Vermelho : Verde}>
                    {room.capacity === 0 ? (
                      <>
                        <img
                          src={fullyEvent}
                          alt="Evento esgotado"
                          onClick={() => toast('O evento não possui vagas =(')}
                        />
                        <h6>esgotado</h6>
                      </>
                    ) : (
                      <>
                        <img src={door} alt="Vagas disponiveis" onClick={() => postSubscription(room.id)} />
                        <h6>{room.capacity} vagas</h6>
                      </>
                    )}
                  </VacancyIcon>
                </EventInformations>
              )}
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
  height: ${(props) => props.heighContainer === 2 ? '160px' : '80px'};

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
    height: 20px;;
    object-fit: cover;
    cursor: pointer;
  }
  h6 {
    color: ${(props) => props.colorText};
    font-size: 9px;
    margin-top: 5px;
  }
`;
