export interface Item {
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
	items: Item[];
}

export type DecisionType = 'reject' | 'accept' | 'escalate';

export interface Column<T> {
	key: keyof T | string;
	title: string;
	render?: (value: any, record: T) => React.ReactNode;
}
