import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Alert,
  CircularProgress,
} from '@mui/material';
import { orderAPI, settingsAPI } from '../services/api';

const REGIONS = [
  'Islamabad',
  'Rawalpindi',
  'Lahore',
  'Karachi',
  'Multan',
  'Faisalabad',
  'Peshawar',
  'Quetta',
  'Other',
];

function OrderForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const items = location.state?.items || [];

  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      region: 'Islamabad',
      postalCode: '',
    },
    paymentMethod: 'Cash on Delivery',
    notes: '',
  });

  const [shippingCost, setShippingCost] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (items.length === 0) {
      navigate('/shop');
    }
  }, [items, navigate]);

  useEffect(() => {
    loadShippingCost();
  }, [formData.address.region]);

  const loadShippingCost = async () => {
    try {
      const response = await settingsAPI.getShippingRate(formData.address.region);
      setShippingCost(response.data.data.rate || 0);
    } catch (error) {
      console.error('Error loading shipping cost:', error);
      setShippingCost(200); // Default shipping cost
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + shippingCost;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const orderData = {
        ...formData,
        items: items.map(item => ({
          product: item.product,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        })),
        totalAmount: calculateSubtotal(),
      };

      const response = await orderAPI.create(orderData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Error placing order:', error);
      setError(error.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Alert severity="success" sx={{ mb: 3 }}>
          Order placed successfully! We will contact you soon.
        </Alert>
        <Typography variant="h5" gutterBottom>
          Thank you for your order!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          You will be redirected to the home page shortly...
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Place Your Order
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          {/* Left Column - Customer Details */}
          <Grid item xs={12} md={7}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Customer Information
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Full Name"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Street Address"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="City"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Region</InputLabel>
                    <Select
                      name="address.region"
                      value={formData.address.region}
                      label="Region"
                      onChange={handleChange}
                    >
                      {REGIONS.map((region) => (
                        <MenuItem key={region} value={region}>
                          {region}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Postal Code (Optional)"
                    name="address.postalCode"
                    value={formData.address.postalCode}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 4 }}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Payment Method</FormLabel>
                  <RadioGroup
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="Cash on Delivery"
                      control={<Radio />}
                      label="Cash on Delivery (COD)"
                    />
                    <FormControlLabel
                      value="Bank Transfer"
                      control={<Radio />}
                      label="Bank Transfer"
                    />
                    <FormControlLabel
                      value="Easypaisa"
                      control={<Radio />}
                      label="Easypaisa"
                    />
                    <FormControlLabel
                      value="JazzCash"
                      control={<Radio />}
                      label="JazzCash"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              <TextField
                fullWidth
                label="Order Notes (Optional)"
                name="notes"
                multiline
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                sx={{ mt: 3 }}
              />
            </Paper>
          </Grid>

          {/* Right Column - Order Summary */}
          <Grid item xs={12} md={5}>
            <Paper elevation={2} sx={{ p: 3, position: 'sticky', top: 20 }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Item</TableCell>
                      <TableCell align="right">Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Typography variant="body2">{item.name}</Typography>
                          {item.size && (
                            <Typography variant="caption" color="text.secondary">
                              Size: {item.size}
                            </Typography>
                          )}
                          {item.color && (
                            <Typography variant="caption" color="text.secondary" display="block">
                              Color: {item.color}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          Rs {(item.price * item.quantity).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell><strong>Subtotal</strong></TableCell>
                      <TableCell align="right">
                        <strong>Rs {calculateSubtotal().toLocaleString()}</strong>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Shipping ({formData.address.region})</TableCell>
                      <TableCell align="right">
                        Rs {shippingCost.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><Typography variant="h6">Total</Typography></TableCell>
                      <TableCell align="right">
                        <Typography variant="h6" color="primary">
                          Rs {calculateTotal().toLocaleString()}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
                sx={{ mt: 3 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Place Order'}
              </Button>

              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/shop')}
                sx={{ mt: 2 }}
              >
                Continue Shopping
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default OrderForm;
