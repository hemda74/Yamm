export interface Theme {
	colors: {
		primary: string;
		secondary: string;
		white: string;
		text: string;
		background: string;
	};
	spacing: (value: number) => string;
	borderRadius: {
		small: string;
		medium: string;
		large: string;
	};

	transitions: {
		default: string;
	};
	breakpoints: {
		sm: string;
		md: string;
		lg: string;
	};
}

export interface TableColumn<T> {
	key: keyof T;
	title: string;
	render?: (value: any, record: T) => React.ReactNode;
}

export interface PaginationProps {
	page: number;
	rowsPerPage: number;
	totalCount: number;
	onPageChange: (page: number) => void;
	onRowsPerPageChange: (rowsPerPage: number) => void;
}
