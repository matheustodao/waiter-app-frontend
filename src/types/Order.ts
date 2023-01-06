export type OrderStatus = 'WAITING' | 'IN_PRODUCTION' | 'DONE'

export interface Order {
  _id: string,
  table: string,
  status: OrderStatus,
  products: {
    _id: string,
    quantity: number,
    product: {
      name: string,
      imagePath: string,
      price: number,
    }
  }[]
}
