import { Actions, ModalBody, OrderDetails, Overlay } from './styles';
import closeIcon from '../../assets/images/close-icon.svg';
import { Order } from '../../types/Order';
import { formatCurrency } from '../../utils/formatCurrency';
import { useEffect } from 'react';

interface OrderModalProps {
  visible: boolean,
  order: Order | null,
  onClose: () => void,
  onCancelOrder: () => void,
  isLoading?: boolean,
}

export function OrderModal({ visible, order, onClose, onCancelOrder, isLoading}: OrderModalProps) {
  if (!visible || !order) return null;

  const totalPrice = order.products.reduce((total, { product, quantity }) => (
    total + (product.price * quantity)
  ), 0);

  function handleClickOutside(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();


    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  useEffect(() => {
    function handlePressedKeyESC(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handlePressedKeyESC);

    return () => (
      document.removeEventListener('keydown', handlePressedKeyESC)
    );
  }, [onClose]);

  return (
    <Overlay onMouseDown={handleClickOutside}>
      <ModalBody>
        <header>
          <strong>Mesa {order.table}</strong>

          <button type="button" onClick={onClose}>
            <img src={closeIcon} alt="Icon to close modal" />
          </button>
        </header>

        <div className="status-container">
          <small>Status do Pedido</small>
          <div>
            <span>
              {order.status === 'WAITING' && '🕑'}
              {order.status === 'IN_PRODUCTION' && '👨‍🍳'}
              {order.status === 'DONE' && '✅'}
            </span>

            <strong>
              {order.status === 'WAITING' && 'Fila de Espera'}
              {order.status === 'IN_PRODUCTION' && 'Em preparação'}
              {order.status === 'DONE' && 'Pronto!'}
            </strong>
          </div>
        </div>

        <OrderDetails>
          <strong>Itens</strong>

          <div className="order-items">
            {order.products.map(({ _id, quantity, product }) => (
              <div className="item" key={_id}>
                <img
                  src={`http://localhost:3001/uploads/${product.imagePath}`}
                  alt={product.name}
                  width="48px"
                  height="40px"
                />

                <span className="quantity">{quantity}x</span>

                <div className="product-details">
                  <strong>{product.name}</strong>
                  <small>{formatCurrency(product.price)}</small>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(totalPrice)}</strong>
          </div>
        </OrderDetails>

        <Actions>
          {order.status !== 'DONE' && (
            <button type="button" className="primary" disabled={isLoading}>
              <span>
                {order.status === 'WAITING' && '👨‍🍳'}
                {order.status === 'IN_PRODUCTION' && '✅'}
              </span>

              <strong>
                {order.status === 'WAITING' && 'Iniciar Produção'}
                {order.status === 'IN_PRODUCTION' && 'Pronto!'}
              </strong>
            </button>
          )}

          <button type="button" className="secondary" onClick={onCancelOrder} disabled={isLoading}>
            Cancelar Pedido
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  );
}
