import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';

// Import the background image (ensure the path is correct)
import backgroundImage from '../../../assets/image/Portal/IMAGE1.png'; // Replace with the actual path to your image

function Portal1() {
  return (
    <Box
      sx={{
        backgroundColor: '#0a1a2f', // Dark blue background for the entire page
        minHeight: '95vh', // Full viewport height
        width: '100%', // Full width
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0, // Remove marginTop to ensure the background starts at the top
        px: { xs: 2, sm: 0 }, // Add padding on mobile for better spacing
      }}
    >
      <Grid
        container
        sx={{
          backgroundImage: `linear-gradient(
            to right,
            rgba(0, 0, 0, 1),
            rgba(0, 0, 0, 0.8),
            rgba(0, 0, 0, 0.6),
            rgba(0, 0, 0, 0)
          ), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          maxWidth: { xs: '100%', sm: '90%', md: '1200px' }, // Responsive width
          width: '100%',
          borderRadius: { xs: '10px', sm: '15px' }, // Smaller radius on mobile
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
          bgcolor: 'transparent',
          minHeight: { xs: 'auto', sm: '60vh' }, // Moved minHeight here to apply to content area
        }}
      >
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            p: { xs: 2, sm: 3, md: 5 }, // Responsive padding
            pl: { xs: 3, sm: 5, md: 7 }, // Adjust left padding for smaller screens
            color: 'white',
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              lineHeight: 1.2,
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' }, // Responsive font size
            }}
          >
            Connex Partner Portal: Your Gateway to Innovation
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' }, // Responsive font size
              lineHeight: 1.6,
              mb: { xs: 3, md: 4 }, // Adjust margin for smaller screens
            }}
          >
            Welcome to the Connex Partner Portal— a powerful hub designed to help your business thrive in today’s digital-first world. Our platform connects you with the tools, insights, and opportunities you need to outpace your competition and drive meaningful growth.
            <br />
            <br />
            Whether you’re looking to scale new solutions, collaborate with industry leaders, or gain strategic insights, your path to success begins here.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' }, // Stack buttons on mobile
              gap: { xs: 1.5, sm: 2 }, // Adjust gap for smaller screens
              alignItems: { xs: 'stretch', sm: 'center' }, // Stretch buttons on mobile
            }}
          >
            <Button
              variant="contained"
              href="https://partneradminportal.connexit.biz/become_a_partner"
              target="_blank"
              sx={{
                bgcolor: '#1976d2',
                color: 'white',
                fontWeight: 'bold',
                textTransform: 'none',
                px: { xs: 2, sm: 3 }, // Responsive padding
                py: { xs: 0.75, sm: 1 },
                fontSize: { xs: '0.875rem', sm: '1rem' }, // Responsive font size
                '&:hover': {
                  bgcolor: '#1565c0',
                },
              }}
            >
              Join Now
            </Button>
            <Button
              variant="outlined"
              href="https://partneradminportal.connexit.biz/"
              target="_blank"
              sx={{
                borderColor: 'white',
                color: 'white',
                fontWeight: 'bold',
                textTransform: 'none',
                px: { xs: 2, sm: 3 },
                py: { xs: 0.75, sm: 1 },
                fontSize: { xs: '0.875rem', sm: '1rem' },
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'white',
                },
              }}
            >
              Sign In
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={5} />
      </Grid>
    </Box>
  );
}

export default Portal1;