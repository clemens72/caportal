import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Copyright from '../components/Copyright';
import Image from 'next/image';
import logoCA from '../assets/logo-classact.png'

export default function AboutPage() {
  return (
    <Box sx={{ mt: -2 }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.light',
          color: 'white',
          py: 6,
          mt: 8,
        }}
      >
        <Container maxWidth="lg">
          <Image src={logoCA} alt="Class Acts Logo" style={{ display: 'block', margin: 'auto' }} />
          <Typography variant="h5" align="center" sx={{ color: 'white', maxWidth: 800, mx: 'auto', pt: 2}}>
            For four decades, we've been bringing top-shelf entertainment straight to your event.
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Grid container spacing={6}>
          {/* Company Overview */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ mb: 3 }}>
              Company Overview
            </Typography>
            <Typography variant="body1" paragraph>
            Class Acts Entertainment is a full service booking agency providing entertainment services to the events industry. Established in 1985, the strength and growth of Class Acts can be attributed to the professionalism of our entertainers and the attention to detail by our friendly staff.
            </Typography>
          </Grid>

          {/* Our Story */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ mb: 3 }}>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
            To provide the finest quality entertainment for each customer with respect to his or her needs and budgets.
            </Typography>
          </Grid>

          {/* Our Values 
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ mb: 3 }}>
              Our Values
            </Typography>
            <Box component={Paper} elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                Excellence
              </Typography>
              <Typography variant="body1" paragraph>
                We represent only the finest talent in the industry.
              </Typography>

              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                Reliability
              </Typography>
              <Typography variant="body1" paragraph>
                Our clients can count on us to deliver, every single time.
              </Typography>

              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                Innovation
              </Typography>
              <Typography variant="body1" paragraph>
                We stay ahead of entertainment trends to offer fresh, exciting options.
              </Typography>
            </Box>
          </Grid>*/}

          {/* Statistics */}
          <Grid item xs={12}>
          <Typography variant="h4" align='center' sx={{ mb: 3 }}>
              By The Numbers
            </Typography>
            <Box sx={{ my: 4 }}>
              <Grid container spacing={4} justifyContent="center">
                {[
                  { number: '40+', label: 'Years of Experience' },
                  { number: '300+', label: 'Artists & Entertainers' },
                  { number: '5,000+', label: 'Events Served' },
                  { number: '1', label: 'Shared Vision' },
                ].map((stat, index) => (
                  <Grid item xs={6} md={3} key={index}>
                    <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                      <Typography variant="h3" sx={{ color: 'primary.main', mb: 1 }}>
                        {stat.number}
                      </Typography>
                      <Typography variant="h6">
                        {stat.label}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>

        {/* Team Section */}
        <Box sx={{ mt: 8, mb: 6 }}>
          <Typography variant="h2" align="center" sx={{ mb: 6 }}>
            Meet the Team
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              {
                name: 'Paul Hoy',
                role: '"The Man"',
                description: 'With over 25 years in the entertainment industry, Paul leads our vision for excellence.',
              },
              {
                name: 'Joshua Birch',
                role: '"The Guy"',
                description: 'Josh oversees our roster of artists and ensures the highest quality of entertainment.',
              },
              {
                name: 'Eric Clemens',
                role: 'Web Developer',
                description: 'We don\'t talk much about Clemens.',
              },
            ].map((member, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper elevation={2} sx={{ p: 4, height: '100%' }}>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: 'primary.main', mb: 2 }}>
                    {member.role}
                  </Typography>
                  <Typography variant="body1">
                    {member.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mt: 8, mb: 2 }}>
          <Copyright />
        </Box>
      </Container>
    </Box>
  );
}