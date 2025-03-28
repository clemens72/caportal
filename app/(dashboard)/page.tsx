import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import UserButton from '../components/user-button';

export default function DashboardPage() {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 2,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <UserButton />
    </Box>
  );
}