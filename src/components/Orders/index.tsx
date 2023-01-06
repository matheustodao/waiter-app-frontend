import { useEffect, useState } from 'react';
import { waiterAPI } from '../../services/api/waiterAPI';
import { Order, OrderStatus } from '../../types/Order';
import { OrderBoard } from '../OrderBoard';
import { Container } from './styles';

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const waiting = orders.filter((currentOrder) => currentOrder.status === 'WAITING');
  const inProduction = orders.filter((currentOrder) => currentOrder.status === 'IN_PRODUCTION');
  const done = orders.filter((currentOrder) => currentOrder.status === 'DONE');

  function handleCancelOrder(orderId: string) {
    setOrders((oldOrders) => oldOrders.filter((currentOrder) => currentOrder._id !== orderId));
  }

  function handleOrderStatusChange(orderId: string, status: OrderStatus) {
    setOrders((oldOrders) => oldOrders.map((order) => (
      order._id === orderId
        ? { ...order, status }
        : order
    )));
  }

  useEffect(() => {
    waiterAPI.get('/orders')
      .then(({ data }) => setOrders(data));
  }, []);

  return (
    <Container>
      <OrderBoard
        icon="🕑"
        title="Fila de espera"
        orders={waiting}
        onCancelOrder={handleCancelOrder}
        onOrderStatusChange={handleOrderStatusChange}
      />

      <OrderBoard
        icon="👨‍🍳"
        title="Em preparação"
        orders={inProduction}
        onCancelOrder={handleCancelOrder}
        onOrderStatusChange={handleOrderStatusChange}
      />

      <OrderBoard
        icon="✅"
        title="Pronto!"
        orders={done}
        onCancelOrder={handleCancelOrder}
        onOrderStatusChange={handleOrderStatusChange}
      />
    </Container>
  );
}
