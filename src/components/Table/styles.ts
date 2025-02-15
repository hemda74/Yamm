import styled from 'styled-components';

export const StyledTableContainer = styled.div`
	background: ${({ theme }) => theme.colors.white};
	border-radius: ${({ theme }) => theme.borderRadius.large};
	margin: 20px 0;
	overflow: hidden;
`;

// Gradient header for the table
export const StyledTableHead = styled.thead`
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
	}
`;
