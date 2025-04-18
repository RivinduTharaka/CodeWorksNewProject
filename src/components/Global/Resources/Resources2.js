import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import bgImage from '../../../assets/image/resourcesbg.jpg';

// ✅ Import Images
import corporateImg from '../../../assets/image/ImageBrocher.jpg';
import catalogueImg from '../../../assets/image/Catelog.jpg';
import lineCardImg from '../../../assets/image/ImageBrocher.jpg';

const countries = ['Sri Lanka', 'USA', 'UK', 'India'];
const roles = ['Manager', 'Engineer', 'Executive', 'Other'];

const Resources2 = () => {
  const [selectedImage, setSelectedImage] = useState(corporateImg);

  const handleImageChange = (type) => {
    switch (type) {
      case 'Corporate Profile':
        setSelectedImage(corporateImg);
        break;
      case 'Product Catalogue':
        setSelectedImage(catalogueImg);
        break;
      case 'Product Line Card':
        setSelectedImage(lineCardImg);
        break;
      default:
        setSelectedImage(corporateImg);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        bgcolor: 'black',
        color: 'white',
      }}
    >
      <Grid container spacing={4} maxWidth="lg" sx={{ bgcolor: 'transparent' }}>
        {/* Left Side - 2 inner columns */}
        <Grid item xs={12} md={7}>
          <Grid container spacing={3}>
            {/* Buttons Column */}
            <Grid item xs={12} md={5}>
              {/* Buttons at the top */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                {['Corporate Profile', 'Product Catalogue', 'Product Line Card'].map((label) => (
                  <Button
                    key={label}
                    variant="contained"
                    onClick={() => handleImageChange(label)}
                    sx={{
                     background: 'white',
                      color: 'black',
                      // fontWeight: 'bold',
                      textTransform: 'none',
                    // width: '100%',
                      px: 4,
                      py: 1.5,
                      // boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                      '&:hover': {
                        background: 'white',
                      },
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </Box>

          
            </Grid>

            {/* Image Column */}
            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                }}
              >
                <img
                  src={selectedImage}
                  alt="Selected Resource"
                  style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Side - Form */}
        <Grid item xs={12} md={5}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="First Name" variant="standard" required InputLabelProps={{ style: { color: 'black' } }} InputProps={{ style: { color: 'black' } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Last Name" variant="standard" required InputLabelProps={{ style: { color: 'black' } }} InputProps={{ style: { color: 'black' } }} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Work Email" variant="standard" required InputLabelProps={{ style: { color: 'black' } }} InputProps={{ style: { color: 'black' } }} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Company" variant="standard" required InputLabelProps={{ style: { color: 'black' } }} InputProps={{ style: { color: 'black' } }} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Country"
                variant="standard"
                required
                defaultValue=""
                InputLabelProps={{ style: { color: 'black' } }}
                InputProps={{ style: { color: 'black' } }}
              >
                {countries.map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Role"
                variant="standard"
                required
                defaultValue=""
                InputLabelProps={{ style: { color: 'black' } }}
                InputProps={{ style: { color: 'black' } }}
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox sx={{ color: 'black' }} />}
                label={<Typography sx={{ color: 'black' }}>I'd like to receive product and industry updates.</Typography>}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" sx={{ backgroundColor: 'white', color: 'black', fontWeight: 'bold', width: '30%' }}>
                Download
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" align="center" sx={{ color: 'black' }}>
                Your information will be kept <u>private</u>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Resources2;
