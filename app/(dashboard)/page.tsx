'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import BusinessIcon from '@mui/icons-material/Business';
import EventIcon from '@mui/icons-material/Event';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderIcon from '@mui/icons-material/Folder';
import { User } from '@/app/types';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/users/me');
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">User not found</Alert>
      </Box>
    );
  }

  const quickLinks = [
    {
      title: 'Products',
      description: 'Manage your products and services',
      icon: <BusinessIcon sx={{ fontSize: 40 }} />,
      href: '/products',
      color: '#1976d2'
    },
    {
      title: 'Events',
      description: 'View and manage upcoming events',
      icon: <EventIcon sx={{ fontSize: 40 }} />,
      href: '/events',
      color: '#2e7d32'
    },
    {
      title: 'Tasks',
      description: 'Track your tasks and assignments',
      icon: <AssignmentIcon sx={{ fontSize: 40 }} />,
      href: '/tasks',
      color: '#ed6c02'
    },
    {
      title: 'Documents',
      description: 'Access your documents and files',
      icon: <FolderIcon sx={{ fontSize: 40 }} />,
      href: '/documents',
      color: '#9c27b0'
    }
  ];

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
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome, {user.username}
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {quickLinks.map((link) => (
          <Grid item xs={12} sm={6} md={3} key={link.title}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ color: link.color, mr: 2 }}>
                    {link.icon}
                  </Box>
                  <Typography variant="h6" component="h2">
                    {link.title}
                  </Typography>
                </Box>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  {link.description}
                </Typography>
                <Button 
                  variant="contained" 
                  href={link.href}
                  sx={{ 
                    backgroundColor: link.color,
                    '&:hover': {
                      backgroundColor: link.color,
                      opacity: 0.9
                    }
                  }}
                >
                  Go to {link.title}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}