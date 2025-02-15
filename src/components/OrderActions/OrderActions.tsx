import React from 'react';
import styled from 'styled-components';
import { MdVisibility } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const ActionContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Select = styled.select`
    min-width: 120px;
    padding: 8px 14px;
    font-family: 'Open Sans, sans-serif';
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
    cursor: pointer;
    
    &:focus {
        outline: none;
        border-color: #115dd8;
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
            background-color: #115dd8;
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

const IconButton = styled.button`
    color: #115dd8;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
        background-color: rgba(17, 93, 216, 0.04);
    }
    
    svg {
        font-size: 20px;
    }
`;

interface OrderActionsProps {
    orderId: string;
    active: boolean;
    decision: string | null;
    onStatusChange: (orderId: string, newStatus: boolean) => void;
    onDecisionChange: (orderId: string, newDecision: string) => void;
}

export const OrderActions: React.FC<OrderActionsProps> = ({
    orderId,
    active,
    decision,
    onStatusChange,
    onDecisionChange,
}) => {
    const navigate = useNavigate();

    return (
        <ActionContainer>
            <Select
                value={decision || ''}
                onChange={(e) => onDecisionChange(orderId, e.target.value)}
            >
                <option value="">Not yet</option>
                <option value="accept">Accept</option>
                <option value="reject">Reject</option>
                <option value="escalate">Escalate</option>
            </Select>

            <Switch>
                <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => onStatusChange(orderId, e.target.checked)}
                />
                <span />
            </Switch>

            <IconButton
                onClick={() => navigate(`/order/${orderId}`)}
                title="View Details"
            >
                <MdVisibility />
            </IconButton>
        </ActionContainer>
    );
}; 