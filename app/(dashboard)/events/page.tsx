import UserButton from '@/app/components/user-button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function EventsPage() {

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
        Events
      </Typography>
      <UserButton />
    </Box>
  );
}