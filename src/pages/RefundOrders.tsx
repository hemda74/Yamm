import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Toaster } from 'react-hot-toast';
import { RefundOrdersTable } from '../components/RefundOrders/RefundOrdersTable';
import { RefundOrder, DecisionType } from '../types';
import { fetchRefundOrders, updateOrderDecision, updateOrderStatus } from '../api/orders';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { toast } from 'react-hot-toast';

const Container = styled.div``;

const Title = styled.h4`
    font-size: 2rem;
    margin: 0 0 24px 0;
`;

const TableContainer = styled.div`
    padding: 16px;
    background-color: transparent;
    border-radius: 4px;
`;

export const RefundOrders: React.FC = () => {
    const [orders, setOrders] = useState<RefundOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                setLoading(true);
                const response = await fetchRefundOrders(page, rowsPerPage);
                console.log('API Response:', response);
                
                if (response && response.data) {
                    setOrders(response.data);
                    setTotalCount(response.total);
                } else {
                    console.error('Unexpected response structure:', response);
                    setOrders([]);
                    setTotalCount(0);
                }
            } catch (error) {
                console.error('Failed to fetch orders:', error);
                toast.error('Failed to load orders');
                setOrders([]);
                setTotalCount(0);
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, [page, rowsPerPage]);

    const handleDecisionChange = async (orderId: string, decision: DecisionType) => {
        await updateOrderDecision(orderId, decision);
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, decision } : order
        ));
    };

    const handleStatusChange = async (orderId: string, active: boolean) => {
        await updateOrderStatus(orderId, active);
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, active } : order
        ));
    };

    if (loading) {
        return (
            <Container>
                <LoadingSpinner />
            </Container>
        );
    }

    return (
        <Container>
            <Toaster position="top-right" />
            <Title>Refund Orders</Title>
            <TableContainer>
                <RefundOrdersTable
                    orders={orders}
                    loading={loading}
                    totalCount={totalCount}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={setPage}
                    onRowsPerPageChange={setRowsPerPage}
                    onDecisionChange={handleDecisionChange}
                    onStatusChange={handleStatusChange}
                />
            </TableContainer>
        </Container>
    );
}; 