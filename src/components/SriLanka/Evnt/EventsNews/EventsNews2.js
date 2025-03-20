import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { styled } from '@mui/system'; // Ensure this is imported
import { ThemeProvider, createTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Import images
import zeroTrustImage from '../../../../assets/image/Dilshan_Silva.jpg';
import fortinetEventImage from '../../../../assets/image/Shamal.jpg';
import fortinetEventImage1 from '../../../../assets/image/aboutsec3.jpg';
import fortinetEventImage2 from '../../../../assets/image/p7.jpg';
import arrowImage from '../../../../assets/image/down-arrow.png';

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
  padding: '100px 0 60px',
  textAlign: 'center',
});

const Title = styled(Typography)({
  fontSize: '2.5rem',
  fontWeight: 600,
  background: "linear-gradient(135deg, rgb(1, 87, 38), #070054)",
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  marginBottom: '1rem',
});

const Subtitle = styled(Typography)({
  fontSize: '1.2rem',
  background: "linear-gradient(135deg, rgb(1, 87, 38), #070054)",
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  maxWidth: '800px',
  margin: '0 auto 2rem',
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      const mockData = [
        {
          id: 1,
          title: "Zero Trust Webinar by Connex Experts",
          image: zeroTrustImage,
          date: "Ongoing",
          time: "On Demand",
          mode: "Online",
          remainingSeats: "Unlimited",
          description: "ON DEMAND Ransomware, Malware, Zero Trust, Endpoint protection – Discover secure solutions through engaging talks, but in English only [...]",
        },
        {
          id: 2,
          title: "Unlock New Revenue Streams with Fortinet",
          image: fortinetEventImage,
          date: "Ongoing",
          time: "On Demand",
          mode: "Online",
          remainingSeats: "Unlimited",
          description: "Fortinet’s security fabric solutions are proven to expand market opportunities [...]",
        },
        {
          id: 3,
          title: "Unlock New Revenue Streams with Fortinet",
          image: fortinetEventImage1,
          date: "Ongoing",
          time: "On Demand",
          mode: "Online",
          remainingSeats: "Unlimited",
          description: "Fortinet’s security fabric solutions are proven to expand market opportunities [...]",
        },
        {
          id: 4,
          title: "Unlock New Revenue Streams with Fortinet",
          image: fortinetEventImage2,
          date: "Ongoing",
          time: "On Demand",
          mode: "Online",
          remainingSeats: "Unlimited",
          description: "Fortinet’s security fabric solutions are proven to expand market opportunities [...]",
        },
      ];
      setEvents(mockData);
    };
    fetchEvents();
  }, []);

  const handleRegisterClick = (event) => {
    navigate(`/events/register/${event.id}`, { state: { event } });
  };

  return (
    <ThemeProvider theme={theme}>
      <HeroSection>
        <Container maxWidth="lg">
          <Title variant="h1">Events at Connex Information Technologies</Title>
          <Subtitle variant="h2">
            Unmissable events with unforgettable experiences – join us to connect, innovate, and grow with industry pioneers.
          </Subtitle>
          <CustomButton>
            Reserve Your Spot
            <ArrowImage src={arrowImage} alt="Scroll down arrow" />
          </CustomButton>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4} justifyContent="center">
          {events.length > 0 ? (
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
                      <Box sx={{ /* Overlay styles unchanged */ }}></Box>
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
              Loading events...
            </Typography>
          )}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default EventsNews2;