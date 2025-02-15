import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 ${({ theme }) => theme.spacing(2)};

	@media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
		padding: 0 ${({ theme }) => theme.spacing(3)};
	}
`;

export const Paper = styled.div`
	background: ${({ theme }) => theme.colors.white};
	border-radius: ${({ theme }) => theme.borderRadius.large};
	padding: ${({ theme }) => theme.spacing(3)};
`;

export const Button = styled.button<{ variant?: 'outlined' | 'contained' }>`
	display: inline-flex;
	align-items: center;
	gap: ${({ theme }) => theme.spacing(1)};
	padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(3)}`};
	border-radius: ${({ theme }) => theme.borderRadius.medium};
	font-size: 1rem;
	font-weight: 500;
	transition: all ${({ theme }) => theme.transitions.default};
	border: 2px solid ${({ theme }) => theme.colors.primary};

	${({ variant, theme }) =>
		variant === 'outlined'
			? `
    background: transparent;
    color: ${theme.colors.primary};
    &:hover {
      background: ${theme.colors.primary}10;
    }
  `
			: `
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    &:hover {
      background: ${theme.colors.secondary};
      border-color: ${theme.colors.secondary};
    }
  `}
`;

export const Grid = styled.div<{ spacing?: number }>`
	display: grid;
	gap: ${({ theme, spacing = 3 }) => theme.spacing(spacing)};
	grid-template-columns: 1fr;

	@media (min-width: ${({ theme }) => theme.breakpoints.md}) {
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	}
`;

export const Typography = styled.p<{
	variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2';
}>`
	margin: 0;
	${({ variant }) => {
		switch (variant) {
			case 'h1':
				return 'font-size: 2.5rem; font-weight: 700;';
			case 'h4':
				return 'font-size: 1.75rem; font-weight: 600;';
			case 'h6':
				return 'font-size: 1.25rem; font-weight: 600;';
			case 'body2':
				return 'font-size: 0.875rem;';
			default:
				return 'font-size: 1rem;';
		}
	}}
`;
