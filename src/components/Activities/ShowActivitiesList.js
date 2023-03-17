import React, { useEffect, useState } from 'react';
import useGetActivities from '../../hooks/api/useActivities';
import styled from 'styled-components';

export default function ShowActivitiesList({ onlyDate }) {
  const { activities, activitiesLoading } = useGetActivities(onlyDate);

  if (activitiesLoading) {
    return <>Loading....</>;
  }

  console.log(activities, 'ATIVIDADESSS');
  return (
    <>
      <EventLocalContainer>
        <h1>{activities[1].name}</h1>
      </EventLocalContainer>
    </>
  );
}

const EventLocalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
