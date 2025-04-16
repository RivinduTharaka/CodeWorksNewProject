import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CardMedia,
  TextField,
  Button,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

// ✅ Import Images
import ZeroTrustImg from '../../../assets/image/ImageBrocher.jpg';
import WhitepaperImg from '../../../assets/image/Catelog.jpg';
import InfographicImg from '../../../assets/image/ImageBrocher.jpg';

const categories = [
  'Corporate Profile',
  'Product Catalogue',
  'Product Line Card',
];

const resourcesData = {
  'Corporate Profile': {
    title: 'Our Corporate Journey',
    image: ZeroTrustImg
  },
  'Product Catalogue': {
    title: 'Complete Product Catalogue',
    image: WhitepaperImg
  },
  'Product Line Card': {
    title: 'Product Line Overview',
    image: InfographicImg
  }
};

const Resources2 = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    country: '',
    contact: '',
    message: '',
    agree: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDownload = (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      email,
      company,
      country,
      contact,
      message,
      agree
    } = formData;

    if (!firstName || !lastName || !email || !company || !country || !contact || !message || !agree) {
      alert('⚠️ Please fill out all fields and accept the policy before downloading.');
      return;
    }

    // ✅ Identify requested category
    switch (selectedCategory) {
      case 'Corporate Profile':
        console.log('✅ Corporate Profile requested by:', email);
        break;
      case 'Product Catalogue':
        console.log('✅ Product Catalogue requested by:', email);
        break;
      case 'Product Line Card':
        console.log('✅ Product Line Card requested by:', email);
        break;
      default:
        console.log('⚠️ Unknown document requested');
    }

    alert(`✅ "${resourcesData[selectedCategory].title}" will be sent to ${email}`);
  };

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 2, md: 10 }, minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a, #1e293b)' }}>
      <Grid container spacing={4}>
        {/* Left Sidebar */}
        <Grid item xs={12} md={4} display="flex" justifyContent="center">
          <Paper
            elevation={0}
            sx={{
              width: '100%',
              maxWidth: 300,
              borderRadius: 4,
              p: 3,
              backdropFilter: 'blur(12px)',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff',
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.08)',
              maxHeight: 450,
              alignSelf: 'flex-start'
            }}
          >
            <List>
              {categories.map((category) => (
                <ListItem key={category} disablePadding>
                  <ListItemButton
                    selected={selectedCategory === category}
                    onClick={() => setSelectedCategory(category)}
                    sx={{
                      borderRadius: 2,
                      color: 'white',
                      mb: 1,
                      transition: 'all 0.3s',
                      '&.Mui-selected': {
                        background: 'linear-gradient(90deg, #0ea5e9, #2563eb)',
                        color: '#fff'
                      },
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.1)'
                      }
                    }}
                  >
                    <ListItemText
                      primary={category}
                      primaryTypographyProps={{
                        fontSize: '1.1rem',
                        fontWeight: 500
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Right Content */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={0}
            sx={{
              width: '100%',
              borderRadius: 4,
              p: 4,
              backdropFilter: 'blur(12px)',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff',
              boxShadow: '0 0 30px rgba(0, 255, 255, 0.06)'
            }}
          >
            <Grid container spacing={4}>
              {/* Image */}
              <Grid item xs={12} md={5}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <CardMedia
                      component="img"
                      image={resourcesData[selectedCategory].image}
                      alt={resourcesData[selectedCategory].title}
                      sx={{
                        width: '100%',
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(255, 255, 255, 0.1)'
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
              </Grid>

              {/* Form */}
              <Grid item xs={12} md={7}>
                <Typography variant="h6" sx={{ color: '#7dd3fc', mb: 2 }}>
                  Download: {resourcesData[selectedCategory].title}
                </Typography>
                <form onSubmit={handleDownload}>
                  <Grid container spacing={3}>
                    {[
                      { label: 'First name', name: 'firstName' },
                      { label: 'Last name', name: 'lastName' },
                      { label: 'Email address', name: 'email', type: 'email' },
                      { label: 'Company', name: 'company' },
                      { label: 'Country', name: 'country' },
                      { label: 'Contact Number', name: 'contact' }
                    ].map(({ label, name, type = 'text' }) => (
                      <Grid item xs={12} sm={6} key={name}>
                        <TextField
                          fullWidth
                          label={label}
                          name={name}
                          type={type}
                          variant="standard"
                          value={formData[name]}
                          onChange={handleInputChange}
                          InputLabelProps={{ style: { color: '#fff' } }}
                          InputProps={{
                            style: {
                              color: '#fff',
                              marginTop: '12px'
                            }
                          }}
                          sx={{
                            '& .MuiInputBase-input': { marginTop: '12px' }
                          }}
                          required
                        />
                      </Grid>
                    ))}
                   

                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.agree}
                            name="agree"
                            onChange={handleInputChange}
                            sx={{ color: 'white' }}
                          />
                        }
                        label={
                          <Typography variant="body2" sx={{ color: '#86efac' }}>
                            I accept the privacy & cookie policy
                          </Typography>
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          background: 'linear-gradient(to right, #16a34a, #06b6d4)',
                          fontWeight: 600,
                          fontSize: '1rem',
                          px: 5
                        }}
                      >
                        Download
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Resources2;
