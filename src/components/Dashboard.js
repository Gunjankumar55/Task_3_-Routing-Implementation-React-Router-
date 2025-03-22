import React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, Route, Routes } from 'react-router-dom';
import Users from './Users';
import Products from './Products';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div style={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 ,borderRadius: 0 , bgcolor: '#ffffff'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label={open ? "close drawer" : "open drawer"}
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 , color: '#000000'}}
          >
            <MenuIcon />
            
          </IconButton>

          <Box 
            component="img"
            sx={{ height: 70, mr: 2 }}
            alt="BlueMedix Logo"
            src="/logo.png"
          />
          <Typography variant="h6" noWrap component="div">
           fdsf
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            paddingLeft: 1, // Add left padding
          },
        }}
        variant={isMobile ? "temporary" : "persistent"}
        anchor="left"
        open={isMobile ? open : open}  // Changed to just open to keep drawer closed by default
        onClose={toggleDrawer}
      >
        <DrawerHeader />
        <List>
        <ListItem button component={Link} to="/" aria-label="Go to Dashboard">
    <ListItemIcon><HomeIcon /></ListItemIcon>
    <ListItemText primary="Dashboard"  style={{ color: '#1976d2'}}/>
  </ListItem>
          <ListItem button component={Link} to="/users" aria-label="Go to Users section">
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Users"  style={{ color: '#1976d2'}}/>
          </ListItem>
          <ListItem button component={Link} to="/products" aria-label="Go to Products section">
            <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
            <ListItemText
            primary="Products"
            style={{ color: '#1976d2'}}
             />
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/" element={
            <Box>
              <Typography variant="h4" sx={{ mb: 3, color: '#1976d2', fontWeight: 'bold' }}>
                Welcome to BlueMedix Dashboard
              </Typography>
              
              <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                <Typography variant="body1" paragraph>
                  This dashboard provides tools to manage pharmaceutical products and staff accounts.
                  Navigate through the sections using the menu on the left.
                </Typography>
              </Paper>
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Card sx={{ height: '100%', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)' } }}>
                    <CardActionArea component={Link} to="/users" sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PeopleIcon sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
                        <Box>
                          <Typography variant="h6">User</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Manage staff accounts and permissions
                          </Typography>
                        </Box>
                      </Box>
                    </CardActionArea>
                  </Card>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Card sx={{ height: '100%', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)' } }}>
                    <CardActionArea component={Link} to="/products" sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ShoppingCartIcon sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
                        <Box>
                          <Typography variant="h6">Products</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Manage pharmaceutical products inventory
                          </Typography>
                        </Box>
                      </Box>
                    </CardActionArea>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          } />
        </Routes>
      </Main>
    </div>
  );
}

export default Dashboard;
