'use client';

import { useRouter } from 'next/navigation';
import GenericTable, { Column } from '@/app/components/Admin/Tables/GenericTable';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Product } from '@/app/types';

const columns: Column<Product>[] = [
  { id: 'name', label: 'Name' },
  { 
    id: 'gross_price', 
    label: 'Price', 
    numeric: true,
    render: (value) => `$${value.toLocaleString()}`
  },
  { id: 'note', label: 'Note' },
  { id: 'booking_contact', label: 'Booking Contact' },
  { id: 'leader', label: 'Leader' },
];

export default function ProductsPage() {
  const router = useRouter();

  const fetchProducts = async () => {
    const response = await fetch('/api/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  };

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
  };

  const handleView = (product: Product) => {
    router.push(`/products/${product.id}`);
  };

  const handleEdit = (product: Product) => {
    router.push(`/products/${product.id}/edit`);
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - 65px)` },
        ml: { sm: `65px` },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Products Overview
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => router.push('/products/new')}
        >
          New Product
        </Button>
      </Box>
      <GenericTable<Product>
        title="Products"
        columns={columns}
        fetchData={fetchProducts}
        onDelete={handleDelete}
        onView={handleView}
        onEdit={handleEdit}
        defaultSort="name"
        clickable={true}
        onRowClick={handleView}
      />
    </Box>
  );
}