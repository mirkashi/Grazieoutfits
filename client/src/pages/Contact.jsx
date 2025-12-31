import { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Using Web3Forms API (free contact form service)
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '83f10b7f-c0c8-4400-b049-2927dc7ffa55', // From original contact.html
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header Section */}
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
            Get in Touch with Grazie Outfits
          </Typography>
          <Typography variant="h6">
            We'd love to hear from you!
          </Typography>
        </Container>
      </Box>

      <Container sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper elevation={2} sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Send us a Message
              </Typography>
              
              {success && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  Message sent successfully! We'll get back to you soon.
                </Alert>
              )}
              
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Email Address"
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
                      label="Message"
                      name="message"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={loading}
                      fullWidth
                    >
                      {loading ? <CircularProgress size={24} /> : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>

          {/* Contact Information & Map */}
          <Grid item xs={12} md={5}>
            <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Contact Information
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                <LocationOnIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Address
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ZP 04403, Islamabad, Pakistan
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                <PhoneIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Phone
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    +92 318-6831-156
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    +92 318-0095-755
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    WhatsApp: +92 317-5837-684
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <EmailIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Email
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Grazieoutfits@gmail.com
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Business Hours
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  24/7 Service
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Monday - Saturday
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sunday Off
                </Typography>
              </Box>
            </Paper>

            {/* Google Maps Embed */}
            <Paper elevation={2} sx={{ overflow: 'hidden', height: 300 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212645.32758412763!2d73.08610799999998!3d33.61611625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd07891722f%3A0x6059515c3bdb02b6!2sIslamabad%2C%20Islamabad%20Capital%20Territory!5e0!3m2!1sen!2s!4v1719735240675!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Grazie Outfits Location"
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Contact;
