import styled from 'styled-components';

export const Container = styled.header`
  background: #d73035;
  display: flex;
  justify-content: center;
  min-height: 198px;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1216px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 24px;
  padding-right: 24px;

  .page-details {
    h1 {
      color: #FFFFFF;
      font-size: 32px;

    }

    h2 {
      color: #FFFFFF;
      font-weight: 400;
      font-size: 16px;
      opacity: 0.9;
      margin-top: 6px;
    }
  }

  @media (max-width: 540px) {
    flex-direction: column;
    justify-content: center;
    padding: 24px;

    .page-details {
      margin-bottom: 20px;

      text-align: center;
    }
  }

  @media (max-width: 344px) {
    img {
      display: none;
    }
  }
`;
