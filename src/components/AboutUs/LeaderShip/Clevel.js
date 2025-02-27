import React from 'react';
import { Box, Typography, Container, Avatar, Button } from '@mui/material';
import { styled } from '@mui/system';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Fade } from '@mui/material';

// Sample images (replace with your actual imports)
import leader1Image from  '../../../assets/image/Shamal.jpg'; // Replace with actual image
import leader2Image from '../../../assets/image/Eranga.jpg';
import leader3Image from '../../../assets/image/Rajiv.jpg';
import leader4Image from '../../../assets/image/Rohan.jpg';
import leader5Image from '../../../assets/image/OIP.jpg';

// Leader Data for Connex IT (no flags)
const leaders = [
  { name: 'John Doe', designation: 'Chief Marketing Officer', shortCode: 'CMO', image: leader1Image, linkedin: 'https://linkedin.com/in/johndoe' },
  { name: 'Jane Smith', designation: 'Chief Technology Officer', shortCode: 'CTO', image: leader2Image, linkedin: 'https://linkedin.com/in/janesmith' },
  { name: 'Ravi Patel', designation: 'Chief Financial Officer', shortCode: 'CFO', image: leader3Image, linkedin: 'https://linkedin.com/in/ravipatel' },
  { name: 'Anna Müller', designation: 'Chief Operating Officer', shortCode: 'COO', image: leader4Image, linkedin: 'https://linkedin.com/in/annamueller' },
  { name: 'Hiro Tanaka', designation: 'Chief Executive Officer', shortCode: 'CEO', image: leader5Image, linkedin: 'https://linkedin.com/in/hirotanaka' },
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
  fontWeight: '700',
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
  maxWidth: '700px',
  margin: '0 auto',
  fontFamily: 'Poppins, sans-serif',
  marginBottom: theme.spacing(6),
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },
}));

// Leader Card (No Shadows)
const LeaderCard = styled(Box)(({ theme }) => ({
  position: 'relative',
  cursor: 'pointer',
  borderRadius: '16px',
  overflow: 'hidden',
  height: '360px', // Smaller height
  width: '100%',
  maxWidth: '260px', // Smaller width
  transition: 'all 0.4s ease-in-out',
  border: '1px solid rgba(13, 71, 161, 0.2)',
  background: 'linear-gradient(145deg, #ffffff 0%, #f5f7fa 100%)',
  '&:hover': {
    transform: 'translateY(-6px) scale(1.02)',
    borderColor: theme.palette.primary.main,
  },
  '&:hover .linkedin-btn': {
    backgroundColor: '#0288D1', // Hover effect for button
  },
}));

const LeaderImage = styled(Avatar)(({ theme }) => ({
  width: '100%',
  height: '45%', // Slightly less than half for smaller card
  objectFit: 'cover',
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
  borderBottom: '1px solid rgba(13, 71, 161, 0.1)',
}));

const LinkedInButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#0D47A1',
  color: '#ffffff',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: '500',
  fontSize: '0.9rem',
  padding: theme.spacing(0.75, 2),
  borderRadius: '20px',
  textTransform: 'none',
  display: 'flex',
  alignItems: 'center',
  transition: 'background-color 0.3s ease-in-out',
  '& .MuiButton-endIcon': {
    marginLeft: theme.spacing(1),
  },
}));

const CarouselContainer = styled(Box)(({ theme }) => ({
  mr:10,
  '& .slick-slide': {
    padding: theme.spacing(0, 0.5), // Tight gap between cards
  },
  '& .slick-list': {
    margin: theme.spacing(0, -0.5), // Reduced gap
  },
}));

// Slider Settings
const sliderSettings = {
 
  infinite: true,
  speed: 1700,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  centerMode: true,
  
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
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

const ConnexITBoardLeaders = () => {
  return (
    <SectionContainer>
      <Container maxWidth="lg">
        {/* Section Title */}
        <Title>Connex IT Leadership Team</Title>
        <Description>
          Meet the Visionary C-Level Leaders Driving Connex IT Forward.
        </Description>

        {/* Leader Carousel */}
        <CarouselContainer>
          <Slider {...sliderSettings}>
            {leaders.map((leader, index) => (
              <LeaderCard key={index}>
                {/* Image */}
                <LeaderImage src={leader.image} alt={leader.name} />

                {/* Content */}
                <Box
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '55%',
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
                      {leader.name}
                    </Typography>
                  </Fade>

                  {/* Full Designation with Short Code */}
                  <Fade in timeout={700}>
                    <Typography
                      variant="body2"
                      fontWeight="600"
                      color="green"
                      sx={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {leader.designation} ({leader.shortCode})
                    </Typography>
                  </Fade>

                  {/* LinkedIn Button */}
                  <Fade in timeout={900}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <LinkedInButton
                        className="linkedin-btn"
                        href={leader.linkedin}
                        target="_blank"
                        endIcon={<LinkedInIcon />}
                      >
                        Explore with LinkedIn
                      </LinkedInButton>
                    </Box>
                  </Fade>
                </Box>
              </LeaderCard>
            ))}
          </Slider>
        </CarouselContainer>
      </Container>
    </SectionContainer>
  );
};

export default ConnexITBoardLeaders;