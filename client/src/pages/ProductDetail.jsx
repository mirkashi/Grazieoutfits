import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  ImageList,
  ImageListItem,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { productAPI } from '../services/api';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getById(id);
      setProduct(response.data.data);
      if (response.data.data.sizes?.length > 0) {
        setSelectedSize(response.data.data.sizes[0]);
      }
      if (response.data.data.colors?.length > 0) {
        setSelectedColor(response.data.data.colors[0]);
      }
    } catch (error) {
      console.error('Error loading product:', error);
      setError('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const handleOrderNow = () => {
    if (!selectedSize && product.sizes?.length > 0) {
      alert('Please select a size');
      return;
    }
    if (!selectedColor && product.colors?.length > 0) {
      alert('Please select a color');
      return;
    }
    
    // Navigate to order form with product details
    navigate('/order', {
      state: {
        items: [{
          product: product._id,
          name: product.name,
          price: product.price,
          quantity: 1,
          size: selectedSize,
          color: selectedColor,
        }]
      }
    });
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="error">{error || 'Product not found'}</Alert>
        <Button onClick={() => navigate('/shop')} sx={{ mt: 2 }}>
          Back to Shop
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 6 }}>
      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 2 }}>
            <Box
              component="img"
              src={product.images?.[selectedImage] || '/placeholder.jpg'}
              alt={product.name}
              sx={{
                width: '100%',
                height: 500,
                objectFit: 'cover',
                borderRadius: 2,
                mb: 2,
              }}
            />
            {product.images && product.images.length > 1 && (
              <ImageList cols={4} gap={8}>
                {product.images.map((image, index) => (
                  <ImageListItem
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    sx={{
                      cursor: 'pointer',
                      border: selectedImage === index ? '2px solid' : 'none',
                      borderColor: 'primary.main',
                      borderRadius: 1,
                      overflow: 'hidden',
                    }}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} />
                  </ImageListItem>
                ))}
              </ImageList>
            )}
          </Paper>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Box>
            <Chip label={product.category || 'Grazie Outfits'} color="primary" sx={{ mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              {product.name}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
              {[...Array(product.rating || 5)].map((_, i) => (
                <span key={i} style={{ color: '#ffc107', fontSize: '1.5rem' }}>⭐</span>
              ))}
            </Box>

            <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
              Rs {product.price.toLocaleString()}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph sx={{ mt: 3 }}>
              {product.description}
            </Typography>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <FormControl fullWidth sx={{ mt: 3 }}>
                <InputLabel>Size</InputLabel>
                <Select
                  value={selectedSize}
                  label="Size"
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  {product.sizes.map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Color</InputLabel>
                <Select
                  value={selectedColor}
                  label="Color"
                  onChange={(e) => setSelectedColor(e.target.value)}
                >
                  {product.colors.map((color) => (
                    <MenuItem key={color} value={color}>
                      {color}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {/* Stock Status */}
            <Box sx={{ mt: 3 }}>
              {product.stock > 0 ? (
                <Chip
                  label={`In Stock (${product.stock} available)`}
                  color="success"
                  variant="outlined"
                />
              ) : (
                <Chip label="Out of Stock" color="error" variant="outlined" />
              )}
            </Box>

            {/* Action Buttons */}
            <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={<ShoppingCartIcon />}
                onClick={handleOrderNow}
                disabled={product.stock === 0}
              >
                Order Now
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/shop')}
              >
                Continue Shopping
              </Button>
            </Box>

            {/* Additional Info */}
            <Paper elevation={0} sx={{ p: 2, mt: 4, bgcolor: 'grey.50' }}>
              <Typography variant="subtitle2" gutterBottom>
                <strong>Free Shipping</strong> on orders above Rs. 3000
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                <strong>Cash on Delivery</strong> available
              </Typography>
              <Typography variant="subtitle2">
                <strong>Easy Returns</strong> within 7 days
              </Typography>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetail;
