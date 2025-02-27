import React from 'react';
import { Box, Typography, Container, Divider } from '@mui/material';
import { styled } from '@mui/system';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Import your vendor images (replace with your actual image paths)
import Vendor1 from '../../assets/image/download (1).jpg';
import Vendor2 from '../../assets/image/download (2).jpg';
import Vendor3 from '../../assets/image/download (3).jpg';
import Vendor4 from '../../assets/image/download (4).jpg';
import Vendor5 from '../../assets/image/download (5).jpg';

// Vendor images array
const vendors = [Vendor1, Vendor2, Vendor3, Vendor4, Vendor5];

// Styled Components
const SectionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  padding: theme.spacing(4, 0),
  position: 'relative',
}));

const SliderContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& .slick-slide': {
    padding: theme.spacing(0, 1),
  },
  '& .slick-list': {
    margin: theme.spacing(0, -1),
  },
}));

const VendorImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  cursor: 'pointer',
  maxWidth: '300px',
  margin: '0 auto',
  padding: theme.spacing(1),
  borderRadius: '8px',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

// Slider Settings for each row
const sliderSettingsRightToLeft = {
  dots: false,
  infinite: true,
  speed: 10500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 0,
  cssEase: 'linear',
  rtl: true,
  arrows: false,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1 } },
  ],
};

const sliderSettingsLeftToRight = {
  dots: false,
  infinite: true,
  speed: 10500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 0,
  cssEase: 'linear',
  rtl: false,
  arrows: false,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1 } },
  ],
};

function VendorSlider() {
  return (
    <SectionContainer>
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
          fontWeight: 700,
          marginBottom: { xs: '20px', md: '30px' },
          background: 'linear-gradient(90deg, #1a1a1a 0%, #4a4a4a 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center',
          
          letterSpacing: '-0.5px',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            textShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        Our Vendors
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: '#333',
          marginBottom: { xs: '30px', md: '50px' },
          fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
          textAlign: 'center',
          px: { xs: 2, sm: 0 },
          fontFamily: 'Lato, sans-serif',
          lineHeight: 1.8,
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '2px',
            background: 'linear-gradient(90deg, #4a4a4a, #1a1a1a)',
            borderRadius: '2px',
          },
        }}
      >
        Select a country to see our network of vendors in your local territory or view our globally managed vendors below
      </Typography>

      <Container maxWidth="lg">
        {/* First Slider (Right to Left) */}
        <SliderContainer>
          <Slider {...sliderSettingsRightToLeft}>
            {vendors.map((vendor, index) => (
              <Box key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                <VendorImage src={vendor} alt={`Vendor ${index + 1}`} />
              </Box>
            ))}
          </Slider>
        </SliderContainer>
        <Divider sx={{ width: '100%', mb: 2 }} />

        {/* Second Slider (Left to Right) */}
        <SliderContainer>
          <Slider {...sliderSettingsLeftToRight}>
            {vendors.map((vendor, index) => (
              <Box key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                <VendorImage src={vendor} alt={`Vendor ${index + 1}`} />
              </Box>
            ))}
          </Slider>
        </SliderContainer>
        <Divider sx={{ width: '100%', mb: 2 }} />

        {/* Third Slider (Right to Left) */}
        <SliderContainer>
          <Slider {...sliderSettingsRightToLeft}>
            {vendors.map((vendor, index) => (
              <Box key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                <VendorImage src={vendor} alt={`Vendor ${index + 1}`} />
              </Box>
            ))}
          </Slider>
        </SliderContainer>
      </Container>
    </SectionContainer>
  );
}

export default VendorSlider;