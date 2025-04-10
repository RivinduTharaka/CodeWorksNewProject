

// src/components/ResourceCard.jsx
import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  CardMedia, 
  Button,
  CardActions,
} from '@mui/material';

const ResourceCard = ({ category, title, image, actionText }) => {
  return (
    <Card 
      sx={{ 
        width: '100%',
        maxWidth: 340,
        borderRadius: 3,
        boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
        },
        overflow: 'hidden',
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={image}
        alt={title}
        sx={{
          objectFit: 'cover',
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
      />
      <CardContent sx={{ p: 3 }}>
        <Typography 
          variant="caption" 
          sx={{ 
            color: '#1976d2',
            fontWeight: 500,
            letterSpacing: 0.5,
          }}
        >
          {category}
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            mt: 1,
            mb: 2,
            fontWeight: 600,
            lineHeight: 1.3,
            color: '#333',
          }}
        >
          {title}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 3, pt: 0 }}>
        <Button 
          variant="contained" 
          color="primary"
          sx={{
            borderRadius: 20,
            textTransform: 'none',
            px: 3,
            py: 1,
            fontWeight: 500,
            '&:hover': {
              bgcolor: '#1565c0',
            },
          }}
        >
          {actionText}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ResourceCard;