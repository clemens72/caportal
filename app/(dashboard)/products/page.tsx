'use client';
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
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import InventoryIcon from '@mui/icons-material/Inventory';
import BuildIcon from '@mui/icons-material/Build';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

export default function ProductsPage() {
  // Sample data for equipment inventory
  const products = [
    {
      id: 1,
      name: 'Roland RD-2000 Piano',
      category: 'Keyboard',
      condition: 'Excellent',
      status: 'Available',
      dailyRate: 150,
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-04-15',
      location: 'Main Storage',
    },
    {
      id: 2,
      name: 'Yamaha Stage Custom Drum Set',
      category: 'Percussion',
      condition: 'Good',
      status: 'In Use',
      dailyRate: 200,
      lastMaintenance: '2024-02-01',
      nextMaintenance: '2024-05-01',
      location: 'Studio A',
    },
    {
      id: 3,
      name: 'QSC K12.2 Speakers (Pair)',
      category: 'Sound',
      condition: 'Excellent',
      status: 'Available',
      dailyRate: 120,
      lastMaintenance: '2024-02-10',
      nextMaintenance: '2024-05-10',
      location: 'Main Storage',
    },
    {
      id: 4,
      name: 'Shure SM58 Microphones (Set of 4)',
      category: 'Microphones',
      condition: 'Good',
      status: 'Maintenance',
      dailyRate: 80,
      lastMaintenance: '2024-02-15',
      nextMaintenance: '2024-05-15',
      location: 'Tech Room',
    },
  ];

  // Sample data for maintenance schedule
  const maintenanceSchedule = [
    {
      id: 1,
      equipment: 'Shure SM58 Microphones',
      type: 'Regular Cleaning',
      date: '2024-02-20',
      technician: 'Mike Thompson',
    },
    {
      id: 2,
      equipment: 'Roland RD-2000 Piano',
      type: 'Tuning',
      date: '2024-04-15',
      technician: 'Sarah Wilson',
    },
    {
      id: 3,
      equipment: 'Yamaha Stage Custom',
      type: 'Hardware Check',
      date: '2024-05-01',
      technician: 'David Martinez',
    },
  ];

  // Sample data for inventory statistics
  const statistics = [
    {
      title: 'Total Equipment',
      value: '45',
      icon: <InventoryIcon />,
    },
    {
      title: 'Maintenance Due',
      value: '3',
      icon: <BuildIcon />,
    },
    {
      title: 'Monthly Revenue',
      value: '$12,450',
      icon: <AttachMoneyIcon />,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'success';
      case 'in use':
        return 'primary';
      case 'maintenance':
        return 'warning';
      case 'damaged':
        return 'error';
      default:
        return 'default';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'excellent':
        return 'success';
      case 'good':
        return 'primary';
      case 'fair':
        return 'warning';
      case 'poor':
        return 'error';
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
        Products Overview
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

        {/* Equipment Inventory Table */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Equipment Inventory
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Equipment Name</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Condition</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Daily Rate</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Next Maintenance</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>
                          <Chip
                            label={product.condition}
                            color={getConditionColor(product.condition)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={product.status}
                            color={getStatusColor(product.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>${product.dailyRate}</TableCell>
                        <TableCell>{product.location}</TableCell>
                        <TableCell>{product.nextMaintenance}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Maintenance Schedule */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Maintenance
              </Typography>
              <List>
                {maintenanceSchedule.map((schedule) => (
                  <ListItem key={schedule.id} divider>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <BuildIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={schedule.equipment}
                      secondary={`${schedule.type} - ${schedule.date} (Technician: ${schedule.technician})`}
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