import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
    MdDashboard,
    MdRefresh,
    MdMenuOpen,
    MdMenu
} from 'react-icons/md';
import { useSidebar } from '../../context/SidebarContext';

const DRAWER_WIDTH = 240;

const SidebarContainer = styled.div<{ $isOpen: boolean }>`
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: ${props => props.$isOpen ? `${DRAWER_WIDTH}px` : '64px'};
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    transition: all ${({ theme }) => theme.transitions.default};
    overflow-x: hidden;
    z-index: 1200;
`;

const SidebarHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({ theme }) => theme.spacing(2)};
    min-height: 64px;
    position: relative;
`;

const MenuButton = styled.button<{ $isOpen: boolean }>`
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: ${({ theme }) => theme.spacing(1)};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all ${({ theme }) => theme.transitions.default};
    position: ${props => props.$isOpen ? 'relative' : 'absolute'};
    right: ${props => props.$isOpen ? 'auto' : '0'};
    width: 40px;
    height: 40px;

    &:hover {
        transform: scale(1.1);
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
    }

    svg {
        font-size: 24px;
        transition: transform ${({ theme }) => theme.transitions.default};
    }
`;

const Logo = styled.h1<{ $isOpen: boolean }>`
    font-size: 1.2rem;
    margin: 0;
    white-space: nowrap;
    opacity: ${props => props.$isOpen ? 1 : 0};
    transition: opacity ${({ theme }) => theme.transitions.default};
`;

const NavList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const NavItem = styled.li<{ isActive?: boolean }>`
    margin: ${({ theme }) => theme.spacing(1)} 0;
`;

const NavLink = styled.button<{ $isOpen: boolean }>`
    display: flex;
    align-items: center;
    width: 100%;
    padding: ${({ theme }) => theme.spacing(1.5)} ${({ theme }) => theme.spacing(2)};
    border: none;
    background: none;
    color: white;
    cursor: pointer;
    transition: background-color ${({ theme }) => theme.transitions.default};

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    .icon {
        min-width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        
        svg {
            font-size: 24px;
        }
    }

    .text {
        opacity: ${props => props.$isOpen ? 1 : 0};
        white-space: nowrap;
        transition: opacity ${({ theme }) => theme.transitions.default};
    }
`;

export const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const { isOpen, toggleSidebar } = useSidebar();

    const menuItems = [
        { text: 'Dashboard', icon: <MdDashboard />, path: '/' },
        { text: 'Refund Orders', icon: <MdRefresh />, path: '/refunds' }
    ];

    return (
        <SidebarContainer $isOpen={isOpen}>
            <SidebarHeader>
                <Logo $isOpen={isOpen}>Refund Dashboard</Logo>
                <MenuButton
                    $isOpen={isOpen}
                    onClick={toggleSidebar}
                    title={isOpen ? 'Close menu' : 'Open menu'}
                >
                    {isOpen ? <MdMenuOpen /> : <MdMenu />}
                </MenuButton>
            </SidebarHeader>

            <NavList>
                {menuItems.map((item) => (
                    <NavItem key={item.text}>
                        <NavLink
                            $isOpen={isOpen}
                            onClick={() => navigate(item.path)}
                        >
                            <span className="icon">{item.icon}</span>
                            <span className="text">{item.text}</span>
                        </NavLink>
                    </NavItem>
                ))}
            </NavList>
        </SidebarContainer>
    );
}; 