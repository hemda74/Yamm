import React, { createContext, useContext, useState } from "react";
import { RefundOrder } from "../types";

interface RefundOrderContextType {
    orders: RefundOrder[];
    updateOrder: (id: string, updatedOrder: RefundOrder) => void;
}

const RefundOrderContext = createContext<RefundOrderContextType | null>(null);

export const RefundOrderProvider = ({ children }: { children: React.ReactNode }) => {
    const [orders, setOrders] = useState<RefundOrder[]>([]);

    const updateOrder = (id: string, updatedOrder: RefundOrder) => {
        setOrders((prev) =>
            prev.map((order) => (order.id === id ? updatedOrder : order))
        );
    };

    return (
        <RefundOrderContext.Provider value={{ orders, updateOrder }}>
            {children}
        </RefundOrderContext.Provider>
    );
};

export const useRefundOrders = () => {
    const context = useContext(RefundOrderContext);
    if (!context) {
        throw new Error("useRefundOrders must be used within a RefundOrderProvider");
    }
    return context;
};