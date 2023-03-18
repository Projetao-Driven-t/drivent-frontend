import React from 'react';
import useGetActivities from '../../hooks/api/useActivities';
import styled from 'styled-components';
import useDayActivities from '../../hooks/api/useDayActivities';
import Activities from '../../pages/Dashboard/Activities';

export default function ShowActivitiesList({ dayActivities, dayActivitiesLoading }) {
  if (dayActivitiesLoading) {
    return <>Loading....</>;
  }

  console.log(dayActivities, 'Recebi no componente LISTAGEM');
  return (
    <MainContainer>
      {dayActivities.map((room) => (
        <EventLocalContainer>
          <EventRoomContiner>
            <h1>{room.ActivityRoom.name}</h1>
            <ActivitiesListContainer>
              <EventInformations>
                <div>
                  <h1>{room.name}</h1>
                  <h2>{room.startTime} - {room.endTime}</h2>
                </div>
                <div>Icone {room.capacity}</div>
              </EventInformations>
            </ActivitiesListContainer>
          </EventRoomContiner>
        </EventLocalContainer>
      ))}
    </MainContainer>
  );
}
const MainContainer = styled.div`
  display: flex;
`;

const EventLocalContainer = styled.div`
  display: flex;
  align-items: center;
`;

const EventRoomContiner = styled.div`
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
  background: #f1f1f1;
  border-radius: 5px;
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
