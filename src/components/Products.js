import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

function Products() {
  // Pharmaceutical product data
  const products = [
    { 
      id: 1, 
      name: 'Antibiotics - Amoxicillin', 
      price: '₹120', 
      category: 'Antibiotics',
      stock: 'In Stock', 
      image: '/products/Amoxicillin.jpg' // Place in public/products folder
    },
    { 
      id: 2, 
      name: 'Pain Relief - Ibuprofen', 
      price: '₹85', 
      category: 'Pain Relief',
      stock: 'In Stock', 
      image: '/products/Ibuprofen.jpg' 
    },
    { 
      id: 3, 
      name: 'Blood Pressure Monitor', 
      price: '₹1,850', 
      category: 'Medical Devices',
      stock: 'Low Stock', 
      image: '/products/Blood Pressure Monitor.jpg' 
    },
    { 
      id: 4, 
      name: 'Digital Thermometer', 
      price: '₹450', 
      category: 'Medical Devices',
      stock: 'In Stock', 
      image: '/products/Digital Thermometer.jpg' 
    },
    { 
      id: 5, 
      name: 'Vitamin D3 Supplements', 
      price: '₹350', 
      category: 'Supplements',
      stock: 'In Stock', 
      image: '/products/Vitamin D3 Supplements.jpg' 
    },
    { 
      id: 6, 
      name: 'Insulin Injection Kit', 
      price: '₹2,500', 
      category: 'Diabetes Care',
      stock: 'Out of Stock', 
      image: '/products/Insulin Injection Kit.jpg' 
    },
  ];

  const [searchTerm, setSearchTerm] = React.useState('');

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          Pharmaceutical Products
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, width: { xs: '100%', sm: 'auto' } }}>
          <TextField
            placeholder="Search products..."
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
            Add Product
          </Button>
        </Box>
      </Box>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Typography variant="body1" paragraph>
          Manage pharmaceutical products inventory. Add new products, update stock levels, or modify product information as needed.
        </Typography>
      </Paper>
      
      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 6
              },
              borderRadius: 2
            }}>
              <CardMedia
                component="img"
                height="160"
                image={product.image}
                alt={product.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150?text=BlueMedix';
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'medium' }}>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Category: {product.category}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1 }}>
                  {product.price}
                </Typography>
                <Chip 
                  label={product.stock} 
                  size="small"
                  sx={{ 
                    bgcolor: 
                      product.stock === 'In Stock' ? '#e8f5e9' : 
                      product.stock === 'Low Stock' ? '#fff8e1' : '#ffebee',
                    color: 
                      product.stock === 'In Stock' ? '#2e7d32' : 
                      product.stock === 'Low Stock' ? '#f57f17' : '#c62828',
                  }}
                />
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button 
                  size="small" 
                  sx={{ color: '#1976d2' }}
                >
                  Edit
                </Button>
                <Button 
                  size="small" 
                  sx={{ color: '#d32f2f' }}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Products;
