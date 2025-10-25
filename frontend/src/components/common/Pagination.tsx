import React from 'react';
import {
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  FirstPage,
  LastPage,
} from '@mui/icons-material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const handleFirstPage = () => onPageChange(1);
  const handleLastPage = () => onPageChange(totalPages);
  const handleNextPage = () => onPageChange(currentPage + 1);
  const handlePreviousPage = () => onPageChange(currentPage - 1);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderTop: 1, borderColor: 'divider' }}>
      {/* Page Size Selector */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body2" color="textSecondary">
          Rows per page:
        </Typography>
        <FormControl size="small" sx={{ minWidth: 80 }}>
          <Select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="body2" color="textSecondary">
          {startItem}-{endItem} of {totalItems}
        </Typography>
      </Box>

      {/* Page Navigation */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button
          size="small"
          onClick={handleFirstPage}
          disabled={currentPage === 1}
          startIcon={<FirstPage />}
        >
          First
        </Button>
        <Button
          size="small"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          startIcon={<KeyboardArrowLeft />}
        >
          Previous
        </Button>

        {/* Page Numbers */}
        {getPageNumbers().map((page) => (
          <Button
            key={page}
            size="small"
            variant={page === currentPage ? "contained" : "outlined"}
            onClick={() => onPageChange(page)}
            sx={{ minWidth: 32, height: 32 }}
          >
            {page}
          </Button>
        ))}

        <Button
          size="small"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          endIcon={<KeyboardArrowRight />}
        >
          Next
        </Button>
        <Button
          size="small"
          onClick={handleLastPage}
          disabled={currentPage === totalPages}
          endIcon={<LastPage />}
        >
          Last
        </Button>
      </Box>
    </Box>
  );
};

export default Pagination;