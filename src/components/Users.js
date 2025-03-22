import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Users() {
  // Sample data with status added
  const users = [
    { id: 1, name: 'Gunjankumar Choudhari', email: 'gunjan@bluemedix.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Harsh bhoi', email: 'Harsh@gmail.com', role: 'Customer', status: 'Active' },
    { id: 3, name: 'Om Rane', email: 'om@bluemedix.com', role: 'Inventory Manager', status: 'Inactive' },
    { id: 4, name: 'omkar belote', email: 'omkar@bluemedix.com', role: 'Sales', status: 'Active' },
    { id: 5, name: 'vishwajeet patil', email: 'vis@gmail.com', role: 'Customer', status: 'Active' },
  ];

  const [searchTerm, setSearchTerm] = React.useState('');

  // Filter users based on search
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to get avatar background color based on name
  const stringToColor = (string) => {
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

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' }, 
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', sm: 'center' }, 
        mb: 3,
        gap: 2
      }}>
        <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
          Users
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, width: { xs: '100%', sm: 'auto' } }}>
          <TextField
            placeholder="Search users..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: { xs: '100%', sm: '220px' } }}
          />
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            sx={{ 
              bgcolor: '#1976d2', 
              '&:hover': { bgcolor: '#1565c0' },
              whiteSpace: 'nowrap'
            }}
          >
            Add User
          </Button>
        </Box>
      </Box>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Typography variant="body1" paragraph>
          Manage BlueMedix staff accounts. Add new staff members, update roles, or deactivate accounts as needed.
        </Typography>
      </Paper>
      
      <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Staff Member</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow 
                key={user.id}
                sx={{ '&:hover': { bgcolor: '#f9f9f9' } }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: stringToColor(user.name),
                        mr: 2
                      }}
                    >
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Typography>{user.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Chip 
                    label={user.status} 
                    size="small"
                    sx={{ 
                      bgcolor: user.status === 'Active' ? '#e8f5e9' : '#ffebee',
                      color: user.status === 'Active' ? '#2e7d32' : '#c62828',
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Button 
                    size="small" 
                    startIcon={<EditIcon />}
                    sx={{ color: '#1976d2', mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button 
                    size="small" 
                    startIcon={<DeleteIcon />}
                    sx={{ color: '#d32f2f' }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Users;
