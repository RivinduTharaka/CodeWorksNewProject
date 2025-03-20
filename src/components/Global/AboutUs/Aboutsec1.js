import React from 'react';
import { Box, Typography, Container, Button, useTheme, useMediaQuery } from '@mui/material';

function Aboutsec1() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ backgroundColor: '#0a192f', py: { xs: 6, md: 8 }, px: { xs: 2, md: 0 } }}>
      <Container maxWidth="md">
        <Typography
          variant={isSmallScreen ? 'h4' : 'h2'} // Adjust font size for small screens
          component="h1"
          gutterBottom
          align="center"
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(90deg,#24b24c,rgb(0, 254, 165))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Empowering Your Digital Transformation
        </Typography>
        <Typography
          variant={isSmallScreen ? 'h6' : 'h5'}
          component="h2"
          gutterBottom
          align="center"
          sx={{ color: 'white' }}
        >
          We provide cutting-edge IT solutions to help businesses thrive in a rapidly evolving digital landscape.
        </Typography>
        <Typography
          variant="body1"
          paragraph
          align="center"
          sx={{ color: 'white', fontSize: isSmallScreen ? '0.9rem' : '1rem' }}
        >
          At Connexit, we specialize in delivering innovative technology services that drive efficiency, security, and growth. Our expertise spans cybersecurity, cloud computing, and IT infrastructure, ensuring your business is equipped for the future.
        </Typography>
        <Typography
          variant={isSmallScreen ? 'h6' : 'h5'}
          component="h3"
          gutterBottom
          align="center"
          sx={{ fontWeight: 'bold', color: 'white' }}
        >
          Why Choose Connexit?
        </Typography>
        <Typography
          variant="body1"
          paragraph
          align="center"
          sx={{ color: 'white', fontSize: isSmallScreen ? '0.9rem' : '1rem' }}
        >
          With a focus on customer-centric solutions, we partner with leading technology providers to offer tailored services that meet your unique needs. Our team of experts is dedicated to helping you navigate the complexities of digital transformation with confidence.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="outlined"
            sx={{
              borderColor: 'rgb(24, 176, 203)', 
              color: 'rgb(24, 176, 203)', 
              fontWeight: 'bold',
              borderWidth: 2,
              fontSize: isSmallScreen ? '0.8rem' : '1rem', // Adjust button text size
              px: isSmallScreen ? 2 : 4, // Adjust button padding
              py: isSmallScreen ? 1 : 1.5,
              '&:hover': {
                backgroundColor: 'rgba(24, 176, 203, 0.1)', 
                borderColor: 'rgb(24, 176, 203)',
              },
            }}
            size="large"
          >
            Learn More About Us
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Aboutsec1;
