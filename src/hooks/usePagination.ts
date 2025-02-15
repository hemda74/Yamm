import { useState } from 'react';
import { TABLE_DEFAULTS } from '../constants/layout';

export const usePagination = (initialPage = 0, initialPageSize = TABLE_DEFAULTS.PAGE_SIZE) => {
	const [page, setPage] = useState(initialPage);
	const [pageSize, setPageSize] = useState(initialPageSize);

	const handlePageChange = (newPage: number) => setPage(newPage);
	const handlePageSizeChange = (newPageSize: number) => {
		setPageSize(newPageSize);
		setPage(0); // Reset to first page when changing page size
	};

	return {
		page,
		pageSize,
		handlePageChange,
		handlePageSizeChange,
	};
};
