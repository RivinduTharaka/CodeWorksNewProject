import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Container, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { styled } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { selectData } from '../../../../services/dataService'; // Assuming this is your API service
import API_URL from '../../../../flieapi'; // Base API URL for image fetching
import arrowImage from '../../../../assets/image/down-arrow.png';
import AutoLogin from '../../../../services/AutoLogin';

// In-memory cache for images and API data
const imageCache = new Map();
const apiCache = new Map();

// Construct full image URL
const constructImageUrl = (filePath) => {
  if (!filePath) return 'https://via.placeholder.com/300x200?text=No+Image';
  const cleanedFilePath = filePath.replace(/^\/+/, '');
  return `${API_URL}/${cleanedFilePath}`;
};

// Fetch image with caching
const fetchImage = async (filePath) => {
  const imageUrl = constructImageUrl(filePath);
  if (imageCache.has(imageUrl)) return imageCache.get(imageUrl);

  try {
    const response = await fetch(imageUrl);
    if (response.ok) {
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      imageCache.set(imageUrl, objectUrl);
      return objectUrl;
    } else {
      return 'https://via.placeholder.com/300x200?text=Image+Not+Found';
    }
  } catch {
    return 'https://via.placeholder.com/300x200?text=Image+Not+Found';
  }
};

// Theme setup
const theme = createTheme({
  palette: {
    primary: { main: '#1565C0', light: '#64B5F6', dark: '#0D47A1' },
    text: { primary: '#333', secondary: '#555' },
  },
  typography: { fontFamily: "'Poppins', sans-serif" },
});

// Styled Components
const HeroSection = styled(Box)({
  backgroundColor: '#f5f7fa',
  padding: '50px ',
  textAlign: 'center',
});



const CustomButton = styled(Button)({
  backgroundColor: "#102166",
  color: '#ffffff',
  fontSize: '1rem',
  fontWeight: 500,
  textTransform: 'none',
  borderRadius: '20px',
  padding: '0.6rem 2rem',
  fontFamily: "'Poppins', sans-serif",
  alignItems: 'center',
  gap: '0.5rem',
  '&:hover': {
    backgroundColor: "#24398f",
  },
});

const ArrowImage = styled('img')({
  width: '20px',
  height: '20px',
  objectFit: 'contain',
});

const EventCard = styled(Card)({
  width: { xs: '100%', sm: 345 },
  height: 550,
  display: "flex",
  flexDirection: "column",
  position: "relative",
  maxHeight: 550,
  maxWidth: { xs: '100%', sm: 345 },
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    // transform: 'scale(1.03)',
    // boxShadow: '0 8px 20px rgba(5, 43, 85, 0.2)',
  },
});

const EventMedia = styled(CardMedia)({
  height: 260,
  objectFit: 'cover',
});

const EventTitle = styled(Typography)({
  fontSize: '1.25rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
});

const EventDetails = styled(Typography)({
  fontSize: '0.9rem',
  marginBottom: '0.3rem',
});

const EventDescription = styled(Typography)({
  fontSize: '0.9rem',
  color: theme.palette.text.secondary,
  marginBottom: '0.5rem',
});

const RegisterButton = styled(Button)({
  color: 'white',
  fontSize: '0.9rem',
  fontWeight: 500,
  textTransform: 'none',
  fontFamily: "'Poppins', sans-serif",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  position: 'absolute',
  bottom: '14px',
  right: '14px',
  backgroundColor: 'rgba(7, 0, 84, 0.8)',
  transition: 'color 0.3s ease, background-color 0.3s ease',
  '&:hover': {
    color: 'rgba(7, 0, 84, 0.8)',
    backgroundColor: 'white',
  },
});

// Utility function
const truncateDescription = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '[...]';
};

// Motion Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Main Component
function EventsNews2() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading status
  const navigate = useNavigate();

  // Fetch events from the database for country_id = 3
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    const cacheKey = 'events_country_3'; // Cache key for country-specific data

    // Check if data is already in cache
    if (apiCache.has(cacheKey)) {
      setEvents(apiCache.get(cacheKey));
      setLoading(false);
      return;
    }

    try {
      // Step 1: Fetch event_ids from event_countries where country_id = 3 and is_active = true
      const eventCountriesResponse = await selectData('event_countries', {
        country_id: 3,
        is_active: true,
      });

      if (!eventCountriesResponse.data?.length) {
        setEvents([]);
        setLoading(false);
        return;
      }

      // Step 2: Extract event_ids
      const eventIds = eventCountriesResponse.data.map((entry) => entry.event_id);

      // Step 3: Fetch events from the events table where id is in eventIds and is_active = true
      const eventsResponse = await selectData('events', {
        id: eventIds, // Filter events by the list of event_ids
        is_active: true,
      });

      if (!eventsResponse.data?.length) {
        setEvents([]);
        setLoading(false);
        return;
      }

      // Step 4: Format the events and fetch their images
      const formattedEvents = await Promise.all(
        eventsResponse.data.map(async (event) => ({
          id: event.id,
          title: event.title || 'Untitled Event',
          image: await fetchImage(event.image), // Fetch image with caching
          date: event.date || 'N/A',
          time: event.time || 'N/A',
          mode: event.mode || 'N/A',
          remainingSeats: event.remaining_seats || 'N/A',
          description: event.description || 'No description available',
        }))
      );

      // Cache the result and update state
      apiCache.set(cacheKey, formattedEvents);
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleRegisterClick = (event) => {
    navigate(`/events/register/${event.id}`, { state: { event } });
  };

  return (
    <ThemeProvider theme={theme}>
      <AutoLogin /> {/* Auto-login component */}
      <HeroSection>
        <Container maxWidth="lg">
    
          <CustomButton>
            Reserve Your Spot
            <ArrowImage src={arrowImage} alt="Scroll down arrow" />
          </CustomButton>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4} justifyContent="center">
          {loading ? (
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
              Loading events...
            </Typography>
          ) : events.length > 0 ? (
            events.map((event, index) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                  transition={{ delay: index * 0.2 }}
                >
                  <EventCard>
                    <Box sx={{ position: "relative" }}>
                      <EventMedia component="img" image={event.image} alt={event.title} />
                    </Box>
                    <CardContent sx={{ flexGrow: 1, backgroundColor: '#f5f7fa', position: 'relative', p: 2 }}>
                      <EventTitle>{event.title}</EventTitle>
                      <EventDescription>{truncateDescription(event.description, 100)}</EventDescription>
                      <Box>
                        <EventDetails sx={{ color: theme.palette.text.secondary }}>Date: {event.date}</EventDetails>
                        <EventDetails sx={{ color: theme.palette.text.secondary }}>Time: {event.time}</EventDetails>
                        <EventDetails sx={{ color: theme.palette.text.secondary }}>Mode: {event.mode}</EventDetails>
                        <EventDetails sx={{ color: theme.palette.text.secondary }}>Seats: {event.remainingSeats}</EventDetails>
                      </Box>
                      <RegisterButton onClick={() => handleRegisterClick(event)}>
                        Register to Attend →
                      </RegisterButton>
                    </CardContent>
                  </EventCard>
                </motion.div>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
              No events available for this country.
            </Typography>
          )}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default EventsNews2;