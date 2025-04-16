'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SearchBox from '@/app/components/SearchBox';
import OrganizationTable from '@/app/components/Admin/Tables/OrganizationTable';

export default function OrganizationsPage() {

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
        Organizations Overview
      </Typography>

      <Grid container spacing={3}>
        
        {/* Search Box */}
        <Grid item xs={12}>
          <Card>
            <SearchBox entityType="organizations" />
          </Card>
        </Grid>

         {/* Organizations Table */}
         <Grid item xs={12}>
          <Card>
            <CardContent>
              <OrganizationTable />
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