import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Outlet, Link, useLocation, Routes, Route } from 'react-router-dom';
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
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Paper from '@mui/material/Paper';
import Users from './Users';
import Products from './Products';
import UserDetails from './UserDetails';
import ProductDetails from './ProductDetails';
import AddUser from './AddUser';
import AddProduct from './AddProduct';
import EditUser from './EditUser';
import EditProduct from './EditProduct'; // Add this line




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
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const HomePage = () => (
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
  );

  return (
    <div style={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, borderRadius: 0, bgcolor: '#ffffff' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label={open ? "close drawer" : "open drawer"}
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2, color: '#000000' }}
          >
            <MenuIcon />
          </IconButton>

          <Box 
            component="img"
            sx={{ height: 70, mr: 2 }}
            alt="BlueMedix Logo"
            src="/logo.png"
          />
          <Typography variant="h6" noWrap component="div" color="black">
            BlueMedix Dashboard
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
            paddingLeft: 1,
          },
        }}
        variant={isMobile ? "temporary" : "persistent"}
        anchor="left"
        open={isMobile ? open : open}
        onClose={toggleDrawer}
      >
        <DrawerHeader />
        <List>
          <ListItem button component={Link} to="/" aria-label="Go to Dashboard" 
                   selected={location.pathname === '/'} onClick={isMobile ? toggleDrawer : undefined}>
            <ListItemIcon><HomeIcon color={location.pathname === '/' ? "primary" : "inherit"} /></ListItemIcon>
            <ListItemText primary="Dashboard" style={{ color: location.pathname === '/' ? '#1976d2' : 'inherit' }}/>
          </ListItem>
          
          <ListItem button component={Link} to="/users" aria-label="Go to Users section"
                   selected={location.pathname === '/users'} onClick={isMobile ? toggleDrawer : undefined}>
            <ListItemIcon><PeopleIcon color={location.pathname === '/users' ? "primary" : "inherit"} /></ListItemIcon>
            <ListItemText primary="Users" style={{ color: location.pathname === '/users' ? '#1976d2' : 'inherit' }}/>
          </ListItem>
          
          <ListItem button component={Link} to="/add-user" aria-label="Add User"
                   selected={location.pathname === '/add-user'} onClick={isMobile ? toggleDrawer : undefined}>
            <ListItemIcon><AddIcon color={location.pathname === '/add-user' ? "primary" : "inherit"} /></ListItemIcon>
            <ListItemText primary="Add User" style={{ color: location.pathname === '/add-user' ? '#1976d2' : 'inherit' }}/>
          </ListItem>
          
          <ListItem button component={Link} to="/products" aria-label="Go to Products section"
                   selected={location.pathname === '/products'} onClick={isMobile ? toggleDrawer : undefined}>
            <ListItemIcon><ShoppingCartIcon color={location.pathname === '/products' ? "primary" : "inherit"} /></ListItemIcon>
            <ListItemText primary="Products" style={{ color: location.pathname === '/products' ? '#1976d2' : 'inherit' }}/>
          </ListItem>
          
          <ListItem button component={Link} to="/add-product" aria-label="Add Product"
                   selected={location.pathname === '/add-product'} onClick={isMobile ? toggleDrawer : undefined}>
            <ListItemIcon><AddIcon color={location.pathname === '/add-product' ? "primary" : "inherit"} /></ListItemIcon>
            <ListItemText primary="Add Product" style={{ color: location.pathname === '/add-product' ? '#1976d2' : 'inherit' }}/>
          </ListItem>
        </List>
      </Drawer>
      
      <Main open={open}>
        <DrawerHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/products/:id/edit" element={<EditProduct />} />
          <Route path="/users/:id/edit" element={<EditUser />} />
        </Routes>
      </Main>
    </div>
  );
}

export default Dashboard;
