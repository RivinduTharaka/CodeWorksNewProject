import React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import IMAGE2 from '../../../assets/image/Portal/IMAGE2.png';

function Portal2() {
  return (
    <Box sx={{ backgroundColor: 'white', minHeight: '50vh', py: 4, px: 4 }}>
      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="center"
        maxWidth="lg"
        sx={{ margin: '0 auto' }}
      >
        {/* Left Image */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={IMAGE2} // Ensure the image is in the public folder
            alt="Handshake"
            sx={{
              width: '90%',
              height: '50vh',
              borderRadius: 3,
              boxShadow: 5,
            }}
          />
        </Grid>

        {/* Right Text Content */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h3" fontWeight="bold" color="black" gutterBottom>
            Let's Grow Together — Unlock Your Potential with Connex
          </Typography>
          <Typography variant="body1" color="#3b5778" paragraph>
            Join a thriving community of forward-thinking partners and supercharge your business with Connex. Empower your customers with cutting-edge solutions, backed by one of the most comprehensive ecosystems designed to drive transformation and growth.
          </Typography>
          <Typography variant="body1" color="#3b5778" paragraph>
            Whether you're scaling new innovations or optimizing operations, the Connex Partner Portal provides everything you need to succeed — from powerful resources to personalized support.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#1e90ff',
              textTransform: 'none',
              fontWeight: 'bold',
              mt: 2,
              '&:hover': {
                backgroundColor: '#1c86ee',
              },
            }}
          >
            Explore Now →
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Portal2;
