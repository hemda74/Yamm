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
overflow-x: hidden;
    width: 100%;
    -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
            box-sizing: border-box;
    flex-grow: 1;
 
    margin-left: ${props => props.$isOpen ? `${DRAWER_WIDTH}px` : '64px'};
    transition: margin ${({ theme }) => theme.transitions.default};
    
    @media (max-width: 768px) {
    
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