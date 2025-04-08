import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import CreateUserForm from '@/app/components/CreateUserForm';
import UserTable from '@/app/components/UserTable';

export default function AdminPage() {
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
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 2 }}>
        Accounts Overview
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Create New User
              </Typography>
              <CreateUserForm />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <UserTable />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}