import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct({
          ...response.data,
          stock: ['In Stock', 'Low Stock', 'Out of Stock'][Math.floor(Math.random() * 3)]
        });
        setError(null);
      } catch (err) {
        setError('Failed to fetch product details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

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

  if (!product) {
    return <Alert severity="info">Product not found</Alert>;
  }

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/products')}
          sx={{ mr: 2 }}
        >
          Back to Products
        </Button>
        <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold', flexGrow: 1 }}>
          Product Details
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <img 
              src={product.image} 
              alt={product.title}
              style={{ 
                width: '100%', 
                borderRadius: 8,
                objectFit: 'contain',
                height: '300px',
                backgroundColor: '#f5f5f5',
                padding: '16px'
              }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300?text=Product';
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom>{product.title}</Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating?.rate || 0} precision={0.1} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                ({product.rating?.count || 0} reviews)
              </Typography>
            </Box>
            
            <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
              ${product.price ? (typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : product.price.toFixed(2)) : '0.00'}
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Chip 
                label={product.category} 
                size="small"
                sx={{ mr: 1 }}
              />
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
            </Box>
            
            <Typography variant="subtitle1" gutterBottom>Description:</Typography>
            <Typography variant="body2" paragraph>
              {product.description}
            </Typography>

            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle2" color="text.secondary">Product ID</Typography>
              <Typography variant="body2">{product.id}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default ProductDetails;
