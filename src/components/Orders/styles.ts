import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 32px;

  width: 100%;
  max-width: 1216px;
  margin: 40px auto;
  padding-left: 24px;
  padding-right: 24px;

  @media (max-width: 1216px) {
    flex-direction: column;
  }
`;
