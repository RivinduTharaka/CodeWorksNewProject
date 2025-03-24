import React from 'react';
import { Box, Typography, Container } from '@mui/material';

function WhyUs2() {
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
            The   <br />
            Unrivaled <br />
            Choice
          </Typography>
        </Box>

        {/* Right Section - Content */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 'bold',
              color: 'black',
              mb: 2,
              textAlign: { xs: 'center', md: 'left' },
              textTransform: 'uppercase',
              lineHeight: 1.2,
            }}
          >
            Why us? We’re one of a kind. <br />
            Unique. Original. A global <br />
            IT specialist.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'black',
              mb: 2,
              textAlign: { xs: 'center', md: 'left' },
              lineHeight: 1.6,
            }}
          >
            Our difference goes deeper than ‘what we do’. It’s an attitude. A way of life. A relentless quest for growth, innovation and disruption. We always dare to be distinctive.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'black',
              textAlign: { xs: 'center', md: 'left' },
              lineHeight: 1.6,
            }}
          >
           We’re your steadfast partner in digital transformation and cybersecurity. The only technology distribution expert bold enough to rewrite the playbook: blending worldwide reach with localized mastery to deliver groundbreaking value. With us, you’re not just choosing a service—you’re choosing a revolution. </Typography>
        </Box>

      </Container>
    </Box>
  );
}

export default WhyUs2;