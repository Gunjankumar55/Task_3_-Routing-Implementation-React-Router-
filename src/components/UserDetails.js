import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://fakestoreapi.com/users/${id}`);
        setUser({
          ...response.data,
          status: Math.random() > 0.3 ? 'Active' : 'Inactive',
          role: ['Admin', 'Customer', 'Sales', 'Inventory Manager'][Math.floor(Math.random() * 4)]
        });
        setError(null);
      } catch (err) {
        setError('Failed to fetch user details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  // Function to get avatar background color based on name
  const stringToColor = (string) => {
    if (!string) return '#1976d2';
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!user) {
    return <Alert severity="info">User not found</Alert>;
  }

  const fullName = user.name ? `${user.name.firstname} ${user.name.lastname}` : 'User';
  const initials = user.name ? (user.name.firstname?.[0] || '') + (user.name.lastname?.[0] || '') : 'U';

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/users')}
          sx={{ mr: 2 }}
        >
          Back to Users
        </Button>
        <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold', flexGrow: 1 }}>
          User Details
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar 
            sx={{ 
              width: 80, 
              height: 80, 
              bgcolor: stringToColor(fullName),
              mr: 3
            }}
          >
            {initials}
          </Avatar>
          <Box>
            <Typography variant="h5">{fullName}</Typography>
            <Box sx={{ display: 'flex', mt: 1 }}>
              <Chip 
                label={user.role} 
                size="small"
                sx={{ mr: 1 }}
              />
              <Chip 
                label={user.status} 
                size="small"
                sx={{ 
                  bgcolor: user.status === 'Active' ? '#e8f5e9' : '#ffebee',
                  color: user.status === 'Active' ? '#2e7d32' : '#c62828',
                }}
              />
            </Box>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">Email</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{user.email}</Typography>
            
            <Typography variant="subtitle2" color="text.secondary">Username</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{user.username}</Typography>
            
            <Typography variant="subtitle2" color="text.secondary">Phone</Typography>
            <Typography variant="body1">{user.phone}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">Address</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {user.address?.number} {user.address?.street}, {user.address?.city}, {user.address?.zipcode}
            </Typography>
            
            <Typography variant="subtitle2" color="text.secondary">Account Created</Typography>
            <Typography variant="body1">
              {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default UserDetails;
