import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, Typography, Container, Grid, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import { color, motion } from 'framer-motion';
import { ArrowForward } from '@mui/icons-material';
import { selectData } from '../../../services/dataService';
import API_URL from '../../../flieapi';
import { useNavigate } from 'react-router-dom';

// In-memory cache for images and API responses
const imageCache = new Map();
const apiCache = new Map();

// Helper function to construct the full URL for images
const constructImageUrl = (filePath) => {
  if (!filePath) return 'https://via.placeholder.com/380x250?text=No+Image';
  const baseUrl = `${API_URL}`;
  const cleanedFilePath = filePath.replace(/^\/+/, "");
  return `${baseUrl}/${cleanedFilePath}`;
};

// Helper function to fetch image with caching
const fetchImage = async (filePath) => {
  const imageUrl = constructImageUrl(filePath);

  if (imageCache.has(imageUrl)) {
    return imageCache.get(imageUrl);
  }

  try {
    const response = await fetch(imageUrl);
    if (response.ok) {
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      imageCache.set(imageUrl, objectUrl);
      return objectUrl;
    }
    return 'https://via.placeholder.com/380x250?text=Image+Not+Found';
  } catch (error) {
    console.error("Error fetching image:", error);
    return 'https://via.placeholder.com/380x250?text=Image+Not+Found';
  }
};

// Scroll Animation Variants
const fadeInVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

// Section Styling
const SectionContainer = styled(Box)({
  backgroundColor: '#f9fafb',
  padding: '4rem 0',
});

const SectionTitle = styled(Typography)({
  fontSize: '3rem',
  fontWeight: '700',
  color: '#070054',
  textAlign: 'center',
  marginBottom: '1.5rem',
  fontFamily: 'Poppins, sans-serif',
});

const SectionSubtitle = styled(Typography)({
  fontSize: '1.1rem',
  fontWeight: '400',
  color: '#555',
  maxWidth: '800px',
  lineHeight: '1.6',
  textAlign: 'center',
  margin: '0 auto 3rem auto',
  fontFamily: 'Open Sans, sans-serif',
});

const NewsCard = styled(motion.div)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%', // Fixed width
  height: '400px', // Fixed height
  backgroundColor: '#ffffff',
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

const CardImage = styled(Box)({
  width: '100%', // Fixed width matching card
  height: '200px', // Fixed height
  objectFit: 'cover', // Ensures image scales properly
  flexShrink: 0, // Prevents image from shrinking
});

const CardContent = styled(Box)({
  padding: '1.5rem',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const CardTitle = styled(Typography)({
  fontSize: '1rem',
  fontWeight: '600',
  color: '#0D47A1',
  fontFamily: 'Poppins, sans-serif',
  marginBottom: '1rem',
});

const CardDescription = styled(Typography)({
  fontSize: '0.95rem',
  color: '#555',
  lineHeight: '1.6',
  fontFamily: 'Open Sans, sans-serif',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const MoreNewsButton = styled(Button)({
  backgroundColor: '#ffffff',
  border: '2px solid #006400',
  color: '#006400',
  padding: '0.5rem 2.5rem',
  fontSize: '1.1rem',
  fontWeight: '600',
  textTransform: 'none',
  fontFamily: 'Poppins, sans-serif',
  '&:hover': {
  color: '#ffffff',
  backgroundColor: '#006400',

  },
});

const NewsSection = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    const cacheKey = 'events_country_3_top_3';

    if (apiCache.has(cacheKey)) {
      const cachedData = apiCache.get(cacheKey);
      setNewsData(cachedData);
      setLoading(false);
      return;
    }

    try {
      const eventCountriesResponse = await selectData('event_countries', { 
        country_id: 3, 
        is_active: true 
      });

      if (!eventCountriesResponse.data || eventCountriesResponse.data.length === 0) {
        setNewsData([]);
        setLoading(false);
        return;
      }

      const eventIds = eventCountriesResponse.data
        .map(entry => entry.event_id)
        .slice(0, 3);

      const eventsResponse = await selectData('events', { 
        id: eventIds, 
        is_active: true 
      });

      if (!eventsResponse.data || eventsResponse.data.length === 0) {
        setNewsData([]);
        setLoading(false);
        return;
      }

      const formattedEvents = await Promise.all(
        eventsResponse.data.slice(0, 3).map(async (event) => {
          const imageUrl = await fetchImage(event.image);
          // Truncate description to 100 characters
          const truncatedDescription = event.description.length > 183 
            ? `${event.description.substring(0, 180)}...` 
            : event.description;
          return {
            id: event.id,
            title: event.title,
            description: truncatedDescription,
            image: imageUrl,
          };
        })
      );

      apiCache.set(cacheKey, formattedEvents);
      setNewsData(formattedEvents);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      setNewsData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const newsCards = useMemo(() => {
    return newsData.slice(0, 3).map((news) => (
      <Grid item xs={12} sm={6} md={4} key={news.id}>
        <NewsCard whileHover={{ scale: 1.05 }}>
          <CardImage
            component="img"
            src={news.image}
            alt={news.title}
            loading="lazy"
          />
          <CardContent>
            <CardTitle>{news.title}</CardTitle>
            <CardDescription>{news.description}</CardDescription>
          </CardContent>
        </NewsCard>
      </Grid>
    ));
  }, [newsData]);

  const handleExploreMore = () => {
    navigate('/events'); // Navigate to the events page
  };

  return (
    <SectionContainer>
      <Container maxWidth="lg">
        <motion.div variants={fadeInVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <SectionTitle>At the Forefront</SectionTitle>
        </motion.div>

        <motion.div variants={fadeInVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <SectionSubtitle>
            Stay updated with the newest updates, events, workshops, webinars, and so much more!
          </SectionSubtitle>
        </motion.div>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress />
          </Box>
        ) : newsData.length === 0 ? (
          <Typography variant="h6" align="center" color="textSecondary">
            No events available for this country.
          </Typography>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {newsCards}
          </Grid>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <MoreNewsButton
            variant="contained"
            endIcon={<ArrowForward />}
            component={motion.div}
            onClick={handleExploreMore}
          >
            Explore More News
          </MoreNewsButton>
        </Box>
      </Container>
    </SectionContainer>
  );
};

export default NewsSection;