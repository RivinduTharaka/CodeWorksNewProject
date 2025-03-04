import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2'; // Ensure this import works after installation

// Reuse the same theme with premium adjustments
const theme = createTheme({
  palette: {
    primary: { main: '#1A237E', light: '#3F51B5', dark: '#0D1B2A' },
    secondary: { main: '#FFD700', light: '#FFEA00', dark: '#D4AF37' },
    text: { primary: '#1A1A1A', secondary: '#4A4A4A' },
    background: { default: '#F5F6FA', paper: '#FFFFFF' },
  },
  typography: {
    fontFamily: "'Montserrat', 'Poppins', sans-serif",
    h4: {
      fontWeight: 700,
      letterSpacing: '0.5px',
    },
    body1: {
      letterSpacing: '0.3px',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            '&:hover fieldset': {
              borderColor: 'black',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'black',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 24px',
        },
      },
    },
  },
});

function RegisterEvent() {
  const { id } = useParams();
  const location = useLocation();
  const event = location.state?.event;

  const [formData, setFormData] = useState({
    title: '',
    name: '',
    designation: '',
    companyName: '',
    email: '',
    contactNumber: '',
    province: '',
    city: '',
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if seats are available
    if (event.remainingSeats === "0" || event.remainingSeats === "Unlimited") {
      if (event.remainingSeats !== "Unlimited") {
        Swal.fire({
          icon: "error",
          title: "No Seats are currently available",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
    }

    // Show loading alert
    Swal.fire({
      icon: 'info',
      title: 'Submitting...',
      text: 'Please wait while your registration is being processed.',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      // Simulate API call (replace with actual API call to your database)
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate success (80% chance) or failure (20% chance)
          const isSuccess = Math.random() > 0.2;
          if (isSuccess) {
            resolve({ success: true });
          } else {
            reject(new Error('Submission failed'));
          }
        }, 2000); // Simulate 2-second delay
      });

      // Close the loading alert
      Swal.close();

      // Show success alert
      if (response.success) {
        Swal.fire({
          title: "Submitted Successfully!",
          icon: "success",
          draggable: true,
        });

        // Reset form after successful submission
        setFormData({
          title: '',
          name: '',
          designation: '',
          companyName: '',
          email: '',
          contactNumber: '',
          province: '',
          city: '',
        });
      }
    } catch (error) {
      // Close the loading alert
      Swal.close();

      // Show failure alert
      alert('Failed to submit the form.');
    }
  };

  if (!event) {
    return (
      <Container sx={{ py: 12 }}>
        <Typography variant="h6" sx={{ textAlign: "center", mt: 5, color: theme.palette.text.secondary }}>
          Event not found.
        </Typography>
      </Container>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ py: 15, background: 'linear-gradient(180deg, #F5F6FA 0%, #FFFFFF 100%)' }}>
        <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: 6,
                textAlign: "center",
                background: "linear-gradient(90deg, #1A237E, rgb(2, 61, 26))",
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
              }}
            >
              Register for: {event.title}
            </Typography>
          </motion.div>

          <Grid container spacing={5}>
            {/* Left Side: Event Image and Details */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Box
                  sx={{
                    height: {
                      xs: '200px',
                      sm: '250px',
                      md: '350px',
                    },
                    width: '100%',
                    backgroundImage: `url(${event.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "12px",
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0, 0, 0, 0.1)',
                      borderRadius: '12px',
                    },
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    mt: 4,
                    lineHeight: 1.8,
                    color: theme.palette.text.primary,
                    fontSize: '1.1rem',
                  }}
                >
                  {event.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: theme.palette.text.secondary, mb: 1 }}
                  >
                    <strong>Date:</strong> {event.date}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: theme.palette.text.secondary, mb: 1 }}
                  >
                    <strong>Time:</strong> {event.time}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: theme.palette.text.secondary, mb: 1 }}
                  >
                    <strong>Mode:</strong> {event.mode}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: theme.palette.text.secondary, mb: 1 }}
                  >
                    <strong>Remaining Seats:</strong> {event.remainingSeats}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>

            {/* Right Side: Registration Form */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    p: 4,
                    borderRadius: '12px',
                    background: 'linear-gradient(145deg, #FFFFFF, #E8ECEF)',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1,
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      textAlign: 'center',
                    }}
                  >
                    Registration Details
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel sx={{ fontWeight: 500 }}>Title</InputLabel>
                        <Select
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          label="Title"
                          required
                        >
                          <MenuItem value="Mr">Mr</MenuItem>
                          <MenuItem value="Ms">Ms</MenuItem>
                          <MenuItem value="Mrs">Mrs</MenuItem>
                          <MenuItem value="Dr">Dr</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                        InputLabelProps={{ style: { fontWeight: 500 } }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Designation"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        placeholder="Enter your designation"
                        required
                        InputLabelProps={{ style: { fontWeight: 500 } }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Company Name"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Enter your company name"
                        required
                        InputLabelProps={{ style: { fontWeight: 500 } }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        InputLabelProps={{ style: { fontWeight: 500 } }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Contact Number"
                        name="contactNumber"
                        type="tel"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        placeholder="Enter your contact number"
                        required
                        InputLabelProps={{ style: { fontWeight: 500 } }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel sx={{ fontWeight: 500 }}>Province</InputLabel>
                        <Select
                          name="province"
                          value={formData.province}
                          onChange={handleChange}
                          label="Province"
                          required
                        >
                          <MenuItem value="Western">Western</MenuItem>
                          <MenuItem value="Central">Central</MenuItem>
                          <MenuItem value="Southern">Southern</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter your city"
                        required
                        InputLabelProps={{ style: { fontWeight: 500 } }}
                      />
                    </Grid>
                  </Grid>

                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        mt: 1,
                        background: 'linear-gradient(90deg, #1A237E, #3F51B5)',
                        color: 'white',
                        '&:hover': {
                          background: 'linear-gradient(90deg, #3F51B5, #1A237E)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                        },
                      }}
                    >
                      Submit Registration
                    </Button>
                  </motion.div>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default RegisterEvent;