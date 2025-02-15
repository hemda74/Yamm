export const breakpoints = {
	xs: '320px',
	sm: '576px',
	md: '768px',
	lg: '992px',
	xl: '1200px',
	xxl: '1400px',
} as const;

export const theme = {
	colors: {
		primary: '#115dd8',
		secondary: '#1241eb',
		success: '#28a745',
		error: '#dc3545',
		background: '#f5f5f5',
		white: '#ffffff',
		text: '#2d3748',
		border: '#e2e8f0',
	},
	breakpoints,
	media: {
		xs: `@media (min-width: ${breakpoints.xs})`,
		sm: `@media (min-width: ${breakpoints.sm})`,
		md: `@media (min-width: ${breakpoints.md})`,
		lg: `@media (min-width: ${breakpoints.lg})`,
		xl: `@media (min-width: ${breakpoints.xl})`,
		xxl: `@media (min-width: ${breakpoints.xxl})`,
	},
	spacing: (multiplier: number) => `${multiplier * 8}px`,
	borderRadius: {
		small: '4px',
		medium: '8px',
		large: '12px',
	},

	transitions: {
		default: '0.2s ease',
	},
} as const;

export type Theme = typeof theme;
