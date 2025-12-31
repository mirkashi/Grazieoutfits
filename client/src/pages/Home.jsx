import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const response = await productAPI.getAll({ featured: true });
      setFeaturedProducts(response.data.data || []);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'linear-gradient(135deg, #146d61 0%, #088178 100%)',
          color: 'white',
          py: 12,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            Welcome to Grazie Outfits
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Premium Quality Hawaiian Shirts at Affordable Prices
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/shop')}
            sx={{
              backgroundColor: 'white',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.9)',
              },
              px: 4,
              py: 1.5,
            }}
          >
            Shop Now
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {[
            { icon: '🚚', title: 'Free Shipping', desc: 'On orders above Rs. 3000' },
            { icon: '💳', title: 'Multiple Payments', desc: 'COD, Bank, Easypaisa, JazzCash' },
            { icon: '💰', title: 'Save Money', desc: 'Best prices guaranteed' },
            { icon: '🎉', title: 'Promotions', desc: 'Regular discounts & offers' },
            { icon: '😊', title: 'Happy Customers', desc: '1000+ satisfied customers' },
            { icon: '24/7', title: 'Support', desc: '24/7 customer service' },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={2} key={index}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h2">{feature.icon}</Typography>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Products Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container>
          <Typography variant="h3" component="h2" gutterBottom textAlign="center" fontWeight="bold">
            Stylish Hawaiian Shirts
          </Typography>
          <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
            Summer Collection - Modern Design
          </Typography>

          {loading ? (
            <Typography textAlign="center">Loading products...</Typography>
          ) : (
            <Grid container spacing={4}>
              {featuredProducts.length > 0 ? (
                featuredProducts.slice(0, 4).map((product) => (
                  <Grid item xs={12} sm={6} md={3} key={product._id}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          transition: 'transform 0.3s',
                          boxShadow: 4,
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="250"
                        image={product.images?.[0] || '/placeholder.jpg'}
                        alt={product.name}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Chip
                          label="Grazie Outfits"
                          size="small"
                          sx={{ mb: 1 }}
                        />
                        <Typography variant="h6" component="div" gutterBottom>
                          {product.name}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
                          {[...Array(product.rating || 5)].map((_, i) => (
                            <span key={i}>⭐</span>
                          ))}
                        </Box>
                        <Typography variant="h6" color="primary" fontWeight="bold">
                          Rs {product.price.toLocaleString()}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          fullWidth
                          variant="contained"
                          onClick={() => navigate(`/product/${product._id}`)}
                        >
                          View Details
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography textAlign="center" variant="h6" color="text.secondary">
                    No products available yet. Check back soon!
                  </Typography>
                  <Typography textAlign="center" sx={{ mt: 2 }}>
                    Visit our{' '}
                    <Button onClick={() => navigate('/shop')}>Shop</Button> to see all products
                  </Typography>
                </Grid>
              )}
            </Grid>
          )}

          {featuredProducts.length > 0 && (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/shop')}
              >
                View All Products
              </Button>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
}

export default Home;
