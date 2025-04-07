import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import lifecycleImage from '../../../assets/image/Layer1.png'; // Replace with the actual path to your image

function Services3() {
  return (
    <Box sx={{ 
      // padding: '40px', 
      backgroundColor: '#f5f5f5', 
      minHeight: '20vh',
      display: 'flex',          // Added to center content
      justifyContent: 'center', // Centers horizontally
      alignItems: 'center'      // Centers vertically
    }}>
      {/* Main Grid Layout */}
      <Grid container spacing={4} justifyContent="center">
        {/* Left Side: Image and Title */}
        <Grid item xs={12} md={8}>
          {/* Title */}
          <Typography
            variant="h3"
            sx={{
              color: '#d81b60', // Pink color from the image
              fontWeight: 'bold',
              marginBottom: '20px',
              textAlign: 'center',  // Keeps text centered within its container
            }}
          >
            Delivering Exceptional Value Throughout the Partners’ Lifecycle 
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Services3;