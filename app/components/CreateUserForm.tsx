// app/components/CreateUserForm.tsx
'use client';

import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface FormData {
  username: string;
  firstName: string;
  lastName: string;
}

const defaultFormData: FormData = {
  username: '',
  firstName: '',
  lastName: '',
};

export default function CreateUserForm() {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [submissionStatus, setSubmissionStatus] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setFormData(prevData => {
      if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
        return {
          ...prevData,
          [name]: e.target.checked,
        };
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus('Submitting...');

    try {
      // In a real application, you would send this data to your Next.js API route
      // For example:
      const response = await fetch('/api/users/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setSubmissionStatus('User created successfully!');
        setFormData(defaultFormData); // Reset the form
      } else {
        setSubmissionStatus(`Error creating user: ${data.error || response.statusText}`);
      }

      //// For this example, we'll just log the data
      //console.log('Form Data:', formData);
      //setSubmissionStatus('Data submitted (API call not implemented in this example)');
      //setFormData(defaultFormData); // Reset the form
    } catch (error: any) {
      setSubmissionStatus(`Error submitting form: ${error.message}`);
      console.error('Error creating user:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 8, p: 3, border: '1px solid #ccc', borderRadius: 1, boxShadow: 1 }}>
      <h2 style={{ marginBottom: '1rem' }}>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="First Name"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            label="Last Name"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
        </Box>

        <TextField
          label="Username"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Create User
        </Button>

        {submissionStatus && <p style={{ marginTop: '1rem' }}>{submissionStatus}</p>}
      </form>
    </Box>
  );
}