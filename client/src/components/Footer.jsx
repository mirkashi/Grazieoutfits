import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Link as RouterLink } from 'react-router-dom';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'rgba(20, 109, 97, 0.1)',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Contact
            </Typography>
            <Typography variant="body2">
              <strong>Email:</strong> Grazieoutfits@gmail.com
            </Typography>
            <Typography variant="body2">
              <strong>Phone:</strong> +92 318-6831-156
            </Typography>
            <Typography variant="body2">
              <strong>Phone:</strong> +92 318-0095-755
            </Typography>
            <Typography variant="body2">
              <strong>Hours:</strong> 24/7, Mon-Sat
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                component="a"
                href="https://web.facebook.com/profile.php?id=61560610806364"
                target="_blank"
                color="primary"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.instagram.com/grazieoutfits10/"
                target="_blank"
                color="primary"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://wa.me/923175837684"
                target="_blank"
                color="primary"
              >
                <WhatsAppIcon />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Quick Links
            </Typography>
            <Link component={RouterLink} to="/" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link component={RouterLink} to="/shop" display="block" sx={{ mb: 1 }}>
              Shop
            </Link>
            <Link component={RouterLink} to="/about" display="block" sx={{ mb: 1 }}>
              About
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Location
            </Typography>
            <Typography variant="body2">
              Islamabad, Pakistan
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ borderTop: '1px solid rgba(0,0,0,0.1)', mt: 4, pt: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Grazie Outfits. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
