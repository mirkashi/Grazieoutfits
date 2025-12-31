import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, [category]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const params = category ? { category } : {};
      const response = await productAPI.getAll(params);
      setProducts(response.data.data || []);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Page Header */}
      <Box
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          py: 4,
          textAlign: 'center',
        }}
      >
        <Container>
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            #StayHome
          </Typography>
          <Typography variant="h6">
            Save more with coupons & up to 70% off!
          </Typography>
        </Container>
      </Box>

      <Container sx={{ py: 6 }}>
        {/* Filter Section */}
        <Box sx={{ mb: 4 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="">All Products</MenuItem>
              <MenuItem value="Hawaiian Shirts">Hawaiian Shirts</MenuItem>
              <MenuItem value="Linen Shirts">Linen Shirts</MenuItem>
              <MenuItem value="T-Shirts">T-Shirts</MenuItem>
              <MenuItem value="Accessories">Accessories</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Products Grid */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {products.length > 0 ? (
              products.map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product._id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        transition: 'transform 0.3s',
                        boxShadow: 6,
                      },
                    }}
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    <CardMedia
                      component="img"
                      height="300"
                      image={product.images?.[0] || '/placeholder.jpg'}
                      alt={product.name}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Chip
                        label={product.category || 'Grazie Outfits'}
                        size="small"
                        color="primary"
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="h6" component="div" gutterBottom>
                        {product.name}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
                        {[...Array(product.rating || 5)].map((_, i) => (
                          <span key={i} style={{ color: '#ffc107' }}>⭐</span>
                        ))}
                      </Box>
                      {product.stock > 0 ? (
                        <Typography variant="body2" color="success.main">
                          In Stock ({product.stock})
                        </Typography>
                      ) : (
                        <Typography variant="body2" color="error">
                          Out of Stock
                        </Typography>
                      )}
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Box sx={{ width: '100%' }}>
                        <Typography variant="h6" color="primary" fontWeight="bold" sx={{ mb: 1 }}>
                          Rs {product.price.toLocaleString()}
                        </Typography>
                        <Button
                          size="medium"
                          fullWidth
                          variant="contained"
                          disabled={product.stock === 0}
                        >
                          {product.stock > 0 ? 'View Details' : 'Out of Stock'}
                        </Button>
                      </Box>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Typography variant="h5" color="text.secondary" gutterBottom>
                    No products found
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {category
                      ? `No products available in ${category} category`
                      : 'Check back soon for new arrivals!'}
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        )}
      </Container>
    </>
  );
}

export default Shop;
