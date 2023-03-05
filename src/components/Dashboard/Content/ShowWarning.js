import styled from 'styled-components';

export default function ShowWarning() {
  return (
    <NoEnrrollment>
      <h1>Ingresso e Pagamento</h1>
      <Mensagem>
        <p>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</p>
      </Mensagem>
    </NoEnrrollment>
  );
}

const Mensagem = styled.div`
  height: 80%;
  width: 430px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  & > p {
    font-size: 20px;
    color: #8e8e8e;
    text-align: center;
  }
`;

const NoEnrrollment = styled.div`
  height: 90%;
  margin-left: 35px;
  & > h1 {
    font-size: 34px;
    margin-top: 34px;
  }
`;
