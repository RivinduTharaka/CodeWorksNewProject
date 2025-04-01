import React, { useState } from 'react';
import { Typography, TextField, Checkbox, Button, FormControlLabel, Grid } from '@mui/material';
import Swal from 'sweetalert2'; // Import SweetAlert2
import ReCAPTCHA from 'react-google-recaptcha'; // Import reCAPTCHA
import AutoLogin from '../../../services/AutoLogin'; // Adjust the import path as necessary
import { insertData } from '../../../services/dataService';
// import { toast } from 'react-toastify'; 

function ContactHome() {
  // State for form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    country_name: '',
    contactNumber: '',
    message: '',
    privacyAccepted: false,
    recaptchaToken: null,
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle reCAPTCHA verification
  const handleRecaptchaChange = (token) => {
    setFormData((prev) => ({
      ...prev,
      recaptchaToken: token,
    }));
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else {
      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    if (!formData.country_name.trim()) { // Changed from country to country_name
      newErrors.country_name = 'Country is required'; // Updated key to match formData
    }
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else {
      // Optional: Validate contact number format (numeric only)
      const numberRegex = /^[0-9]+$/;
      if (!numberRegex.test(formData.contactNumber)) {
        newErrors.contactNumber = 'Contact number must contain only digits';
      }
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    // reCAPTCHA validation
    if (!formData.recaptchaToken) {
      newErrors.recaptcha = 'Please verify that you are not a bot';
    }

    // Privacy policy checkbox validation
    if (!formData.privacyAccepted) {
      newErrors.privacyAccepted = 'You must accept the privacy & cookie policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    // Show loading alert
    Swal.fire({
      icon: 'info',
      title: 'Submitting...',
      text: 'Please wait while your details are being processed.',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      // Prepare data for database insertion
      const messageData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email_address: formData.email,
        company: formData.company,
        country_id: 3, // Set to 3 for the global site
        contact_number: formData.contactNumber,
        message: formData.message,
        country_name: formData.country_name,
      };

      // Insert data into the database
      await insertData('messages', messageData);

      // Close the loading alert
      Swal.close();

      // Show success alert
      Swal.fire({
        title: "Success!",
        text: "Your details have been successfully submitted!",
        icon: "success",
        draggable: true,
      });

      // Optionally show a toast notification
      // toast.success('Contact form submitted successfully!');

      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        country_name: '',
        contactNumber: '',
        message: '',
        privacyAccepted: false,
        recaptchaToken: null,
      });
      setErrors({});
    } catch (error) {
      // Close the loading alert
      Swal.close();

      // Show failure alert
      Swal.fire({
        title: "Error!",
        text: "Failed to submit the form. Please try again later.",
        icon: "error",
        draggable: true,
      });

      // Optionally show a toast notification
      // toast.error('Failed to submit the form.');
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="contact-container">
      <AutoLogin />

      <div className="contact-row">
        {/* Left Column */}
        <div className="contact-column">
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', sm: '4.3rem' },
              fontWeight: 800,
              background: 'linear-gradient(45deg, #0D47A1, #006400)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            Your needs, our expertise
            Let’s connect!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '0.9rem', sm: '1.5rem' },
              fontWeight: 400,
              color: '#275E27',
              maxWidth: '500px',
              lineHeight: 1.6,
              mb: 4,
            }}
          >
            Need a solution? We’ve got you covered! Connect with us, and let’s innovate, integrate, and
            elevate your success together.
          </Typography>
        </div>

        {/* Right Column */}
        <div className="contact-column">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              {/* Row 1: First name & Last name */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="First name*"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  sx={{
                    '& .MuiInputBase-input': { color: '#0D47A1' },
                    '& .MuiInputLabel-root': { color: '#006400' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { border: 'none', borderBottom: '2px solid #90EE90' },
                      '&:hover fieldset': { borderBottom: '2px solid #006400' },
                      '&.Mui-focused fieldset': { borderBottom: '2px solid #0D47A1' },
                    },
                    mb: 2,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Last name*"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  sx={{
                    '& .MuiInputBase-input': { color: '#0D47A1' },
                    '& .MuiInputLabel-root': { color: '#006400' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { border: 'none', borderBottom: '2px solid #90EE90' },
                      '&:hover fieldset': { borderBottom: '2px solid #006400' },
                      '&.Mui-focused fieldset': { borderBottom: '2px solid #0D47A1' },
                    },
                    mb: 2,
                  }}
                />
              </Grid>

              {/* Row 2: Email & Company */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Email address*"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  error={!!errors.email}
                  helperText={errors.email}
                  sx={{
                    '& .MuiInputBase-input': { color: '#0D47A1' },
                    '& .MuiInputLabel-root': { color: '#006400' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { border: 'none', borderBottom: '2px solid #90EE90' },
                      '&:hover fieldset': { borderBottom: '2px solid #006400' },
                      '&.Mui-focused fieldset': { borderBottom: '2px solid #0D47A1' },
                    },
                    mb: 2,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Company*"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  error={!!errors.company}
                  helperText={errors.company}
                  sx={{
                    '& .MuiInputBase-input': { color: '#0D47A1' },
                    '& .MuiInputLabel-root': { color: '#006400' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { border: 'none', borderBottom: '2px solid #90EE90' },
                      '&:hover fieldset': { borderBottom: '2px solid #006400' },
                      '&.Mui-focused fieldset': { borderBottom: '2px solid #0D47A1' },
                    },
                    mb: 2,
                  }}
                />
              </Grid>

              {/* Row 3: Country & Contact Number */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Country*"
                  name="country_name"
                  value={formData.country_name}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  error={!!errors.country_name} // Updated to country_name
                  helperText={errors.country_name} // Updated to country_name
                  sx={{
                    '& .MuiInputBase-input': { color: '#0D47A1' },
                    '& .MuiInputLabel-root': { color: '#006400' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { border: 'none', borderBottom: '2px solid #90EE90' },
                      '&:hover fieldset': { borderBottom: '2px solid #006400' },
                      '&.Mui-focused fieldset': { borderBottom: '2px solid #0D47A1' },
                    },
                    mb: 2,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Contact Number*"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  error={!!errors.contactNumber}
                  helperText={errors.contactNumber}
                  sx={{
                    '& .MuiInputBase-input': { color: '#0D47A1' },
                    '& .MuiInputLabel-root': { color: '#006400' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { border: 'none', borderBottom: '2px solid #90EE90' },
                      '&:hover fieldset': { borderBottom: '2px solid #006400' },
                      '&.Mui-focused fieldset': { borderBottom: '2px solid #0D47A1' },
                    },
                    mb: 2,
                  }}
                />
              </Grid>

              {/* Message */}
              <Grid item xs={12}>
                <TextField
                  label="Message*"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={2}
                  required
                  error={!!errors.message}
                  helperText={errors.message}
                  sx={{
                    '& .MuiInputBase-input': { color: '#0D47A1' },
                    '& .MuiInputLabel-root': { color: '#006400' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { border: 'none', borderBottom: '2px solid #90EE90' },
                      '&:hover fieldset': { borderBottom: '2px solid #006400' },
                      '&.Mui-focused fieldset': { borderBottom: '2px solid #0D47A1' },
                    },
                    mb: 2,
                  }}
                />
              </Grid>

              {/* Checkboxes */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="privacyAccepted"
                      checked={formData.privacyAccepted}
                      onChange={handleChange}
                    />
                  }
                  label="I accept the privacy & cookie policy which can be viewed here"
                  sx={{ '& .MuiTypography-root': { color: '#006400', fontSize: '0.755rem' } }}
                />
                {errors.privacyAccepted && (
                  <Typography sx={{ color: 'red', fontSize: '0.75rem', mt: 1 }}>
                    {errors.privacyAccepted}
                  </Typography>
                )}
              </Grid>

              {/* reCAPTCHA */}
              <Grid item xs={12}>
                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Replace with your actual Site Key
                  onChange={handleRecaptchaChange}
                />
                {errors.recaptcha && (
                  <Typography sx={{ color: 'red', fontSize: '0.75rem', mt: 1 }}>
                    {errors.recaptcha}
                  </Typography>
                )}
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  sx={{
                    background: '#0c4a93',
                    color: '#ffffff',
                    padding: '12px 40px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: '4px',
                    textTransform: 'none',
                    fontFamily: 'Poppins, sans-serif',
                    '&:hover': {
                      background: '#1B0EA2',
                    },
                  }}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>

      <style jsx>{`
        .contact-container {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .contact-row {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }

        .contact-column {
          flex: 1;
          min-width: 300px;
          padding: 15px;
          border-radius: 8px;
        }

        @media (max-width: 768px) {
          .contact-column {
            flex: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default ContactHome;