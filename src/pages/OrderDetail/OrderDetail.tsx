import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MdArrowBack } from 'react-icons/md';
import { RefundOrder } from '../../types';
import { fetchOrderById } from '../../api/orders';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { OrderDetailsTable } from '../../components/OrderDetails/OrderDetailsTable';

const Container = styled.div``;

const Header = styled.div`
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 16px;
`;

const BackButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border: 1px solid #1976d2;
    border-radius: 4px;
    background: transparent;
    color: #1976d2;
    cursor: pointer;
    font-size: 14px;
    
    &:hover {
        background: rgba(25, 118, 210, 0.04);
    }
`;

const Title = styled.h4`
    font-size: 2rem;
    margin: 0;
`;

const Paper = styled.div`
    padding: 24px;
    border-radius: 12px;
    background: white;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 24px;
`;

const GridItem = styled.div<{ cols?: number }>`
    grid-column: span ${props => props.cols || 12};
    
    @media (max-width: 960px) {
        grid-column: span 12;
    }
`;

const StoreInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
`;

const Avatar = styled.img`
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: cover;
`;

const StoreDetails = styled.div``;

const StoreLink = styled.a`
    color: #1976d2;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

const ChipContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 16px;
`;

const Chip = styled.span<{ variant: 'success' | 'error' | 'default' }>`
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 14px;
    background-color: ${props => {
        switch (props.variant) {
            case 'success': return '#e6f4ea';
            case 'error': return '#fdeded';
            default: return '#f5f5f5';
        }
    }};
    color: ${props => {
        switch (props.variant) {
            case 'success': return '#1e4620';
            case 'error': return '#5f2120';
            default: return '#666666';
        }
    }};
`;

const Section = styled.div`
    margin-top: 32px;
`;

const SectionTitle = styled.h6`
    font-size: 1.25rem;
    margin-bottom: 16px;
`;



const InfoText = styled.p`
    margin: 4px 0;
    
    strong {
        font-weight: 600;
    }
`;

export const OrderDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [order, setOrder] = useState<RefundOrder | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const loadOrder = async () => {
            try {
                if (id) {
                    const data = await fetchOrderById(id);
                    setOrder(data);
                }
            } catch (error) {
                console.error('Failed to fetch order:', error);
            } finally {
                setLoading(false);
            }
        };

        loadOrder();
    }, [id]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!order) {
        return <div>Order not found</div>;
    }

    return (
        <Container>
            <Header>
                <BackButton onClick={() => navigate(-1)}>
                    <MdArrowBack />
                    Back
                </BackButton>
                <Title>Order Details</Title>
            </Header>

            <Grid>
                <GridItem cols={12}>
                    <Paper>
                        <Grid>
                            <GridItem cols={6}>
                                <StoreInfo>
                                    <Avatar src={order.store_logo} alt={order.store_name} />
                                    <StoreDetails>
                                        <SectionTitle>{order.store_name}</SectionTitle>
                                        <StoreLink href={order.store_url} target="_blank">
                                            Visit Store
                                        </StoreLink>
                                    </StoreDetails>
                                </StoreInfo>
                            </GridItem>
                            <GridItem cols={6}>
                                <ChipContainer>
                                    <Chip variant={order.active ? 'success' : 'default'}>
                                        {order.active ? 'Active' : 'Inactive'}
                                    </Chip>
                                    <Chip
                                        variant={
                                            order.decision === 'accept'
                                                ? 'success'
                                                : order.decision === 'reject'
                                                    ? 'error'
                                                    : 'default'
                                        }
                                    >
                                        {order.decision || 'Not Yet'}
                                    </Chip>
                                </ChipContainer>
                            </GridItem>
                        </Grid>

                        <Section>
                            <SectionTitle>Order Information</SectionTitle>
                            <Grid>
                                <GridItem cols={6}>
                                    <InfoText><strong>Order ID:</strong> {order.id}</InfoText>
                                    <InfoText><strong>Reason:</strong> {order.reason}</InfoText>
                                </GridItem>
                                <GridItem cols={6}>
                                    <InfoText>
                                        <strong>Total Amount:</strong> ${order.amount.toFixed(2)}
                                    </InfoText>
                                </GridItem>
                            </Grid>
                        </Section>

                        <Section>
                            <SectionTitle>Items ({order.items.length})</SectionTitle>
                            <OrderDetailsTable
                                items={order.items}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                totalCount={order.items.length}
                                onPageChange={setPage}
                                onRowsPerPageChange={setRowsPerPage}
                            />
                        </Section>
                    </Paper>
                </GridItem>
            </Grid>
        </Container>
    );
};