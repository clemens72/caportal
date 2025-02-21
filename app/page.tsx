import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import NextLink from 'next/link';
import Copyright from './components/Copyright';
import heroimg from './assets/MJF-Fly.jpg';

export default function PublicPage() {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '70vh',
          position: 'relative',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroimg.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 6,
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            color: 'white',
            padding: '0 20px',
          }}
        >
          <Typography variant="h1" sx={{ 
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            color: 'white',
            mb: 2,
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          }}>
            Premiere Entertainment Booking
          </Typography>
          <Typography variant="h5" sx={{ 
            color: 'white',
            mb: 4,
            maxWidth: '800px',
            mx: 'auto',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          }}>
            Providing world-class entertainment for concerts, festivals, corporate events, and more
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={NextLink}
            href="/contact"
            sx={{ 
              fontSize: '1.2rem',
              textTransform: 'none',
              borderRadius: '4px',
            }}
          >
            Book Now
          </Button>
        </Box>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h2" sx={{ mb: 4, textAlign: 'center' }}>
              What We Do
            </Typography>
            <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
              Class Acts supplies the finest musical entertainment for concerts, festivals, events, conventions, fundraisers and more. With a roster of over 300 artists and relationships with hundreds of nationally touring artists we have entertainers to fit almost any request.
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, textAlign: 'center' }}>
              At CLASS ACTS we understand that live entertainment is vital to your show's success. We believe the right entertainment can help you draw patrons, sell tickets and provide the best experience for your guests. Our clients draw on our experience and creativity to help them select and produce the perfect entertainer.
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 8, mb: 4, textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            component={NextLink}
            href="/artists"
            sx={{ 
              fontSize: '1.1rem',
              textTransform: 'none',
              borderRadius: '4px',
              mr: 2,
            }}
          >
            View Entertainers
          </Button>
          <Button
            variant="contained"
            size="large"
            component={NextLink}
            href="/contact"
            sx={{ 
              fontSize: '1.1rem',
              textTransform: 'none',
              borderRadius: '4px',
            }}
          >
            Contact Us
          </Button>
        </Box>

        <Box sx={{ mt: 8, mb: 2 }}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}