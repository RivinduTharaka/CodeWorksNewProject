import React from 'react';
import { Box, Typography } from '@mui/material'; // Import MUI components
import { useEffect } from 'react'; // Import the useEffect hook


function Portal() {
      useEffect(() => {
          window.scrollTo(0, 0); // Scroll to top when the component mounts
        }, []);


  return (
    <Box sx={{ backgroundColor: '#132742', minHeight: '100vh' }}>
   
      <Box
        sx={{
          backgroundColor: '#0a1a2f',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: '7%',
        
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h1"
          component="p"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '2rem', sm: '3rem', md: '60px' },
          }}
        >
          <span style={{ color: 'rgb(103, 173, 211)' }}>To be launch</span>
          <span style={{ color: 'green' }}> Soon</span>
        </Typography>
      </Box>
  
    </Box>
  );
}

export default Portal;