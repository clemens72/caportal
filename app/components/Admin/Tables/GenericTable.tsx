'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { 
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  CircularProgress,
  Alert,
  Snackbar,
  Tooltip,
  TextField,
  TableSortLabel,
  Menu,
  MenuItem,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';

export type Order = 'asc' | 'desc';

export interface Column<T> {
  id: keyof T;
  label: string;
  numeric?: boolean;
  render?: (value: any) => ReactNode;
}

export interface TableAction<T> {
  icon: ReactNode;
  label: string;
  onClick: (item: T) => void;
}

export interface GenericTableProps<T> {
  title: string;
  columns: Column<T>[];
  fetchData: () => Promise<T[]>;
  onDelete?: (id: string) => Promise<void>;
  onEdit?: (item: T) => void;
  onView?: (item: T) => void;
  onRefresh?: () => void;
  actions?: TableAction<T>[];
  defaultSort?: keyof T;
  defaultOrder?: Order;
  filterable?: boolean;
  clickable?: boolean;
  onRowClick?: (item: T) => void;
}

export default function GenericTable<T extends { id: string; [key: string]: any }>({
  title,
  columns,
  fetchData,
  onDelete,
  onEdit,
  onView,
  onRefresh,
  actions = [],
  defaultSort,
  defaultOrder = 'asc',
  filterable = true,
  clickable = false,
  onRowClick,
}: GenericTableProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<Order>(defaultOrder);
  const [orderBy, setOrderBy] = useState<keyof T>(defaultSort || columns[0].id);
  const [filterText, setFilterText] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const fetchItems = async () => {
    try {
      setLoading(true);
      const items = await fetchData();
      setData(items);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleRefresh = () => {
    fetchItems();
    if (onRefresh) {
      onRefresh();
    }
  };

  const handleDelete = async (id: string) => {
    if (!onDelete) return;

    try {
      await onDelete(id);
      setSnackbar({
        open: true,
        message: 'Item deleted successfully',
        severity: 'success',
      });
      fetchItems();
    } catch (error) {
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : 'Failed to delete item',
        severity: 'error',
      });
    }
  };

  const handleRequestSort = (property: keyof T) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, item: T) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleRowClick = (item: T) => {
    if (clickable && onRowClick) {
      onRowClick(item);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(filterText.toLowerCase())
    )
  );

  const sortedData = filteredData.sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  return (
    <Box sx={{ maxWidth: '100%', mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {filterable && (
            <TextField
              size="small"
              placeholder="Filter..."
              value={filterText}
              onChange={handleFilterChange}
              InputProps={{
                startAdornment: <FilterListIcon sx={{ mr: 1, color: 'action.active' }} />,
              }}
            />
          )}
          <IconButton onClick={handleRefresh} disabled={loading}>
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" sx={{ p: 2 }}>
          {error}
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label={`${title.toLowerCase()} table`}>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={String(column.id)}
                    align={column.numeric ? 'right' : 'left'}
                    sortDirection={orderBy === column.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleRequestSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
                {(onDelete || onEdit || onView || actions.length > 0) && (
                  <TableCell align="right">Actions</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((item) => (
                <TableRow
                  key={item.id}
                  onClick={() => handleRowClick(item)}
                  sx={{
                    cursor: clickable ? 'pointer' : 'default',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={String(column.id)}
                      align={column.numeric ? 'right' : 'left'}
                    >
                      {column.render ? column.render(item[column.id]) : item[column.id]}
                    </TableCell>
                  ))}
                  {(onDelete || onEdit || onView || actions.length > 0) && (
                    <TableCell align="right">
                      <Tooltip title="More actions">
                        <IconButton
                          onClick={(e) => handleMenuClick(e, item)}
                          size="small"
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  )}
                </TableRow>
              ))}
              {sortedData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} align="center">
                    No items found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {onView && (
          <MenuItem onClick={() => {
            if (selectedItem) {
              onView(selectedItem);
            }
            handleMenuClose();
          }}>
            <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
            View
          </MenuItem>
        )}
        {onEdit && (
          <MenuItem onClick={() => {
            if (selectedItem) {
              onEdit(selectedItem);
            }
            handleMenuClose();
          }}>
            <EditIcon fontSize="small" sx={{ mr: 1 }} />
            Edit
          </MenuItem>
        )}
        {onDelete && (
          <MenuItem onClick={() => {
            if (selectedItem) {
              handleDelete(selectedItem.id);
            }
            handleMenuClose();
          }}>
            <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
            Delete
          </MenuItem>
        )}
        {actions.map((action, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              if (selectedItem) {
                action.onClick(selectedItem);
              }
              handleMenuClose();
            }}
          >
            {action.icon}
            {action.label}
          </MenuItem>
        ))}
      </Menu>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
} 