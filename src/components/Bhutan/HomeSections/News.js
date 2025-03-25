import React from 'react';
import { Box, Typography, Container, Grid, Button } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

// Import Material-UI Icons
import { ArrowForward } from '@mui/icons-material';

// Import Images
import img1 from '../../../assets/image/n1 (1).jpeg';
import img2 from '../../../assets/image/n1 (2).jpeg';
import img3 from '../../../assets/image/n1 (3).jpeg';

// Scroll Animation Variants
const fadeInVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

// Section Styling
const SectionContainer = styled(Box)({
  backgroundColor: '#f9fafb', // Light background for a premium feel
  padding: '4rem 0',
});

// Section Title (Centered at the Top)
const SectionTitle = styled(Typography)({
  fontSize: '3rem',
  fontWeight: '700',
  color: '#070054',
  textAlign: 'center',
  marginBottom: '1.5rem',
  fontFamily: 'Poppins, sans-serif', // Modern font
});

// Section Subtitle (Description Below Title)
const SectionSubtitle = styled(Typography)({
  fontSize: '1.1rem',
  fontWeight: '400',
  color: '#555',
  maxWidth: '800px',
  lineHeight: '1.6',
  textAlign: 'center',
  margin: '0 auto 3rem auto', // Centered with margin bottom
  fontFamily: 'Open Sans, sans-serif',
});

// Styled News Card (Premium Design)
const NewsCard = styled(motion.div)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  backgroundColor: '#ffffff',
  height: 400,
  maxHeight: 400,
  minHeight: 400,
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.05)',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0px 12px 28px rgba(0, 0, 0, 0.2)',
  },
});

// Card Image Styling
const CardImage = styled(Box)({
  width: '100%',
  height: '200px',
  objectFit: 'cover',
});

// Card Content Styling
const CardContent = styled(Box)({
  padding: '1.5rem',
  textAlign: 'center',
});

// Card Title Styling
const CardTitle = styled(Typography)({
  fontSize: '1rem',
  fontWeight: '600',
  color: '#0D47A1',
  fontFamily: 'Poppins, sans-serif',
  marginBottom: '1rem',
});

// Card Description Styling
const CardDescription = styled(Typography)({
  fontSize: '0.95rem',
  color: '#555',
  lineHeight: '1.6',
  fontFamily: 'Open Sans, sans-serif',
});

// Styled Button (Premium Look)
const MoreNewsButton = styled(Button)({
  backgroundColor: '#ffffff', // White background
  border: '2px solid #006400', // Dark green border
  color: '#006400', // Dark green text
  padding: '0.5rem 2.5rem',
  fontSize: '1.1rem',
  fontWeight: '600',
  textTransform: 'none',
  fontFamily: 'Poppins, sans-serif',
  '&:hover': {
    color: '#004d00', // Darker green text on hover for contrast
  },
});

const NewsSection = () => {
  const navigate = useNavigate(); // Hook for navigation

  // News Data
  const newsData = [
    {
      id: 1,
      image: img1,
      title: 'Innovative Solutions for Modern Businesses',
      description:
        'Discover how our latest technology solutions are transforming businesses and driving growth in the digital age.',
    },
    {
      id: 2,
      image: img2,
      title: 'Global Partnerships and Collaborations',
      description:
        'We are proud to announce new partnerships with global leaders to deliver cutting-edge solutions worldwide.',
    },
    {
      id: 3,
      image: img3,
      title: 'Expanding Our Global Footprint',
      description:
        'With new offices in 14 countries, we are bringing our expertise closer to you than ever before.',
    },
  ];

  // Handler to navigate to /bt/blog
  const handleExploreMoreClick = () => {
    navigate('/bt/blog');
  };

  return (
    <SectionContainer>
      <Container maxWidth="lg">
        {/* Centered Section Title */}
        <motion.div variants={fadeInVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <SectionTitle>At the Forefront</SectionTitle>
        </motion.div>

        {/* Section Subtitle (Description) */}
        <motion.div variants={fadeInVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <SectionSubtitle>
            Stay updated with the newest updates, events, workshops, webinars, and so much more!
          </SectionSubtitle>
        </motion.div>

        <Grid container spacing={4} justifyContent="center">
          {/* News Cards */}
          {newsData.map((news) => (
            <Grid item xs={12} sm={6} md={4} key={news.id}>
              <NewsCard whileHover={{ scale: 1.05 }}>
                <CardImage
                  component="img"
                  src={news.image} // Use the imported image
                  alt={news.title}
                />
                <CardContent>
                  <CardTitle>{news.title}</CardTitle>
                  <CardDescription>{news.description}</CardDescription>
                </CardContent>
              </NewsCard>
            </Grid>
          ))}
        </Grid>

        {/* More News Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <MoreNewsButton
            variant="contained"
            endIcon={<ArrowForward />}
            component={motion.div}
            onClick={handleExploreMoreClick} // Add onClick handler
          >
            Explore More
          </MoreNewsButton>
        </Box>
      </Container>
    </SectionContainer>
  );
};

export default NewsSection;