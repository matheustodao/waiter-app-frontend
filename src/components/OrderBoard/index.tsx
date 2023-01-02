import { Order } from '../../types/Order';
import { Board, OrdersContainer } from './styles';

interface OrderBoardProps {
  icon: string,
  title: string,
  orders: Order[]
}

export function OrderBoard({ icon, title, orders }: OrderBoardProps) {
  return (
    <Board>
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      <OrdersContainer>
        {orders?.map((order) => (
          <button type="button" key={order._id}>
            <strong>Mesa {order.table}</strong>
            <span>
              {order.products.reduce((acc, currentItem) => (acc + currentItem.quantity), 0)} items
            </span>
          </button>
        ))}
      </OrdersContainer>
    </Board>
  );
}
