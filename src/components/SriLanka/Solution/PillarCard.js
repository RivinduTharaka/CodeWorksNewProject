import React from 'react';
import { Card, CardContent, CardMedia, Typography, Fade } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowForward, Star } from '@mui/icons-material';

// Styled component for the card with consistent border radius
const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  cursor: 'pointer',
  borderRadius: '16px', // Uniform border radius for all corners
  overflow: 'hidden', // Ensures content respects the border radius
  height: '400px', // Fixed height
  transition: 'all 0.3s ease-in-out',
  border: '1px solid #e0e0e0',
  background: 'linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)', // Subtle gradient
  boxShadow: 'none', // Explicitly no box shadow
  '&:hover': {
    transform: 'scale(1.015)', // Slightly subtler scale effect
    borderColor: '#05306b', // Border color change on hover
  },
  '&:hover .icon': {
    transform: 'translateX(8px)', // Icon animation
  },
}));

// Styled component for the animated icon
const AnimatedIcon = styled(ArrowForward)(({ theme }) => ({
  transition: 'transform 0.3s ease-in-out',
  color: theme.palette.primary.main,
}));

const PillarCard = ({ image, title, description, onClick }) => {
  return (
    <StyledCard onClick={onClick}>
      {/* Image at the top */}
      <CardMedia
        component="img"
        sx={{
          width: '100%',
          height: '50%', // Takes half the card height
          objectFit: 'cover',
          borderTopLeftRadius: '16px', // Matches card radius
          borderTopRightRadius: '16px',
        }}
        image={image}
        alt={title}
      />

      {/* Content below the image */}
      <CardContent
        sx={{
          p: 2.5, // Slightly more padding for a premium feel
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '50%', // Remaining space for content
          background: 'transparent', // Ensure no background conflict
        }}
      >
        {/* Title with Star icon */}
        <Fade in timeout={500}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 'bold',
              color: '#333',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Star sx={{ color: '#f5c518', fontSize: '1.2rem' }} />
            {title}
          </Typography>
        </Fade>

        {/* Description */}
        <Fade in timeout={700}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 1.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2, // Limit to 2 lines
              WebkitBoxOrient: 'vertical',
            }}
          >
            {description}
          </Typography>
        </Fade>

        {/* Animated Arrow Icon with container */}
        <Fade in timeout={900}>
          <Typography
            variant="body2"
            sx={{
              mt: 1.5,
              display: 'flex',
              alignItems: 'center',
              color: 'primary.main',
              fontWeight: 'medium',
              bgcolor: 'rgba(0, 0, 0, 0.03)', // Subtle background for contrast
              borderRadius: '12px',
              px: 1.5,
              py: 0.5,
              width: 'fit-content',
            }}
          >
            Learn More
            <AnimatedIcon className="icon" sx={{ ml: 1, fontSize: '1.2rem' }} />
          </Typography>
        </Fade>
      </CardContent>
    </StyledCard>
  );
};

export default PillarCard;