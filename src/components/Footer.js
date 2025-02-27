import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Grid, Typography, IconButton, Divider } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram, Email, Phone, LocationOn } from '@mui/icons-material';
import { styled } from '@mui/system';

// Theme Colors
const primaryColor = '#64B5F6';
const darkColor = '#0D47A1';
const textColor = '#E0E0E0';

// Styled Footer Container
const FooterContainer = styled(Box)({
  backgroundColor: '#0b1533', 
  color: textColor,
  padding: '4rem 0',
  // marginTop: '3rem',
});

// Styled Links 
const FooterLink = styled(Link)({
  color: textColor,
  textDecoration: 'none',
  fontSize: '0.75rem',
  display: 'block',
  marginBottom: '0.5rem',
  fontWeight: '400',
  transition: 'color 0.3s',
  '&:hover': {
    color: primaryColor,
    textDecoration: 'underline',
  },
});

// Social Media Button
const SocialIconButton = styled(IconButton)(({ bg }) => ({
  color: '#ffffff',
  backgroundColor: bg,
  margin: '0.3rem',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const Footer = () => {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          
          {/* Company Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Connex360
            </Typography>
            <Typography variant="body2" sx={{ maxWidth: '280px', lineHeight: 1.6 }}>
              Transforming businesses with innovative smart solutions & digital transformation services.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Quick Links
            </Typography>
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/services">Services</FooterLink>
            <FooterLink to="/contact">Contact Us</FooterLink>
            <FooterLink to="/careers">Careers</FooterLink>
            <FooterLink to="/blog">Blog</FooterLink>
          </Grid>

          {/* Services */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Our Services
            </Typography>
            <FooterLink to="/service01">Smart Solutions</FooterLink>
            <FooterLink to="/service02">Digital Signage</FooterLink>
            <FooterLink to="/service03">IoT Development</FooterLink>
            <FooterLink to="/service04">Cloud Services</FooterLink>
            <FooterLink to="/service05">AI & Machine Learning</FooterLink>
            <FooterLink to="/service06">IT Consultation</FooterLink>
          </Grid>

          {/* Contact Info & Social Media */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contact Us
            </Typography>
            <Box display="flex" alignItems="center" mb={1}>
              <LocationOn sx={{ color: primaryColor, mr: 1 }} />
              <Typography variant="body2">123 Tech Street, Colombo, Sri Lanka</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <Phone sx={{ color: primaryColor, mr: 1 }} />
              <Typography variant="body2">+94 123 456 789</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Email sx={{ color: primaryColor, mr: 1 }} />
              <Typography variant="body2">info@connex360.com</Typography>
            </Box>

            {/* Social Media */}
            <Box mt={3} display="flex">
              <SocialIconButton bg="#3b5998">
                <Facebook />
              </SocialIconButton>
              <SocialIconButton bg="#1DA1F2">
                <Twitter />
              </SocialIconButton>
              <SocialIconButton bg="#0077b5">
                <LinkedIn />
              </SocialIconButton>
              <SocialIconButton bg="#E4405F">
                <Instagram />
              </SocialIconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.2)' }} />

        {/* Copyright Notice */}
        <Box textAlign="center">
          <Typography variant="body2">
            © {new Date().getFullYear()} Connex360. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
