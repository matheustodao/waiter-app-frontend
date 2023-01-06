import { useEffect, useState } from 'react';
import { waiterAPI } from '../../services/api/waiterAPI';
import { Order } from '../../types/Order';
import { OrderBoard } from '../OrderBoard';
import { Container } from './styles';

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const waiting = orders.filter((currentOrder) => currentOrder.status === 'WAITING');
  const inProduction = orders.filter((currentOrder) => currentOrder.status === 'IN_PRODUCTION');
  const done = orders.filter((currentOrder) => currentOrder.status === 'DONE');

  useEffect(() => {
    waiterAPI.get('/orders')
      .then(({ data }) => setOrders(data));
  }, []);

  return (
    <Container>
      <OrderBoard icon="🕑" title="Fila de espera" orders={waiting} />
      <OrderBoard icon="👨‍🍳" title="Em preparação" orders={inProduction} />
      <OrderBoard icon="✅" title="Pronto!" orders={done} />
    </Container>
  );
}
