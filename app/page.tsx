import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NextLink from 'next/link';
import ProTip from './components/ProTip';
import Copyright from './components/Copyright';
import Image from 'next/image';
import heroimg from './assets/MJF-Fly.jpg'

export default function PublicPage() {
  return (
    <Container
      sx={{ mx: 0, p: 0 }}>
      <Box
        sx={{
          display: 'flex',
          height: '50vh',
          backgroundImage: `url(${heroimg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ mt: 4 }}>
            What We Do
          </Typography>
          <Typography variant="h5" sx={{ my: 2 }}>
            Class Acts supplies the finest musical entertainment for concerts, festivals, events, conventions, fundraisers and more. With a roster of over 300 artists and relationships with hundreds of nationally touring artists we have entertainers to fit almost any request.
          </Typography>
          <Typography variant="h6" sx={{ my: 2 }}>
            At CLASS ACTS we understand that live entertainment is vital to your show's success. We believe the right entertainment can help you draw patrons, sell tickets and provide the best experience for your guests. Our clients draw on our experience and creativity to help them select and produce the perfect entertainer.
          </Typography>
          </Box>
        <Box sx={{ maxWidth: 'sm' }}>
          <Button variant="contained" component={NextLink} href="/">
            Sign In
          </Button>
        </Box>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}