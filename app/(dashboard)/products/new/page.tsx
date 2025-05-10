'use client';

import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import CreateProductForm from '@/app/components/Admin/Forms/CreateProductForm';

export default function NewProductPage() {
  const router = useRouter();

  const handleProductCreated = () => {
    router.push('/products');
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
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <Typography variant="h4" component="h1">
          Create New Product
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <CreateProductForm onProductCreated={handleProductCreated} />
        </CardContent>
      </Card>
    </Box>
  );
} 