'use client';

import React, { useState } from 'react';
import { 
  TextField,
  Button,
  Box,
  Alert,
  Snackbar,
  MenuItem
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { Organization } from '@/app/types/index';

interface FormData {
  name: string;
  address: string;
  year: number;
  type: string;
}

const defaultFormData: FormData = {
  name: '',
  address: '',
  year: new Date().getFullYear(),
  type: 'Client'
};

const organizationTypes = [
  'Client',
  'Venue',
  'Vendor',
  'Partner'
];

interface CreateOrganizationFormProps {
  mode?: 'create' | 'edit';
  initialData?: Organization;
  onSuccess?: () => void;
}

export default function CreateOrganizationForm({ mode = 'create', initialData, onSuccess }: CreateOrganizationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Organization>>(initialData || {
    name: '',
    website: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' ? parseInt(value) || new Date().getFullYear() : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = mode === 'edit' 
        ? `/api/organizations/${initialData?.id}` 
        : '/api/organizations';
      
      const method = mode === 'edit' ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${mode} organization`);
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/organizations');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
  };

  return (
    <Box sx={{ maxWidth: '100%', mb: 4 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
          />
          
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            fullWidth
            multiline
            rows={2}
          />

          <TextField
            label="Year Established"
            name="year"
            type="number"
            value={formData.year}
            onChange={handleChange}
            required
            fullWidth
            inputProps={{ min: 1800, max: new Date().getFullYear() }}
          />

          <TextField
            select
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            fullWidth
          >
            {organizationTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? 'Processing...' : 'Create Organization'}
          </Button>
        </Box>
      </form>

      {error && (
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
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