import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';

function Aboutsec2() {
  return (
    <Box sx={{ py: 10, px: 3 }}>
      <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        
        {/* Left Section - Creative Text */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: 'bold',
              lineHeight: 1.2,
              textAlign: { xs: 'center', md: 'center' },
              background: 'linear-gradient(90deg, #1a9fd9, #24b24c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textTransform: 'uppercase',
            }}
          >
            Unified <br />
            Digital <br />
            Future
          </Typography>
        </Box>

        {/* Right Section - Content & Button */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            sx={{
              color: 'black',
              mb: 2,
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            Our innovative approach integrates global reach with local expertise, enabling seamless digital transformation. We empower businesses with cutting-edge solutions designed for growth.
          </Typography>

          <Button
            variant="outlined"
            sx={{
              borderColor: '#24b24c',
              color: '#24b24c',
              fontWeight: 'bold',
              px: 3,
              py: 1.5,
              display: 'block',
              mx: { xs: 'auto', md: '0' },
              '&:hover': {
                // borderColor: 'rgb(0, 195, 255)',
              },
            }}
          >
           CONNEX GLOBAL
          </Button>
        </Box>

      </Container>
    </Box>
  );
}

export default Aboutsec2;
