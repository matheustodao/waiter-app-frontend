import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4.5px);
`;

export const ModalBody = styled.div`
  background: #fff;
  width: 480px;
  border-radius: 8px;
  padding: 32px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong {
      font-size: 24px;
    }

    button {
      border: none;
      background: transparent;
      line-height: 0;
      border-radius: 4px;

      transition: all 250ms ease-in-out;
      :hover {
        background: rgba(204, 204, 204, 0.3);
      }
    }
  }

  .status-container {
    margin-top: 32px;

    small {
      font-size: 14px;
      opacity: 0.8;
    }

    div {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 8px;
    }
  }

`;

export const OrderDetails = styled.div`
  margin-top: 32px;

  > strong {
    font-weight: 500;
    font-size: 14px;
    opacity: 0.8;
  }

  .order-items {
    display: flex;
    flex-direction: column;

    margin-top: 16px;

    .item {
      display: flex;
      flex-direction: row;

      img {
        border-radius: 6px;
        width: 48px;
        height: 40px;
        overflow: hidden;
      }

      & + .item {
        margin-top: 16px;
      }

      .quantity {
        font-size: 14px;
        color: #666;
        min-width: 20px;
        display: block;
        margin-left: 12px;
      }

      .product-details {
        strong {
          display: block;
          margin-bottom: 4px;
        }

        small {
          font-size: 14px;
          color: #666;
        }
      }
    }
  }

  .total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;

    span {
      font-weight: 500;
      font-size: 14px;
      opacity: 0.8;
    }
  }
`;

export const Actions = styled.footer`
  display: flex;
  flex-direction: column;
  margin-top: 32px;

  .primary {
    background: #333333;
    border-radius: 48px;
    border: none;
    color: #ffff;
    padding: 12px 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

  }

  .secondary {
    color: #D73035;
    padding: 12px 24px;
    font-weight: 700;
    border-radius: 48px;
    border: none;
    background: transparent;
    margin-top: 12px;
  }
`;
