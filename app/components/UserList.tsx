// app/components/UserList.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { IconButton, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation'; // Import useRouter

interface User {
  id: number;
  username: string;
  firstName?: string;
  lastName?: string;
  // Add other relevant properties based on your user schema
}

async function fetchUsers(): Promise<User[]> {
  const res = await fetch('/api/users');
  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }
  return res.json();
}

async function deleteUser(id: number) {
  const res = await fetch(`/api/users/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete user');
  }
  return res.json();
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Get the router instance

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleDeleteClick = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers(currentUsers => currentUsers.filter(user => user.id !== id));
      router.refresh(); // Refresh the page
    } catch (err: any) {
      console.error("Error deleting user:", err.message);
      // Optionally set an error state to show a message to the user
    }
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 8, p: 3, border: '1px solid #ccc', borderRadius: 1, boxShadow: 1 }}>
      <h2 style={{ marginBottom: '1rem' }}>User List</h2>
      <TableContainer component={Paper}>
        <Table aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Username</strong></TableCell>
              <TableCell><strong>First Name</strong></TableCell>
              <TableCell><strong>Last Name</strong></TableCell>
              <TableCell><strong>Delete</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.map((user) => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row">
                  {user.username}
                </TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>
                  <IconButton aria-label="delete" onClick={() => handleDeleteClick(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}