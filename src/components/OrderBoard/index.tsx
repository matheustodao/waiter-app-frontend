import { useState } from 'react';
import { Order } from '../../types/Order';
import { OrderModal } from '../OrderModal';
import { Board, OrdersContainer } from './styles';

interface OrderBoardProps {
  icon: string,
  title: string,
  orders: Order[]
}

export function OrderBoard({ icon, title, orders }: OrderBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);

  function handleOpenModal(order: Order) {
    setIsModalVisible(true);
    setSelectedOrder(order);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
  }

  return (
    <Board>
      <OrderModal visible={isModalVisible} order={selectedOrder} onClose={handleCloseModal} />

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {!!orders.length && (
        <OrdersContainer>
          {orders?.map((order) => (
            <button type="button" key={order._id} onClick={() => handleOpenModal(order)}>
              <strong>Mesa {order.table}</strong>
              <span>
                {order.products.reduce((acc, currentItem) => (acc + currentItem.quantity), 0)} items
              </span>
            </button>
          ))}
        </OrdersContainer>
      )}
    </Board>
  );
}
