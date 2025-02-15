import styled from 'styled-components';
import { TableColumn, PaginationProps } from '../../types/common';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { NoData } from '../common/NoData';
import { TablePagination } from './TablePagination';


const TableContainer = styled.div`
    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.borderRadius.large};
    margin: 20px 0;
    overflow-x: auto; // Enable horizontal scroll for mobile
    width: 100%; // Ensure full width
    
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        margin: 10px 0;
        border-radius: ${({ theme }) => theme.borderRadius.medium};
    }
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed; // This helps with column widths
    
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        font-size: 14px;
    }
`;

const TableHead = styled.thead`
    background: linear-gradient(
        to right,
        ${({ theme }) => theme.colors.primary},
        ${({ theme }) => theme.colors.secondary}
    );
    
    th {
        color: ${({ theme }) => theme.colors.white};
        font-family: 'Montserrat', sans-serif;
        font-weight: 600;
        font-size: 16px;
        text-transform: uppercase;
        padding: 16px;
        text-align: left;
        white-space: nowrap;
        
        @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
            padding: 10px 8px;
            font-size: 13px;
        }
    }
`;

const TableRow = styled.tr`
    &:nth-of-type(odd) {
        background-color: ${({ theme }) => theme.colors.background}10;
    }
    
    &:hover {
        background-color: ${({ theme }) => theme.colors.background}20;
        transition: background-color 0.2s ease;
    }
`;

const TableCell = styled.td`
    padding: 16px;
    font-family: 'Open Sans, sans-serif';
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        padding: 10px 8px;
        
        &.numeric {
            text-align: right;
        }
    }
`;

interface TableProps<T> {
    columns: TableColumn<T>[];
    data: T[];
    loading?: boolean;
    pagination?: PaginationProps;
    className?: string;
}

export function Table<T extends Record<string, any>>({
    columns,
    data,
    loading,
    pagination,
    className
}: TableProps<T>) {
    if (loading) {
        return <LoadingSpinner />;
    }

    if (!data?.length) {
        return <NoData />;
    }

    return (
        <TableContainer className={className}>
            <StyledTable>
                <TableHead>
                    <tr>
                        {columns.map((column) => (
                            <th key={String(column.key)}>
                                {column.title}
                            </th>
                        ))}
                    </tr>
                </TableHead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {columns.map((column) => (
                                <TableCell key={`${rowIndex}-${String(column.key)}`}>
                                    {column.render
                                        ? column.render(row[column.key], row)
                                        : String(row[column.key] ?? '')}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </tbody>
            </StyledTable>
            {pagination && <TablePagination {...pagination} />}
        </TableContainer>
    );
}