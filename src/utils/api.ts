import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const fetchRefundOrders = async () => {
	const response = await axios.get(`${API_BASE_URL}/refundOrders`);
	return response.data;
};

export const fetchRefundOrderById = async (id: string) => {
	const response = await axios.get(`${API_BASE_URL}/refundOrders/${id}`);
	return response.data;
};
