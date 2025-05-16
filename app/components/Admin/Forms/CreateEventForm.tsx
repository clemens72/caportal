'use client';

import React, { useState } from 'react';
import { 
  TextField,
  Button,
  Box,
  Alert,
  Snackbar
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { Event } from '@/app/types/index';

interface CreateEventFormProps {
  mode?: 'create' | 'edit';
  initialData?: Event;
  onSuccess?: () => void;
}

export default function CreateEventForm({ mode = 'create', initialData, onSuccess }: CreateEventFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Event>>(initialData || {
    name: '',
    start_time: '',
    end_time: '',
    location: '',
    description: '',
    status: 'scheduled',
    notes: '',
  });
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
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseInt(value) || 0 : value,
    }));
  };

  const handleDateChange = (name: string) => (value: dayjs.Dayjs | null) => {
    setFormData(prev => ({
      ...prev,
      [name]: value ? value.toISOString() : null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = mode === 'edit' 
        ? `/api/events/${initialData?.id}` 
        : '/api/events';
      
      const method = mode === 'edit' ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${mode} event`);
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/events');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ maxWidth: '100%', mb: 4 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Event Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
          />
          
          <TextField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
            fullWidth
            inputProps={{ min: 0 }}
          />

          <TextField
            label="Leader"
            name="leader"
            value={formData.leader}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            fullWidth
            multiline
            rows={2}
          />

          <DateTimePicker
            label="Start Time"
            value={formData.start_time ? dayjs(formData.start_time) : null}
            onChange={handleDateChange('start_time')}
            sx={{ width: '100%' }}
          />

          <DateTimePicker
            label="End Time"
            value={formData.end_time ? dayjs(formData.end_time) : null}
            onChange={handleDateChange('end_time')}
            sx={{ width: '100%' }}
          />

          <TextField
            label="Note"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
          />

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

          <TextField
            label="Booking Contact"
            name="booking_contact"
            value={formData.booking_contact}
            onChange={handleChange}
            required
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? 'Processing...' : 'Submit'}
          </Button>
        </Box>
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