import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';

// Reuse the same theme
const theme = createTheme({
  palette: {
    primary: { main: '#1565C0', light: '#64B5F6', dark: '#0D47A1' },
    text: { primary: '#333', secondary: '#555' },
  },
  typography: { fontFamily: "'Poppins', sans-serif" },
});

function RegisterEvent() {
  const { id } = useParams(); // Get event ID from URL
  const location = useLocation(); // Get state data from navigation
  const event = location.state?.event; // Retrieve event data

  if (!event) {
    return (
      <Container sx={{ py: 12 }}>
        <Typography variant="h6" sx={{ textAlign: "center", mt: 5 }}>
          Event not found.
        </Typography>
      </Container>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ py: 15 }}>
        <Box sx={{ maxWidth: "800px", mx: "auto", textAlign: "left" }}>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
            Register for: {event.title}
          </Typography>
          <Box
            sx={{
              mt: 2,
              height: "400px",
              backgroundImage: `url(${event.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "10px",
            }}
          ></Box>
          <Typography variant="body1" sx={{ mt: 3, lineHeight: 1.8 }}>
            {event.description}
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary }}>
              Date: {event.date}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary }}>
              Time: {event.time}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary }}>
              Mode: {event.mode}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary }}>
              Remaining Seats: {event.remainingSeats}
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{
              mt: 4,
              backgroundColor: '#102166',
              color: '#fff',
              '&:hover': { backgroundColor: '#24398f' },
            }}
            onClick={() => alert('Registration submitted!')} // Placeholder action
          >
            Submit Registration
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default RegisterEvent;