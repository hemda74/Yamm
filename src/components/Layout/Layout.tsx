import React from 'react';
import styled from 'styled-components';
import { Sidebar } from './Sidebar';
import { useSidebar } from '../../context/SidebarContext';

const DRAWER_WIDTH = 240;

const LayoutContainer = styled.div`
    display: flex;
    min-height: 100vh;
    position: relative;
`;

const Main = styled.main<{ $isOpen: boolean }>`
    flex-grow: 1;
    padding: 24px;
    margin-left: ${props => props.$isOpen ? `${DRAWER_WIDTH}px` : '64px'};
    transition: margin ${({ theme }) => theme.transitions.default};
    
    @media (max-width: 768px) {
        margin-left: 64px;
        padding: 16px;
    }
`;

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { isOpen } = useSidebar();

    return (
        <LayoutContainer>
            <Sidebar />
            <Main $isOpen={isOpen}>
                {children}
            </Main>
        </LayoutContainer>
    );
}; 