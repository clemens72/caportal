'use client'
import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import NextLink from 'next/link';
import Copyright from '../components/Copyright';

// Sample data - replace with your actual data
const categories = [
  'All',
  'Bands',
  'Solo Artists',
  'Wedding Bands',
  'Specialty Acts',
  'Tribute Acts',
];

const entertainers = [
  {
    id: 1,
    name: 'Cousin Simple',
    category: 'Bands',
    description: 'Captivating live performances, catchy songwriting, and unlimited energy, Cousin Simple is heading towards big things.',
    image: 'https://class-acts.com/wp-content/uploads/2019/10/Cousin-Simple-Close-Up-255x255.jpg',
  },
  {
    id: 2,
    name: 'Doug Hare',
    category: 'Solo Artists',
    description: 'Award-winning vocalist and guitarist',
    image: 'https://class-acts.com/wp-content/uploads/2019/11/Doug-Hare-Promo-2019-e1573672602145-255x255.jpg',
  },
  {
    id: 3,
    name: 'Erik Tait',
    category: 'Specialty Acts',
    description: 'Engaging audiences of all sizes with the perfect combination of comedy and magic.',
    image: 'https://class-acts.com/wp-content/uploads/2019/11/Erik-Tait-01-255x255.jpg',
  },
  {
    id: 4,
    name: 'The Big Badd',
    category: 'Wedding Bands',
    description: 'Based in Columbus, Ohio, the Big Badd aims to excite and delight audiences with their own take on classic songs and new favorites.',
    image: 'https://class-acts.com/wp-content/uploads/2018/06/PAL%E2%80%A2TheBigBadd-005-255x255.jpg',
  },
  {
    id: 5,
    name: 'Gabrielle Solange',
    category: 'Solo Artists',
    description: 'Gabrielle Solange brings a refreshingly unique perspective to classic songs, mainstream hits and original music.',
    image: 'https://class-acts.com/wp-content/uploads/2019/09/GabrielleSolange_OKJ-EDIT-255x255.jpeg',
  },
  {
    id: 6,
    name: 'Buzzard Kings',
    category: 'Bands',
    description: 'Experience a multitude of genres originating from the south and the mid-west to put a twist on Classic Rockabilly.',
    image: 'https://class-acts.com/wp-content/uploads/2018/02/The-Buzzard-Kings-2016-Promo-Photo-255x255.jpg',
  },
  {
    id: 7,
    name: 'British Invasion',
    category: 'Tribute Acts',
    description: 'The British Invasion rock\'n\'roll show is an exciting and amazingly accurate re-creation of the 60\'s music era.',
    image: 'https://class-acts.com/wp-content/uploads/2017/12/britishinvasion-1080x675.jpg',
  },
  {
    id: 8,
    name: 'Clemens & Elliott',
    category: 'Bands',
    description: 'Two incredibly versatile Columbus musicians who play a unique blend of influences from blues rock to folk to hip hop.',
    image: 'https://class-acts.com/wp-content/uploads/2018/12/Clemens-Co-Promo-On-Stage-edited-copy-1080x675.jpg',
  },
];

export default function EntertainersPage() {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredEntertainers = entertainers.filter((entertainer) => {
    const matchesCategory = selectedCategory === 'All' || entertainer.category === selectedCategory;
    const matchesSearch = entertainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entertainer.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Box sx={{ mt: -2 }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.light',
          color: 'white',
          py: 8,
          mt: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" sx={{ color: 'white', mb: 4 }}>
            Our Entertainers
          </Typography>
          <Typography variant="h5" align="center" sx={{ color: 'white', maxWidth: 800, mx: 'auto' }}>
            Discover our diverse roster of world-class entertainment
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        {/* Search and Filter */}
        <Box sx={{ mb: 6 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search entertainers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {categories.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    onClick={() => setSelectedCategory(category)}
                    color={selectedCategory === category ? 'primary' : 'default'}
                    sx={{ mb: 1 }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Entertainers Grid */}
        <Grid container spacing={4}>
          {filteredEntertainers.map((entertainer) => (
            <Grid item key={entertainer.id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={entertainer.image}
                  alt={entertainer.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {entertainer.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {entertainer.category}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {entertainer.description}
                  </Typography>
                  <Button
                    variant="contained"
                    component={NextLink}
                    href="/contact"
                    fullWidth
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredEntertainers.length === 0 && (
          <Box sx={{ textAlign: 'center', my: 8 }}>
            <Typography variant="h5" color="text.secondary">
              No entertainers found matching your criteria
            </Typography>
          </Box>
        )}

        <Box sx={{ mt: 8, mb: 2 }}>
          <Copyright />
        </Box>
      </Container>
    </Box>
  );
}