'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BusinessIcon from '@mui/icons-material/Business';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventIcon from '@mui/icons-material/Event';
import HistoryIcon from '@mui/icons-material/History';
import FolderIcon from '@mui/icons-material/Folder';
import LanguageIcon from '@mui/icons-material/Language';
import PhoneIcon from '@mui/icons-material/Phone';
import PercentIcon from '@mui/icons-material/Percent';
import GroupIcon from '@mui/icons-material/Group';
import CategoryIcon from '@mui/icons-material/Category';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import BadgeIcon from '@mui/icons-material/Badge';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Link from '@mui/material/Link';
import { Product } from '@/app/types';


export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
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

  if (!product) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">Product not found</Alert>
      </Box>
    );
  }

  const renderField = (icon: React.ReactNode, label: string, value: any, isLink: boolean = false) => (
    <Grid item xs={12} md={6}>
      <Card variant="outlined">
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            {icon}
            <Typography variant="h6" sx={{ ml: 1 }}>{label}</Typography>
          </Box>
          {isLink ? (
            <Link href={value} target="_blank" rel="noopener noreferrer">
              {value}
            </Link>
          ) : (
            <Typography>{value || 'Not specified'}</Typography>
          )}
        </CardContent>
      </Card>
    </Grid>
  );

  const renderBooleanField = (icon: React.ReactNode, label: string, value: boolean) => (
    <Grid item xs={12} md={6}>
      <Card variant="outlined">
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            {icon}
            <Typography variant="h6" sx={{ ml: 1 }}>{label}</Typography>
          </Box>
          <Chip
            icon={value ? <CheckCircleIcon /> : <CancelIcon />}
            label={value ? 'Yes' : 'No'}
            color={value ? 'success' : 'error'}
          />
        </CardContent>
      </Card>
    </Grid>
  );

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
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <IconButton 
          onClick={() => router.back()} 
          sx={{ mr: 2 }}
          aria-label="back"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1" gutterBottom>
          Product Details: {product.name}
        </Typography>
      </Box>

      {/* Entertainer Detail Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <BusinessIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
            <Typography variant="h5">Entertainer Detail</Typography>
          </Box>

          <Grid container spacing={3}>
            {renderField(<BusinessIcon sx={{ color: 'primary.main' }} />, 'Name', product.name)}
            {renderField(<LanguageIcon sx={{ color: 'primary.main' }} />, 'Website', product.website, true)}
            {renderField(<ContactPhoneIcon sx={{ color: 'primary.main' }} />, 'Booking Contact', product.booking_contact)}
            {renderField(<PhoneIcon sx={{ color: 'primary.main' }} />, 'Phone', product.phone)}
            {renderField(<PersonIcon sx={{ color: 'primary.main' }} />, 'Leader', product.leader)}
            {renderField(<AttachMoneyIcon sx={{ color: 'primary.main' }} />, 'Gross Price', `$${product.gross_price.toLocaleString()}`)}
            {renderField(<PercentIcon sx={{ color: 'primary.main' }} />, 'Fee Percent', `${product.fee_percent}%`)}
            {renderBooleanField(<CheckCircleIcon sx={{ color: 'primary.main' }} />, 'Exclusive', product.exclusive)}
            {renderField(<BusinessCenterIcon sx={{ color: 'primary.main' }} />, 'Agent', product.agent)}
            {renderField(<GroupIcon sx={{ color: 'primary.main' }} />, 'Size', product.size)}
            {renderField(<CategoryIcon sx={{ color: 'primary.main' }} />, 'Product Type', product.product_type)}
            
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CategoryIcon sx={{ color: 'primary.main' }} />
                    <Typography variant="h6" sx={{ ml: 1 }}>Categories</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {product.categories?.map((category, index) => (
                      <Chip key={index} label={category} color="primary" variant="outlined" />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {renderField(<DescriptionIcon sx={{ color: 'primary.main' }} />, 'Description', product.description)}
            {renderField(<DescriptionIcon sx={{ color: 'primary.main' }} />, 'Bio', product.bio)}
            {renderField(<DescriptionIcon sx={{ color: 'primary.main' }} />, 'Special Requirements', product.special_requirements)}
            {renderBooleanField(<BadgeIcon sx={{ color: 'primary.main' }} />, 'Business Cards', product.business_cards)}
            {renderBooleanField(<CheckCircleIcon sx={{ color: 'primary.main' }} />, 'Active', product.active)}
            {renderField(<DescriptionIcon sx={{ color: 'primary.main' }} />, 'Note', product.note)}
          </Grid>
        </CardContent>
      </Card>

      {/* Tasks Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <AssignmentIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
            <Typography variant="h5">Tasks</Typography>
          </Box>
          <Typography color="text.secondary">No tasks available</Typography>
        </CardContent>
      </Card>

      {/* Log Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <HistoryIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
            <Typography variant="h5">Log</Typography>
          </Box>
          <Typography color="text.secondary">No log entries available</Typography>
        </CardContent>
      </Card>

      {/* Events Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <EventIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
            <Typography variant="h5">Events</Typography>
          </Box>
          <Typography color="text.secondary">No events available</Typography>
        </CardContent>
      </Card>

      {/* Documents Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <FolderIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
            <Typography variant="h5">Documents</Typography>
          </Box>
          <Typography color="text.secondary">No documents available</Typography>
        </CardContent>
      </Card>
    </Box>
  );
} 