import React from 'react';
import useGetActivities from '../../hooks/api/useActivities';
import styled from 'styled-components';
import useDayActivities from '../../hooks/api/useDayActivities';

export default function ShowActivitiesList({ dayActivities, dayActivitiesLoading }) {
  if (dayActivitiesLoading) {
    return <>Loading....</>;
  }

  console.log(dayActivities, 'Recebi no componente LISTAGEM');
  return (
    <>
      <EventLocalContainer>
        <h1>asdasd</h1>
      </EventLocalContainer>
    </>
  );
}

const EventLocalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
