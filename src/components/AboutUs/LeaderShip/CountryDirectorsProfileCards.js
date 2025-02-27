import React from 'react';
import { Box, Typography, Container, Avatar, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Fade } from '@mui/material';

// Sample images (replace with your actual imports)
import director1Image from '../../../assets/image/Dilshan_Silva.jpg';
import director2Image from '../../../assets/image/Eranga.jpg';
import director3Image from '../../../assets/image/Rajiv.jpg';
import director4Image from '../../../assets/image/Rohan.jpg';
import director5Image from '../../../assets/image/Shamal.jpg';

// Sample country flags (replace with full flag images)
import usaFlag from '../../../assets/image/OIP (1).jpg'; // Replace with actual flag image
import ukFlag from '../../../assets/image/OIP (2).jpg';
import indiaFlag from '../../../assets/image/OIP (3).jpg';
import germanyFlag from '../../../assets/image/OIP (4).jpg';
import japanFlag from '../../../assets/image/OIP (5).jpg';

// Director Data
const directors = [
  { name: 'John Doe', designation: 'Country Director', country: 'USA', image: director1Image, countryFlag: usaFlag, linkedin: 'https://linkedin.com/in/johndoe' },
  { name: 'Jane Smith', designation: 'Country Director', country: 'UK', image: director2Image, countryFlag: ukFlag, linkedin: 'https://linkedin.com/in/janesmith' },
  { name: 'Ravi Patel', designation: 'Country Director', country: 'India', image: director3Image, countryFlag: indiaFlag, linkedin: 'https://linkedin.com/in/ravipatel' },
  { name: 'Anna Müller', designation: 'Country Director', country: 'Germany', image: director4Image, countryFlag: germanyFlag, linkedin: 'https://linkedin.com/in/annamueller' },
  { name: 'Hiro Tanaka', designation: 'Country Director', country: 'Japan', image: director5Image, countryFlag: japanFlag, linkedin: 'https://linkedin.com/in/hirotanaka' },
];

// Styled Components
const SectionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  padding: theme.spacing(8, 0),
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: '800',
  color: '#070054',
  textAlign: 'center',
  fontFamily: 'Poppins, sans-serif',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  fontWeight: '400',
  color: '#666',
  textAlign: 'center',
  maxWidth: '1800px',
  margin: '0 auto',
  fontFamily: 'Poppins, sans-serif',
  marginBottom: theme.spacing(6),
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },
}));

// Wider Director Card (No Shadows)
const DirectorCard = styled(Box)(({ theme }) => ({
  position: 'relative',
  cursor: 'pointer',
  borderRadius: '16px',
  overflow: 'hidden',
  height: '400px', // Increased height to match wider width
  width: '100%',
  maxWidth: '320px', // Increased width from 260px to 320px
  transition: 'all 0.4s ease-in-out',
  border: '1px solid rgba(13, 71, 161, 0.2)',
  background: 'linear-gradient(145deg, #ffffff 0%, #f5f7fa 100%)',
  '&:hover': {
    transform: 'translateY(-6px) scale(1.02)',
    borderColor: theme.palette.primary.main,
  },
}));

const DirectorImage = styled(Avatar)(({ theme }) => ({
  width: '100%',
  height: '50%', // Adjusted height to match the wider card
  objectFit: 'cover',
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
  borderBottom: '1px solid rgba(13, 71, 161, 0.1)',
}));

const CountryFlag = styled(Avatar)(({ theme }) => ({
  height: '40px',
  margin: theme.spacing(1, 'auto'),
  borderRadius: '8px', // Square with slight rounding
  objectFit: 'cover',
  animation: 'wave 2s infinite ease-in-out',
  '@keyframes wave': {
    '0%, 100%': { transform: 'rotate(0deg)' },
    '25%': { transform: 'rotate(2deg)' },
    '75%': { transform: 'rotate(-2deg)' },
  },
}));

const LinkedInIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '10px',
  right: '10px',
  backgroundColor: '#0D47A1',
  color: '#ffffff',
  padding: theme.spacing(0.5),
  borderRadius: '50%',
  transition: 'background-color 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: '#0288D1',
  },
}));

const CarouselContainer = styled(Box)(({ theme }) => ({
  p: 2,
  '& .slick-slide': {
    padding: theme.spacing(0, 1), // Slightly increased padding to accommodate wider cards
    display: 'flex',
    justifyContent: 'center', // Center-align the cards in the slider
  },
  '& .slick-list': {
    margin: theme.spacing(0, -1), // Adjusted margin to match padding and reduce gaps
  },
}));

// Updated Slider Settings for Wider Cards
const sliderSettings = {
  // dots: true,
  infinite: true,
  speed: 700,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  // centerMode: true,
  centerPadding: '0px', // Adjusted to ensure wider cards are centered
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        centerPadding: '0px',
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        centerPadding: '0px',
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        centerPadding: '0px',
      },
    },
  ],
};

const CountryDirectorsProfileCards = () => {
  return (
    <SectionContainer>
      <Container maxWidth="lg">
        {/* Section Title */}
        <Title>Our Country Directors</Title>
        <Description>
          Meet the Exceptional Leaders Guiding Our Global Vision.
        </Description>

        {/* Director Carousel */}
        <CarouselContainer sx={{ p: 5 }}>
          <Slider {...sliderSettings}>
            {directors.map((director, index) => (
              <DirectorCard sx={{ mt: 2 }} key={index}>
                {/* Image */}
                <DirectorImage src={director.image} alt={director.name} />

                {/* LinkedIn Icon (Top-Right Corner) */}
                <LinkedInIconButton
                  href={director.linkedin}
                  target="_blank"
                  aria-label={`LinkedIn profile of ${director.name}`}
                >
                  <LinkedInIcon />
                </LinkedInIconButton>

                {/* Content */}
                <Box
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '50%', // Adjusted height to match the wider card
                  }}
                >
                  {/* Name */}
                  <Fade in timeout={500}>
                    <Typography
                      variant="h6"
                      fontWeight="700"
                      color="#0D47A1"
                      sx={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '0.5px' }}
                    >
                      {director.name}
                    </Typography>
                  </Fade>

                  {/* Designation and Country */}
                  <Fade in timeout={700}>
                    <Box>
                      <Typography
                        variant="body2"
                        fontWeight="600"
                        color="green"
                        sx={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {director.designation}
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight="400"
                        color="#666"
                        sx={{ fontFamily: 'Poppins, sans-serif', mt: 0.5 }}
                      >
                        {director.country}
                      </Typography>
                    </Box>
                  </Fade>

                  {/* Animated Flag */}
                  <Fade in timeout={900}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 1,
                      }}
                    >
                      <CountryFlag src={director.countryFlag} alt={`${director.country} Flag`} />
                    </Box>
                  </Fade>
                </Box>
              </DirectorCard>
            ))}
          </Slider>
        </CarouselContainer>
      </Container>
    </SectionContainer>
  );
};

export default CountryDirectorsProfileCards;