'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

type EntityType = 'organizations' | 'events' | 'products' | 'tasks' | 'users';

interface SearchBoxProps {
  entityType: EntityType;
  placeholder?: string;
}

interface ColumnConfig {
  field: string;
  header: string;
  render?: (value: any) => React.ReactNode;
}

const columnConfigs: Record<EntityType, ColumnConfig[]> = {
  organizations: [
    { field: 'name', header: 'Name' },
    { field: 'type', header: 'Type' },
    { field: 'address', header: 'Address' },
    { field: 'year', header: 'Year' },
  ],
  events: [
    { field: 'name', header: 'Name' },
    { field: 'location', header: 'Location' },
    { field: 'start_time', header: 'Start Time' },
    { field: 'price', header: 'Price', render: (value) => `$${value.toLocaleString()}` },
  ],
  products: [
    { field: 'name', header: 'Name' },
    { field: 'gross_price', header: 'Price', render: (value) => `$${value.toLocaleString()}` },
    { field: 'description', header: 'Description' },
    { field: 'booking_contact', header: 'Contact' },
  ],
  tasks: [
    { field: 'title', header: 'Title' },
    { field: 'description', header: 'Description' },
    { field: 'due_at', header: 'Due Date' },
    { field: 'open_by', header: 'Opened By' },
  ],
  users: [
    { field: 'username', header: 'Username' },
    { field: 'first_name', header: 'First Name' },
    { field: 'last_name', header: 'Last Name' },
  ],
};

export default function SearchBox({ entityType, placeholder }: SearchBoxProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/${entityType}?search=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch results');
        }
        const data = await response.json();
        setResults(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, entityType]);

  const handleRowClick = (result: any) => {
    router.push(`/${entityType}/${result.id}`);
  };

  const columns = columnConfigs[entityType];

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder={placeholder || `Search ${entityType}...`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />

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
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.field}>{column.header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((result, index) => (
                <TableRow 
                  key={result.id || index}
                  onClick={() => handleRowClick(result)}
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': { 
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    }
                  }}
                >
                  {columns.map((column) => (
                    <TableCell key={column.field}>
                      {column.render ? column.render(result[column.field]) : result[column.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {results.length === 0 && searchQuery && (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No results found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}