import { Container, Typography, Box, Grid } from '@mui/material';

function About() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
        About Us
      </Typography>
      
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Typography variant="body1" paragraph>
            Welcome to Grazieoutfits, where we redefine casual fashion by offering premium quality hawaiian shirts at affordable prices. 
            Our journey began with a simple yet ambitious goal: to provide impeccably crafted clothing that embodies comfort, style, and affordability.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Our Vision
          </Typography>
          <Typography variant="body1" paragraph>
            At Grazieoutfits, we believe that everyone deserves to express their unique style without breaking the bank. 
            That's why we set out to challenge the notion that quality and affordability are mutually exclusive. We strive to make premium quality hawaiian shirts accessible to all, 
            ensuring that our customers can effortlessly elevate their everyday wardrobe.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Quality Craftsmanship
          </Typography>
          <Typography variant="body1" paragraph>
            We are passionate about craftsmanship and attention to detail. Each hawaiian shirts in our collection is meticulously designed and crafted using only the finest materials and techniques.
            From the softness of our digital loan and Linen to the precision of our stitching, every aspect of our clothing reflects our commitment to quality and excellence.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Customer Satisfaction
          </Typography>
          <Typography variant="body1" paragraph>
            At Grazieoutfits, customer satisfaction is our top priority. We are dedicated to providing an exceptional shopping experience, from the moment you browse 
            our collection to the day your order arrives at your doorstep. Our knowledgeable and friendly team is here to assist you every step of the way, ensuring 
            that you find the perfect hawaiian shirts that not only fits your style but also exceeds your expectations.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 3, borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h6">
              Thank you for choosing us to be a part of your journey towards timeless comfort and effortless style.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default About;
