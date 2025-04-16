'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CategoryIcon from '@mui/icons-material/Category';

interface Organization {
  id: string;
  name: string;
  address: string;
  year: number;
  type: string;
}

export default function OrganizationDetailsPage() {
  const params = useParams();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const response = await fetch(`/api/organizations/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch organization details');
        }
        const data = await response.json();
        setOrganization(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchOrganization();
    }
  }, [params.id]);

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

  if (!organization) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">Organization not found</Alert>
      </Box>
    );
  }

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'client':
        return 'primary';
      case 'venue':
        return 'success';
      case 'vendor':
        return 'info';
      case 'partner':
        return 'secondary';
      default:
        return 'default';
    }
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
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Organization Details
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <BusinessIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
                <Typography variant="h5">{organization.name}</Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <CategoryIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="h6">Type</Typography>
                      </Box>
                      <Chip
                        label={organization.type}
                        color={getTypeColor(organization.type)}
                        sx={{ mt: 1 }}
                      />
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <CalendarTodayIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="h6">Year Established</Typography>
                      </Box>
                      <Typography>{organization.year}</Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <LocationOnIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="h6">Address</Typography>
                      </Box>
                      <Typography>{organization.address}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}