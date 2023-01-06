import { useState } from 'react';
import { toast } from 'react-toastify';
import { waiterAPI } from '../../services/api/waiterAPI';
import { Order, OrderStatus } from '../../types/Order';
import { OrderModal } from '../OrderModal';
import { Board, OrdersContainer } from './styles';

interface OrderBoardProps {
  icon: string,
  title: string,
  orders: Order[],
  onCancelOrder: (orderId: string) => void,
  onOrderStatusChange: (orderId: string, status: OrderStatus) => void
}

export function OrderBoard({ icon, title, orders, onCancelOrder, onOrderStatusChange }: OrderBoardProps) {
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

  async function handleChangeStatus() {
    setIsLoading(true);

    const newStatus: OrderStatus = selectedOrder!.status === 'WAITING'
      ? 'IN_PRODUCTION'
      : 'DONE';

    const nextStatusLabel = selectedOrder!.status === 'WAITING'
      ? 'está em preparação!'
      : 'está pronto!';

    await waiterAPI.patch(`/orders/${selectedOrder?._id}`, { status: newStatus });

    setIsLoading(false);
    handleCloseModal();
    onOrderStatusChange(selectedOrder!._id, newStatus);

    toast.success(`O pedido da Mesa ${selectedOrder!.table} ${nextStatusLabel}`);
  }

  async function handleCancelOrder() {
    setIsLoading(true);

    await waiterAPI.delete(`/orders/${selectedOrder?._id}`);

    setIsLoading(false);
    handleCloseModal();
    onCancelOrder(selectedOrder!._id);

    toast.success(`O pedido da Mesa ${selectedOrder!.table} foi cancelada.`);
  }

  return (
    <Board>
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        onClose={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        onChangeStatus={handleChangeStatus}
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
