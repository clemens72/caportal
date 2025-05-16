'use client';

import React, { useState } from 'react';
import { 
  TextField,
  Button,
  Box,
  Alert,
  Snackbar,
  FormControlLabel,
  Switch,
  Grid,
  MenuItem,
  Chip,
  Autocomplete,
} from '@mui/material';
import { Product } from '@/app/types';
import { useRouter } from 'next/navigation';

interface FormData extends Omit<Product, 'id' | 'created_at' | 'updated_at'> {
  categories: string[];
}

const defaultFormData: FormData = {
  name: '',
  website: '',
  booking_contact: '',
  phone: '',
  leader: '',
  gross_price: 0,
  fee_percent: 0,
  exclusive: false,
  agent: '',
  size: '',
  product_type: '',
  categories: [],
  description: '',
  bio: '',
  special_requirements: '',
  business_cards: false,
  active: true,
  note: ''
};

const productTypes = [
  'Production',
  'Service',
  'Merchandise'
];

const sizes = [
  'Solo',
  'Duo',
  'Trio',
  'Quartet',
  'Quintet',
  'Sextet',
  'Full Band'
];

const categoryOptions = [
  'Jazz',
  'Rock',
  'Pop',
  'Classical',
  'Blues',
  'Country',
  'Folk',
  'Electronic',
  'Hip Hop',
  'R&B',
  'World Music',
  'Other'
];

interface CreateProductFormProps {
  mode?: 'create' | 'edit';
  initialData?: Product;
  onSuccess?: () => void;
}

export default function CreateProductForm({ mode = 'create', initialData, onSuccess }: CreateProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>(initialData || {
    name: '',
    gross_price: 0,
    note: '',
    booking_contact: '',
    leader: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = mode === 'edit' 
        ? `/api/products/${initialData?.id}` 
        : '/api/products';
      
      const method = mode === 'edit' ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${mode} product`);
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/products');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'number' ? parseFloat(value) || 0 : 
              value,
    }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Price"
            name="gross_price"
            type="number"
            value={formData.gross_price}
            onChange={handleChange}
            InputProps={{
              startAdornment: '$',
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Booking Contact"
            name="booking_contact"
            value={formData.booking_contact}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Leader"
            name="leader"
            value={formData.leader}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? 'Processing...' : `${mode === 'edit' ? 'Update' : 'Create'} Product`}
          </Button>
        </Grid>
      </Grid>

      {error && (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          onClose={() => setError(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setError(null)}
            severity="error"
            sx={{ width: '100%' }}
          >
            {error}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}