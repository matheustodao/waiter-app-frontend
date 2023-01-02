import { orders } from '../../mocks/orders';
import { OrderBoard } from '../OrderBoard';
import { Container } from './styles';

export function Orders() {
  return (
    <Container>
      <OrderBoard icon="🕑" title="Fila de espera" orders={orders} />
      <OrderBoard icon="👨‍🍳" title="Em preparação" orders={[]} />
      <OrderBoard icon="✅" title="Pronto!" orders={[]} />
    </Container>
  );
}
