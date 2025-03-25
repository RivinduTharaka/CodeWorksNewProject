import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { styled } from '@mui/system';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Import your vendor images (replace with your actual image paths)
import Vendor1 from '../../../assets/image/download (1).jpg';
import Vendor2 from '../../../assets/image/download (2).jpg';
import Vendor3 from '../../../assets/image/download (3).jpg';
import Vendor4 from '../../../assets/image/download (4).jpg';
import Vendor5 from '../../../assets/image/download (5).jpg';

// Vendor images array
const vendors = [Vendor1, Vendor2, Vendor3, Vendor4, Vendor5];

// Styled Components
const SectionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  padding: theme.spacing(8, 0),
  position: 'relative',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  fontWeight: '700',
  color: '#070054',
  textAlign: 'center',
  fontFamily: 'Poppins, sans-serif',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.75rem',
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: '400',
  color: '#555',
  textAlign: 'center',
  maxWidth: '600px',
  margin: '0 auto',
  fontFamily: 'Poppins, sans-serif',
  marginBottom: theme.spacing(6),
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
  },
}));

const VendorImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  cursor: 'pointer',
  maxWidth: '200px',
  margin: '0 auto',
  padding: theme.spacing(1),
  borderRadius: '8px',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const CarouselContainer = styled(Box)(({ theme }) => ({
  '& .slick-slide': {
    padding: theme.spacing(0, 1),
  },
  '& .slick-list': {
    margin: theme.spacing(0, -1),
  },
}));

const ExploreButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ffffff',
  border: '2px solid #070054',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: '600',
  color: '#070054',
  position: 'absolute',
  bottom: theme.spacing(3),
  left: '50%',
  transform: 'translateX(-50%)',
  padding: theme.spacing(1.5, 3),
  textTransform: 'none',
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    backgroundColor: '#f0f0f5',
  },
}));

// Carousel Settings
const carouselSettings = {
  dots: false,
  infinite: true,
  speed: 2500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const OurVendors = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <SectionContainer>
      <Container maxWidth="lg">
        {/* Section Title */}
        <Title>Our Vendors</Title>
        <Description>
          Embark on Technological Excellence with Our Trusted Network of Vendors.
        </Description>

        {/* Vendor Carousel */}
        <CarouselContainer>
          <Slider {...carouselSettings}>
            {vendors.map((vendor, index) => (
              <Box key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                <VendorImage src={vendor} alt={`Vendor ${index + 1}`} />
              </Box>
            ))}
          </Slider>
        </CarouselContainer>
        <div style={{ marginTop: '40px' }}></div>

        {/* Explore Button */}
        <ExploreButton
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate('/uae/vendors')} // Redirect to Vendors page
        >
          Explore Our Vendors
        </ExploreButton>
      </Container>
    </SectionContainer>
  );
};

export default OurVendors;