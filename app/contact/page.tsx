'use client'
import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import NextLink from 'next/link';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import Copyright from '../components/Copyright';

const eventTypes = [
  'Concert',
  'Corporate Event',
  'Festival',
  'Private Party',
  'Wedding',
  'Other',
];

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    message: '',
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
          <Typography variant="h2" align="center" sx={{ color: 'white', maxWidth: 800, mx: 'auto' }}>
            Let's make your next event unforgettable!
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography sx={{ mx: 2 }}>
          Whether you're looking for a solo act, classical group, or full-fledged dance band, we'll help you through the process of selecting and booking the perfect entertainment. Please fill out the form below and tell us more about you and what you envision at your event. One of our event specialists will reach out to you and get you started.
        </Typography>
        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ mt: 4, p: 4 }}>
              <Typography variant="h4" sx={{ mb: 4 }}>
                Get in Touch
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      label="Event Type"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                    >
                      {eventTypes.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Event Date"
                      name="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      sx={{ mt: 2 }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
            <Box sx={{ mt: 8, mx: 2, textAlign: 'center' }}>
              <Typography sx={{mb: 4, textAlign: 'left'}}>
                <strong>Artists:</strong> If you are an existing artist looking to update your assets, please sign in below. If you are an entertainer interested in representation, please click the “New Artist" to submit a new artist Representation Inquiry button below.
              </Typography>
              <Button
                variant="contained"
                size="large"
                component={NextLink}
                href="/"
                sx={{
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  borderRadius: '4px',
                  mx: 2,
                }}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                size="large"
                component={NextLink}
                href="/"
                sx={{
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  borderRadius: '4px',
                  mx: 2,
                }}
              >
                New Artist
              </Button>
            </Box>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 4, height: '100%' }}>
              <Typography variant="h4" sx={{ mb: 4 }}>
                Contact Information
              </Typography>
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOnIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="h6">
                    Our Office
                  </Typography>
                </Box>
                <Typography variant="body1">
                  460 W Rich St
                  <br />
                  Columbus, OH 43215
                </Typography>
              </Box>
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PhoneIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="h6">
                    Phone
                  </Typography>
                </Box>
                <Typography variant="body1">
                  (614) 358-1888
                </Typography>
              </Box>
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmailIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="h6">
                    Email
                  </Typography>
                </Box>
                <Typography variant="body1">
                  info@class-acts.com
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 8, mb: 2 }}>
          <Copyright />
        </Box>
      </Container>
    </Box>
  );
}