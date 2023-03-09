import styled from 'styled-components';
import availableIcon from '../../assets/images/availableIcon.png';
import occupiedIcon from '../../assets/images/occupiedIcon.png';
import selectedIcon from '../../assets/images/selectedIcon.png';

export function Room({ id, name, capacity, occupation, isSelected, isRoomChange, handleRoomSelection }) {
  if (isRoomChange) {
    occupation--;
  }

  const disabled = capacity === occupation;

  const vacancies = Array.apply(null, Array(capacity)).map((_, index) => {
    if (isSelected && index === capacity - occupation - 1) {
      return 'selected';
    } else if (index < capacity - occupation) {
      return 'available';
    } else return 'occupied';
  });

  return (
    <RoomStyled
      disabled={disabled}
      isSelected={isSelected}
      onClick={() => (!disabled ? handleRoomSelection(id) : null)}
    >
      <h2>{name}</h2>
      <Vacancies>
        {vacancies.map((vacancy, index) => (
          <img
            key={index}
            src={vacancy === 'available' ? availableIcon : vacancy === 'selected' ? selectedIcon : occupiedIcon}
            alt="Availability"
          />
        ))}
      </Vacancies>
    </RoomStyled>
  );
}

const RoomStyled = styled.div`
  width: 190px;
  height: 45px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 10px 0px 0px;
  padding: 0 15px;
  border: 1px solid #cecece;
  border-radius: 10px;

  background-color: ${(props) => (props.disabled ? '#C9C9C9' : props.isSelected ? '#FFEED2' : '#FFF')};
  opacity: ${(props) => (props.disabled ? '0.40' : '1')};

  cursor: ${(props) => (props.disabled ? 'inherit' : 'pointer')};
`;

const Vacancies = styled.div`
  display: flex;
  gap: 2px;
`;
