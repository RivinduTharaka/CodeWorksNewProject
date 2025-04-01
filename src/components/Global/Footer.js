import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Grid, Typography, IconButton, Divider } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram, Email, Phone, LocationOn, YouTube } from '@mui/icons-material';
import { styled } from '@mui/system';
import { selectData } from '../../services/dataService'; // Importing the data service

// Theme Colors
const primaryColor = '#64B5F6';
const darkColor = '#0D47A1';
const textColor = '#E0E0E0';

// Styled Footer Container
const FooterContainer = styled(Box)({
  backgroundColor: '#0b1533',
  color: textColor,
  padding: '4rem 0',
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
  const [footerData, setFooterData] = useState(null);
  const [quickLinks, setQuickLinks] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch footer data for country_id 3
  const fetchFooterData = useCallback(async () => {
    setLoading(true);
    try {
      const footerResponse = await selectData('footers', {
        country_id: 3,
        is_active: true,
      });

      if (footerResponse.data && footerResponse.data.length > 0) {
        setFooterData(footerResponse.data[0]);
      } else {
        setFooterData(null);
      }
    } catch (error) {
      console.error('Failed to fetch footer data:', error);
      setFooterData(null);
    }
  }, []);

  // Fetch quick links for footer_id 1
  const fetchQuickLinks = useCallback(async () => {
    try {
      const quickLinksResponse = await selectData('quick_links', {
        footer_id: 1, // Based on the footer_id from the footers table for country_id: 3
        is_active: true,
      });

      if (quickLinksResponse.data && quickLinksResponse.data.length > 0) {
        setQuickLinks(quickLinksResponse.data);
      } else {
        setQuickLinks([]);
      }
    } catch (error) {
      console.error('Failed to fetch quick links:', error);
      setQuickLinks([]);
    }
  }, []);

  // Fetch services for footer_id 1
  const fetchServices = useCallback(async () => {
    try {
      const servicesResponse = await selectData('our_services', {
        footer_id: 1, // Based on the footer_id from the footers table for country_id: 3
        is_active: true,
      });

      if (servicesResponse.data && servicesResponse.data.length > 0) {
        setServices(servicesResponse.data);
      } else {
        setServices([]);
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
      setServices([]);
    }
  }, []);

  // Fetch all data on component mount
  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([fetchFooterData(), fetchQuickLinks(), fetchServices()]);
      setLoading(false);
    };
    fetchAllData();
  }, [fetchFooterData, fetchQuickLinks, fetchServices]);

  // Default values in case the fetch fails or no data is found
  const defaultFooterData = {
    company_name: 'Connex IT',
    company_description: 'Transforming businesses with innovative smart solutions & digital transformation services.',
    address: '123 Tech Street, Colombo, Sri Lanka',
    contact_number: '+94 123 456 789',
    email: 'info@connexit.com',
    facebook_link: 'ssss',
    twitter_link: 'ssss',
    linkedin_link: 'ssss',
    instagram_link: 'ssss',
    youtube_link: 'ssss', // Added default for YouTube
    x_link: 'ssss', // Added default for X
  };

  const defaultQuickLinks = [
    { link_name: 'Home', link_url: '/' },
    { link_name: 'About Us', link_url: '/about' },
    { link_name: 'Services', link_url: '/services' },
    { link_name: 'Contact Us', link_url: '/contact' },
    { link_name: 'Careers', link_url: '/careers' },
    { link_name: 'Blog', link_url: '/blog' },
  ];

  const defaultServices = [
    { service_name: 'Smart Solutions', service_link: '/service01' },
    { service_name: 'Digital Signage', service_link: '/service02' },
    { service_name: 'IoT Development', service_link: '/service03' },
    { service_name: 'Cloud Services', service_link: '/service04' },
    { service_name: 'AI & Machine Learning', service_link: '/service05' },
    { service_name: 'IT Consultation', service_link: '/service06' },
  ];

  const data = footerData || defaultFooterData;
  const quickLinksData = quickLinks.length > 0 ? quickLinks : defaultQuickLinks;
  const servicesData = services.length > 0 ? services : defaultServices;

  return (
    <FooterContainer>
      <Container maxWidth="lg">
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
            <Typography variant="body2">Loading...</Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={5}>
              {/* Company Info */}
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {data.company_name}
                </Typography>
                <Typography variant="body2" sx={{ maxWidth: '280px', lineHeight: 1.6 }}>
                  {data.company_description}
                </Typography>
              </Grid>

              {/* Quick Links */}
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Quick Links
                </Typography>
                {quickLinksData.map((link, index) => (
                  <FooterLink key={index} to={link.link_url}>
                    {link.link_name}
                  </FooterLink>
                ))}
              </Grid>

              {/* Services */}
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Our Services
                </Typography>
                {servicesData.map((service, index) => (
                  <FooterLink key={index} to={service.service_link}>
                    {service.service_name}
                  </FooterLink>
                ))}
              </Grid>

              {/* Contact Info & Social Media */}
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Contact Us
                </Typography>
                <Box display="flex" alignItems="center" mb={1}>
                  <LocationOn sx={{ color: primaryColor, mr: 1 }} />
                  <Typography variant="body2">{data.address}</Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <Phone sx={{ color: primaryColor, mr: 1 }} />
                  <Typography variant="body2">{data.contact_number}</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <Email sx={{ color: primaryColor, mr: 1 }} />
                  <Typography variant="body2">{data.email}</Typography>
                </Box>

                {/* Social Media */}
                <Box mt={3} display="flex">
                  {data.facebook_link && data.facebook_link !== 'ssss' ? (
                    <SocialIconButton bg="#3b5998" href={data.facebook_link} target="_blank">
                      <Facebook />
                    </SocialIconButton>
                  ) : null}
                  {data.twitter_link && data.twitter_link !== 'ssss' ? (
                    <SocialIconButton bg="#1DA1F2" href={data.twitter_link} target="_blank">
                      <Twitter />
                    </SocialIconButton>
                  ) : null}
                  {data.linkedin_link && data.linkedin_link !== 'ssss' ? (
                    <SocialIconButton bg="#0077b5" href={data.linkedin_link} target="_blank">
                      <LinkedIn />
                    </SocialIconButton>
                  ) : null}
                  {data.instagram_link && data.instagram_link !== 'ssss' ? (
                    <SocialIconButton bg="#E4405F" href={data.instagram_link} target="_blank">
                      <Instagram />
                    </SocialIconButton>
                  ) : null}
                  {data.youtube_link && data.youtube_link !== 'ssss' ? (
                    <SocialIconButton bg="#FF0000" href={data.youtube_link} target="_blank">
                      <YouTube />
                    </SocialIconButton>
                  ) : null}
                  {data.x_link && data.x_link !== 'ssss' ? (
                    <SocialIconButton bg="#000000" href={data.x_link} target="_blank">
                      <Twitter /> {/* Using Twitter icon for X */}
                    </SocialIconButton>
                  ) : null}
                </Box>
              </Grid>
            </Grid>

            {/* Divider */}
            <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.2)' }} />

            {/* Copyright Notice */}
            <Box textAlign="center">
              <Typography variant="body2">
                © {new Date().getFullYear()} {data.company_name} (Pvt) Ltd. All Rights Reserved.
              </Typography>
            </Box>
          </>
        )}
      </Container>
    </FooterContainer>
  );
};

export default Footer;