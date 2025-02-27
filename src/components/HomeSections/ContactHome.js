import React from 'react';
import { Typography, TextField, Checkbox, Button, FormControlLabel, Grid } from '@mui/material';

function ContactHome() {
  return (
    <div className="contact-container">
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
              mb: 2
            }}
          >
            Let us know how we can help
          </Typography>
          <Typography 
            variant="body1"
            sx={{
              fontSize: { xs: '0.9rem', sm: '1.5rem' },
              fontWeight: 400,
              color: '#275E27',
              maxWidth: '500px',
              lineHeight: 1.6,
              mb: 4
            }}
          >
            Whether you need a quote, advice, want to become a partner, or want to take advantage of our global services, we are here to help.
          </Typography>
        </div>

        {/* Right Column */}
        <div className="contact-column">
          <Grid container spacing={1}>
            {/* Row 1: First name & Last name */}
            <Grid item xs={12} md={6}>
              <TextField
                label="First name*"
                variant="outlined"
                fullWidth
                required
                sx={{
                  '& .MuiInputBase-input': { color: '#0D47A1' },
                  '& .MuiInputLabel-root': { color: '#006400' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { border: 'none', borderBottom: '2px solid #90EE90' },
                    '&:hover fieldset': { borderBottom: '2px solid #006400' },
                    '&.Mui-focused fieldset': { borderBottom: '2px solid #0D47A1' },
                  },
                  mb: 2
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Last name*"
                variant="outlined"
                fullWidth
                required
                sx={{
                  '& .MuiInputBase-input': { color: '#0D47A1' },
                  '& .MuiInputLabel-root': { color: '#006400' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { border: 'none', borderBottom: '2px solid #90EE90' },
                    '&:hover fieldset': { borderBottom: '2px solid #006400' },
                    '&.Mui-focused fieldset': { borderBottom: '2px solid #0D47A1' },
                  },
                  mb: 2
                }}
              />
            </Grid>

            {/* Row 2: Email & Company */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Email address*"
                variant="outlined"
                fullWidth
                required
                sx={{
                  '& .MuiInputBase-input': { color: '#0D47A1' },
                  '& .MuiInputLabel-root': { color: '#006400' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { border: 'none', borderBottom: '2px solid #90EE90' },
                    '&:hover fieldset': { borderBottom: '2px solid #006400' },
                    '&.Mui-focused fieldset': { borderBottom: '2px solid #0D47A1' },
                  },
                  mb: 2
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Company:"
                variant="outlined"
                fullWidth
                sx={{
                  '& .MuiInputBase-input': { color: '#0D47A1' },
                  '& .MuiInputLabel-root': { color: '#006400' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { border: 'none', borderBottom: '2px solid #90EE90' },
                    '&:hover fieldset': { borderBottom: '2px solid #006400' },
                    '&.Mui-focused fieldset': { borderBottom: '2px solid #0D47A1' },
                  },
                  mb: 2
                }}
              />
            </Grid>

            {/* Row 3: Country & Subject */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Country:"
                variant="outlined"
                fullWidth
                sx={{
                  '& .MuiInputBase-input': { color: '#0D47A1' },
                  '& .MuiInputLabel-root': { color: '#006400' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { border: 'none', borderBottom: '2px solid #90EE90' },
                    '&:hover fieldset': { borderBottom: '2px solid #006400' },
                    '&.Mui-focused fieldset': { borderBottom: '2px solid #0D47A1' },
                  },
                  mb: 2
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Subject:"
                variant="outlined"
                fullWidth
                sx={{
                  '& .MuiInputBase-input': { color: '#0D47A1' },
                  '& .MuiInputLabel-root': { color: '#006400' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { border: 'none', borderBottom: '2px solid #90EE90' },
                    '&:hover fieldset': { borderBottom: '2px solid #006400' },
                    '&.Mui-focused fieldset': { borderBottom: '2px solid #0D47A1' },
                  },
                  mb: 2
                }}
              />
            </Grid>

            {/* Message */}
            <Grid item xs={12}>
              <TextField
                label="Message:"
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                sx={{
                  '& .MuiInputBase-input': { color: '#0D47A1' },
                  '& .MuiInputLabel-root': { color: '#006400' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { border: 'none', borderBottom: '2px solid #90EE90' },
                    '&:hover fieldset': { borderBottom: '2px solid #006400' },
                    '&.Mui-focused fieldset': { borderBottom: '2px solid #0D47A1' },
                  },
                  mb: 2
                }}
              />
            </Grid>

            {/* Checkboxes */}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox />}
                label="I accept the privacy & cookie policy which can be viewed here"
                sx={{ '& .MuiTypography-root': { color: '#006400', fontSize: '0.755rem' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox />}
                label="I agree to receive marketing related promotional materials (promotions, events and newsletters) "
                sx={{ '& .MuiTypography-root': { color: '#006400', fontSize: '0.755rem' } }}
              />
            </Grid>

            {/* Math Question & Button */}
            <Grid item xs={12}>
              <Typography sx={{ fontSize: '1rem', color: '#0D47A1', mb: 2 }}>
                22 + 13 =
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
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