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
import Swal from 'sweetalert2';
import ReactCountryFlag from 'react-country-flag';
import { insertData } from '../../../../services/dataService';

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
    h4: { fontWeight: 700, letterSpacing: '0.5px' },
    body1: { letterSpacing: '0.3px' },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            '&:hover fieldset': { borderColor: 'black' },
            '&.Mui-focused fieldset': { borderColor: 'black' },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'black' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'black' },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: '8px', textTransform: 'none', fontWeight: 600, padding: '12px 24px' },
      },
    },
  },
});

// Sample country data with codes (expand as needed)
const countries = [
  { name: 'United States', code: 'US', dialCode: '+1' },
  { name: 'United Kingdom', code: 'GB', dialCode: '+44' },
  { name: 'Canada', code: 'CA', dialCode: '+1' },
  { name: 'Australia', code: 'AU', dialCode: '+61' },
  { name: 'India', code: 'IN', dialCode: '+91' },
  { name: 'Germany', code: 'DE', dialCode: '+49' },
  { name: 'France', code: 'FR', dialCode: '+33' },
];

// Function to insert registration data into the database
const submitToDatabase = async (data) => {
  console.log('Step: submitToDatabase - Preparing registration data', data);
  try {
    const registrationData = {
      title: data.title,
      full_name: data.name,
      designation: data.designation,
      company_name: data.companyName,
      email: data.email,
      country_code: data.countryCode,
      contact_number: data.contactNumber,
      country_id: 3, // Hardcoded to 3 for global events
      city: data.city,
      event_id: data.eventId,
      attendance_timestamp: null, // Default value as per the table
      is_attendance_marked: 0, // Default value as per the table
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' '), // Current timestamp in MySQL format
      updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '), // Current timestamp in MySQL format
    };

    console.log('Step: submitToDatabase - Registration data prepared', registrationData);

    const response = await insertData('event_registrations', registrationData);
    console.log('Step: submitToDatabase - API response', response);

    if (response.message === 'Data inserted successfully') {
      console.log('Step: submitToDatabase - Success');
      return { success: true, message: 'Registration successful!' };
    } else {
      console.log('Step: submitToDatabase - Failed with response message', response.message);
      throw new Error('Failed to register. Please try again.');
    }
  } catch (error) {
    console.log('Step: submitToDatabase - Error occurred', error.message);
    return { success: false, message: error.message };
  }
};

function RegisterEvent() {
  const { id } = useParams(); // Get the event ID from the URL
  const location = useLocation();
  const event = location.state?.event; // Event data passed via state

  console.log('Step: RegisterEvent - Component mounted with event ID', id);
  console.log('Step: RegisterEvent - Event data from location.state', event);

  const [formData, setFormData] = useState({
    title: '',
    name: '',
    designation: '',
    companyName: '',
    email: '',
    contactNumber: '',
    countryCode: '+1', // Default to US
    country: 'United States', // Default country
    city: '',
  });

  // State for form errors
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    console.log('Step: useEffect - Scrolling to top');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log('Step: handleChange - Input changed', { name, value });

    if (name === 'countryCode') {
      const selectedCountry = countries.find((country) => country.dialCode === value);
      console.log('Step: handleChange - Country code selected, updating country', selectedCountry);
      setFormData((prev) => ({
        ...prev,
        countryCode: value,
        country: selectedCountry ? selectedCountry.name : prev.country,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (formErrors[name]) {
      console.log('Step: handleChange - Clearing error for field', name);
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    console.log('Step: validateForm - Starting form validation');
    const errors = {};
    if (!formData.title) errors.title = 'Title is required';
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.designation) errors.designation = 'Designation is required';
    if (!formData.companyName) errors.companyName = 'Company name is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.contactNumber) {
      errors.contactNumber = 'Contact number is required';
    } else if (!/^\d+$/.test(formData.contactNumber)) {
      errors.contactNumber = 'Contact number must contain only digits';
    } else if (formData.contactNumber.length < 8) {
      errors.contactNumber = 'Contact number must be at least 8 digits';
    } else if (formData.contactNumber.length > 15) {
      errors.contactNumber = 'Contact number cannot exceed 15 digits';
    }
    if (!formData.country) errors.country = 'Country is required';
    if (!formData.city) errors.city = 'City is required';

    console.log('Step: validateForm - Validation errors', errors);
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContactNumberChange = (e) => {
    const { name, value } = e.target;
    console.log('Step: handleContactNumberChange - Contact number input', { name, value });

    if (/^\d*$/.test(value)) {
      console.log('Step: handleContactNumberChange - Valid numeric input, updating state');
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (formErrors[name]) {
        console.log('Step: handleContactNumberChange - Clearing error for contact number');
        setFormErrors((prev) => ({ ...prev, [name]: '' }));
      }
    } else {
      console.log('Step: handleContactNumberChange - Invalid input, not numeric');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Step: handleSubmit - Form submitted', formData);

    const isValid = validateForm();
    console.log('Step: handleSubmit - Form validation result', isValid);

    if (!isValid) {
      console.log('Step: handleSubmit - Form validation failed, stopping submission');
      return;
    }

    // Check for remaining seats
    console.log('Step: handleSubmit - Checking remaining seats', event.remaining_seats);
    if (event.remaining_seats === '0' || event.remaining_seats === 'Unlimited') {
      if (event.remaining_seats !== 'Unlimited') {
        console.log('Step: handleSubmit - No seats available, showing error');
        await Swal.fire({
          icon: 'error',
          title: 'No Seats are currently available',
          showConfirmButton: false,
          timer: 1500,
          didOpen: () => {
            const popup = Swal.getPopup();
            if (popup) {
              popup.style.zIndex = '1500';
            }
          },
        });
        return;
      }
      console.log('Step: handleSubmit - Unlimited seats, proceeding');
    }

    // Show loading alert
    console.log('Step: handleSubmit - Showing loading alert');
    await Swal.fire({
      icon: 'info',
      title: 'Submitting...',
      text: 'Please wait while your registration is being processed.',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
        const popup = Swal.getPopup();
        if (popup) {
          popup.style.zIndex = '1500';
        }
      },
    });

    try {
      console.log('Step: handleSubmit - Submitting to database');
      const response = await submitToDatabase({ ...formData, eventId: id });
      console.log('Step: handleSubmit - Database submission response', response);

      console.log('Step: handleSubmit - Showing response alert');
      await Swal.fire({
        icon: response.success ? 'success' : 'error',
        title: response.success ? 'Success!' : 'Error!',
        text: response.message,
        confirmButtonText: response.success ? 'OK' : 'Try Again',
        timer: response.success ? 3000 : undefined,
        timerProgressBar: response.success,
        didOpen: () => {
          const popup = Swal.getPopup();
          if (popup) {
            popup.style.zIndex = '1500';
          }
        },
      });

      if (response.success) {
        console.log('Step: handleSubmit - Registration successful, resetting form');
        setFormData({
          title: '',
          name: '',
          designation: '',
          companyName: '',
          email: '',
          contactNumber: '',
          countryCode: '+1',
          country: 'United States',
          city: '',
        });
        console.log('Step: handleSubmit - Reloading page');
        window.location.reload();
      }
    } catch (error) {
      console.log('Step: handleSubmit - Unexpected error during submission', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An unexpected error occurred. Please try again.',
        confirmButtonText: 'Try Again',
        didOpen: () => {
          const popup = Swal.getPopup();
          if (popup) {
            popup.style.zIndex = '1500';
          }
        },
      });
    }
  };

  if (!event) {
    console.log('Step: RegisterEvent - Event not found, rendering error message');
    return (
      <Container sx={{ py: 12 }}>
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 5, color: theme.palette.text.secondary }}>
          Event not found.
        </Typography>
      </Container>
    );
  }

  console.log('Step: RegisterEvent - Rendering form with event data', event);
  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ py: 15, background: 'linear-gradient(180deg, #F5F6FA 0%, #FFFFFF 100%)' }}>
        <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Typography
              variant="h4"
              sx={{
                mb: 6,
                textAlign: 'center',
                background: 'linear-gradient(90deg, #1A237E, rgb(2, 61, 26))',
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
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <Box
                  sx={{
                    height: { xs: '200px', sm: '250px', md: '350px' },
                    width: '100%',
                    backgroundImage: `url(${event.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '12px',
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
                <Typography variant="body1" sx={{ mt: 4, lineHeight: 1.8, color: theme.palette.text.primary, fontSize: '1.1rem' }}>
                  {event.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                    <strong>Date:</strong> {event.date}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                    <strong>Time:</strong> {event.time}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                    <strong>Mode:</strong> {event.mode}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                    <strong>Remaining Seats:</strong> {event.remaining_seats}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>

            {/* Right Side: Registration Form */}
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
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
                  <Typography variant="h6" sx={{ mb: 1, color: theme.palette.primary.main, fontWeight: 600, textAlign: 'center' }}>
                    Registration Details
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth error={!!formErrors.title}>
                        <InputLabel sx={{ fontWeight: 500 }}>Title</InputLabel>
                        <Select name="title" value={formData.title} onChange={handleChange} label="Title" required>
                          <MenuItem value="Mr">Mr</MenuItem>
                          <MenuItem value="Ms">Ms</MenuItem>
                          <MenuItem value="Mrs">Mrs</MenuItem>
                        </Select>
                        {formErrors.title && <Typography color="error">{formErrors.title}</Typography>}
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
                        error={!!formErrors.name}
                        helperText={formErrors.name}
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
                        error={!!formErrors.designation}
                        helperText={formErrors.designation}
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
                        error={!!formErrors.companyName}
                        helperText={formErrors.companyName}
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
                        error={!!formErrors.email}
                        helperText={formErrors.email}
                        InputLabelProps={{ style: { fontWeight: 500 } }}
                      />
                    </Grid>

                    {/* Country Code with Flags and Contact Number */}
                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth>
                        <InputLabel sx={{ fontWeight: 500 }}>Code</InputLabel>
                        <Select
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleChange}
                          label="Code"
                          required
                          renderValue={(selected) => {
                            const country = countries.find((c) => c.dialCode === selected);
                            return (
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <ReactCountryFlag
                                  countryCode={country.code}
                                  svg
                                  style={{ width: '20px', marginRight: '8px' }}
                                />
                                {selected}
                              </Box>
                            );
                          }}
                        >
                          {countries.map((country) => (
                            <MenuItem key={country.code} value={country.dialCode}>
                              <ReactCountryFlag
                                countryCode={country.code}
                                svg
                                style={{ width: '20px', marginRight: '8px' }}
                              />
                              {country.dialCode}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <TextField
                        fullWidth
                        label="Contact Number"
                        name="contactNumber"
                        type="tel"
                        value={formData.contactNumber}
                        onChange={handleContactNumberChange}
                        placeholder="Enter your contact number"
                        required
                        error={!!formErrors.contactNumber}
                        helperText={formErrors.contactNumber}
                        inputProps={{ maxLength: 15 }}
                        InputLabelProps={{ style: { fontWeight: 500 } }}
                      />
                    </Grid>

                    {/* Country Dropdown */}
                    <Grid item xs={12}>
                      <FormControl fullWidth error={!!formErrors.country}>
                        <InputLabel sx={{ fontWeight: 500 }}>Country</InputLabel>
                        <Select
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          label="Country"
                          required
                        >
                          {countries.map((country) => (
                            <MenuItem key={country.code} value={country.name}>
                              {country.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {formErrors.country && <Typography color="error">{formErrors.country}</Typography>}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter your city"
                        required
                        error={!!formErrors.city}
                        helperText={formErrors.city}
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