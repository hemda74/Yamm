import styled from 'styled-components';
import { Table } from '../Table/Table';

const OrderTableContainer = styled.div`
    margin: 20px 0;
    
    .order-details-table {
        @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
            margin: 10px -16px; // Negative margin to stretch on mobile
            border-radius: 0;
            
            table {
                min-width: 400px; // Smaller minimum width for order details
            }
            
            th, td {
                padding: 8px;
                font-size: 13px;
            }
            
            // Hide less important columns on mobile
            .optional-column {
                display: none;
            }
        }
    }
`;

interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface OrderDetailsTableProps {
    items: OrderItem[];
    page: number;
    rowsPerPage: number;
    totalCount: number;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (rowsPerPage: number) => void;
}

export const OrderDetailsTable: React.FC<OrderDetailsTableProps> = ({
    items,
    page,
    rowsPerPage,
    totalCount,
    onPageChange,
    onRowsPerPageChange
}) => {
    const columns = [
        {
            key: 'name' as keyof OrderItem,
            title: 'Item Name'
        },
        {
            key: 'id' as keyof OrderItem,
            title: 'ID',
            className: 'optional-column'
        },
        {
            key: 'price' as keyof OrderItem,
            title: 'Price',
            className: 'numeric',
            render: (value: number) => `$${value.toFixed(2)}`
        },
        {
            key: 'quantity' as keyof OrderItem,
            title: 'Qty',
            className: 'numeric'
        },
        {
            key: 'total' as keyof OrderItem,
            title: 'Total',
            className: 'numeric',
            render: (_: any, item: OrderItem) => `$${(item.price * item.quantity).toFixed(2)}`
        }
    ];

    return (
        <OrderTableContainer>
            <Table
                columns={columns}
                data={items}
                className="order-details-table"
                pagination={{
                    page,
                    rowsPerPage,
                    totalCount,
                    onPageChange,
                    onRowsPerPageChange
                }}
            />
        </OrderTableContainer>
    );
}; 