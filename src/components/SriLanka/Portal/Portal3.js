import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';

function Portal3() {
  return (
    <Box
      sx={{
        backgroundColor: '#0a1a2f', // Dark blue background for the entire section
        minHeight: { xs: 'auto', sm: '60vh' }, // Adjust height for mobile
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 4, sm: 6, md: 8 }, // Vertical padding
        px: { xs: 2, sm: 0 }, // Horizontal padding on mobile
      }}
    >
      <Box
        sx={{
          maxWidth: { xs: '100%', sm: '90%', md: '1200px' }, // Responsive width
          width: '100%',
          textAlign: 'center',
          color: 'white',
          backgroundColor: 'rgba(255, 255, 255, 0.05)', // Semi-transparent card background
          borderRadius: { xs: '10px', sm: '15px' }, // Rounded corners for card effect
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)', // Subtle shadow for card effect
          p: { xs: 3, sm: 4, md: 6 }, // Padding inside the card
        }}
      >
        {/* Heading */}
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, // Responsive font size
            color: '#1976d2', // Blue color for "Get Started"
          }}
        >
          Get Started
        </Typography>

        {/* Subheading */}
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
            lineHeight: 1.6,
            mb: { xs: 4, sm: 6 }, // Margin below subheading
            color: 'rgba(255, 255, 255, 0.8)', // Slightly lighter white for contrast
          }}
        >
          Join the AI Cloud Partner Program to tap into platforms, products, and offerings built for your business. Enroll to become a partner in just three steps.
        </Typography>

        {/* Steps Grid */}
        <Grid container spacing={3} justifyContent="center">
          {/* Step 1: Create an account */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slightly darker than the card background
                borderRadius: '10px',
                p: { xs: 2, sm: 3 }, // Responsive padding
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}
            >
              <Typography
                variant="h6"
                component="h3"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                }}
              >
                Create an account
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  lineHeight: 1.6,
                  color: 'rgba(255, 255, 255, 0.7)', // Lighter text for description
                }}
              >
                Start by creating your free account and providing some basic information about your business and its goals. Take the first step to access the Connex ecosystem.
              </Typography>
            </Box>
          </Grid>

          {/* Step 2: Confirm your company’s details */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                p: { xs: 2, sm: 3 },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}
            >
              <Typography
                variant="h6"
                component="h3"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                }}
              >
                Confirm your company’s details
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  lineHeight: 1.6,
                  color: 'rgba(255, 255, 255, 0.7)',
                }}
              >
                Next, you’ll be asked to verify your business details, including organization’s address and legal contacts.
              </Typography>
            </Box>
          </Grid>

          {/* Step 3: Validate your credentials */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                p: { xs: 2, sm: 3 },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}
            >
              <Typography
                variant="h6"
                component="h3"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                }}
              >
                Validate your credentials
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  lineHeight: 1.6,
                  color: 'rgba(255, 255, 255, 0.7)',
                }}
              >
                After verification, you’ll receive a confirmation email with steps to validate your credentials and finalize your membership in the Connex Partner Program.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Get Started Button */}
        <Box sx={{ mt: { xs: 4, sm: 6 } }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#1976d2',
              color: 'white',
              fontWeight: 'bold',
              textTransform: 'none',
              px: { xs: 3, sm: 4 },
              py: { xs: 1, sm: 1.5 },
              fontSize: { xs: '0.875rem', sm: '1rem' },
              borderRadius: '5px',
              '&:hover': {
                bgcolor: '#1565c0',
              },
            }}
          >
            Get Started
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Portal3;