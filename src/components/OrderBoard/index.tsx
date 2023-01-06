import { useState } from 'react';
import { toast } from 'react-toastify';
import { waiterAPI } from '../../services/api/waiterAPI';
import { Order } from '../../types/Order';
import { OrderModal } from '../OrderModal';
import { Board, OrdersContainer } from './styles';

interface OrderBoardProps {
  icon: string,
  title: string,
  orders: Order[],
  onCancelOrder: (orderId: string) => void,
}

export function OrderBoard({ icon, title, orders, onCancelOrder }: OrderBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenModal(order: Order) {
    setIsModalVisible(true);
    setSelectedOrder(order);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
  }

  async function handleCancelOrder() {
    setIsLoading(true);
    await waiterAPI.delete(`/orders/${selectedOrder?._id}`);
    setIsLoading(false);
    handleCloseModal();
    onCancelOrder(selectedOrder!._id);
    toast.success(`O preparo do pedido da Mesa ${selectedOrder!.table} cancelada.`);
  }

  return (
    <Board>
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        onClose={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        isLoading={isLoading}
      />

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
