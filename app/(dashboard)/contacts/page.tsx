import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

export default function ContactsPage() {
  // Sample data for contacts
  const contacts = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Event Manager',
      organization: 'Grand Plaza Hotel',
      email: 'sarah.j@grandplaza.com',
      phone: '(555) 123-4567',
      type: 'Venue Contact',
      lastContact: '2024-02-15',
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Corporate Client',
      organization: 'Corporate Events Inc.',
      email: 'm.chen@corpevents.com',
      phone: '(555) 234-5678',
      type: 'Client',
      lastContact: '2024-02-10',
    },
    {
      id: 3,
      name: 'Emma Wilson',
      role: 'Venue Coordinator',
      organization: 'Riverside Manor',
      email: 'emma.w@riversidemanor.com',
      phone: '(555) 345-6789',
      type: 'Venue Contact',
      lastContact: '2024-02-08',
    },
    {
      id: 4,
      name: 'David Martinez',
      role: 'Technical Director',
      organization: 'Sound & Lights Pro',
      email: 'd.martinez@slpro.com',
      phone: '(555) 456-7890',
      type: 'Vendor',
      lastContact: '2024-02-05',
    },
  ];

  // Sample data for recent interactions
  const recentInteractions = [
    {
      id: 1,
      contact: 'Sarah Johnson',
      type: 'Email',
      description: 'Discussed upcoming event requirements',
      date: '2024-02-15',
    },
    {
      id: 2,
      contact: 'Michael Chen',
      type: 'Phone Call',
      description: 'Confirmed event date and details',
      date: '2024-02-10',
    },
    {
      id: 3,
      contact: 'Emma Wilson',
      type: 'Meeting',
      description: 'Venue walkthrough for upcoming event',
      date: '2024-02-08',
    },
  ];

  // Sample data for contact statistics
  const statistics = [
    {
      title: 'Total Contacts',
      value: '45',
      icon: <PersonIcon />,
    },
    {
      title: 'Organizations',
      value: '15',
      icon: <BusinessIcon />,
    },
    {
      title: 'Recent Communications',
      value: '28',
      icon: <EmailIcon />,
    },
  ];

  const getContactTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'client':
        return 'primary';
      case 'venue contact':
        return 'success';
      case 'vendor':
        return 'info';
      default:
        return 'default';
    }
  };

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
        Contacts Overview
      </Typography>

      <Grid container spacing={3}>
        {/* Statistics Cards */}
        {statistics.map((stat) => (
          <Grid item xs={12} sm={4} key={stat.title}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{
                    bgcolor: 'primary.main',
                    margin: '0 auto',
                    width: 56,
                    height: 56,
                    mb: 2,
                  }}
                >
                  {stat.icon}
                </Avatar>
                <Typography variant="h4" component="div">
                  {stat.value}
                </Typography>
                <Typography color="text.secondary">{stat.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Contacts Table */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Contact List
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Organization</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Last Contact</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>{contact.name}</TableCell>
                        <TableCell>{contact.role}</TableCell>
                        <TableCell>{contact.organization}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>{contact.phone}</TableCell>
                        <TableCell>
                          <Chip
                            label={contact.type}
                            color={getContactTypeColor(contact.type)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{contact.lastContact}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Interactions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Interactions
              </Typography>
              <List>
                {recentInteractions.map((interaction) => (
                  <ListItem key={interaction.id} divider>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {interaction.type === 'Email' ? (
                          <EmailIcon />
                        ) : interaction.type === 'Phone Call' ? (
                          <PhoneIcon />
                        ) : (
                          <PersonIcon />
                        )}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={interaction.contact}
                      secondary={`${interaction.type} - ${interaction.description} (${interaction.date})`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}