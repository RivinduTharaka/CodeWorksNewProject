// src/pages/PressDetails.jsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';

const PressDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get media data from location.state
  const media = location.state?.media;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!media) {
    return (
      <Container sx={{ py: 12 }}>
        <Typography variant="h6" align="center" color="error" sx={{ mt: 5 }}>
          Media item not found.
        </Typography>
        <Box display="flex" justifyContent="center" mt={4}>
          <Button variant="contained" onClick={() => navigate('/press-&-media')}>
            Go Back
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 15 }}>
      <Box sx={{ maxWidth: '800px', mx: 'auto', textAlign: 'left' }}>
        {/* Title */}
        <Typography variant="h4" fontWeight="bold">
          {media.title}
        </Typography>

        {/* Date */}
        <Typography variant="subtitle2" sx={{ color: 'gray', mt: 1 }}>
          {new Date(media.posted_date).toLocaleDateString()}
        </Typography>

        {/* Render image using <img> tag */}
        <Box mt={3}>
          <img
            src={media.image}
            alt={media.title}
            style={{
              width: '100%',
              maxHeight: 400,
              objectFit: 'cover',
              borderRadius: 8,
            }}
          />
        </Box>

        {/* Content */}
        <Typography variant="body1" sx={{ mt: 3, lineHeight: 1.8 }}>
          {media.long_description}
        </Typography>

        {/* Back Button */}
        <Box mt={5}>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            ← Back to Press & Media
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PressDetails;
