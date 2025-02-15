import styled from 'styled-components';
import { PaginationProps } from '../../types/common';

const PaginationContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 16px;
    background: ${({ theme }) => theme.colors.white};
    border-top: 3px solid ${({ theme }) => theme.colors.primary};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        flex-direction: column;
        align-items: center;
        gap: 12px;
    }
`;

const Controls = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        flex-wrap: wrap;
        justify-content: center;
    }
`;

const Select = styled.select`
    padding: 8px;
    border: 1px solid ${({ theme }) => theme.colors.primary}30;
    border-radius: ${({ theme }) => theme.borderRadius.small};
    background: white;
    cursor: pointer;
    
    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
    }
`;

const PaginationButton = styled.button`
    padding: 8px 16px;
    border: none;
    background: none;
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    border-radius: ${({ theme }) => theme.borderRadius.small};
    
    &:disabled {
        color: ${({ theme }) => theme.colors.text}50;
        cursor: not-allowed;
    }
    
    &:hover:not(:disabled) {
        background: ${({ theme }) => theme.colors.primary}10;
    }
`;

export const TablePagination: React.FC<PaginationProps> = ({
    page,
    rowsPerPage,
    totalCount,
    onPageChange,
    onRowsPerPageChange
}) => {
    const startIndex = page * rowsPerPage + 1;
    const endIndex = Math.min((page + 1) * rowsPerPage, totalCount);
    const totalPages = Math.ceil(totalCount / rowsPerPage);

    return (
        <PaginationContainer>
            <Controls>
                <div>
                    Rows per page:
                    <Select
                        value={rowsPerPage}
                        onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
                    >
                        {[5, 10, 15].map((value) => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                    </Select>
                </div>
                <div>
                    {startIndex}-{endIndex} of {totalCount}
                </div>
                <div>
                    <PaginationButton
                        onClick={() => onPageChange(page - 1)}
                        disabled={page === 0}
                    >
                        Previous
                    </PaginationButton>
                    <PaginationButton
                        onClick={() => onPageChange(page + 1)}
                        disabled={page >= totalPages - 1}
                    >
                        Next
                    </PaginationButton>
                </div>
            </Controls>
        </PaginationContainer>
    );
}; 