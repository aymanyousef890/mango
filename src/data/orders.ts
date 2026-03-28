export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone?: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: 'pending' | 'shipped' | 'delivered';
  date: string;
}

export const initialOrders: Order[] = [];
