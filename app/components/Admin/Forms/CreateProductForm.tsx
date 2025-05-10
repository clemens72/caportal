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
  onProductCreated?: () => void;
  initialData?: Product;
  mode?: 'create' | 'edit';
}

export default function CreateProductForm({ 
  onProductCreated, 
  initialData,
  mode = 'create'
}: CreateProductFormProps) {
  const [formData, setFormData] = useState<FormData>(initialData || defaultFormData);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'number' ? parseFloat(value) || 0 : 
              value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = mode === 'edit' 
        ? `/api/products/${initialData?.id}` 
        : '/api/products/add';
      
      const method = mode === 'edit' ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSnackbar({
          open: true,
          message: `Product ${mode === 'edit' ? 'updated' : 'created'} successfully!`,
          severity: 'success',
        });
        if (onProductCreated) {
          onProductCreated();
        }
      } else {
        throw new Error(data.error || `Failed to ${mode} product`);
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : `Failed to ${mode} product`,
        severity: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ maxWidth: '100%', mb: 4 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Booking Contact"
              name="booking_contact"
              value={formData.booking_contact}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Leader"
              name="leader"
              value={formData.leader}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Gross Price"
              name="gross_price"
              type="number"
              value={formData.gross_price}
              onChange={handleChange}
              required
              fullWidth
              InputProps={{
                startAdornment: '$',
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Fee Percent"
              name="fee_percent"
              type="number"
              value={formData.fee_percent}
              onChange={handleChange}
              required
              fullWidth
              InputProps={{
                endAdornment: '%',
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              label="Product Type"
              name="product_type"
              value={formData.product_type}
              onChange={handleChange}
              required
              fullWidth
            >
              {productTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              label="Size"
              name="size"
              value={formData.size}
              onChange={handleChange}
              required
              fullWidth
            >
              {sizes.map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              multiple
              options={categoryOptions}
              value={formData.categories}
              onChange={(_, newValue) => {
                setFormData(prev => ({ ...prev, categories: newValue }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Categories"
                  placeholder="Select categories"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    key={option}
                  />
                ))
              }
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              fullWidth
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Special Requirements"
              name="special_requirements"
              value={formData.special_requirements}
              onChange={handleChange}
              fullWidth
              multiline
              rows={2}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Note"
              name="note"
              value={formData.note}
              onChange={handleChange}
              fullWidth
              multiline
              rows={2}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.exclusive}
                  onChange={handleChange}
                  name="exclusive"
                />
              }
              label="Exclusive"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.business_cards}
                  onChange={handleChange}
                  name="business_cards"
                />
              }
              label="Business Cards"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.active}
                  onChange={handleChange}
                  name="active"
                />
              }
              label="Active"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={submitting}
              sx={{ mt: 2 }}
            >
              {submitting ? `${mode === 'edit' ? 'Updating' : 'Creating'}...` : `${mode === 'edit' ? 'Update' : 'Create'} Product`}
            </Button>
          </Grid>
        </Grid>
      </form>

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