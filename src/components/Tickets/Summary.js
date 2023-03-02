import styled from 'styled-components';
import Button from '../Form/Button';

export function Summary({ value }) {
  return (
    <SummaryStyle>
      <div>
        <span>
          Fechado! O total ficou em <strong>R$ {value}</strong>. Agora é só confirmar:
        </span>
      </div>
      <Button>RESERVAR INGRESSO</Button>
    </SummaryStyle>
  );
}

const SummaryStyle = styled.div`
  margin: 20px 0px;

  & span {
    font-size: 20px;
  }
`;
