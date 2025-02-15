import axios from 'axios';
import { RefundOrder, DecisionType } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

interface OrdersResponse {
    data: RefundOrder[];
    total: number;
}

export const fetchRefundOrders = async (page: number, rowsPerPage: number): Promise<OrdersResponse> => {
    try {
        // First get total count
        const totalCountResponse = await fetch(`${API_BASE_URL}/refund-orders`);
        const allData = await totalCountResponse.json();
        const totalCount = allData.length;

        // Calculate start and end indices for manual pagination
        const startIndex = page * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, totalCount);
        
        // Get all data and slice it manually
        const paginatedData = allData.slice(startIndex, endIndex);
        
        return {
            data: paginatedData,
            total: totalCount
        };
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

export const fetchOrderById = async (id: string): Promise<RefundOrder> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/refund-orders/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching order:', error);
        throw error;
    }
};

export const updateOrderDecision = async (orderId: string, decision: DecisionType): Promise<void> => {
    try {
        await axios.patch(`${API_BASE_URL}/refund-orders/${orderId}`, {
            decision,
        });
    } catch (error) {
        console.error('Error updating order decision:', error);
        throw error;
    }
};

export const updateOrderStatus = async (orderId: string, active: boolean): Promise<void> => {
    try {
        await axios.patch(`${API_BASE_URL}/refund-orders/${orderId}`, {
            active,
        });
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
}; 