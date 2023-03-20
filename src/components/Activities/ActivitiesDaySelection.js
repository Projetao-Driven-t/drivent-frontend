import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useActivitiesDates from '../../hooks/api/useActivitiesDates';
import useDayActivities from '../../hooks/api/useDayActivities';
import Button from '../Form/Button';
import ShowActivitiesList from './ShowActivitiesList';

export default function ActivitiesDaySelection({ setDayActivities }) {
  const WEEK_DAYS = {
    Sunday: 'Domingo',
    Monday: 'Segunda',
    Tuesday: 'Terça',
    Wednesday: 'Quarta',
    Thursday: 'Quinta',
    Friday: 'Sexta',
    Saturday: 'Sábado',
  };
  const { dates, datesLoading } = useActivitiesDates();
  const { dayActivities, getDayActivities, dayActivitiesLoading } = useDayActivities();
  const [selectedButton, setSelectedButton] = useState();

  useEffect(() => {
    if (dayActivities) {
      setDayActivities(dayActivities);
    }
  }, [dayActivities]);

  function parseDateToStringPtButton(date) {
    const weekDayPt = WEEK_DAYS[dayjs(date).format('dddd')];
    return weekDayPt + dayjs(date).format('DD/MM');
  }

  if (datesLoading) {
    return <></>;
  }

  return (
    <>
      <Dates>
        {dates.map(({ date }, index) => (
          <StyledButton
            key={index}
            index={index}
            selectedbutton={selectedButton}
            onClick={() => {
              getDayActivities(date); setSelectedButton(index);
            }}
          >
            {parseDateToStringPtButton(date)}
          </StyledButton>
        ))}
      </Dates>
      {dayActivities !== null ? (
        <ShowActivitiesList
          dayActivities={dayActivities}
          dayActivitiesLoading={dayActivitiesLoading}
          setDayActivities={setDayActivities}
        />
      ) : (
        ''
      )}
    </>
  );
}

const Dates = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 10px;
`;

const StyledButton = styled(Button)`
  width: 131px;
  background: ${(props) => props.selectedbutton === props.index && '#FFD37D'}!important;
`;
