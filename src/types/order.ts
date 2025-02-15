export interface OrderItem {
  name: string;
  id: string;
  price: number;
  quantity: number;
}

export interface RefundOrder {
  id: string;
  reason: string;
  store_name: string;
  store_logo: string;
  store_url: string;
  amount: number;
  active: boolean;
  decision: 'reject' | 'accept' | 'escalate' | null;
  items: OrderItem[];
}

export type DecisionType = 'reject' | 'accept' | 'escalate';

export interface Order {
    id: string;
    reason: string;
    store_name: string;
    store_logo: string;
    store_url: string;
    amount: number;
    active: boolean;
    decision: string | null;
    items: Array<{
        name: string;
        id: string;
        price: number;
        quantity: number;
    }>;
} 