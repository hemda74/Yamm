import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MdVisibility } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { Table } from '../Table/Table';
import { RefundOrder, DecisionType } from '../../types';

const Select = styled.select`
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ddd;
    background: white;
    min-width: 120px;
    cursor: pointer;
    
    &:focus {
        outline: none;
        border-color: #1976d2;
    }
`;

const Switch = styled.label`
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;
    
    input {
        opacity: 0;
        width: 0;
        height: 0;
        
        &:checked + span {
            background-color: #1976d2;
        }
        
        &:checked + span:before {
            transform: translateX(20px);
        }
    }
    
    span {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: .4s;
        border-radius: 34px;
        
        &:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }
    }
`;

const ActionButton = styled.button`
    background: none;
    border: none;
    color: #1976d2;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
        background-color: rgba(25, 118, 210, 0.04);
    }
    
    svg {
        font-size: 20px;
    }
`;

const RefundTableContainer = styled.div`
    margin: 20px 0;
    
    .refund-orders-table {
        @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
            margin: 10px -16px;
            border-radius: 0;
            
            table {
                min-width: 500px; 
            }
            
            th, td {
                padding: 8px;
                font-size: 13px;
            }
            
            .optional-column {
                display: none;
            }
            
            .store-name {
                max-width: 120px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            .reason-cell {
                max-width: 100px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            .numeric {
                text-align: right;
            }
            
            button {
                padding: 12px;
            }
        }
    }
`;

interface RefundOrdersTableProps {
    orders: RefundOrder[];
    loading: boolean;
    totalCount: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (rowsPerPage: number) => void;
    onDecisionChange: (orderId: string, decision: DecisionType) => void;
    onStatusChange: (orderId: string, active: boolean) => void;
}

export const RefundOrdersTable: React.FC<RefundOrdersTableProps> = ({
    orders,
    loading,
    totalCount,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    onDecisionChange,
    onStatusChange,
}) => {
    const navigate = useNavigate();

    const columns = [
        {
            key: 'store_logo' as keyof RefundOrder,
            title: 'Store',
            render: (value: string, record: RefundOrder) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img
                        src={value}
                        alt={record.store_name}
                        style={{ width: 40, height: 40, borderRadius: '50%' }}
                    />
                    <span className="store-name">{record.store_name}</span>
                </div>
            ),
        },
        {
            key: 'reason' as keyof RefundOrder,
            title: 'Reason',
            className: 'reason-cell'
        },
        {
            key: 'amount' as keyof RefundOrder,
            title: 'Amount',
            className: 'numeric',
            render: (value: number) => `$${value.toFixed(2)}`
        },
        {
            key: 'items' as keyof RefundOrder,
            title: 'Items',
            render: (value: any[]) => value.length,
        },
        {
            key: 'decision' as keyof RefundOrder,
            title: 'Decision',
            render: (value: DecisionType | null, record: RefundOrder) => (
                <Select
                    value={value || ''}
                    onChange={(e) => {
                        onDecisionChange(record.id, e.target.value as DecisionType);
                        toast.success(`Decision updated to ${e.target.value}`);
                    }}
                >
                    <option value="">Not Yet</option>
                    <option value="accept">Accept</option>
                    <option value="reject">Reject</option>
                    <option value="escalate">Escalate</option>
                </Select>
            ),
        },
        {
            key: 'active' as keyof RefundOrder,
            title: 'Status',
            render: (value: boolean, record: RefundOrder) => (
                <Switch>
                    <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => {
                            onStatusChange(record.id, e.target.checked);
                            toast.success(`Status updated to ${e.target.checked ? 'active' : 'inactive'}`);
                        }}
                    />
                    <span />
                </Switch>
            ),
        },
        {
            key: 'actions' as keyof RefundOrder,
            title: 'Actions',
            render: (_: any, record: RefundOrder) => (
                <ActionButton
                    onClick={() => navigate(`/orders/${record.id}`)}
                    title="View Details"
                >
                    <MdVisibility />
                </ActionButton>
            ),
        },
    ];

    return (
        <RefundTableContainer>
            <Table
                columns={columns}
                data={orders}
                loading={loading}
                className="refund-orders-table"
                pagination={{
                    page,
                    rowsPerPage,
                    totalCount,
                    onPageChange,
                    onRowsPerPageChange
                }}
            />
        </RefundTableContainer>
    );
};