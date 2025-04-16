'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SearchBox from '@/app/components/SearchBox';
import EventTable from '@/app/components/Admin/Tables/EventTable';

export default function EventsPage() {

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
        Events Overview
      </Typography>

      <Grid container spacing={3}>
        
        {/* Search Box */}
        <Grid item xs={12}>
          <Card>
            <SearchBox entityType="events" />
          </Card>
        </Grid>

        {/* Events Table */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <EventTable />
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activities
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}