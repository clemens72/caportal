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
];

const services = [
  {
    id: 1,
    name: 'Celebrity Talent Buying',
    category: 'All',
    description: 'Hiring your favorite celebrity for your event will make for a truly unforgettable experience. From curating available artists to providing cost estimates and managing events onsite, Class Acts provides a “turn key” approach to concerts so you can truly...',
    image: 'https://class-acts.com/wp-content/uploads/2018/02/180420-Pitbull-with-Dancers-edited.jpg',
  },
  {
    id: 2,
    name: 'Corporate Events',
    category: 'All',
    description: 'Whether you’re planning a conference with thousands of attendees, rewarding your sales team, or celebrating with your associates, great live entertainment can take your functions to the next level. From small ensembles and lively party bands to sleight of hand...',
    image: 'https://class-acts.com/wp-content/uploads/2018/02/180501-Naked-Karate-Girls-Hyatt-Regency-1080x675.jpg',
  },
  {
    id: 3,
    name: 'Festivals & Concert Series',
    category: 'All',
    description: 'From multi-day festivals to community concert series, Columbus is home to exemplary events year round. Let us help you find the best original groups, skillful cover bands or first-class tribute show for your next festival or series to highlight the incredible talent...',
    image: 'https://class-acts.com/wp-content/uploads/2018/02/commonsedited.jpg',
  },
  {
    id: 4,
    name: 'Weddings & Private Events',
    category: 'All',
    description: 'Class Acts Entertainment has been helping match brides and grooms throughout the Midwest with the perfect entertainment for over three decades. Whether you are looking for a string quartet to play you down the aisle or a high-energy party band to keep your guests...',
    image: 'https://class-acts.com/wp-content/uploads/2018/02/SWAGG-edited-1080x675.jpg',
  },
];

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredServices = services.filter((service) => {
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
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
            Our Services
          </Typography>
          <Typography variant="h5" align="center" sx={{ color: 'white', maxWidth: 800, mx: 'auto' }}>
            Serving any type of event or function that needs the best entertainment
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
                placeholder="Search services..."
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

        {/* Services Grid */}
        <Grid container spacing={4}>
          {filteredServices.map((service) => (
            <Grid item key={service.id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={service.image}
                  alt={service.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {service.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {service.category}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {service.description}
                  </Typography>
                  <Button
                    variant="contained"
                    component={NextLink}
                    href="/contact"
                    fullWidth
                  >
                    Schedule Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredServices.length === 0 && (
          <Box sx={{ textAlign: 'center', my: 8 }}>
            <Typography variant="h5" color="text.secondary">
              No services found matching your criteria
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