import styled from 'styled-components';

const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(2)};
    margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

interface PageHeaderProps {
    title: string;
    children?: React.ReactNode;
}

export const PageHeader = ({ children }: PageHeaderProps) => (
    <HeaderWrapper>
        {children}
    </HeaderWrapper>
); 